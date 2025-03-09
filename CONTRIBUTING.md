# Contributing to GR33D

## How to Contribute

We love your input! We want to make contributing to GR33D as easy and transparent as possible, whether it's:
- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process
We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests, especially for V2 features like:
   - Position-based staking system
   - Anti-flash loan protection
   - Blacklist functionality
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request

## V2 Considerations
When contributing to the V2 implementation, please consider:
- Backward compatibility with existing staking positions
- Gas optimization through struct packing
- Adherence to security best practices, especially with anti-flash loan protections
- Proper event emissions for all state changes

## Any contributions you make will be under the MIT Software License
When you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project.

## Report bugs using GitHub's [issue tracker](https://github.com/Foxocelot45/GR33D-TOKEN/issues)
We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/Foxocelot45/GR33D-TOKEN/issues/new/choose).

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:
- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening)

## Testing Guidelines
- Test all code with automated tests
- For V2 features, include specific tests for:
  - Creating and managing multiple staking positions
  - Verifying lock period enforcement
  - Testing anti-flash loan protection
  - Validating blacklist functionality
  - Checking reward calculations accuracy

## Documentation Requirements
All new features or changes should be documented with:
- Clear explanation of functionality
- Example usage
- Security considerations
- Gas usage considerations
- Event emissions

## License
By contributing, you agree that your contributions will be licensed under the project's MIT License.

## Questions?
Feel free to contact the core team at thegr33dysclub@gmail.com if you have any questions about contributing.

## References
This document was adapted from the open-source contribution guidelines for [Facebook's Draft](https://github.com/facebook/draft-js/blob/main/CONTRIBUTING.md) and updated to reflect GR33D V2 specifics.
