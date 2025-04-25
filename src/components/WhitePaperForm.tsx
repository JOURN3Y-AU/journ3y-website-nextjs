
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';

interface WhitePaperFormProps {
  whitePaperId: string;
  title: string;
}

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  name: z.string().min(2, { message: 'Please enter your name' }),
  optIn: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const WhitePaperForm = ({ whitePaperId, title }: WhitePaperFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      optIn: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setIsSuccess(true);
      toast({
        title: 'Success!',
        description: 'Your white paper is ready to download.',
      });

      // In a real app, you would trigger the download here or redirect to the PDF
      // For demo purposes, we'll just show a success message
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process your request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="mb-4 text-journey-purple">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-medium mb-2">Thank You!</h3>
        <p className="mb-4 text-gray-600">Your white paper is ready to download.</p>
        <Button className="w-full bg-gradient-to-r from-journey-purple to-journey-blue">
          Download White Paper
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-medium mb-4">{title}</h3>
      <p className="mb-6 text-gray-600">Enter your details to access this white paper.</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
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
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="optIn"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border border-gray-100">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Subscribe to newsletter</FormLabel>
                  <FormDescription>
                    Receive updates about new AI research and whitepapers.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-journey-purple to-journey-blue"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Download White Paper'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default WhitePaperForm;
