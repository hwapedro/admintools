import {
  ADD_COURSE_ELEMENT,
  DELETE_COURSE_ELEMENT,
  CHANGE_COURSE_ELEMENT
} from "../constants";

const initialState = {
  courses: []
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_COURSE_ELEMENT:
      return {
        ...state,
        courses: [
          ...state.courses,
          {
            title: action.title,
            description: action.description,
            id: action.id
          }
        ]
      };
    case DELETE_COURSE_ELEMENT:
      return {
        ...state,
        courses: state.courses.filter(courses => courses.id !== action.id)
      };

    case CHANGE_COURSE_ELEMENT:
      const todoId = action.id;
      const itemIndex = state.courses.findIndex(({ id }) => id === todoId);
      let changeNew = state.courses[itemIndex];
      const before = state.courses.slice(0, itemIndex);
      const after = state.courses.slice(itemIndex + 1);
      console.log(itemIndex);
      return {
        ...state,
        courses: [
          ...before,
          {
            title: action.title,
            description: action.description,
            id: action.id
          },
          ...after
        ]
      };

    default:
      return {
        ...state
      };
  }
}

export default reducer;
