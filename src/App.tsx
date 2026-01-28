import { useState, useEffect } from 'react';
import { GeneratorPanel } from './components/GeneratorPanel';
import { ValidatorAnalyzerPanel } from './components/ValidatorAnalyzerPanel';
import { ConverterPanel } from './components/ConverterPanel';
import { FAQPanel } from './components/FAQPanel';
import { AboutPage } from './components/AboutPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { DisclaimerPage } from './components/DisclaimerPage';
import './App.css';

type Tab = 'generator' | 'validator' | 'converter' | 'faq' | 'about' | 'privacy' | 'terms' | 'disclaimer';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('generator');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleFooterLinkClick = (tab: Tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 onClick={() => handleFooterLinkClick('generator')} style={{ cursor: 'pointer' }}>
          UUID / GUID Generator
        </h1>
        <button
          onClick={toggleDarkMode}
          className="theme-toggle"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <nav className="tab-navigation" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'generator'}
          aria-controls="generator-panel"
          className={`tab-button ${activeTab === 'generator' ? 'active' : ''}`}
          onClick={() => setActiveTab('generator')}
        >
          Generator
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'validator'}
          aria-controls="validator-panel"
          className={`tab-button ${activeTab === 'validator' ? 'active' : ''}`}
          onClick={() => setActiveTab('validator')}
        >
          Validator & Analyzer
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'converter'}
          aria-controls="converter-panel"
          className={`tab-button ${activeTab === 'converter' ? 'active' : ''}`}
          onClick={() => setActiveTab('converter')}
        >
          Converter
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'faq'}
          aria-controls="faq-panel"
          className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          FAQ
        </button>
      </nav>

      <main className="app-main">
        <div
          id="generator-panel"
          role="tabpanel"
          hidden={activeTab !== 'generator'}
          aria-labelledby="generator-tab"
        >
          {activeTab === 'generator' && <GeneratorPanel />}
        </div>

        <div
          id="validator-panel"
          role="tabpanel"
          hidden={activeTab !== 'validator'}
          aria-labelledby="validator-tab"
        >
          {activeTab === 'validator' && <ValidatorAnalyzerPanel />}
        </div>

        <div
          id="converter-panel"
          role="tabpanel"
          hidden={activeTab !== 'converter'}
          aria-labelledby="converter-tab"
        >
          {activeTab === 'converter' && <ConverterPanel />}
        </div>

        <div
          id="faq-panel"
          role="tabpanel"
          hidden={activeTab !== 'faq'}
          aria-labelledby="faq-tab"
        >
          {activeTab === 'faq' && <FAQPanel />}
        </div>

        <div
          id="about-panel"
          role="tabpanel"
          hidden={activeTab !== 'about'}
        >
          {activeTab === 'about' && <AboutPage />}
        </div>

        <div
          id="privacy-panel"
          role="tabpanel"
          hidden={activeTab !== 'privacy'}
        >
          {activeTab === 'privacy' && <PrivacyPage />}
        </div>

        <div
          id="terms-panel"
          role="tabpanel"
          hidden={activeTab !== 'terms'}
        >
          {activeTab === 'terms' && <TermsPage />}
        </div>

        <div
          id="disclaimer-panel"
          role="tabpanel"
          hidden={activeTab !== 'disclaimer'}
        >
          {activeTab === 'disclaimer' && <DisclaimerPage />}
        </div>
      </main>

      <footer className="app-footer">
        <p className="privacy-notice">
          🔒 All UUIDs are generated locally in your browser and are never stored or transmitted.
        </p>
        <div className="footer-links">
          <button onClick={() => handleFooterLinkClick('about')} className="footer-link">About Us</button>
          <span className="footer-separator">•</span>
          <button onClick={() => handleFooterLinkClick('privacy')} className="footer-link">Privacy Policy</button>
          <span className="footer-separator">•</span>
          <button onClick={() => handleFooterLinkClick('terms')} className="footer-link">Terms of Service</button>
          <span className="footer-separator">•</span>
          <button onClick={() => handleFooterLinkClick('disclaimer')} className="footer-link">Disclaimer</button>
        </div>
        <p className="copyright">© 2026 wisdomslab.com All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
