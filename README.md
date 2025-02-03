# Social Media Signal Maximizer

A [Chrome extension](https://chromewebstore.google.com/detail/social-media-signal-maxim/nhhbanghgdgliekippoppgnpbmamkmin) that helps you focus on meaningful content by removing distracting elements from social media platforms (YouTube, Instagram, Twitter).

## Overview

This extension helps you regain control over your social media experience by:
- Decluttering user interfaces
- Removing potentially distracting features (e.g., Shorts, Reels)
- Enhancing search functionality
- Providing customizable content filters

Currently supports:
- YouTube
- Instagram
- Twitter

## Features

### YouTube
- Enhanced search functionality
- Removal of distracting UI elements (Shorts, unnecessary icons)
- Customizable content filters
- Clean, focused viewing experience

### Instagram
- Messages-focused interface
- Reels blocking
- Streamlined navigation

### Twitter
- TweetDeck-inspired features
- Learning-oriented content prioritization
- Customizable feed settings

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Social-Media-Signal-Maximizer.git
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build
```

4. Load in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` directory

## Usage

1. Click the extension icon in Chrome's toolbar
2. Configure your preferences for each platform
3. Refresh your social media pages to see the changes

## Development

This project uses:
- Manifest V3
- JavaScript modules
- Vite for bundling

### Project Structure
```
├── dist/               # Bundled extension files
├── images/            # Extension icons
├── popup/             # Extension popup interface
├── scripts/           # Platform-specific content scripts
│   ├── youtube/      # YouTube features
│   ├── instagram/    # Instagram features
│   └── twitter/      # Twitter features
└── manifest.json      # Extension manifest
```

### Building
```bash
npm run build     # Production build
npm run dev       # Development build with watch
```

## Future Goals

### Short-term
- [ ] Settings page for UI customization
- [ ] Enhanced content filtering
- [ ] Cross-platform settings sync

### Long-term
- [ ] AI-powered clickbait detection
- [ ] Integration with LLaMa 3.1
- [ ] Pattern recognition for new platforms
- [ ] Browser extension pattern library

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Process
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with manifest V3
- Inspired by the need for focused social media experiences
- Developed as a learning project for JavaScript and web development

## Connect

- Report bugs or request features through [GitHub Issues](https://github.com/yourusername/Distraction-Blocker/issues)
- Star the repository if you find it useful!
