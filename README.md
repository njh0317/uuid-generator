# UUID / GUID Generator

A free, secure, and feature-rich UUID/GUID generator web application.

## Features

- ✅ **Multiple UUID Versions**: Support for UUID v1, v3, v4, v5, v7, Nil, and GUID
- ✅ **Bulk Generation**: Generate up to 100 UUIDs at once
- ✅ **Namespace Support**: UUID v3/v5 with predefined and custom namespaces
- ✅ **Format Options**: Customize output with hyphens, case, and line breaks
- ✅ **Clipboard Integration**: Copy individual or all UUIDs with SVG icons
- ✅ **File Export**: Download as TXT or JSON
- ✅ **Validator & Analyzer**: Validate and analyze UUID details
- ✅ **Converter**: Transform UUIDs between formats
- ✅ **FAQ**: Comprehensive frequently asked questions
- ✅ **Privacy First**: 100% client-side, no data transmission
- ✅ **Dark Mode**: Toggle between light and dark themes
- ✅ **Responsive Design**: Works on mobile and desktop
- ✅ **Accessibility**: Full keyboard navigation and ARIA labels

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: CSS Modules
- **Crypto**: Web Crypto API
- **Hash**: crypto-js (MD5/SHA-1)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This project is configured for Cloudflare Pages deployment:

- Build command: `npm run build`
- Build output: `dist`
- Framework: Vite (auto-detected)

## Security

- All UUID generation uses the Web Crypto API for cryptographically secure randomness
- No data is stored or transmitted to any server
- HTTPS required for secure operation
- Client-side only processing

## License

© 2026 wisdomslab.com All rights reserved.

## Links

- [About](https://uuid-generator.pages.dev)
- [Privacy Policy](https://uuid-generator.pages.dev)
- [Terms of Service](https://uuid-generator.pages.dev)
- [Disclaimer](https://uuid-generator.pages.dev)
