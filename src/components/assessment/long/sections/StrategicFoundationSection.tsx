
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

interface StrategicFoundationSectionProps {
  answers: any;
  onComplete: (answers: any) => void;
}

const StrategicFoundationSection = ({ answers, onComplete }: StrategicFoundationSectionProps) => {
  const [formData, setFormData] = useState({
    q6_business_priorities: answers.q6_business_priorities || '',
    q7_competitive_differentiation: answers.q7_competitive_differentiation || '',
    q8_growth_challenges: answers.q8_growth_challenges || '',
    q9_technology_investment: answers.q9_technology_investment || '',
    q10_change_appetite: answers.q10_change_appetite || '',
    q11_success_metrics: answers.q11_success_metrics || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      onComplete(formData);
    }
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Strategic Foundation
        </h2>
        <p className="text-gray-600">
          Help us understand your strategic context and business priorities.
        </p>
      </div>

      <div className="space-y-6">
        {/* Q6: Business Priorities */}
        <div>
          <Label className="text-base font-medium">6. What are your top 3 business priorities for the next 12 months? *</Label>
          <Textarea
            value={formData.q6_business_priorities}
            onChange={(e) => handleInputChange('q6_business_priorities', e.target.value)}
            placeholder="Please describe your main business priorities..."
            className="mt-2"
            rows={3}
          />
        </div>

        {/* Q7: Competitive Differentiation */}
        <div>
          <Label className="text-base font-medium">7. How does your organization currently differentiate from competitors? *</Label>
          <RadioGroup
            value={formData.q7_competitive_differentiation}
            onValueChange={(value) => handleInputChange('q7_competitive_differentiation', value)}
            className="mt-3"
          >
            {[
              'Superior customer service/experience',
              'Lower costs/competitive pricing',
              'Product innovation/unique features',
              'Speed and agility',
              'Industry expertise/specialization',
              'Technology and automation',
              'Other/combination of factors'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q7_${option}`} />
                <Label htmlFor={`q7_${option}`} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Q8: Growth Challenges */}
        <div>
          <Label className="text-base font-medium">8. What is your biggest challenge in achieving growth targets? *</Label>
          <RadioGroup
            value={formData.q8_growth_challenges}
            onValueChange={(value) => handleInputChange('q8_growth_challenges', value)}
            className="mt-3"
          >
            {[
              'Finding and retaining talent',
              'Operational inefficiencies',
              'Market competition',
              'Technology limitations',
              'Cash flow/funding constraints',
              'Regulatory/compliance issues',
              'Customer acquisition costs',
              'Other'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q8_${option}`} />
                <Label htmlFor={`q8_${option}`} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Q9: Technology Investment */}
        <div>
          <Label className="text-base font-medium">9. How does your organization typically approach technology investments? *</Label>
          <RadioGroup
            value={formData.q9_technology_investment}
            onValueChange={(value) => handleInputChange('q9_technology_investment', value)}
            className="mt-3"
          >
            {[
              'Early adopter - we invest in cutting-edge solutions',
              'Strategic adopter - we invest when ROI is clear',
              'Cautious adopter - we wait for proven solutions',
              'Reactive adopter - we upgrade when forced to',
              'Conservative - we prefer proven, stable solutions'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q9_${option}`} />
                <Label htmlFor={`q9_${option}`} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Q10: Change Appetite */}
        <div>
          <Label className="text-base font-medium">10. How would you describe your organization's appetite for change? *</Label>
          <RadioGroup
            value={formData.q10_change_appetite}
            onValueChange={(value) => handleInputChange('q10_change_appetite', value)}
            className="mt-3"
          >
            {[
              'High - we embrace change as a competitive advantage',
              'Moderate-High - we adapt quickly when benefits are clear',
              'Moderate - we change when necessary',
              'Moderate-Low - we prefer gradual, incremental changes',
              'Low - we prefer stability and proven approaches'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q10_${option}`} />
                <Label htmlFor={`q10_${option}`} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Q11: Success Metrics */}
        <div>
          <Label className="text-base font-medium">11. What metrics do you use to measure business success? *</Label>
          <Textarea
            value={formData.q11_success_metrics}
            onChange={(e) => handleInputChange('q11_success_metrics', e.target.value)}
            placeholder="Please describe your key performance indicators and success metrics..."
            className="mt-2"
            rows={3}
          />
        </div>
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

export default StrategicFoundationSection;
