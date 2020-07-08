# LevelDB Inspector

A user interface for inspecting LevelDB databases.

## Development

```bash
git clone https://github.com/uncaughtxcptn/leveldb-Inspector
cd leveldb-Inspector
npm ci

# Local development, watch for file changes and run Electron app
npm run watch
npm start

# Create release builds
npm run build
npm run dist

# Auto-publish release builds
npm run publish
```

**Project Structure**

- `src`: Source code for the Electron + VueJS app
- `build`: Output directory for compiled Electron + VueJS app
- `dist`: Output directory for packaged Electron app
- `www`: Source code for the project website, [leveldb-inspector.patootie.app](leveldb-inspector.patootie.app)

## License

MIT License
