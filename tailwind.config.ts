import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			// Base colors
  			background: {
  				DEFAULT: 'hsl(var(--background))',
  				light: '#ffffff',
  				dark: 'hsl(222.86deg 84% 4.9%)' // Updated dark background
  			},
  			foreground: {
  				DEFAULT: 'hsl(var(--foreground))',
  				light: '#1e293b', // slate-800
  				dark: '#ffffff' // Pure white for better readability
  			},
  			// Primary colors
  			primary: {
  				DEFAULT: '#3b82f6', // blue-500
  				light: '#60a5fa', // blue-400
  				dark: '#2563eb', // blue-600
  				foreground: '#ffffff'
  			},
  			// Secondary colors
  			secondary: {
  				DEFAULT: '#64748b', // slate-500
  				light: '#94a3b8', // slate-400
  				dark: '#475569', // slate-600
  				foreground: '#ffffff'
  			},
  			// Accent colors
  			accent: {
  				DEFAULT: '#0ea5e9', // sky-500
  				light: '#38bdf8', // sky-400
  				dark: '#0284c7', // sky-600
  				foreground: '#ffffff'
  			},
  			// Card colors
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				light: '#ffffff',
  				dark: 'hsl(222.86deg 84% 6.9%)', // Slightly lighter than background
  				foreground: {
  					light: '#1e293b', // slate-800
  					dark: '#ffffff' // Pure white
  				}
  			},
  			// Border colors
  			border: {
  				DEFAULT: 'hsl(var(--border))',
  				light: '#e2e8f0', // slate-200
  				dark: 'hsl(222.86deg 84% 8.9%)' // Dark border for subtle separation
  			},
  			// Muted colors
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				light: '#94a3b8', // slate-400
  				dark: 'hsl(222.86deg 84% 8.9%)', // Dark muted for subtle elements
  				foreground: {
  					light: '#64748b', // slate-500
  					dark: '#ffffff' // Pure white
  				}
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			// Gradient colors for cards
  			gradient: {
  				from: 'rgba(255, 255, 255, 0.1)',
  				via: 'rgba(255, 255, 255, 0.05)',
  				to: 'rgba(255, 255, 255, 0.1)'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
