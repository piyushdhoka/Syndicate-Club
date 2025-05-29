declare module 'tailwindcss' {
  export interface Config {
    darkMode?: string | string[];
    content?: string[];
    theme?: {
      extend?: {
        colors?: Record<string, any>;
        borderRadius?: Record<string, any>;
        keyframes?: Record<string, any>;
        animation?: Record<string, any>;
      };
    };
    plugins?: any[];
  }
} 