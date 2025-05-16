import { scrollToSection } from '../utils/navigationUtils';

describe('navigationUtils', () => {
    describe('scrollToSection', () => {
        let preventDefaultMock: jest.Mock;
        let setIsMenuOpenMock: jest.Mock;
        let originalWindowLocation: Location;

        beforeEach(() => {
            // Mock preventDefault
            preventDefaultMock = jest.fn();

            // Mock setIsMenuOpen
            setIsMenuOpenMock = jest.fn();
            // Save original window.location and mock it
            originalWindowLocation = window.location;
            // Use Object.defineProperty to mock window.location
            Object.defineProperty(window, 'location', {
                writable: true,
                value: { ...originalWindowLocation, hash: '' }
            });
        });

        afterEach(() => {
            // Restore original window.location
            Object.defineProperty(window, 'location', {
                writable: true,
                value: originalWindowLocation
            });
        });

        test('prevents default event behavior', () => {
            // Arrange
            const mockEvent = { preventDefault: preventDefaultMock } as unknown as React.MouseEvent<HTMLAnchorElement>;

            // Act
            scrollToSection(mockEvent, 'test');

            // Assert
            expect(preventDefaultMock).toHaveBeenCalledTimes(1);
        });

        test('updates window location hash', () => {
            // Arrange
            const mockEvent = { preventDefault: preventDefaultMock } as unknown as React.MouseEvent<HTMLAnchorElement>;

            // Act
            scrollToSection(mockEvent, 'test-section');

            // Assert
            expect(window.location.hash).toBe('test-section');
        });

        test('closes mobile menu when it is open', () => {
            // Arrange
            const mockEvent = { preventDefault: preventDefaultMock } as unknown as React.MouseEvent<HTMLAnchorElement>;

            // Act
            scrollToSection(mockEvent, 'test-section', true, setIsMenuOpenMock);

            // Assert
            expect(setIsMenuOpenMock).toHaveBeenCalledTimes(1);
            expect(setIsMenuOpenMock).toHaveBeenCalledWith(false);
        });

        test('does not attempt to close mobile menu when isMenuOpen is false', () => {
            // Arrange
            const mockEvent = { preventDefault: preventDefaultMock } as unknown as React.MouseEvent<HTMLAnchorElement>;

            // Act
            scrollToSection(mockEvent, 'test-section', false, setIsMenuOpenMock);

            // Assert
            expect(setIsMenuOpenMock).not.toHaveBeenCalled();
        });

        test('does not attempt to close mobile menu when setIsMenuOpen is not provided', () => {
            // Arrange
            const mockEvent = { preventDefault: preventDefaultMock } as unknown as React.MouseEvent<HTMLAnchorElement>;

            // Act - providing isMenuOpen but not setIsMenuOpen
            scrollToSection(mockEvent, 'test-section', true);

            // Assert - function runs without error even though setIsMenuOpen is undefined
            expect(window.location.hash).toBe('test-section');
        });
    });
});
