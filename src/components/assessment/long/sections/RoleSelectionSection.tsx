
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DollarSign, TrendingUp, Users, Rocket, Settings, Target } from 'lucide-react';

interface RoleSelectionSectionProps {
  answers: any;
  onComplete: (answers: { selected_role: string }) => void;
}

const RoleSelectionSection = ({ answers, onComplete }: RoleSelectionSectionProps) => {
  const [selectedRole, setSelectedRole] = useState<string>(answers.selected_role || '');

  const roles = [
    {
      id: 'cfo',
      title: 'Chief Financial Officer (CFO)',
      description: 'Financial strategy and operations',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'cmo',
      title: 'Chief Marketing Officer (CMO)',
      description: 'Marketing and customer experience',
      icon: TrendingUp,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'chro',
      title: 'Chief People Officer (CHRO)',
      description: 'People and culture',
      icon: Users,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'cpo',
      title: 'Chief Product Officer (CPO)',
      description: 'Product and innovation',
      icon: Rocket,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'cto',
      title: 'Chief Technology Officer (CTO)',
      description: 'Technology and infrastructure',
      icon: Settings,
      color: 'bg-gray-100 text-gray-600'
    },
    {
      id: 'ceo',
      title: 'CEO/General Manager',
      description: 'Overall business strategy',
      icon: Target,
      color: 'bg-red-100 text-red-600'
    }
  ];

  const handleSubmit = () => {
    if (selectedRole) {
      onComplete({ selected_role: selectedRole });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What best describes your primary role?
        </h2>
        <p className="text-gray-600">
          This helps us customize the assessment questions to your specific responsibilities and priorities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {roles.map((role) => {
          const IconComponent = role.icon;
          return (
            <Card
              key={role.id}
              className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedRole === role.id
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedRole(role.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${role.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {role.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {role.description}
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedRole === role.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedRole === role.id && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!selectedRole}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default RoleSelectionSection;
