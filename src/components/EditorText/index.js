import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg";

export default function EditorText({editorState,onEditorStateChange}) {
  return (
    <EditorWrapper className="editor">
      <Editor
        editorState={editorState}
        wrapperClassName="myEditor-wrapper"
        editorClassName="myEditor-editor"
        onEditorStateChange={onEditorStateChange}
        placeholder="description"
      />
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
