import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const Disclaimer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-300 hover:text-accent transition-colors flex items-center gap-2"
      >
        <FaInfoCircle />
        <span>Disclaimer</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[100]">
          <div className="bg-secondary rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
              <div className="space-y-4 text-gray-300">
                <p>Please read this disclaimer carefully before using the service operated by us.</p>

                <p>
                  Movix provides access to third-party content on an "as is" basis without any warranties. 
                  We do not host, upload, or store any videos on our servers. All content is provided by 
                  non-affiliated third parties.
                </p>

                <p>
                  We have no control over and assume no responsibility for the content, privacy policies, 
                  or practices of any third-party websites or services. We do not warrant the accuracy, 
                  validity, or legality of any content streamed through our service.
                </p>

                <p>
                  By using Movix, you acknowledge that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We do not host any copyrighted content</li>
                  <li>All streaming links are provided by third parties</li>
                  <li>We are not responsible for any content accuracy or availability</li>
                  <li>Users are responsible for verifying their right to view content</li>
                </ul>

                <p>
                  Copyright Notice: Movix respects intellectual property rights and will promptly remove 
                  any infringing content upon proper notification. Users are prohibited from using our 
                  service to infringe copyrights.
                </p>

                <p>
                  Age Restriction: Some content may be inappropriate for minors. Parental supervision 
                  is advised. Users must comply with all applicable laws and regulations.
                </p>

                <p>
                  Limitation of Liability: In no event shall Movix be liable for any damages arising 
                  from the use or inability to use our service. Users agree to use the service at 
                  their own risk.
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Agree
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Disclaimer; 