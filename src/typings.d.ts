declare const BASE_PATH: string;

declare module '*.scss';
declare module '*.json';
declare module '*.svg' {
  const content: string;
  export default content;
}
