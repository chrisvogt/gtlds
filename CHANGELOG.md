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
- Modernized sync script to use ESM and top-level await

### Added
- **New `isGtld()` function** - Check if a TLD exists in the ICANN registry (case-insensitive, supports leading dot, includes terminated)
- **New `isActiveGtld()` function** - Check if a TLD is currently active (excludes terminated contracts) - **recommended for production**
- **New `getInfo()` function** - Get detailed gTLD information including registry operator and contract status
- **New `.active` export** - Array of active gTLDs only (1,120 items)
- **New `.activeNames` export** - Array of active gTLD names only (1,120 items)
- Updated `.random()` to only return active gTLDs (excludes terminated contracts)
- Comprehensive test coverage with nyc (21 tests)
- Automated linting in CI pipeline

### Data Updates
- Synced gTLD list with ICANN registry (February 12, 2026)
- Added 4 new gTLDs: `.hotel`, `.kids`, `.merck`, `.music`
- Total gTLDs: 1,275 (increased from 1,271)
  - Active: 1,120 (operational with valid contracts)
  - Terminated: 155 (contracts ended, no longer operational)

## [2.1.0] - Previous Release

### Added
- Initial implementation of gTLD list functionality
