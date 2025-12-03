declare namespace React {
  type FC<P = any> = (props: P) => any;
  type CSSProperties = any;
  type MouseEvent = any;
  type TouchEvent = any;
}

declare module 'react' {
  export const useState: <T = any>(initial?: any) => [T, (v: any) => void];
  export const useEffect: any;
  export const useCallback: any;
  export const useMemo: any;
  export const useRef: <T = any>(initial?: any) => { current: T };
  export const Fragment: any;
  export type FC<P = any> = React.FC<P>;
  export type CSSProperties = React.CSSProperties;
  export type MouseEvent = React.MouseEvent;
  export type TouchEvent = React.TouchEvent;
  const React: any;
  export default React;
}

declare module 'react-dom/client' {
  export function createRoot(container: any): any;
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
