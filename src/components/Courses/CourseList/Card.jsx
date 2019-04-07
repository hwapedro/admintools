import React, { useImperativeHandle, useRef } from "react";
import { DragSource, DropTarget } from "react-dnd";

import {
  ElementWrapper,
 
} from "../style.js";

const ItemTypes = {
  CARD: "card"
};

const style = {};
const Card = React.forwardRef(
  (
    { key, text, id, isDragging, connectDragSource, connectDropTarget, Wrap },
    ref
  ) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    const opacity = isDragging ? 0 : 1;
    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current
    }));
    const Wrapper = props => Wrap;
    return (
      <ElementWrapper
        key={key}
        ref={elementRef}
        style={Object.assign({}, style, { opacity })}
      >
        <Wrapper />
      </ElementWrapper>
    );
  }
);
export default DropTarget(
  ItemTypes.CARD,
  {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }
      
      const node = component.getNode();
      if (!node) {
        return null;
      }
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;
      
      if (dragIndex === hoverIndex) {
        return;
      }
    
      const hoverBoundingRect = node.getBoundingClientRect();
 
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      const clientOffset = monitor.getClientOffset();
      
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
     
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
     
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex);
    
      monitor.getItem().index = hoverIndex;
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    ItemTypes.CARD,
    {
      beginDrag: props => ({
        id: props.id,
        index: props.index
      })
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(Card)
);
