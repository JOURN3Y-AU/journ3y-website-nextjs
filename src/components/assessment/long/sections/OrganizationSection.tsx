
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface OrganizationSectionProps {
  answers: any;
  contactInfo: any;
  onComplete: (answers: any) => void;
}

const OrganizationSection = ({ answers, contactInfo, onComplete }: OrganizationSectionProps) => {
  const [formData, setFormData] = useState({
    first_name: contactInfo.first_name || '',
    last_name: contactInfo.last_name || '',
    email: contactInfo.email || '',
    company_name: contactInfo.company_name || '',
    phone_number: contactInfo.phone_number || '',
    q1_company_size: answers.q1_company_size || '',
    q2_industry_sector: answers.q2_industry_sector || '',
    q3_annual_revenue: answers.q3_annual_revenue || '',
    q4_primary_business_model: answers.q4_primary_business_model || '',
    q5_geographic_footprint: answers.q5_geographic_footprint || '',
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
    return formData.first_name && formData.last_name && formData.email && 
           formData.company_name && formData.q1_company_size && 
           formData.q2_industry_sector && formData.q3_annual_revenue && 
           formData.q4_primary_business_model && formData.q5_geographic_footprint;
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Organization & Contact Information
        </h2>
        <p className="text-gray-600">
          Help us understand your organization and how to reach you with your results.
        </p>
      </div>

      {/* Contact Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first_name">First Name *</Label>
            <Input
              id="first_name"
              value={formData.first_name}
              onChange={(e) => handleInputChange('first_name', e.target.value)}
              placeholder="Your first name"
              required
            />
          </div>
          <div>
            <Label htmlFor="last_name">Last Name *</Label>
            <Input
              id="last_name"
              value={formData.last_name}
              onChange={(e) => handleInputChange('last_name', e.target.value)}
              placeholder="Your last name"
              required
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@company.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              value={formData.phone_number}
              onChange={(e) => handleInputChange('phone_number', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="company_name">Company Name *</Label>
          <Input
            id="company_name"
            value={formData.company_name}
            onChange={(e) => handleInputChange('company_name', e.target.value)}
            placeholder="Your company name"
            required
          />
        </div>
      </div>

      {/* Organization Questions */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Organization Profile</h3>
        
        {/* Q1: Company Size */}
        <div>
          <Label className="text-base font-medium">1. What is your company size? *</Label>
          <RadioGroup
            value={formData.q1_company_size}
            onValueChange={(value) => handleInputChange('q1_company_size', value)}
            className="mt-3"
          >
            {['1-10 employees', '11-50 employees', '51-250 employees', '251-1,000 employees', '1,000+ employees'].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q1_${option}`} />
                <Label htmlFor={`q1_${option}`} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Q2: Industry Sector */}
        <div>
          <Label className="text-base font-medium">2. What industry sector best describes your business? *</Label>
          <RadioGroup
            value={formData.q2_industry_sector}
            onValueChange={(value) => handleInputChange('q2_industry_sector', value)}
            className="mt-3"
          >
            {[
              'Professional Services',
              'Healthcare & Life Sciences',
              'Financial Services',
              'Manufacturing',
              'Technology & Software',
              'Retail & E-commerce',
              'Education',
              'Government & Public Sector',
              'Other'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q2_${option}`} />
                <Label htmlFor={`q2_${option}`} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Q3: Annual Revenue */}
        <div>
          <Label className="text-base font-medium">3. What is your approximate annual revenue? *</Label>
          <RadioGroup
            value={formData.q3_annual_revenue}
            onValueChange={(value) => handleInputChange('q3_annual_revenue', value)}
            className="mt-3"
          >
            {[
              'Under $1M',
              '$1M - $5M',
              '$5M - $20M',
              '$20M - $100M',
              '$100M - $500M',
              'Over $500M'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q3_${option}`} />
                <Label htmlFor={`q3_${option}`} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Q4: Business Model */}
        <div>
          <Label className="text-base font-medium">4. What is your primary business model? *</Label>
          <RadioGroup
            value={formData.q4_primary_business_model}
            onValueChange={(value) => handleInputChange('q4_primary_business_model', value)}
            className="mt-3"
          >
            {[
              'B2B Services',
              'B2C Products/Services',
              'B2B Software/Technology',
              'Manufacturing/Distribution',
              'Hybrid (B2B and B2C)',
              'Other'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q4_${option}`} />
                <Label htmlFor={`q4_${option}`} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Q5: Geographic Footprint */}
        <div>
          <Label className="text-base font-medium">5. What is your geographic footprint? *</Label>
          <RadioGroup
            value={formData.q5_geographic_footprint}
            onValueChange={(value) => handleInputChange('q5_geographic_footprint', value)}
            className="mt-3"
          >
            {[
              'Single city/region',
              'Multiple cities (same country)',
              'National presence',
              'International (2-5 countries)',
              'Global (5+ countries)'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q5_${option}`} />
                <Label htmlFor={`q5_${option}`} className="cursor-pointer">{option}</Label>
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

export default OrganizationSection;
