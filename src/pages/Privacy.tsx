
import useScrollReveal from '@/hooks/useScrollReveal';

const Privacy = () => {
  const headerRef = useScrollReveal();
  const contentRef = useScrollReveal();

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-r from-journey-purple/5 to-journey-blue/5">
        <div className="container mx-auto px-4">
          <div ref={headerRef} className="max-w-3xl reveal transition-all duration-700 ease-out">
            <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-700 mb-8">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div ref={contentRef} className="max-w-4xl mx-auto reveal transition-all duration-500 ease-out">
            <div className="prose prose-lg max-w-none">
              <p className="text-sm text-gray-600 mb-8">
                <strong>Last updated:</strong> {new Date().toLocaleDateString('en-AU', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>

              <h2>Introduction</h2>
              <p>
                Journey AI Pty Ltd ("JOURN3Y", "we", "us", or "our") is committed to protecting your privacy and complying with the Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth). This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information.
              </p>

              <h2>Information We Collect</h2>
              <h3>Personal Information</h3>
              <p>We may collect the following types of personal information:</p>
              <ul>
                <li>Contact details (name, email address, phone number, company name)</li>
                <li>Professional information (job title, industry, business requirements)</li>
                <li>Communication records (enquiries, support requests, feedback)</li>
                <li>Technical information (IP address, browser type, device information)</li>
                <li>Website usage data (pages visited, time spent, interactions)</li>
              </ul>

              <h3>How We Collect Information</h3>
              <p>We collect personal information through:</p>
              <ul>
                <li>Contact forms and enquiry submissions on our website</li>
                <li>Email communications and phone conversations</li>
                <li>Newsletter subscriptions and marketing communications</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Third-party integrations and analytics services</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use your personal information for the following purposes:</p>
              <ul>
                <li>Responding to your enquiries and providing customer support</li>
                <li>Delivering our AI consulting and technology services</li>
                <li>Sending marketing communications (with your consent)</li>
                <li>Improving our website and services</li>
                <li>Complying with legal obligations</li>
                <li>Protecting our business interests and preventing fraud</li>
              </ul>

              <h2>Information Sharing and Disclosure</h2>
              <p>We may share your personal information with:</p>
              <ul>
                <li><strong>Service providers:</strong> Third-party vendors who assist us in operating our business (hosting, analytics, email services)</li>
                <li><strong>Business partners:</strong> When necessary to deliver our services or with your consent</li>
                <li><strong>Legal authorities:</strong> When required by law or to protect our legal rights</li>
                <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
              </ul>
              <p>We do not sell, rent, or trade your personal information to third parties for their marketing purposes.</p>

              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, disclosure, alteration, or destruction. This includes encryption, secure servers, access controls, and regular security assessments.
              </p>

              <h2>Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfil the purposes outlined in this policy or as required by law. When information is no longer needed, we securely delete or anonymise it.
              </p>

              <h2>Your Rights</h2>
              <p>Under Australian privacy law, you have the right to:</p>
              <ul>
                <li><strong>Access:</strong> Request access to your personal information we hold</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                <li><strong>Complain:</strong> Lodge a complaint about our handling of your personal information</li>
              </ul>

              <h2>Cookies and Tracking</h2>
              <p>
                Our website uses cookies and similar technologies to improve user experience and analyse website performance. You can control cookie settings through your browser preferences, though some website functionality may be affected.
              </p>

              <h2>Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites and encourage you to review their privacy policies.
              </p>

              <h2>International Transfers</h2>
              <p>
                Some of our service providers may be located overseas. When we transfer personal information internationally, we ensure appropriate safeguards are in place to protect your information in accordance with Australian privacy law.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Our services are not directed to children under 18. We do not knowingly collect personal information from children. If we become aware of such collection, we will take steps to delete the information.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The updated version will be posted on our website with the revised date. We encourage you to review this policy periodically.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, wish to exercise your privacy rights, or want to make a complaint, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-6">
                <p><strong>Journey AI Pty Ltd</strong></p>
                <p>Email: privacy@journ3y.com.au</p>
                <p>Address: Sydney, NSW 2000, Australia</p>
              </div>
              
              <p className="mt-6">
                If you are not satisfied with our response to your privacy complaint, you may contact the Office of the Australian Information Commissioner (OAIC) at <a href="https://www.oaic.gov.au" className="text-journey-purple hover:underline">www.oaic.gov.au</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
