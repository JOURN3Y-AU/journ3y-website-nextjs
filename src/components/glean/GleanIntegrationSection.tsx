'use client'

import useScrollReveal from '@/hooks/useScrollReveal';

const GleanIntegrationSection = () => {
  const section3Ref = useScrollReveal();

  const connectors = [
    { name: 'Gmail', logo: '/logos/gmail.svg' },
    { name: 'GitHub', logo: '/logos/github.svg' },
    { name: 'Jira', logo: '/logos/jira.svg' },
    { name: 'Confluence', logo: '/logos/confluence.svg' },
    { name: 'Microsoft Teams', logo: '/logos/microsoft-teams-logo.svg' },
    { name: 'Dropbox', logo: '/logos/dropbox-logo.svg' },
    { name: 'ServiceNow', logo: '/logos/servicenow-logo.svg' },
    { name: 'GitLab', logo: '/logos/gitlab.svg' },
    { name: 'Slack', logo: '/logos/slack.svg' },
    { name: 'Salesforce', logo: '/logos/salesforce-cloud.svg' },
    { name: 'Box', logo: '/logos/box.svg' },
    { name: 'SharePoint', logo: '/logos/sharepoint.svg' },
    { name: 'OneDrive', logo: '/logos/onedrive.svg' },
    { name: 'Google Drive', logo: '/logos/gdrive.svg' },
    { name: 'Zendesk', logo: '/logos/zendesk.svg' },
    { name: 'Outlook', logo: '/logos/outlook.svg' }
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div ref={section3Ref} className="text-center mb-16 reveal transition-all duration-500 ease-out">
          <h2 className="text-3xl font-bold mb-4">Connect Your Entire Tech Stack</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Glean integrates with 100+ business applications to create a unified knowledge layer
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {connectors.map((app, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-4">
              <div className="w-16 h-16 mb-3 flex items-center justify-center bg-white rounded-lg shadow-sm">
                <img 
                  src={app.logo} 
                  alt={`${app.name} logo`}
                  className="max-w-12 max-h-12 object-contain"
                />
              </div>
              <p className="text-xs font-medium text-gray-700 text-center">{app.name}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600">And 80+ more integrations available</p>
        </div>
      </div>
    </section>
  );
};

export default GleanIntegrationSection;
