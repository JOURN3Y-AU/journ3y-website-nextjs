import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Settings, Database, Bot, GraduationCap } from 'lucide-react';

const SmallBusinessHowItWorksSection = () => {
  const [openSteps, setOpenSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (stepId: string) => {
    setOpenSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));

    // Track expansion with Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'section_expand', {
        step: stepId,
        action: openSteps[stepId] ? 'collapse' : 'expand'
      });
    }
  };

  const steps = [
    {
      id: 'setup',
      number: '01',
      icon: <Settings className="w-8 h-8 text-primary" />,
      title: 'Platform Setup',
      summary: 'Quick deployment of your managed AI platform',
      details: [
        'Industry-specific AI model configuration and optimisation',
        'User access controls and permission settings',
        'Security protocols and data protection measures'
      ]
    },
    {
      id: 'integration',
      number: '02',
      icon: <Database className="w-8 h-8 text-secondary" />,
      title: 'Data Integration',
      summary: 'Seamless connection with your existing business systems',
      details: [
        'CRM system integration for client data synchronisation',
        'Document management system connectivity',
        'Email platform integration for communication workflows',
        'Calendar and scheduling system connections',
        'Custom API integrations for specialised business tools'
      ]
    },
    {
      id: 'agents',
      number: '03',
      icon: <Bot className="w-8 h-8 text-accent" />,
      title: 'Custom AI Agents',
      summary: 'Industry-specific AI assistants tailored to your business needs',
      details: [
        'Property listing and description generation agents',
        'Client communication and follow-up automation',
        'Market analysis and reporting assistants',
        'Document processing and data extraction tools',
        'Compliance and regulatory guidance systems'
      ]
    },
    {
      id: 'training',
      number: '04',
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
      title: 'Training & Support',
      summary: 'Comprehensive training and ongoing support for your team',
      details: [
        'Initial team training sessions and best practices',
        'Custom workflow development and optimisation',
        'Ongoing technical support and system updates',
        'Performance monitoring and improvement recommendations',
        'Regular check-ins and strategy refinement sessions'
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our proven four-step process ensures seamless implementation and maximum value 
            from your AI-powered business transformation.
          </p>
        </div>

        <div className="grid gap-6">
          {steps.map((step, index) => (
            <Card key={step.id} className="border-border">
              <Collapsible 
                open={openSteps[step.id]} 
                onOpenChange={() => toggleStep(step.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardContent className="p-6 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full">
                          <span className="text-lg font-bold text-foreground">
                            {step.number}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          {step.icon}
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-1">
                              {step.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {step.summary}
                            </p>
                          </div>
                        </div>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-muted-foreground transition-transform ${
                          openSteps[step.id] ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </CardContent>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="px-6 pb-6 pt-0">
                    <div className="ml-22 space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <p className="text-muted-foreground">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmallBusinessHowItWorksSection;