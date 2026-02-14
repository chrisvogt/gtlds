# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-02-12

### Breaking Changes
- **ESM-only:** Package now uses ES modules exclusively. CommonJS `require()` is no longer supported
- **Node.js 18+:** Minimum Node.js version increased from 6 to 18
- Must use `import` instead of `require()` to load the package

### Migration Guide
If you're upgrading from v2.x:

```js
// Before (v2.x - CommonJS)
const gtlds = require('gtlds');

// After (v3.x - ESM)
import gtlds from 'gtlds';
```

**For CommonJS projects:** Consider staying on v2.1.0 or migrate your project to ESM.

### Changed
- Updated CI workflow to target only the `main` branch
- Modernized GitHub Actions workflow with latest action versions
- Added test matrix for Node.js versions 18, 20, 22, and 24
- Integrated Codecov for test coverage reporting
- Updated all dependencies to latest versions

### Added
- Comprehensive test coverage with nyc
- Automated linting in CI pipeline

## [2.1.0] - Previous Release

### Added
- Initial implementation of gTLD list functionality
