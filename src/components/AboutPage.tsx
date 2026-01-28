export function AboutPage() {
  return (
    <div className="static-page">
      <h2>About Us</h2>
      
      <section>
        <h3>What is UUID Generator?</h3>
        <p>
          UUID Generator is a free, open-source tool designed to help developers generate 
          Universally Unique Identifiers (UUIDs) and Globally Unique Identifiers (GUIDs) 
          quickly and securely.
        </p>
      </section>

      <section>
        <h3>Our Mission</h3>
        <p>
          We believe that developers should have access to simple, reliable tools that 
          respect their privacy. That's why we built this UUID generator to run entirely 
          in your browser - no data is ever sent to our servers.
        </p>
      </section>

      <section>
        <h3>Features</h3>
        <ul>
          <li>Support for UUID versions 1, 3, 4, 5, 7, Nil, and GUID</li>
          <li>Bulk generation (up to 100 UUIDs at once)</li>
          <li>UUID validation and analysis</li>
          <li>Format conversion tools</li>
          <li>100% client-side - your data never leaves your browser</li>
          <li>Free and open-source</li>
        </ul>
      </section>

      <section>
        <h3>Technology</h3>
        <p>
          Built with modern web technologies including React, TypeScript, and the Web Crypto API 
          to ensure secure random number generation.
        </p>
      </section>

      <section>
        <h3>Contact</h3>
        <p>
          For questions, feedback, or support, please visit{' '}
          <a href="https://wisdomslab.com" target="_blank" rel="noopener noreferrer">
            wisdomslab.com
          </a>
        </p>
      </section>
    </div>
  );
}
