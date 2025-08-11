import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Users, Zap, CheckCircle, ArrowRight, Heart, PhoneOff, Search, TrendingUp, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SmallBusinessIndustrySelectorProps {
  utmParams?: Record<string, string>;
}

const SmallBusinessIndustrySelector = ({ utmParams }: SmallBusinessIndustrySelectorProps) => {
  const [activeTab, setActiveTab] = useState('recruitment');

  // Set default tab based on URL parameter
  useEffect(() => {
    if (utmParams?.industry) {
      setActiveTab(utmParams.industry);
    }
  }, [utmParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Track tab click with Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'tab_click', {
        industry: value,
        campaign: utmParams?.utm_campaign || 'direct'
      });
    }
  };

  const handleCTAClick = (action: string) => {
    // Track CTA click with Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'cta_click', {
        section: 'industry_selector',
        action,
        industry: activeTab,
        campaign: utmParams?.utm_campaign || 'direct'
      });
    }
  };

  const industryData = {
    realestate: {
      title: "We've built AI that tackles the stuff that actually matters to your real estate business",
      description: (
        <div className="space-y-2">
          <div><strong>Get your time back</strong> - Stop drowning in admin and get back to prospecting</div>
          <div><strong>Automate the paperwork</strong> - Contracts, listings, compliance, settlements & more</div>
          <div><strong>Keep deals moving</strong> - No more confusion between buyers, sellers, and solicitors</div>
        </div>
      ),
      image: '/small-business/realestate-hero.jpg',
      benefits: [
        {
          icon: <Heart className="w-6 h-6 text-primary" />,
          title: 'Keep my hot leads from going cold',
          description: 'So prospects don\'t list with competitors while I\'m stuck doing paperwork.'
        },
        {
          icon: <PhoneOff className="w-6 h-6 text-secondary" />,
          title: 'Stop vendors calling for updates',
          description: 'Keep them informed on market activity and buyer feedback automatically.'
        },
        {
          icon: <Zap className="w-6 h-6 text-accent" />,
          title: 'Get my listings live faster',
          description: 'Upload once, appear everywhere without spending hours on portals and paperwork.'
        },
        {
          icon: <Users className="w-6 h-6 text-primary" />,
          title: 'Keep tenants happy without the phone calls',
          description: 'Handle maintenance requests and payment issues before they become dramas.'
        },
        {
          icon: <TrendingUp className="w-6 h-6 text-secondary" />,
          title: 'Get my agents back to prospecting',
          description: 'Stop them drowning in contract prep and settlement coordination.'
        },
        {
          icon: <CheckCircle className="w-6 h-6 text-accent" />,
          title: 'Never miss a compliance deadline',
          description: 'Keep trust accounts balanced and documents filed before the regulator comes knocking.'
        }
      ]
    },
    construction: {
      title: "We've built AI that tackles the stuff that actually matters to your construction business",
      description: (
        <div className="space-y-2">
          <div><strong>Get your time back</strong> - Stop drowning in admin</div>
          <div><strong>Automate the paperwork</strong> - Quotes, invoices, compliance, meetings & more</div>
          <div><strong>Keep projects on track</strong> - No more confusion or miscommunication</div>
        </div>
      ),
      image: '/small-business/construction-hero.jpg',
      benefits: [
        {
          icon: <Building2 className="w-6 h-6 text-primary" />,
          title: 'Quoting and Pricing',
          description: 'Generate accurate project estimates, automate quote creation, and streamline pricing workflows with intelligent cost analysis.'
        },
        {
          icon: <Users className="w-6 h-6 text-secondary" />,
          title: 'Clients and Project Management',
          description: 'Centralise client communications, track project milestones, and maintain comprehensive project records in one place.'
        },
        {
          icon: <Zap className="w-6 h-6 text-accent" />,
          title: 'Sales, Payments and Contracts',
          description: 'Automate contract generation, streamline payment processing, and manage the entire sales pipeline efficiently.'
        },
        {
          icon: <CheckCircle className="w-6 h-6 text-primary" />,
          title: 'Project Delivery',
          description: 'Coordinate project execution, track deliverables, and ensure timely completion with automated progress monitoring.'
        },
        {
          icon: <Building2 className="w-6 h-6 text-secondary" />,
          title: 'Reporting',
          description: 'Generate comprehensive project reports, track performance metrics, and provide stakeholders with real-time insights.'
        },
        {
          icon: <Users className="w-6 h-6 text-accent" />,
          title: 'Safety and Compliance',
          description: 'Simplify site safety briefings, generate compliance documentation, and simply compliance processes across all projects.'
        }
      ]
    },
    recruitment: {
      title: "We've built AI that tackles the stuff that actually matters to your recruitment business",
      description: (
        <div className="space-y-2">
          <div><strong>Get your time back</strong> - Stop drowning in admin and get back to placing candidates</div>
          <div><strong>Automate the paperwork</strong> - Contracts, compliance, candidate management & more</div>
          <div><strong>Keep placements flowing</strong> - No more confusion between candidates, clients, and your team</div>
        </div>
      ),
      image: '/small-business/recruitment-hero.jpg',
      benefits: [
        {
          icon: <Heart className="w-6 h-6 text-primary" />,
          title: 'Keep my best candidates warm',
          description: 'Stop candidates being snapped up by competitors while I\'m dealing with admin.'
        },
        {
          icon: <Zap className="w-6 h-6 text-secondary" />,
          title: 'Get placements moving faster',
          description: 'Stop losing deals because compliance paperwork takes too long to sort out.'
        },
        {
          icon: <PhoneOff className="w-6 h-6 text-accent" />,
          title: 'Stop clients calling me for updates',
          description: 'Keep them informed automatically so I can focus on finding their next hire.'
        },
        {
          icon: <Search className="w-6 h-6 text-primary" />,
          title: 'Find the needles in the haystack',
          description: 'Get through 200 CVs quickly to find the 3 that actually matter.'
        },
        {
          icon: <TrendingUp className="w-6 h-6 text-secondary" />,
          title: 'Get my consultants back to selling',
          description: 'Stop them drowning in interview coordination and status updates.'
        },
        {
          icon: <DollarSign className="w-6 h-6 text-accent" />,
          title: 'Get paid on time',
          description: 'Chase up contractor timesheets and overdue invoices without it eating my whole Friday.'
        }
      ]
    }
  };

  return (
    <section id="industry-selector" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Industry-Specific AI Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your industry to discover how your AI platform can transform your business operations.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="recruitment" className="text-sm md:text-base">
              Recruitment
            </TabsTrigger>
            <TabsTrigger value="realestate" className="text-sm md:text-base">
              Real Estate
            </TabsTrigger>
            <TabsTrigger value="construction" className="text-sm md:text-base">
              Construction
            </TabsTrigger>
          </TabsList>

          {Object.entries(industryData).map(([key, data]) => (
            <TabsContent key={key} value={key} className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {data.title}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {data.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-white">
                      <Link 
                        to={`/contact?service=small-business&industry=${key}&utm_source=${utmParams?.utm_source || 'page'}`}
                        onClick={() => handleCTAClick('request_demo')}
                      >
                        Request Demo
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="lg:order-last">
                  <img 
                    src={data.image} 
                    alt={`${key} AI solutions`}
                    className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.benefits.map((benefit, index) => (
                  <Card key={index} className="border-border hover:shadow-md transition-shadow">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center space-x-3">
                        {benefit.icon}
                        <h4 className="text-lg font-semibold text-foreground">
                          {benefit.title}
                        </h4>
                      </div>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default SmallBusinessIndustrySelector;