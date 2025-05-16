export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 3s cubic-bezier(0.4, 0.6, 1) infinite',
        'zoom-breathe': 'cinematicJourney 40s ease-in-out infinite alternate',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        cinematicJourney: {
          '0%': {
            transform: 'scale(1.1) translate(0%, 0%) rotate(0deg)',
            filter: 'brightness(1.05) saturate(1.1)',
          },
          '10%': {
            transform: 'scale(1.15) translate(-2%, -1%) rotate(-0.3deg)',
            filter: 'brightness(1) saturate(1.05)',
          },
          '25%': {
            transform: 'scale(1.2) translate(-4%, -2%) rotate(-0.5deg)',
            filter: 'brightness(1.02) saturate(1.1)',
          },
          '40%': {
            transform: 'scale(1.25) translate(-2%, -3%) rotate(-0.2deg)',
            filter: 'brightness(1.03) saturate(1.15)',
          },
          '55%': {
            transform: 'scale(1.2) translate(0%, -3.5%) rotate(0deg)',
            filter: 'brightness(1.05) saturate(1.2)',
          },
          '70%': {
            transform: 'scale(1.15) translate(2%, -2%) rotate(0.3deg)',
            filter: 'brightness(1.04) saturate(1.15)',
          },
          '85%': {
            transform: 'scale(1.1) translate(4%, -1%) rotate(0.5deg)',
            filter: 'brightness(1.03) saturate(1.1)',
          },
          '100%': {
            transform: 'scale(1.05) translate(3%, 0%) rotate(0.3deg)',
            filter: 'brightness(1.02) saturate(1.05)',
          },
        },
      },
      transitionDuration: {
        2000: '2000ms',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      perspective: {
        1000: '1000px',
      },
    },
  },
  plugins: [
    function ({ addUtilities, _theme, _e }) {
      const newUtilities = {
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.transform-gpu': {
          transform: 'translateZ(0)',
        },
        '.transform-style-preserve-3d': {
          transformStyle: 'preserve-3d',
        },
      };

      // Add animation delay utilities
      const animationDelayUtilities = {};

      for (let i = 1; i <= 10; i++) {
        animationDelayUtilities[`.animation-delay-${i * 100}`] = {
          animationDelay: `${i * 0.1}s`,
        };
      }

      addUtilities(newUtilities);
      addUtilities(animationDelayUtilities);
    },
  ],
};
