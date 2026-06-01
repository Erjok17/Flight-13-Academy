// This tells TypeScript that .css files are valid modules
declare module '*.css' {
  const content: any;
  export default content;
}

// Also support other asset types
declare module '*.jpg';
declare module '*.png';
declare module '*.svg';