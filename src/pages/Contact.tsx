import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import useScrollReveal from '@/hooks/useScrollReveal';
import { supabase } from "@/integrations/supabase/client";
import { useMetaTags, META_CONFIGS } from '@/hooks/useMetaTags';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your name' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
  service: z.enum(['general', 'blueprint', 'glean', 'databricks', 'ai-resources', 'small-business'], {
    required_error: 'Please select a service',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  useMetaTags(META_CONFIGS.contact);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const headerRef = useScrollReveal();
  const formRef = useScrollReveal();
  const infoRef = useScrollReveal();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      service: 'small-business',
    },
  });

  // Pre-populate form based on URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');
    const industry = urlParams.get('industry');
    
    if (service && ['general', 'blueprint', 'glean', 'databricks', 'ai-resources', 'small-business'].includes(service)) {
      form.setValue('service', service as any);
    }
    
    if (industry) {
      const currentMessage = form.getValues('message') || '';
      const industryMessage = `Interested in ${industry} industry solutions. ${currentMessage}`;
      form.setValue('message', industryMessage.trim());
    }
  }, [form]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Capture UTM parameters and additional data for campaign tracking
      const urlParams = new URLSearchParams(window.location.search);
      const campaignData = {
        campaign_source: 'small-business-page',
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        selected_industry: urlParams.get('industry'),
        page_section: urlParams.get('inquiry') || 'contact_form'
      };
      
      // Call the Supabase Edge Function
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: { ...data, campaignData },
      });
      
      if (error) throw new Error(error.message);
      
      // Track form submission with Meta Pixel
      if (typeof (window as any).fbq !== 'undefined') {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Contact Form',
          content_category: data.service,
        });
      }
      
      setIsSuccess(true);
      toast({
        title: 'Message sent!',
        description: "We've received your inquiry and will get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: 'Something went wrong',
        description: 'Failed to send your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-r from-journey-purple/5 to-journey-blue/5">
        <div className="container mx-auto px-4">
          <div ref={headerRef} className="max-w-3xl reveal transition-all duration-700 ease-out">
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-700 mb-8">
              Have questions or ready to start your AI journey? Reach out to our team of experts.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div ref={formRef} className="reveal transition-all duration-500 ease-out">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                
                {isSuccess ? (
                  <div className="text-center py-8">
                    <div className="mb-4 text-journey-purple">
                      <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Thank You!</h3>
                    <p className="mb-6 text-gray-600">
                      Your message has been sent successfully. Our team will get back to you shortly.
                    </p>
                    <Button onClick={() => setIsSuccess(false)}>Send Another Message</Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address*</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>I'm Interested In</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="general">General Inquiry</SelectItem>
                                <SelectItem value="blueprint">Blueprint - AI Strategy</SelectItem>
                                <SelectItem value="glean">Accelerators - Glean</SelectItem>
                                <SelectItem value="databricks">Accelerators - Databricks</SelectItem>
                                <SelectItem value="small-business">Small Business AI Solutions</SelectItem>
                                <SelectItem value="ai-resources">Services - AI Resources</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Message*</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="How can we help you?" 
                                className="min-h-32"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-journey-purple to-journey-blue text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </div>
            
            {/* Contact Information */}
            <div ref={infoRef} className="reveal transition-all duration-500 ease-out reveal-delay-300">
              <div className="bg-gray-50 rounded-lg p-8 h-full">
                <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-journey-purple/10 flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-journey-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Email Us</h3>
                      <p className="text-gray-600">info@journ3y.com.au</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-journey-dark-purple/10 flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-journey-dark-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Visit Us</h3>
                      <p className="text-gray-600">Sydney, NSW 2000</p>
                      <p className="text-gray-600">Australia</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-lg font-medium mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="https://www.linkedin.com/company/journ3y-au" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-journey-purple hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
