import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is a UUID?",
    answer: "UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information in computer systems. It's also known as GUID (Globally Unique Identifier) in Microsoft systems."
  },
  {
    question: "What's the difference between UUID versions?",
    answer: "UUID v1 uses timestamp and MAC address. UUID v3 uses MD5 hash of namespace and name. UUID v4 is randomly generated. UUID v5 uses SHA-1 hash of namespace and name. UUID v7 is time-ordered with random data (newest standard)."
  },
  {
    question: "Which UUID version should I use?",
    answer: "For most cases, use UUID v4 (random) or UUID v7 (time-ordered). UUID v4 is the most common and provides good randomness. UUID v7 is better for database indexing as it's sortable by creation time."
  },
  {
    question: "Are the generated UUIDs secure?",
    answer: "Yes! All UUIDs are generated using the browser's Crypto API (crypto.randomUUID() and crypto.getRandomValues()), which provides cryptographically secure random numbers. No data is sent to any server."
  },
  {
    question: "Is my data stored or transmitted?",
    answer: "No! All UUID generation happens entirely in your browser (client-side). Nothing is stored on our servers or transmitted over the network. Your privacy is completely protected."
  },
  {
    question: "Can I generate UUIDs offline?",
    answer: "Yes! After the initial page load, you can use this tool offline. All functionality works without an internet connection."
  },
  {
    question: "What is a Nil UUID?",
    answer: "A Nil UUID is a special UUID consisting of all zeros (00000000-0000-0000-0000-000000000000). It's used to represent a null or empty UUID value."
  },
  {
    question: "What's the difference between UUID and GUID?",
    answer: "UUID and GUID are essentially the same thing. GUID is Microsoft's term for UUID. This tool generates UUID v4 format which is compatible with both standards."
  },
  {
    question: "How do I use namespaces with UUID v3/v5?",
    answer: "UUID v3 and v5 generate deterministic UUIDs based on a namespace and a name. The same namespace + name combination always produces the same UUID. Use predefined namespaces (DNS, URL, OID, X500) or provide your own custom namespace UUID."
  },
  {
    question: "Why do I need HTTPS?",
    answer: "The browser's Crypto API (used for secure random number generation) requires a secure context (HTTPS). This ensures the randomness is cryptographically secure and prevents potential security vulnerabilities."
  }
];

export function FAQPanel() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-panel">
      <h2>Frequently Asked Questions</h2>
      
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${openIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span>{faq.question}</span>
              <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
            </button>
            
            {openIndex === index && (
              <div
                id={`faq-answer-${index}`}
                className="faq-answer"
                role="region"
              >
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
