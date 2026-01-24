# GitHub Copilot Custom Instructions for Ramiz Loki Portfolio

## Project Overview

This is a modern, responsive portfolio website built with React, TypeScript, Vite, and TailwindCSS. The project showcases professional experience, skills, education, and contact information with a focus on clean code, comprehensive testing, and accessibility.

## Code Review Guidelines

### General Principles

1. **Minimal Changes**: Make the smallest possible changes to achieve the goal
2. **Type Safety**: Leverage TypeScript's type system fully - no `any` types unless absolutely necessary
3. **Test Coverage**: All new features must have corresponding tests
4. **Accessibility**: Ensure all UI changes maintain WCAG 2.1 AA compliance
5. **Consistency**: Follow existing patterns and conventions in the codebase

### TypeScript Standards

- Use strict TypeScript configuration
- Prefer `interface` over `type` for object shapes
- Use explicit return types for functions
- Avoid `any` - use `unknown` if type is truly unknown
- Use proper typing for React components and hooks
- Enable and follow all strict compiler options

### React Best Practices

- Use functional components with hooks (no class components)
- Follow React 18+ best practices
- Properly type component props using interfaces
- Use meaningful component and prop names
- Extract reusable logic into custom hooks
- Avoid prop drilling - consider context for deeply nested data
- Memoize expensive computations with `useMemo`
- Memoize callbacks passed to child components with `useCallback`

### Component Structure

```typescript
// Preferred component structure:
interface ComponentProps {
  // Props definition
}

export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // State and hooks
  // Event handlers
  // Effects
  // Render
};
```

### Styling Guidelines

- Use TailwindCSS utility classes for styling
- Follow mobile-first responsive design principles
- Maintain consistent spacing using Tailwind's spacing scale
- Use semantic color names from the Tailwind configuration
- Avoid inline styles unless absolutely necessary
- Keep className strings organized and readable

### Testing Requirements

- Write tests using Jest and React Testing Library
- Place tests in `src/__tests__` directory with `.test.tsx` extension
- Test component rendering, user interactions, and accessibility
- Use descriptive test names that explain what is being tested
- Mock external dependencies appropriately
- Aim for meaningful test coverage, not just high percentages
- Test edge cases and error states

### Test Structure

```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Arrange
    // Act
    // Assert
  });

  it('should handle user interaction', () => {
    // Test user interactions
  });

  it('should be accessible', () => {
    // Test accessibility
  });
});
```

### Import Organization

- Organize imports in the following order:
  1. React and React-related imports
  2. Third-party libraries
  3. Internal utilities and components
  4. Types and interfaces
  5. Styles
- Maintain alphabetical order within each group
- Add blank line after all imports (enforced by ESLint)

### Code Style

- Use ESLint and Prettier for consistent formatting
- Follow the configured ESLint rules strictly
- No unused imports or variables (enforced by `unused-imports` plugin)
- Use meaningful variable and function names
- Add comments only when necessary to explain complex logic
- Prefer self-documenting code over comments

### Performance Considerations

- Optimize bundle size - avoid unnecessary dependencies
- Use code splitting for routes if needed
- Optimize images and assets
- Avoid unnecessary re-renders
- Use proper React keys for lists
- Consider lazy loading for heavy components

### Accessibility (a11y)

- Use semantic HTML elements
- Provide proper ARIA labels and roles when needed
- Ensure proper heading hierarchy
- Maintain sufficient color contrast
- Support keyboard navigation
- Include alt text for images
- Ensure focus management for modals and dialogs

### Git and Version Control

- Write clear, concise commit messages
- Keep commits atomic and focused
- Reference issue numbers in commit messages when applicable
- Don't commit build artifacts, dependencies, or temporary files
- Use `.gitignore` to exclude generated files

### Environment and Configuration

- Use environment variables for configuration
- Follow the pattern in `.env.example`
- Never commit sensitive data or secrets
- Use `VITE_` prefix for Vite environment variables

### Build and Deployment

- Ensure builds complete without errors or warnings
- Run tests before committing changes
- Verify linting passes with `pnpm run lint`
- Test the production build with `pnpm run preview`
- Deployment targets GitHub Pages at `/ramiz-loki/` base path

### Code Review Focus Areas

When reviewing code, pay special attention to:

1. **Type Safety**: Are types properly defined and used?
2. **Test Coverage**: Are new features and changes tested?
3. **Accessibility**: Are accessibility standards maintained?
4. **Performance**: Will this change impact performance?
5. **Consistency**: Does it follow existing patterns?
6. **Security**: Are there any security vulnerabilities?
7. **Bundle Size**: Does it add unnecessary dependencies?
8. **Responsiveness**: Does it work on all screen sizes?

### Common Pitfalls to Avoid

- Don't use `any` type
- Don't skip accessibility attributes
- Don't forget to update tests when changing components
- Don't add unused dependencies
- Don't bypass ESLint rules without good reason
- Don't commit unformatted code
- Don't use inline styles when Tailwind classes work
- Don't forget error handling and edge cases

### Dependencies

- Use `pnpm` as the package manager
- Keep dependencies up to date
- Avoid adding dependencies for simple functionality
- Prefer native solutions over heavy libraries
- Check bundle size impact of new dependencies

### When Suggesting Code Changes

1. Ensure changes are minimal and focused
2. Maintain existing code style and patterns
3. Update or add tests for the changes
4. Consider backwards compatibility
5. Verify accessibility is maintained
6. Check that TypeScript types are correct
7. Ensure linting and formatting rules are followed
8. Test on multiple screen sizes if UI-related

### Resources

- React Documentation: https://react.dev
- TypeScript Documentation: https://www.typescriptlang.org
- TailwindCSS Documentation: https://tailwindcss.com
- Testing Library Documentation: https://testing-library.com
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
