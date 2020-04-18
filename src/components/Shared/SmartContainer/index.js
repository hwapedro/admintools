import React from 'react'
import styled, { css } from 'styled-components'

export const SmartContainer = ({ name, ...props }) => {
  const content = Object.keys(props).map((key, index) => {
    if (key === 'description') {
      return (
        <div key={index}>
          <LabelElement>{key}</LabelElement>
          <DescriptionSpan
            dangerouslySetInnerHTML={{
              __html: props[key],
            }}
          ></DescriptionSpan>
        </div>
      )
     }

    if (key === 'title') {
      return (
        <div key={index}>
          <TitleStyled name={name} label={key}>
            {props[key]}
          </TitleStyled>
        </div>
      )
    }

    return (
      <div key={index}>
        <LabelElement name={name} label={key}>
          {key}
        </LabelElement>
        <TitleStyled>{props[key]}</TitleStyled>
      </div>
    )
  })

  return <>{content}</>
}

const LabelElement = styled.label`
  display: inline-block;
  margin-top: 0.3rem;
  margin-bottom: 0.1rem;
  font-weight: 600;
  font-size: 0.8rem;

  ${({ name, label }) => {
    switch (name) {
      case 'Course':
        if (label === 'title') {
          return css`
            content: none;
            background: #eee;
            color: white;
          `
        }
        break
      default:
        break
    }
  }}
`

const TitleStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;

  ${({ name, label }) => {
    switch (name) {
      case 'Course':
        if (label === 'title') {
          return css`
            font-weight: 600;
            font-size: 2rem;
          `
        }
        break
      case 'Lesson':
        if (label === 'title') {
          return css`
            font-weight: 600;
            font-size: 2rem;
          `
        }
        break
      default:
        break
    }
  }}
`

const DescriptionSpan = styled.div`
  display: block;
  margin: 1rem 0;
  font-size: 1rem;
`
