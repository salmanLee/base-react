/* eslint-disable @typescript-eslint/naming-convention */
declare module '*.png';
declare module '*.svg';

declare module '*.css' {
  const content: { [key: string]: any };
  export = content;
}