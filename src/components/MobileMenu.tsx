import { useState } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "../utils/navigationUtils";

export function MobileMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="md:hidden bg-[#001a11]/95 backdrop-blur-md border-b border-[#00ff9d]/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
                {['About', 'Skills', 'Experience', 'Education', 'Contact'].map(
                    item => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={e => scrollToSection(e, item.toLowerCase(), isMenuOpen, setIsMenuOpen)}
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
