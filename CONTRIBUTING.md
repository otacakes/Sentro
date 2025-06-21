# Contributing to The Philippine Commuter's Companion

Thank you for your interest in contributing to The Philippine Commuter's Companion! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Types of Contributions

We welcome various types of contributions:

1. **🐛 Bug Reports**: Help us identify and fix issues
2. **✨ Feature Requests**: Suggest new features or improvements
3. **💻 Code Contributions**: Submit pull requests with code changes
4. **📚 Documentation**: Improve docs, add examples, or fix typos
5. **🧪 Testing**: Help test features and report issues
6. **🎨 Design**: Contribute UI/UX improvements
7. **🌐 Localization**: Help translate the app to Filipino dialects
8. **📊 Data**: Contribute transport route data or news sources

### Before You Start

1. **Read the README**: Familiarize yourself with the project
2. **Check Issues**: Look for existing issues or discussions
3. **Join Discussions**: Participate in GitHub Discussions
4. **Follow Code of Conduct**: Be respectful and inclusive

## 🚀 Development Setup

### Prerequisites

- Node.js 18+
- npm 9+
- Git
- Code editor (VS Code recommended)

### Local Development

1. **Fork the repository**
   ```bash
   # Fork on GitHub first, then:
   git clone https://github.com/YOUR_USERNAME/philippine-commuters-companion.git
   cd philippine-commuters-companion
   ```

2. **Set up the development environment**
   ```bash
   npm install
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   npm run test
   npm run type-check
   npm run lint
   ```

## 📝 Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
# or
git checkout -b docs/your-documentation-update
```

### 2. Make Your Changes

- Write clean, readable code
- Follow TypeScript best practices
- Add tests for new features
- Update documentation as needed
- Use conventional commit messages

### 3. Test Your Changes

```bash
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run type-check    # Check TypeScript types
npm run lint          # Check code style
npm run build         # Ensure build works
```

### 4. Commit Your Changes

Use conventional commit messages:

```bash
git commit -m "feat: add weather-adaptive theme system"
git commit -m "fix: resolve map loading issue on slow connections"
git commit -m "docs: update installation instructions"
git commit -m "test: add unit tests for route planning"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Reference to related issues
- Screenshots for UI changes
- Test results

## 🎯 Contribution Guidelines

### Code Standards

- **TypeScript**: Use strict mode, proper types
- **React**: Follow functional component patterns
- **Styling**: Use Tailwind CSS classes
- **Testing**: Aim for 80%+ test coverage
- **Performance**: Optimize for low-end devices

### File Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Next.js pages
├── styles/        # Global styles
├── types/         # TypeScript type definitions
└── utils/         # Helper functions
```

### Component Guidelines

- Use Shadcn UI components when possible
- Create custom components for unique features
- Follow the weather-adaptive design system
- Ensure accessibility (ARIA labels, keyboard navigation)
- Add Storybook stories for complex components

### Testing Guidelines

- Write unit tests for utility functions
- Write integration tests for components
- Test weather-adaptive features
- Test offline functionality
- Test on different screen sizes

## 🎨 Design Contributions

### Weather-Adaptive Design System

When contributing to the UI:

1. **Follow Color Palettes**:
   - Malamig na Umaga (Cloudy): Cool grays and blues
   - Ambon (Rainy): Deep blues and soothing tones
   - Araw ng Tanghali (Sunny): Warm oranges and yellows

2. **Accessibility**:
   - Ensure sufficient color contrast
   - Support keyboard navigation
   - Provide alternative text for images
   - Test with screen readers

3. **Mobile-First**:
   - Design for thumb navigation
   - Consider one-handed usage
   - Optimize for small screens

### UI Components

- Use the existing component library
- Create new components following the design system
- Add Storybook documentation
- Include accessibility features

## 📊 Data Contributions

### Transport Data

We welcome contributions of:

- **Route Information**: Bus routes, train lines, jeepney routes
- **Station Data**: Locations, facilities, accessibility
- **Schedule Information**: Operating hours, frequency
- **Fare Information**: Current fares, discounts

### News and Alerts

- **Transport News**: Updates from DOTr, LTFRB, etc.
- **Service Alerts**: Disruptions, maintenance, changes
- **Government Programs**: Libreng Sakay, fare subsidies

## 🌐 Localization

### Filipino Language Support

Help translate the app to:

- **Tagalog**: Standard Filipino
- **Regional Dialects**: Cebuano, Ilocano, etc.
- **English**: For international users

### Translation Guidelines

- Use natural, conversational language
- Consider cultural context
- Maintain consistency in terminology
- Test with native speakers

## 🐛 Bug Reports

### Before Reporting

1. Check existing issues
2. Try to reproduce the bug
3. Test on different devices/browsers
4. Check the console for errors

### Bug Report Template

```markdown
**Bug Description**
Brief description of the issue

**Steps to Reproduce**
1. Go to...
2. Click on...
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- Device: [e.g., iPhone 12, Samsung Galaxy]
- OS: [e.g., iOS 15, Android 12]
- Browser: [e.g., Chrome 96, Safari 15]
- App Version: [e.g., 1.0.0]

**Screenshots**
Add screenshots if applicable

**Additional Context**
Any other relevant information
```

## 💡 Feature Requests

### Before Requesting

1. Check existing feature requests
2. Consider the project's scope
3. Think about implementation complexity
4. Consider privacy implications

### Feature Request Template

```markdown
**Feature Description**
Brief description of the feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this work?

**Alternative Solutions**
Other ways to solve this problem

**Additional Context**
Screenshots, mockups, examples
```

## 📋 Pull Request Process

### Before Submitting

1. **Self-Review**: Check your own code
2. **Tests**: Ensure all tests pass
3. **Documentation**: Update relevant docs
4. **Screenshots**: Add screenshots for UI changes

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing

## Screenshots
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🏆 Recognition

Contributors will be recognized in:

- **README.md**: Contributors section
- **Release Notes**: For significant contributions
- **GitHub Profile**: Through contribution graph
- **Community**: In discussions and announcements

## 📞 Getting Help

### Questions and Support

- **GitHub Discussions**: For general questions
- **GitHub Issues**: For bugs and feature requests
- **Discord/Slack**: Community chat (if available)
- **Email**: For private matters

### Mentorship

New contributors can:

- Ask for help in discussions
- Request code reviews
- Join pair programming sessions
- Get guidance on complex features

## 🎉 Thank You!

Thank you for contributing to The Philippine Commuter's Companion! Your contributions help make commuting better for millions of Filipinos.

---

*Together, we're building a better future for Philippine commuters.* 🚇🇵🇭 