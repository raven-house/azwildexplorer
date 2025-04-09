import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Shield, BookOpen, FileText, ExternalLink } from 'lucide-react'

export type PrivacyContentType = 'gdpr' | 'constitutional' | 'foi'

type PrivacyContentProps = {
  isOpen: boolean
  onClose: () => void
  contentType: PrivacyContentType
}

const PrivacyContentModal: React.FC<PrivacyContentProps> = ({ isOpen, onClose, contentType }) => {
  const contentMap = {
    gdpr: {
      title: 'General Data Protection Regulation (GDPR)',
      icon: <Shield className="w-5 h-5 mr-2 text-primary" />,
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">What&apos;s GDPR?</h2>
          <p>
            The General Data Protection Regulation (GDPR) is a landmark privacy law that took effect
            in May 2018. Think of it as a comprehensive rulebook that changed how organizations
            handle personal data. Before GDPR, companies could collect vast amounts of information
            about you with minimal transparency. Now, they need to follow strict guidelines or face
            serious consequences.
          </p>

          <h3 className="font-bold mt-6">The Key GDPR Principles in Plain Language</h3>
          <div className="bg-primary/5 p-4 rounded-lg space-y-2">
            <p>
              <strong>Transparency:</strong> Companies must clearly tell you what data they&apos;re
              collecting and why - no more hiding details in lengthy terms and conditions documents.
            </p>
            <p>
              <strong>Consent:</strong> Organizations need your clear permission before collecting
              your data. This explains the proliferation of cookie consent notices across websites.
            </p>
            <p>
              <strong>Data Minimization:</strong> Companies should only collect data they genuinely
              need for their stated purpose. If they&apos;re providing a weather service, they
              likely don&apos;t need your full biographical information.
            </p>
            <p>
              <strong>Right to Access:</strong> You can request to see all the data a company has
              about you, and they must comply.
            </p>
            <p>
              <strong>Right to Be Forgotten:</strong> You can request that companies delete your
              personal data under certain circumstances.
            </p>
            <p>
              <strong>Data Portability:</strong> You can obtain your data from one service and
              transfer it to another service if you wish.
            </p>
          </div>

          <h3 className="font-bold mt-4">Why GDPR Matters</h3>
          <p>
            Even if you&apos;re not in Europe, GDPR has influenced data handling practices globally.
            Many organizations have adopted GDPR-compliant approaches worldwide because it&apos;s
            more efficient than maintaining different standards for different regions.
          </p>
          <p>
            The penalties for violating GDPR are substantial - up to €20 million or 4% of global
            annual revenue, whichever is higher. These meaningful consequences have motivated
            organizations to take data protection seriously.
          </p>

          <h3 className="font-bold mt-4">GDPR in Context</h3>

          <p>
            <strong>Before GDPR:</strong>
            Companies could collect, use, and share your data with minimal disclosure. Your online
            activities could be tracked extensively, and your information might be sold to third
            parties without your knowledge.
          </p>
          <p>
            <strong>After GDPR:</strong>
            Organizations must be clear about data collection, secure your explicit consent, and
            provide mechanisms for you to control your information. You have the right to know what
            data is being collected and how it&apos;s being used.
          </p>

          <h3 className="font-bold mt-4">GDPR and Blockchain: Navigating Complexities</h3>
          <p>
            Blockchain technology and GDPR present interesting challenges to each other. Blockchains
            are designed to be permanent and unchangeable, while GDPR grants people the right to
            have their data erased. This fundamental tension creates important considerations for
            blockchain developers and users.
          </p>

          <h3 className="font-bold mt-4">The Zero-Knowledge Connection</h3>
          <p>
            Zero-knowledge proofs, the technology behind privacy-focused networks like Aztec, offer
            a promising approach for addressing some GDPR concerns in blockchain environments. By
            allowing transactions to be verified without revealing underlying data, they provide a
            technical method for preserving privacy while maintaining blockchain functionality.
          </p>

          <div className="mt-6 p-3 border border-primary/20 rounded-lg">
            <h4 className="font-semibold flex items-center">
              <ExternalLink className="w-4 h-4 mr-1" /> Resources for Further Information
            </h4>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>
                <a
                  href="https://gdpr.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Official EU GDPR Portal
                </a>
              </li>
              <li>
                <a
                  href="https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  ICO&apos;s Guide to GDPR
                </a>
              </li>
              <li>
                <a
                  href="https://gdpr.org/resources/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GDPR.org Resources
                </a>
              </li>
              <li>
                <a
                  href="https://fpf.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Future of Privacy Forum
                </a>
              </li>
              <li>
                <a
                  href="https://edpb.europa.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  European Data Protection Board
                </a>
              </li>
            </ul>
          </div>

          <p>
            While this simulated block explorer demonstrates the concept of privacy in blockchain
            networks, GDPR represents real-world regulations that govern how actual systems must
            protect individual privacy rights. The ongoing evolution of privacy laws continues to
            shape both traditional digital services and blockchain technologies.
          </p>
        </div>
      ),
    },
    constitutional: {
      title: 'Constitutional Right to Privacy',
      icon: <BookOpen className="w-5 h-5 mr-2 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="font-medium">
            Privacy rights aren&apos;t actually mentioned explicitly in the U.S. Constitution, but
            the Supreme Court has recognized that several amendments together create a
            &quot;penumbra&quot; (a fancy word for shadow or implied area) of privacy protection.
            Pretty clever way to find privacy in a 200+ year old document that never uses the word,
            right?
          </p>

          <h3 className="font-bold mt-4">Where Do Privacy Rights Come From?</h3>
          <div className="bg-primary/5 p-4 rounded-lg space-y-2">
            <p>
              <strong>The Fourth Amendment</strong> protects against &quot;unreasonable searches and
              seizures&quot; by the government. Originally intended to prevent officials from
              randomly barging into homes, it now extends to your digital information too! When
              police want to search your phone or email, they generally need a warrant first.
            </p>
            <p>
              <strong>The Fifth Amendment&apos;s</strong> protection against self-incrimination
              means you can&apos;t be forced to provide information that might get you in trouble.
              &quot;I plead the Fifth&quot; isn&apos;t just a line from crime shows—it&apos;s your
              constitutional right!
            </p>
            <p>
              <strong>The Ninth Amendment</strong> states that just because a right isn&apos;t
              specifically mentioned doesn&apos;t mean it doesn&apos;t exist. It&apos;s like the
              Constitution&apos;s way of saying &quot;this list isn&apos;t complete!&quot;
            </p>
            <p>
              <strong>The Fourteenth Amendment&apos;s</strong> guarantee of &quot;liberty&quot; has
              been interpreted to include various privacy rights, including some of the most
              personal decisions in life.
            </p>
          </div>

          <h3 className="font-bold mt-4">Key Privacy Rights Recognized by the Supreme Court</h3>
          <h4 className="font-medium mt-2">Personal Autonomy</h4>
          <p>
            The Court has recognized your right to make important personal decisions without
            government interference, including:
          </p>
          <ul className="list-disc pl-5 mt-1">
            <li>
              <strong>Contraception:</strong> In <em>Griswold v. Connecticut</em> (1965), the Court
              established that married couples have the right to use contraception.
            </li>
            <li>
              <strong>Intimate Relationships:</strong> In <em>Lawrence v. Texas</em> (2003), the
              Court struck down laws prohibiting intimate relationships between same-sex couples.
            </li>
          </ul>

          <h4 className="font-medium mt-3">Information Privacy</h4>
          <p>Your personal information gets some protection too:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>
              <strong>Medical Information:</strong> Your health data is protected by both
              constitutional principles and laws like HIPAA.
            </li>
            <li>
              <strong>Location Data:</strong> The Court ruled in <em>Carpenter v. United States</em>{' '}
              (2018) that police generally need a warrant to access your cell phone location
              history.
            </li>
          </ul>

          <h3 className="font-bold mt-4">Digital Privacy: The New Frontier</h3>
          <p>
            The Constitution was written long before computers, but courts are adapting privacy
            principles to modern technology:
          </p>
          <ul className="list-disc pl-5 mt-1">
            <li>Your emails, texts, and cloud storage may have Fourth Amendment protection.</li>
            <li>
              Government surveillance of your online activities faces constitutional limitations.
            </li>
            <li>
              Even data you share with companies may have some constitutional protection from
              government access.
            </li>
          </ul>

          <h3 className="font-bold mt-4">Limitations on Privacy Rights</h3>

          <p>
            Your privacy rights aren&apos;t absolute. The government can still intrude when it has:
          </p>

          <ul className="list-disc pl-5 mt-1">
            <li>A compelling interest (like public safety)</li>
            <li>A properly issued warrant based on probable cause</li>
            <li>Special circumstances like emergencies</li>
          </ul>

          <div className="mt-6 p-3 border border-primary/20 rounded-lg">
            <h4 className="font-semibold flex items-center">
              <ExternalLink className="w-4 h-4 mr-1" /> Want to Learn More?
            </h4>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>
                <a
                  href="https://www.eff.org/issues/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Electronic Frontier Foundation&apos;s Privacy Resources
                </a>
              </li>
              <li>
                <a
                  href="https://www.aclu.org/issues/privacy-technology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  ACLU Privacy & Technology
                </a>
              </li>
              <li>
                <a
                  href="https://constitutioncenter.org/interactive-constitution/interpretation/amendment-iv/interps/121"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  The Constitution Center&apos;s Interactive Constitution
                </a>
              </li>
              <li>
                <a
                  href="https://www.law.cornell.edu/supct/search/display.html?terms=privacy&url=/supct/search/search.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Supreme Court&apos;s Privacy Decisions
                </a>
              </li>
            </ul>
          </div>

          <h3 className="font-bold mt-4">Privacy in Everyday Life</h3>

          <p>
            Understanding your constitutional privacy rights helps you make informed decisions
            about:
          </p>

          <ul className="list-disc pl-5 mt-1">
            <li>What information to share online</li>
            <li>When to question requests for your personal data</li>
            <li>How to respond if authorities request access to your devices</li>
            <li>Which privacy settings to use on your accounts</li>
          </ul>

          <p className="mt-4 font-medium">
            Remember, while the Constitution provides a framework for privacy rights, many specific
            protections come from laws passed by Congress and state legislatures. Your awareness and
            advocacy help ensure these rights remain vibrant in our digital age.
          </p>

          <p className="mt-4 font-medium">
            Most importantly, privacy isn&apos;t just about having &quot;something to
            hide&quot;—it&apos;s about maintaining personal autonomy, dignity, and freedom in a
            world of increasing surveillance and data collection.
          </p>
        </div>
      ),
    },
    foi: {
      title: 'Freedom of Information Laws',
      icon: <FileText className="w-5 h-5 mr-2 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="font-medium">
            Freedom of information laws—known by different names around the world including FOI, RTI
            (Right to Information), or Access to Information laws—empower citizens to request and
            receive information held by government bodies. These laws serve as vital tools for
            transparency and accountability in democracies worldwide.
          </p>

          <h3 className="font-bold mt-4">Core Principles of Information Access Laws</h3>
          <div className="bg-primary/5 p-4 rounded-lg">
            <p className="mb-2">Most information access laws share these fundamental elements:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Right of Access:</strong> Anyone can request information from public
                authorities without needing to provide reasons.
              </li>
              <li>
                <strong>Broad Coverage:</strong> Laws typically apply to all branches of government
                and often to private organizations performing public functions.
              </li>
              <li>
                <strong>Limited Exemptions:</strong> While certain information can be withheld (like
                national security matters), exemptions are specific and limited.
              </li>
              <li>
                <strong>Accessibility:</strong> Procedures should be simple enough for ordinary
                citizens to navigate without special expertise.
              </li>
              <li>
                <strong>Affordability:</strong> Costs should be reasonable to ensure economic
                barriers don&apos;t prevent access.
              </li>
            </ol>
          </div>

          <h3 className="font-bold mt-4">The Typical Request Process</h3>
          <p>While specifics vary, most information access processes follow these steps:</p>
          <ol className="list-decimal pl-5 space-y-1 mt-2">
            <li>
              <strong>Submit Request:</strong> Identify the relevant public authority and file a
              written request specifying the information sought.
            </li>
            <li>
              <strong>Initial Response:</strong> Authorities must acknowledge requests and provide
              timeframes for responses (typically 20-30 days).
            </li>
            <li>
              <strong>Decision:</strong> The authority either grants access, partially withholds
              information, or denies the request, providing reasons for any denial.
            </li>
            <li>
              <strong>Appeal Process:</strong> If information is denied, requesters can appeal
              through internal reviews, independent commissioners, or courts.
            </li>
          </ol>

          <h3 className="font-bold mt-4">Common Exemptions</h3>
          <p>Most laws allow withholding information when disclosure would harm:</p>
          <ul className="list-disc pl-5 mt-2 grid grid-cols-2 gap-2">
            <li>National security or defense</li>
            <li>International relations</li>
            <li>Law enforcement investigations</li>
            <li>Personal privacy</li>
            <li>Commercial confidentiality</li>
            <li>Internal deliberative processes</li>
            <li>Legal privilege</li>
          </ul>

          <h3 className="font-bold mt-4">Best Practices for Effective Requests</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>Be specific about the information you&apos;re seeking</li>
            <li>Reference the relevant information law in your request</li>
            <li>Keep requests focused rather than overly broad</li>
            <li>Follow up if response deadlines pass</li>
            <li>Know your appeal rights if denied</li>
          </ul>

          <div className="mt-6 p-3 border border-primary/20 rounded-lg">
            <h4 className="font-semibold flex items-center">
              <ExternalLink className="w-4 h-4 mr-1" /> Learn More About Information Access
            </h4>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>
                <a
                  href="https://www.access-info.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Access Info Europe
                </a>
              </li>
              <li>
                <a
                  href="https://www.article19.org/resources/article-19-launches-global-principles-freedom-expression-privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Article 19 - Global FOI resources
                </a>
              </li>
              <li>
                <a
                  href="https://en.unesco.org/themes/access-information"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  UNESCO&apos;s Freedom of Information Portal
                </a>
              </li>
              <li>
                <a
                  href="https://www.opengovpartnership.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Open Government Partnership
                </a>
              </li>
            </ul>
          </div>

          <p className="mt-4">
            Freedom of information laws represent a fundamental shift in government accountability,
            transitioning from a &quot;need to know&quot; to a &quot;right to know&quot; paradigm.
            While implementation quality varies significantly across jurisdictions, these laws
            provide essential mechanisms for citizens to understand and participate in governance
            worldwide.
          </p>
        </div>
      ),
    },
  }

  const selectedContent = contentMap[contentType]

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className="sm:max-w-2xl max-w-[90vw] w-full">
        <DialogHeader className="border-b border-primary/20 pb-2">
          <DialogTitle className="flex items-center text-primary text-xl">
            {selectedContent.icon}
            {selectedContent.title}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 px-2 space-y-4 max-h-[70vh] overflow-y-auto text-sm md:text-base">
          {selectedContent.content}
        </div>

        <DialogFooter className="border-t border-primary/20 pt-4 mt-2">
          <Button
            onClick={onClose}
            className="w-full"
          >
            I Understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PrivacyContentModal
