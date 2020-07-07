import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import Select from 'react-select'

import { PageTitle, PageNavWrapperStyled } from '../../Lessons/styleLocal'

export default function PageNav({ pages, changePage, pageNumber, activeLanguage }) {
  const defaultValue = { label: pageNumber + 1, value: pageNumber }
  const pageOptions = pages.map((el, index) => ({ label: index + 1, value: index }))
  const pagesLength = pages.length - 1
  console.log(defaultValue, pageOptions)

  return (
    <>
      <PageNavWrapperStyled>
        <IconButton disabled={pageNumber === 0} aria-label="back" onClick={() => changePage(pageNumber - 1)}>
          <NavigateBeforeIcon />
        </IconButton>
        <PageTitle>{pages[pageNumber].title[activeLanguage.value]}</PageTitle>
        <IconButton disabled={pageNumber === pagesLength} aria-label="forward" onClick={() => changePage(pageNumber + 1)}>
          <NavigateNextIcon />
        </IconButton>
      </PageNavWrapperStyled>
      <Select value={defaultValue} onChange={(option) => changePage(option.value)} options={pageOptions} maxMenuHeight={100} />
    </>
  )
}

PageNav.defaultProps = {
  pages: [],
  pageNumber: 0,

  changePage() {},
}

PageNav.propTypes = {
  pages: PropTypes.array,
  lessonId: PropTypes.number,

  changePage: PropTypes.func,
}
