export const getSelectionCoords = selectionRange => {
  const editorBounds = document
    .getElementById("editor-container")
    .getBoundingClientRect();
  const rangeBounds = selectionRange.getBoundingClientRect();
  const rangeWidth = rangeBounds.right - rangeBounds.left;
  // 107px is width of inline toolbar
  const offsetLeft =
    rangeBounds.left - editorBounds.left + rangeWidth / 2 - 107 / 2;
  // 42px is height of inline toolbar
  const offsetTop = rangeBounds.top - editorBounds.top - 42;
  return { offsetLeft, offsetTop };
};

export const getSelectionRange = () => {
  const selection = window.getSelection();
  if (selection.rangeCount === 0) return null;
  return selection.getRangeAt(0);
};

export const onChange = (editorState) => {
    if (!editorState.getSelection().isCollapsed()) {
      const selectionRange = getSelectionRange();
      if (!selectionRange) {
        return { show: false } 
      }
      const selectionCoords = getSelectionCoords(selectionRange);
      return ( //inlineToolbar
         {
          show: true,
          position: {
            top: selectionCoords.offsetTop,
            left: selectionCoords.offsetLeft
          }
        }
      )

    } else {
      return { show: false } 
    }
  }
