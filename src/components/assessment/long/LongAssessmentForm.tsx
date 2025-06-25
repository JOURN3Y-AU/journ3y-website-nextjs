import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import RoleSelectionSection from './sections/RoleSelectionSection';
import OrganizationSection from './sections/OrganizationSection';
import StrategicFoundationSection from './sections/StrategicFoundationSection';
import KnowledgeManagementSection from './sections/KnowledgeManagementSection';
import DataAIReadinessSection from './sections/DataAIReadinessSection';
import RoleSpecificSection from './sections/RoleSpecificSection';
import ContactSection from './sections/ContactSection';
import { LongAssessmentAnswers, ContactInfo } from '@/pages/products/AIAssessmentLong';

interface LongAssessmentFormProps {
  onComplete: (answers: LongAssessmentAnswers, contact: ContactInfo) => void;
}

const LongAssessmentForm = ({ onComplete }: LongAssessmentFormProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Partial<LongAssessmentAnswers>>({});
  const [contactInfo, setContactInfo] = useState<Partial<ContactInfo>>({});
  
  const sections = [
    { title: 'Role Selection', component: 'RoleSelectionSection' },
    { title: 'Organization & Contact', component: 'OrganizationSection' },
    { title: 'Strategic Foundation', component: 'StrategicFoundationSection' },
    { title: 'Knowledge Management', component: 'KnowledgeManagementSection' },
    { title: 'Data & AI Readiness', component: 'DataAIReadinessSection' },
    { title: 'Role-Specific Questions', component: 'RoleSpecificSection' },
    { title: 'Contact Information', component: 'ContactSection' },
  ];

  const totalSections = sections.length;
  const progressPercentage = ((currentSection + 1) / totalSections) * 100;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSectionComplete = (sectionAnswers: any) => {
    if (currentSection === totalSections - 1) {
      // Last section (contact info)
      setContactInfo({ ...contactInfo, ...sectionAnswers });
      
      // Validate all required fields
      const finalAnswers = { ...answers } as LongAssessmentAnswers;
      const finalContact = { ...contactInfo, ...sectionAnswers } as ContactInfo;
      
      if (isAssessmentComplete(finalAnswers, finalContact)) {
        onComplete(finalAnswers, finalContact);
      }
    } else if (currentSection === 1) {
      // Organization section also contains contact info
      setContactInfo({ ...contactInfo, ...sectionAnswers });
      setAnswers({ ...answers, ...sectionAnswers });
      setCurrentSection(currentSection + 1);
      scrollToTop();
    } else {
      setAnswers({ ...answers, ...sectionAnswers });
      setCurrentSection(currentSection + 1);
      scrollToTop();
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      scrollToTop();
    }
  };

  const isAssessmentComplete = (answers: LongAssessmentAnswers, contact: ContactInfo): boolean => {
    const requiredAnswerFields: (keyof LongAssessmentAnswers)[] = [
      'selected_role', 'q1_company_size', 'q2_industry_sector', 'q3_annual_revenue',
      'q4_primary_business_model', 'q5_geographic_footprint', 'q6_business_priorities',
      'q7_competitive_differentiation', 'q8_growth_challenges', 'q9_technology_investment',
      'q10_change_appetite', 'q11_success_metrics', 'q12_information_challenges',
      'q13_knowledge_systems', 'q14_search_efficiency', 'q15_expertise_capture',
      'q16_collaboration_tools', 'q17_data_quality', 'q18_analytics_maturity',
      'q19_automation_level', 'q20_technology_stack', 'q21_ai_experience',
      'q22_implementation_timeline', 'q23_role_specific', 'q24_role_specific'
    ];
    
    const requiredContactFields: (keyof ContactInfo)[] = [
      'first_name', 'last_name', 'email', 'company_name'
    ];

    return requiredAnswerFields.every(field => answers[field]) &&
           requiredContactFields.every(field => contact[field]);
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <RoleSelectionSection
            answers={answers}
            onComplete={handleSectionComplete}
          />
        );
      case 1:
        return (
          <OrganizationSection
            answers={answers}
            contactInfo={contactInfo}
            onComplete={handleSectionComplete}
          />
        );
      case 2:
        return (
          <StrategicFoundationSection
            answers={answers}
            onComplete={handleSectionComplete}
          />
        );
      case 3:
        return (
          <KnowledgeManagementSection
            answers={answers}
            onComplete={handleSectionComplete}
          />
        );
      case 4:
        return (
          <DataAIReadinessSection
            answers={answers}
            onComplete={handleSectionComplete}
          />
        );
      case 5:
        return (
          <RoleSpecificSection
            answers={answers}
            selectedRole={answers.selected_role}
            onComplete={handleSectionComplete}
          />
        );
      case 6:
        return (
          <ContactSection
            contactInfo={contactInfo}
            onComplete={handleSectionComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              AI Readiness Assessment
            </h1>
            <p className="text-gray-600 mb-6">
              Section {currentSection + 1} of {totalSections}: {sections[currentSection].title}
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-sm text-gray-500 mt-2">
                {Math.round(progressPercentage)}% Complete
              </p>
            </div>
          </div>

          {/* Main Form Card */}
          <Card className="p-8 shadow-lg">
            {renderCurrentSection()}
            
            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <span className="text-sm text-gray-500">
                Step {currentSection + 1} of {totalSections}
              </span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LongAssessmentForm;
