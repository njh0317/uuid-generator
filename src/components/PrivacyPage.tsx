export function PrivacyPage() {
  return (
    <div className="static-page">
      <h2>Privacy Policy</h2>
      <p className="last-updated">Last updated: January 28, 2026</p>

      <section>
        <h3>Overview</h3>
        <p>
          Your privacy is important to us. This Privacy Policy explains how we handle your 
          information when you use our UUID Generator service.
        </p>
      </section>

      <section>
        <h3>Data Collection</h3>
        <p>
          <strong>We do not collect, store, or transmit any personal data.</strong> All UUID 
          generation, validation, and conversion operations happen entirely in your web browser 
          using client-side JavaScript.
        </p>
      </section>

      <section>
        <h3>Local Processing</h3>
        <p>
          All UUIDs are generated locally in your browser using the Web Crypto API. No UUIDs, 
          settings, or any other data are sent to our servers or any third-party services.
        </p>
      </section>

      <section>
        <h3>Cookies and Local Storage</h3>
        <p>
          We use browser local storage only to save your theme preference (light/dark mode). 
          This data never leaves your device and can be cleared at any time through your 
          browser settings.
        </p>
      </section>

      <section>
        <h3>Third-Party Services</h3>
        <p>
          We do not use any third-party analytics, tracking, or advertising services. Your 
          usage of this tool is completely private.
        </p>
      </section>

      <section>
        <h3>Security</h3>
        <p>
          We use HTTPS to ensure secure communication between your browser and our servers. 
          The Web Crypto API provides cryptographically secure random number generation for 
          UUID creation.
        </p>
      </section>

      <section>
        <h3>Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on 
          this page with an updated revision date.
        </p>
      </section>

      <section>
        <h3>Contact</h3>
        <p>
          If you have questions about this Privacy Policy, please contact us at{' '}
          <a href="https://wisdomslab.com" target="_blank" rel="noopener noreferrer">
            wisdomslab.com
          </a>
        </p>
      </section>
    </div>
  );
}
