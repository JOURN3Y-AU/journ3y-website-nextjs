import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RoleSelectionSectionV2Props {
  data: any;
  onComplete: (data: any) => void;
}

const RoleSelectionSectionV2 = ({ data, onComplete }: RoleSelectionSectionV2Props) => {
  const [formData, setFormData] = useState({
    selected_role: data.selected_role || '',
    company_name: data.company_name || '',
    company_size: data.company_size || '',
    industry: data.industry || '',
  });

  const roles = [
    { value: 'CEO', label: 'Chief Executive Officer', description: 'Strategic leadership and transformation' },
    { value: 'CFO', label: 'Chief Financial Officer', description: 'Financial planning and ROI optimization' },
    { value: 'CMO', label: 'Chief Marketing Officer', description: 'Customer experience and growth' },
    { value: 'CHRO', label: 'Chief Human Resources Officer', description: 'People and organizational change' },
    { value: 'CPO', label: 'Chief Product Officer', description: 'Product innovation and development' },
    { value: 'CTO', label: 'Chief Technology Officer', description: 'Technical infrastructure and implementation' },
    { value: 'Other', label: 'Other Executive/Leadership Role', description: 'Senior leadership or specialized role' },
  ];

  const companySizes = [
    'Startup (1-10 employees)',
    'Small Business (11-50 employees)',
    'Medium Business (51-200 employees)',
    'Large Business (201-1000 employees)',
    'Enterprise (1000+ employees)'
  ];

  const industries = [
    'Technology & Software',
    'Financial Services',
    'Healthcare & Life Sciences',
    'Manufacturing',
    'Professional Services',
    'Retail & E-commerce',
    'Education',
    'Government & Public Sector',
    'Non-profit',
    'Other'
  ];

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
          Role & Company Information
        </h2>
        <p className="text-gray-600">
          Help us understand your role and company context to provide personalized insights.
        </p>
      </div>

      <div className="space-y-6">
        {/* Role Selection */}
        <div>
          <Label className="text-base font-medium mb-4 block">What is your role? *</Label>
          <RadioGroup
            value={formData.selected_role}
            onValueChange={(value) => setFormData(prev => ({ ...prev, selected_role: value }))}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {roles.map((role) => (
              <Card key={role.value} className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={role.value} id={role.value} />
                  <div className="flex-1">
                    <Label htmlFor={role.value} className="cursor-pointer font-medium">
                      {role.label}
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">{role.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </RadioGroup>
        </div>

        {/* Company Name */}
        <div>
          <Label htmlFor="company_name" className="text-base font-medium">Company Name *</Label>
          <Input
            id="company_name"
            value={formData.company_name}
            onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
            placeholder="Your company name"
            className="mt-2"
          />
        </div>

        {/* Company Size */}
        <div>
          <Label className="text-base font-medium">Company Size *</Label>
          <Select 
            value={formData.company_size} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, company_size: value }))}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              {companySizes.map((size) => (
                <SelectItem key={size} value={size}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Industry */}
        <div>
          <Label className="text-base font-medium">Industry *</Label>
          <Select 
            value={formData.industry} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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

export default RoleSelectionSectionV2;