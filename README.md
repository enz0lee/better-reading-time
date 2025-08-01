# Better Reading Time

A browser extension that estimates reading time and tracks remaining reading time dynamically based on your scroll position. Built with [WXT](https://wxt.dev) and React.

## Features

- 📖 **Dynamic Reading Time Calculation**: Estimates total reading time for any webpage
- 📍 **Scroll-Based Tracking**: Tracks remaining reading time based on your current scroll position
- ⚡ **Customizable Reading Speed**: Adjust your reading speed (WPM - Words Per Minute)
- 🎯 **Floating Badge**: Optional floating badge showing remaining reading time
- 🔧 **Easy Configuration**: Simple popup interface to customize settings
- 🌐 **Cross-Browser Support**: Works on Chrome, Firefox, and Edge

## Installation

### From Source

1. Clone the repository:

   ```bash
   git clone https://github.com/enz0lee/better-reading-time.git
   cd better-reading-time
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Build the extension:

   ```bash
   yarn build
   ```

4. Load the extension in your browser:
   - **Chrome/Edge**: Go to `chrome://extensions/`, enable "Developer mode", click "Load unpacked", and select the `.output/chrome-mv3` folder
   - **Firefox**: Go to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on", and select `manifest.json` in the `.output/firefox-mv3` folder

### Development

For development with hot reload:

```bash
# Start development server
yarn dev

# Build for specific browser
yarn dev:firefox  # Firefox
yarn dev:edge     # Edge
```

## Usage

1. **Install the extension** following the installation instructions above
2. **Navigate to any webpage** with text content
3. **Click the extension icon** to open the popup
4. **Configure your settings**:
   - Set your reading speed (WPM - Words Per Minute)
   - Toggle the floating badge on/off
5. **Start reading** - the extension will automatically calculate reading time and track your progress

### Reading Speed (WPM)

The default reading speed is 200 WPM. You can adjust this based on your reading speed:

- **Slow reader**: 150-200 WPM
- **Average reader**: 200-250 WPM
- **Fast reader**: 250-300 WPM
- **Speed reader**: 300+ WPM

## Development

### Project Structure

```
better-reading-time/
├── components/          # React components
├── entrypoints/        # Extension entry points
│   ├── background.ts   # Background script
│   ├── content/        # Content script
│   └── popup/          # Extension popup
├── utils/              # Utility functions
└── public/             # Static assets
```

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn build:firefox` - Build for Firefox (Manifest V3)
- `yarn zip` - Create extension package
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier

### Technology Stack

- **[WXT](https://wxt.dev)** - Modern browser extension development framework
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **ESLint + Prettier** - Code quality

## Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [WXT](https://wxt.dev) - the modern browser extension development framework
- Inspired by the need for better reading time estimation on web articles
