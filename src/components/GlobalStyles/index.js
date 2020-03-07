import { createGlobalStyle } from "styled-components";
import { media } from "../../styles/helper";

const GlobalStyle = createGlobalStyle`
  /* @font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  src: local('Poppins Regular'), local('Poppins-Regular'), url(https://fonts.gstatic.com/s/poppins/v9/pxiEyp8kv8JHgFVrJJbecmNE.woff2) format('woff2');
  unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
}

@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  src: local('Poppins Regular'), local('Poppins-Regular'), url(https://fonts.gstatic.com/s/poppins/v9/pxiEyp8kv8JHgFVrJJnecmNE.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  src: local('Poppins Regular'), local('Poppins-Regular'), url(https://fonts.gstatic.com/s/poppins/v9/pxiEyp8kv8JHgFVrJJfecg.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
} */

@font-face {
  font-family: 'FiraLight';
  font-style: normal;
  font-weight: 200;
  src: url('./fonts/fira-sans-v10-latin-300.eot'); /* IE9 Compat Modes */
  src: local('Fira Sans Light'), local('FiraSans-Light'),
       url('./fonts/fira-sans-v10-latin-300.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./fonts/fira-sans-v10-latin-300.woff2') format('woff2'), /* Super Modern Browsers */
       url('./fonts/fira-sans-v10-latin-300.woff') format('woff'), /* Modern Browsers */
       url('./fonts/fira-sans-v10-latin-300.ttf') format('truetype'), /* Safari, Android, iOS */
       url('./fonts/fira-sans-v10-latin-300.svg#FiraSans') format('svg'); /* Legacy iOS */
}

@font-face {
  font-family: 'FiraLight';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Fira Sans Light'), local('FiraSans-Light'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKreSxf6TF0.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}

  *, *::before,*::after {
    box-sizing: border-box;
  }
  html{
    font-size: 16px;
    /* font-family: 'Poppins', sans-serif;*/
    font-family: 'Fira Sans', sans-serif;
    font-weight: 300;
    ${media.phone`font-size: 12px`}
    ${media.tablet`font-size: 14px`}
  }
  body{
    padding: 0;
    margin: 0;
    background-color: ${props => props.theme.authBg}
  }
`;

export default GlobalStyle;
