import { useState } from "react";

export function MobileMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Handle clicking on navigation links
    const scrollToSection = (
        e: React.MouseEvent<HTMLAnchorElement>,
        sectionId: string,
    ) => {
        e.preventDefault();

        // Close mobile menu if open
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }

        // Update URL hash without page reload
        window.location.hash = sectionId;

        // Element scrolling is handled by the ScrollToSection component in App.tsx
    };

    return (
        <div className="md:hidden bg-[#001a11]/95 backdrop-blur-md border-b border-[#00ff9d]/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
                {['About', 'Skills', 'Experience', 'Education', 'Contact'].map(
                    item => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={e => scrollToSection(e, item.toLowerCase())}
                            className={`block px-3 py-2 hover:bg-[#00ff9d]/5 rounded-lg transition-all duration-300 ${location.hash === `#${item.toLowerCase()}`
                                    ? 'text-[#00ff9d]'
                                    : 'text-gray-300 hover:text-[#00ff9d]'
                                }`}
                        >
                            {item}
                        </a>
                    ),
                )}
            </div>
        </div>
    );
}
