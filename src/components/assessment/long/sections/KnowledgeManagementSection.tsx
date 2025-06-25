
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface KnowledgeManagementSectionProps {
  answers: any;
  onComplete: (answers: any) => void;
}

const KnowledgeManagementSection = ({ answers, onComplete }: KnowledgeManagementSectionProps) => {
  const [formData, setFormData] = useState({
    q12_information_challenges: answers.q12_information_challenges || '',
    q13_knowledge_systems: answers.q13_knowledge_systems || '',
    q14_search_efficiency: answers.q14_search_efficiency || '',
    q15_expertise_capture: answers.q15_expertise_capture || '',
    q16_collaboration_tools: answers.q16_collaboration_tools || '',
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
          Knowledge Management
        </h2>
        <p className="text-gray-600">
          Assess how your organization currently manages and accesses information.
        </p>
      </div>

      <div className="space-y-6">
        {/* Q12: Information Challenges */}
        <div>
          <Label className="text-base font-medium">12. What is your biggest challenge with information access? *</Label>
          <RadioGroup
            value={formData.q12_information_challenges}
            onValueChange={(value) => handleInputChange('q12_information_challenges', value)}
            className="mt-3"
          >
            {[
              'Finding the right information quickly',
              'Information scattered across too many systems',
              'Outdated or duplicate information',
              'Lack of searchable knowledge base',
              'Team expertise not captured/shared',
              'No central information repository',
              'Other'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q12_${option}`} />
                <Label htmlFor={`q12_${option}`} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Q13: Knowledge Systems */}
        <div>
          <Label className="text-base font-medium">13. How do you currently store and organize company knowledge? *</Label>
          <RadioGroup
            value={formData.q13_knowledge_systems}
            onValueChange={(value) => handleInputChange('q13_knowledge_systems', value)}
            className="mt-3"
          >
            {[
              'Centralized knowledge management system',
              'Multiple systems (CRM, file servers, etc.)',
              'Cloud storage (Google Drive, SharePoint, etc.)',
              'Primarily email and local files',
              'Wiki or documentation platform',
              'No formal system - mostly tribal knowledge',
              'Other'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q13_${option}`} />
                <Label htmlFor={`q13_${option}`} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Q14: Search Efficiency */}
        <div>
          <Label className="text-base font-medium">14. How long does it typically take to find specific information? *</Label>
          <RadioGroup
            value={formData.q14_search_efficiency}
            onValueChange={(value) => handleInputChange('q14_search_efficiency', value)}
            className="mt-3"
          >
            {[
              'Less than 5 minutes',
              '5-15 minutes',
              '15-30 minutes',
              '30 minutes to 1 hour',
              'More than 1 hour',
              'Often unable to find information'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q14_${option}`} />
                <Label htmlFor={`q14_${option}`} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Q15: Expertise Capture */}
        <div>
          <Label className="text-base font-medium">15. How well does your organization capture and share expertise? *</Label>
          <RadioGroup
            value={formData.q15_expertise_capture}
            onValueChange={(value) => handleInputChange('q15_expertise_capture', value)}
            className="mt-3"
          >
            {[
              'Excellent - systematic knowledge capture and sharing',
              'Good - most expertise is documented and accessible',
              'Fair - some knowledge captured but not consistently',
              'Poor - mostly relies on asking individuals',
              'Very poor - significant knowledge lost when people leave'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q15_${option}`} />
                <Label htmlFor={`q15_${option}`} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Q16: Collaboration Tools */}
        <div>
          <Label className="text-base font-medium">16. What collaboration tools does your organization primarily use? *</Label>
          <RadioGroup
            value={formData.q16_collaboration_tools}
            onValueChange={(value) => handleInputChange('q16_collaboration_tools', value)}
            className="mt-3"
          >
            {[
              'Microsoft Teams/Office 365',
              'Slack and related tools',
              'Google Workspace',
              'Zoom + file sharing',
              'Email and phone primarily',
              'Mix of various tools',
              'Other/Custom solutions'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q16_${option}`} />
                <Label htmlFor={`q16_${option}`} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
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

export default KnowledgeManagementSection;
