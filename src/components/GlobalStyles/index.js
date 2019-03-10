import { createGlobalStyle } from 'styled-components'
import { media } from '../../styles/helper'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Poppins');
  *, *::before,*::after {
    box-sizing: border-box;
  }
  html{
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    ${media.phone`font-size: 12px`}
    ${media.tablet`font-size: 14px`}
  }
  body{
    padding: 0;
    margin: 0;
    background-color: ${props => props.theme.authBg}
  }
`

export default GlobalStyle