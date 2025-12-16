
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { AssessmentAnswers, ContactInfo } from '@/types/assessment';

interface AssessmentFormProps {
  isContactStep?: boolean;
  onComplete: (data: AssessmentAnswers | ContactInfo) => void;
}

const questions = [
  {
    id: 'q1_business_challenge',
    question: "What's your biggest business challenge right now?",
    options: [
      'Growing revenue faster',
      'Cutting operational costs',
      'Improving customer experience',
      'Staying competitive with technology',
      'Managing business complexity'
    ]
  },
  {
    id: 'q2_time_waste',
    question: "What wastes the most time in your business each week?",
    options: [
      'Searching for information across different systems and tools',
      'Answering the same customer questions repeatedly',
      'Creating reports and documentation from scratch',
      'Onboarding new team members and getting them productive',
      'Tracking down project updates and status information',
      'Administrative tasks that pull people away from their core work'
    ]
  },
  {
    id: 'q3_revenue',
    question: "What's your company's annual revenue?",
    options: [
      'Under $5M',
      '$5M - $20M',
      '$20M - $100M',
      '$100M+',
      'Prefer not to say'
    ]
  },
  {
    id: 'q4_timeline',
    question: "When are you looking to make improvements?",
    options: [
      'Already started planning',
      'Next 3 months',
      'Next 6-12 months',
      'Just exploring options',
      'No specific timeline'
    ]
  },
  {
    id: 'q5_investment_priority',
    question: "What's most important for your next technology investment?",
    options: [
      'Quick wins and fast ROI',
      'Long-term competitive advantage',
      'Risk reduction and compliance',
      'Team productivity improvements',
      'Better customer insights'
    ]
  },
  {
    id: 'q6_leadership_readiness',
    question: "How ready is your leadership team to invest in business transformation?",
    options: [
      'Fully committed with budget approved',
      'Committed but need to see ROI case',
      'Interested but cautious about change',
      'Still in early exploration phase',
      'Not ready for significant change'
    ]
  }
];

const AssessmentForm = ({ isContactStep = false, onComplete }: AssessmentFormProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contactData, setContactData] = useState<ContactInfo>({
    first_name: '',
    last_name: '',
    email: '',
    company_name: '',
    phone_number: '',
  });
  const { toast } = useToast();

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    const currentQuestionId = questions[currentQuestion].id;
    if (!answers[currentQuestionId]) {
      toast({
        title: "Please select an answer",
        description: "You need to select an answer before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // All questions answered
      onComplete(answers as AssessmentAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactData.first_name || !contactData.last_name || !contactData.email || !contactData.company_name) {
      toast({
        title: "Please fill in required fields",
        description: "First name, last name, email, and company name are required.",
        variant: "destructive",
      });
      return;
    }

    onComplete(contactData);
  };

  const handleContactChange = (field: keyof ContactInfo, value: string) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  if (isContactStep) {
    return (
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Almost Done!
                </h2>
                <p className="text-gray-600">
                  Just a few details so we can send you your personalized AI readiness assessment.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name *</Label>
                    <Input
                      id="first_name"
                      type="text"
                      value={contactData.first_name}
                      onChange={(e) => handleContactChange('first_name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name *</Label>
                    <Input
                      id="last_name"
                      type="text"
                      value={contactData.last_name}
                      onChange={(e) => handleContactChange('last_name', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactData.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="company_name">Company Name *</Label>
                  <Input
                    id="company_name"
                    type="text"
                    value={contactData.company_name}
                    onChange={(e) => handleContactChange('company_name', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    type="tel"
                    value={contactData.phone_number}
                    onChange={(e) => handleContactChange('phone_number', e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                >
                  Get My Assessment Results
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <Card className="p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              {currentQ.question}
            </h2>

            <RadioGroup
              value={answers[currentQ.id] || ''}
              onValueChange={(value) => handleAnswerSelect(currentQ.id, value)}
              className="space-y-4"
            >
              {currentQ.options.map((option) => (
                <div key={option} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="flex-1 cursor-pointer text-base">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentQuestion === 0}
                className="px-6"
              >
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6"
              >
                {currentQuestion === questions.length - 1 ? 'Continue' : 'Next'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AssessmentForm;
