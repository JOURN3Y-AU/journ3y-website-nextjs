
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useScrollReveal from '@/hooks/useScrollReveal';

interface Brand3yComingSoonSectionProps {
  onFormSubmitSuccess: () => void;
}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
});

const Brand3yComingSoonSection = ({ onFormSubmitSuccess }: Brand3yComingSoonSectionProps) => {
  const sectionRef = useScrollReveal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    // Simulate a successful form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    onFormSubmitSuccess();
    console.log("Form submitted successfully:", data);
  };

  return (
    <section id="waitlist" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="reveal transition-all duration-500 ease-out text-center mb-16">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">
            Revolutionary Brand Intelligence is Coming
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building something that will change how marketers understand their competitive landscape forever. 
            Join the waitlist to be among the first to experience the future of brand intelligence.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                  <Input
                    id="firstName"
                    placeholder="John"
                    {...field}
                    aria-invalid={!!errors.firstName}
                  />
                )}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    {...field}
                    aria-invalid={!!errors.lastName}
                  />
                )}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    type="email"
                    id="email"
                    placeholder="john.doe@example.com"
                    {...field}
                    aria-invalid={!!errors.email}
                  />
                )}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3"
            >
              {isLoading ? 'Joining...' : 'Join the Waitlist'}
            </Button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            We'll only email you about Brand3y updates. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Brand3yComingSoonSection;
