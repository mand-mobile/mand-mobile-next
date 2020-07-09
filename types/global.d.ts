declare module 'mand-mobile/_util' {
  const content: any;
  export default content;
  export const isAndroid: boolean;
  export const isPlainObject: (v: any) => boolean;
  export const debounce: (...v: any) => any;
  export const warn: Function;
}

