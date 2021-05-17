import { createGlobalStyle } from 'styled-components';

import './tailwind.css';

const GlobalStyle = createGlobalStyle`
  :root {
    --black: #0a0a0a;
    --white: #f4f0f0;
    --primary: #fe9223;
    --red: #ed4337;
    --grey: #2a2a2a;
    --opacity-1: rgba(242, 242, 242, .4);
    --opacity-2: rgba(242, 242, 242, .7);
    --opacity-3: rgba(242, 242, 242, .04);
    --opacity-4: rgba(242, 242, 242, .1);
    --opacity-5: rgba(0, 0, 0, .7);
    --opacity-primary: rgba(254, 146, 35, .4);
    --font-sans: 'Barlow', sans-serif;
    --fz-xxs: 10px;
    --fz-xs: 12px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 52px;
    --easing: cubic-bezier(0.43, 0.13, 0.23, 0.96);
    --transition: all 0.25s cubic-bezier(0.43, 0.13, 0.23, 0.96);
  }

  html {
    box-sizing: border-box;
    width: 100%;
    scrollbar-width: none;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: var(--black);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--opacity-1);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--opacity-2);
  }

::-moz-selection {
    background: var(--primary);
    color: var(--black);
  }

  ::selection {
    background: var(--primary);
    color: var(--black);
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    color: var(--white);
    font-family: var(--font-sans);
    font-size: var(--fz-md);
    font-weight: 400;
    /* letter-spacing: 0.01071em; */
    line-height: 1.3;
    background: var(--black);
  }

  a {
    color: var(--white);
    text-decoration: none;
  }

  h1 {
    line-height: 3.4rem;
  }

  input {
    background: var(--opacity-3);
    border: 1px var(--opacity-3) solid;
    padding: 14px 12px;
    font-family: var(--font-sans);
    transition: var(--transition);
    outline: none;
    color: var(--white);
    font-size: var(--fz-md);

    &:focus {
      outline: none;
      border: 1px var(--primary) solid;
    }
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    
    &:focus {
      outline: none;
    }
  }

  .btn {
    background: var(--primary);
    cursor: pointer;
    font-weight: 600;
    color: var(--black);
    box-shadow: 0 0 4px var(--primary);
  }

  .scale-default {
    transform: scale(1.1);
  }

  .filter {
    filter: brightness(60%) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a' x='0' y='0' width='1' height='1'%3E%3CfeGaussianBlur stdDeviation='#{$radius}' result='b'/%3E%3CfeMorphology operator='dilate' radius='#{$radius}'/%3E %3CfeMerge%3E%3CfeMergeNode/%3E%3CfeMergeNode in='b'/%3E%3C/feMerge%3E%3C/filter%3E%3C/svg%3E#a");
  }

  .default-border {
    border: 1px dashed var(--opacity-1);
  }

  .barlowcondensed {
    font-family: 'Barlow Semi Condensed', sans-serif;
  }
  
  .khand {
    font-family: 'Khand', sans-serif;
  }

  .border-red {
    border: 1px red solid;
  }

  .border-orange {
    border: 1px var(--primary) solid;
    transition: var(--transition);
  }

  .blur {
    filter: brightness(50%) blur(2px);
    /* filter: brightness(60%) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a' x='0' y='0' width='1' height='1'%3E%3CfeGaussianBlur stdDeviation='#{$radius}' result='b'/%3E%3CfeMorphology operator='dilate' radius='#{$radius}'/%3E %3CfeMerge%3E%3CfeMergeNode/%3E%3CfeMergeNode in='b'/%3E%3C/feMerge%3E%3C/filter%3E%3C/svg%3E#a"); */
    /* background: var(--black); */
  }

  .absolute-horizontal-center {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
  }

  .absolute-center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
  }

  .border-primary-opacity {
    border: 1px var(--opacity-primary) solid;
  }

  .z-100 {
    z-index: 100;
  }

  .transition {
    transition: var(--transition);
  }
`;

export default GlobalStyle;