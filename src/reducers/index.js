import {
  ADD_COURSE_ELEMENT,
  DELETE_COURSE_ELEMENT,
  CHANGE_COURSE_ELEMENT,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE
} from "../constants";

const initialState = {
  token: null,
  loading: false,
  error: null,
  courses: []
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        loading: false,
        error: false,
      };

    case FETCH_LOGIN_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      };
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
