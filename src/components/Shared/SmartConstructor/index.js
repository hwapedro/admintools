import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

import CustomInput from '../../Shared/Input'
import Button from '../../Shared/Button'
import Editor from '../../Shared/Editor'
import { i18nSelector, lessonDifficulties } from '../../../store/utils'

const ExamSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    marginLeft: '20px'
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export const SmartConstructor = ({ modal, showConstructor, onChange, onSubmit, activeLanguage, difficulty, courseIndex, allCourseIndex, changeExamProp, ...props }) => {
  const content = Object.keys(props).map((key, index) => {
    if (key === 'select') {
      return (
        <div key={index}>
          <LabelElement>choose language</LabelElement>
          <Select value={activeLanguage} onChange={props[key].handleLangChange} options={i18nSelector} maxMenuHeight={200} />
        </div>
      )
    }
    if (key === 'difficulties') {
      return (
        <div key={index}>
          <LabelElement>choose difficulties</LabelElement>
          <Select value={difficulty} onChange={props[key].handleDifficultiesChange} options={lessonDifficulties} maxMenuHeight={200} />
        </div>
      )
    }
    if (key === 'courseindex') {
      return (
        <div key={index}>
          <LabelElement>choose course index</LabelElement>
          <Select value={courseIndex} onChange={props[key].handleChange} options={allCourseIndex} maxMenuHeight={100} />
        </div>
      )
    }
    if (key === 'description') {
      return (
        <div key={index}>
          <LabelElement>{key}</LabelElement>
          <Editor onChange={onChange} name={key} value={props[key]} language={activeLanguage.value} />
        </div>
      )
    }
    if (key === 'exam') {
      return (
        <div key={index}>
          <LabelElement>exam </LabelElement>
          <FormControlLabel control={<ExamSwitch checked={props[key]} onChange={() => changeExamProp(!props[key])}/>} />
        </div>
      )
    }

    return (
      <div key={index}>
        <CustomInput
          label={key}
          placeholder={`${key}`}
          name={key}
          type={props[key].type ? props[key].type : 'text'}
          value={props[key].value ? props[key].value : props[key]}
          onChange={onChange}
          required={true}
          maxLenght="100"
        />
      </div>
    )
  })

  return (
    <>
      {modal ? (
        <>
          <DarkGround onClick={showConstructor} />
          <ConsturctorWrapper>
            <ConsturctorForm onSubmit={onSubmit}>
              <ButtonWrapper>
                <Button buttonStyle={'outlined'} type="submit">
                  CONFIRM
                </Button>
              </ButtonWrapper>
              {content}
            </ConsturctorForm>
          </ConsturctorWrapper>
        </>
      ) : (
        <ConsturctorForm onSubmit={onSubmit}>
          {content}
          <ButtonWrapper>
            <Button buttonStyle={'outlined'} type="submit">
              CONFIRM
            </Button>
          </ButtonWrapper>
        </ConsturctorForm>
      )}
    </>
  )
}

export const Wrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ConsturctorWrapper = styled.div`
  background: ${(props) => props.theme.courses};
  overflow-y: scroll;
  width: 30%;
  right: 0;
  top: 0;
  height: 100%;
  background-color: #fff;
  z-index: 101;
  position: fixed;
  padding: 1.5rem;
  box-shadow: 0px 2px 4px rgb(0, 0, 0, 0.3);
`

export const ConsturctorForm = styled.form``

export const DarkGround = styled.div`
  background: #000;
  height: 100%;
  opacity: 0.5;
  position: fixed;
  width: 100%;
  z-index: 100;
  top: 0;
  left: 0;
`

export const TitleSpan = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
`

export const LabelElement = styled.label`
  display: inline-block;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 1.8rem;
`

export const ElementWrapper = styled.li`
  background-color: ${(props) => props.theme.courses};
  margin-top: 2rem;
  padding: 1rem;
  box-shadow: 0px 2px 4px rgb(0, 0, 0, 0.3);
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 0.5rem;
`

export const EmptyMessage = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 2.5rem;
  top: 50%;
  margin-top: 5rem;
`

export const SelectWrapper = styled.div`
  width: 10rem;
`
export const ImgMark = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 1rem;
  margin-bottom: -0.4rem;
`

export const ImgCross = styled.img`
  width: 2rem;
  height: 2rem;
  margin-left: 1rem;
  margin-bottom: -0.4rem;
`
