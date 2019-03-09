import {
  ADD_COURSE_ELEMENT,
  DELETE_COURSE_ELEMENT,
  CHANGE_COURSE_ELEMENT,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_REQUEST,
  FETCH_COURSE_SUCCESS,
  FETCH_COURSE_FAILURE,
  FETCH_COURSE_REQUEST,
  ADD_COURSE_SUCCESS
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
        error: false
      };

    case FETCH_LOGIN_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      };

      case ADD_COURSE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false
      };

    case FETCH_COURSE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_COURSE_SUCCESS:
      return {
        ...state,
        courses: action.courses,
        loading: false,
        error: false
      };

    case FETCH_COURSE_FAILURE:
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
        courses: state.courses.filter(courses => courses.courseIndex !== action.courseIndex)
      };

    case CHANGE_COURSE_ELEMENT:
      const todoId = action.courseIndex;
      const itemIndex = state.courses.findIndex(({ courseIndex }) => courseIndex === todoId);
      const before = state.courses.slice(0, itemIndex);
      const after = state.courses.slice(itemIndex + 1);
      console.log(itemIndex);
      return {
        ...state,
        courses: [
          ...before,
          {
            _id: state.courses[itemIndex]._id,
            title: action.title,
            description: action.description,
            courseIndex: action.courseIndex
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
