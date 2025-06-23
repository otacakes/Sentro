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
git commit -m "feat: add modern theme system"
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

- Use functional components with hooks
- Follow the established naming conventions
- Include proper TypeScript types
- Add JSDoc comments for complex components
- Follow the modern design system
- Test weather-adaptive features
- Ensure accessibility compliance
- Optimize for mobile devices

### Design Guidelines

- Follow the established color palette
- Use consistent spacing and typography
- Ensure proper contrast ratios
- Test on multiple screen sizes
- Follow accessibility guidelines
- Use modern design patterns
- Test modern design features
- Ensure responsive design

### Testing Guidelines

- Write unit tests for all components
- Include integration tests for user flows
- Test accessibility features
- Verify cross-browser compatibility
- Test modern design features
- Ensure mobile responsiveness
- Validate performance metrics
- Check error handling

## 🚀 Quick Start for Contributors

### 1. Fork and Clone

```bash
git clone https://github.com/your-username/philippine-commuters-companion.git
cd philippine-commuters-companion
```

### 2. Install Dependencies

```bash
npm install
cd website
npm install
```

### 3. Set Up Environment

```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

### 4. Start Development

```bash
npm run dev
```

### 5. Run Tests

```bash
npm run test
npm run lint
npm run type-check
```

## 📋 Issue Templates

We provide issue templates for:

- Bug reports
- Feature requests
- Documentation improvements
- Performance issues
- Accessibility concerns

Please use the appropriate template when creating issues.

## 🤝 Code Review Process

1. **Self-Review**: Review your own code before submitting
2. **Peer Review**: At least one other contributor must review
3. **CI Checks**: All automated tests must pass
4. **Documentation**: Update docs for new features
5. **Final Approval**: Maintainer approval required

## 🎉 Recognition

Contributors are recognized through:

- GitHub contributor graph
- Release notes acknowledgments
- Contributor hall of fame
- Special thanks in documentation

---

**Thank you for helping us improve The Philippine Commuter's Companion!** 🚇🇵🇭
