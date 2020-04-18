import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { ElementWrapper } from "../../../../GlobalStyles/styleGlobal";

export default function LessonContainer({ lesson, index, children }) {
  return (
    <Draggable
      key={lesson._id}
      draggableId={`draggableId-lesson-${lesson._id}`}
      index={index}
    >
      {provided => (
        <ElementWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          key={lesson._id}
        >
          {children}
        </ElementWrapper>
      )}
    </Draggable>
  );
}
