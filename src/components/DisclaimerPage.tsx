export function DisclaimerPage() {
  return (
    <div className="static-page">
      <h2>Disclaimer</h2>
      <p className="last-updated">Last updated: January 28, 2026</p>

      <section>
        <h3>General Information</h3>
        <p>
          The information provided by UUID Generator ("we," "us," or "our") is for general 
          informational purposes only. All information on the service is provided in good faith, 
          however we make no representation or warranty of any kind, express or implied, regarding 
          the accuracy, adequacy, validity, reliability, availability, or completeness of any 
          information on the service.
        </p>
      </section>

      <section>
        <h3>No Professional Advice</h3>
        <p>
          The service cannot and does not contain professional advice. The UUID generation 
          information is provided for general informational and educational purposes only and 
          is not a substitute for professional advice.
        </p>
      </section>

      <section>
        <h3>UUID Uniqueness</h3>
        <p>
          While UUIDs are designed to be unique, we cannot guarantee absolute uniqueness in all 
          cases. The probability of collision depends on the UUID version used and the number of 
          UUIDs generated. Users should understand the characteristics of each UUID version before 
          use in production systems.
        </p>
      </section>

      <section>
        <h3>Security Considerations</h3>
        <p>
          This service uses the Web Crypto API for secure random number generation. However, 
          the security of generated UUIDs depends on your browser's implementation and your 
          system's security. We recommend using HTTPS and keeping your browser up to date.
        </p>
      </section>

      <section>
        <h3>No Liability</h3>
        <p>
          Under no circumstance shall we have any liability to you for any loss or damage of 
          any kind incurred as a result of the use of the service or reliance on any information 
          provided on the service. Your use of the service and your reliance on any information 
          on the service is solely at your own risk.
        </p>
      </section>

      <section>
        <h3>Standards Compliance</h3>
        <p>
          This service implements UUID generation according to RFC 4122 and RFC 9562 standards. 
          However, we do not guarantee perfect compliance in all edge cases. Users should verify 
          generated UUIDs meet their specific requirements.
        </p>
        <p>
          References:
        </p>
        <ul>
          <li>
            <a href="https://www.rfc-editor.org/rfc/rfc4122" target="_blank" rel="noopener noreferrer">
              RFC 4122 - A Universally Unique IDentifier (UUID) URN Namespace
            </a>
          </li>
          <li>
            <a href="https://www.rfc-editor.org/rfc/rfc9562" target="_blank" rel="noopener noreferrer">
              RFC 9562 - Universally Unique IDentifiers (UUIDs)
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h3>External Links</h3>
        <p>
          The service may contain links to external websites that are not provided or maintained 
          by or in any way affiliated with us. We do not guarantee the accuracy, relevance, 
          timeliness, or completeness of any information on these external websites.
        </p>
      </section>

      <section>
        <h3>Changes</h3>
        <p>
          We reserve the right to modify this disclaimer at any time. Changes will be effective 
          immediately upon posting to the service.
        </p>
      </section>
    </div>
  );
}
