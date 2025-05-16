import { Dispatch, SetStateAction } from 'react';

/**
 * Scrolls to a section on the page by updating the URL hash.
 * The actual scrolling is handled by the ScrollToSection component in App.tsx.
 * 
 * @param e - The mouse event from the click
 * @param sectionId - The ID of the section to scroll to
 * @param isMenuOpen - (Optional) Whether the mobile menu is currently open
 * @param setIsMenuOpen - (Optional) Function to set the mobile menu state
 */
export const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
    isMenuOpen?: boolean,
    setIsMenuOpen?: Dispatch<SetStateAction<boolean>>,
) => {
    e.preventDefault();

    // Close mobile menu if open
    if (isMenuOpen && setIsMenuOpen) {
        setIsMenuOpen(false);
    }

    // Update URL hash without page reload
    window.location.hash = sectionId;

    // Element scrolling is handled by the ScrollToSection component in App.tsx
};
