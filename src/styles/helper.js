import { css } from 'styled-components'

const sizes = {
  phone: 768,
  tablet: 992,
  desktop: 1200
}

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...styles) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...styles)}
    }
  `
  return acc
}, {})