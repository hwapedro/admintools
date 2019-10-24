import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


export default function EditorText({editorState,onEditorStateChange}) {
  return (
    <EditorWrapper className="editor">
    </EditorWrapper>
  );
}

EditorText.defaultProps = {
  editorState: {},
  onEditorStateChange() {}
};

EditorText.propTypes = {
  editorState: PropTypes.object,
  onEditorStateChange: PropTypes.func
};

const EditorWrapper = styled.div`
  min-height: 430px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  cursor: text;
  padding: 16px;
  border-radius: 2px;
  margin-bottom: 0.7em;
  box-shadow: inset 0px 1px 8px -3px #ababab;
  background: #fefefe;
  overflow: auto;
  height: 20rem;
`;
