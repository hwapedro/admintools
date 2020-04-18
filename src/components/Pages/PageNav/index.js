import React from 'react'
import PropTypes from 'prop-types'

import { MenuItemStyled, CurrentMenuButton, PageNavWrapperStyled } from '../../Lessons/styleLocal'

export default function PageNav({ pages, changePage, pageNumber, activeLanguage }) {
  const list = pages.map((page, index) =>
    pageNumber === index ? (
      <CurrentMenuButton key={page._id} onClick={() => changePage(index)}>
        {page.title[activeLanguage.value]}
      </CurrentMenuButton>
    ) : (
      <MenuItemStyled key={page._id} onClick={() => changePage(index)}>
        {page.title[activeLanguage.value]}
      </MenuItemStyled>
    )
  )
  return <PageNavWrapperStyled>{list}</PageNavWrapperStyled>
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
