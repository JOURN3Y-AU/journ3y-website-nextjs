import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface RoleSpecificSectionV2Props {
  data: any;
  selectedRole?: string;
  onComplete: (data: any) => void;
}

const RoleSpecificSectionV2 = ({ data, selectedRole, onComplete }: RoleSpecificSectionV2Props) => {
  const [formData, setFormData] = useState({
    q14_role_specific_1: data.q14_role_specific_1 || '',
    q15_role_specific_2: data.q15_role_specific_2 || '',
  });

  const getRoleSpecificQuestions = (role: string) => {
    const questionSets = {
      CEO: [
        {
          id: 'q14_role_specific_1',
          question: 'What\'s your primary motivation for exploring AI transformation?',
          options: [
            'Strategic competitive advantage',
            'Operational efficiency and cost reduction',
            'Innovation leadership in the market',
            'Market expansion and new opportunities',
            'Future-proofing the organization'
          ]
        },
        {
          id: 'q15_role_specific_2',
          question: 'How do you prefer to approach major technology initiatives?',
          options: [
            'Comprehensive transformation with clear roadmap',
            'Pilot-first approach to prove value',
            'Best practice adoption from industry leaders',
            'Innovation labs and experimentation',
            'Strategic vendor partnerships'
          ]
        }
      ],
      CFO: [
        {
          id: 'q14_role_specific_1',
          question: 'What\'s your biggest concern about AI investment ROI?',
          options: [
            'Unclear business case and value measurement',
            'Long payback periods and delayed benefits',
            'High upfront implementation costs',
            'Ongoing operational and maintenance costs',
            'Risk of project failure or poor adoption'
          ]
        },
        {
          id: 'q15_role_specific_2',
          question: 'How do you currently measure technology investment success?',
          options: [
            'Direct cost savings and efficiency gains',
            'Revenue impact and growth metrics',
            'Productivity and operational efficiency',
            'Risk reduction and compliance benefits',
            'Strategic value and competitive advantage'
          ]
        }
      ],
      CMO: [
        {
          id: 'q14_role_specific_1',
          question: 'Which marketing challenge would AI address first?',
          options: [
            'Customer segmentation and targeting',
            'Content personalization at scale',
            'Campaign optimization and performance',
            'Lead scoring and nurturing',
            'Customer experience and journey optimization'
          ]
        },
        {
          id: 'q15_role_specific_2',
          question: 'How advanced is your marketing technology stack?',
          options: [
            'Basic tools with limited automation',
            'Integrated platforms with some automation',
            'Advanced automation and workflows',
            'AI-powered tools and predictive analytics',
            'Custom solutions and advanced integrations'
          ]
        }
      ],
      CHRO: [
        {
          id: 'q14_role_specific_1',
          question: 'What\'s your biggest people-related challenge with AI adoption?',
          options: [
            'Skill gaps and training requirements',
            'Change resistance and fear of job displacement',
            'Job displacement concerns and reskilling',
            'Training costs and time investment',
            'Cultural transformation and mindset shift'
          ]
        },
        {
          id: 'q15_role_specific_2',
          question: 'How does your organization typically handle major change initiatives?',
          options: [
            'Top-down mandate with clear communication',
            'Gradual rollout with change champions',
            'Change champions and pilot groups',
            'External consultants and change management',
            'Collaborative approach with stakeholder input'
          ]
        }
      ],
      CPO: [
        {
          id: 'q14_role_specific_1',
          question: 'Where could AI most impact your product development?',
          options: [
            'User experience and interface optimization',
            'Feature intelligence and recommendations',
            'Development efficiency and automation',
            'Quality assurance and testing',
            'Market insights and competitive analysis'
          ]
        },
        {
          id: 'q15_role_specific_2',
          question: 'How do you currently gather and use product insights?',
          options: [
            'User analytics and behavior tracking',
            'Customer feedback and survey data',
            'Market research and competitive analysis',
            'A/B testing and experimentation',
            'Data science and predictive modeling'
          ]
        }
      ],
      CTO: [
        {
          id: 'q14_role_specific_1',
          question: 'What\'s your biggest technical concern about AI implementation?',
          options: [
            'Data infrastructure and architecture readiness',
            'Integration complexity with existing systems',
            'Security risks and data privacy concerns',
            'Scalability and performance requirements',
            'Vendor lock-in and technology dependencies'
          ]
        },
        {
          id: 'q15_role_specific_2',
          question: 'How would you describe your current data architecture?',
          options: [
            'Legacy systems with limited integration',
            'Cloud migration in progress',
            'Modern cloud-native architecture',
            'Data lake/warehouse with analytics capabilities',
            'AI-ready platform with ML infrastructure'
           ]
         }
       ],
       Other: [
         {
           id: 'q14_role_specific_1',
           question: 'What\'s your primary focus area for AI implementation in your role?',
           options: [
             'Process automation and efficiency',
             'Decision support and analytics',
             'Customer experience improvement',
             'Innovation and competitive advantage',
             'Risk management and compliance'
           ]
         },
         {
           id: 'q15_role_specific_2',
           question: 'What level of AI experience does your team currently have?',
           options: [
             'No AI experience - starting from scratch',
             'Basic understanding with limited implementation',
             'Some pilot projects and experimentation',
             'Regular use of AI tools and platforms',
             'Advanced AI capabilities and custom solutions'
           ]
         }
       ]
     };

     return questionSets[role as keyof typeof questionSets] || questionSets.Other;
  };

  const questions = getRoleSpecificQuestions(selectedRole || 'CEO');

  const handleSubmit = () => {
    if (isFormValid()) {
      onComplete(formData);
    }
  };

  const isFormValid = () => {
    return formData.q14_role_specific_1 && formData.q15_role_specific_2;
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Role-Specific Deep Dive
        </h2>
        <p className="text-gray-600">
          These final questions are tailored specifically to your role as a {selectedRole} to provide the most relevant insights.
        </p>
      </div>

      <div className="space-y-8">
        {questions.map((q, index) => (
          <Card key={q.id} className="p-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">
                {index + 14}. {q.question}
              </h3>
              <RadioGroup
                value={formData[q.id as keyof typeof formData]}
                onValueChange={(value) => setFormData(prev => ({ ...prev, [q.id]: value }))}
                className="space-y-3"
              >
                {q.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`${q.id}-${optionIndex}`} />
                    <Label htmlFor={`${q.id}-${optionIndex}`} className="text-sm cursor-pointer flex-1">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default RoleSpecificSectionV2;