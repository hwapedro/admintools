import {
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,

  GETALL_ELEMENT_FAILURE,
  GETALL_ELEMENT_REQUEST,
  GETALL_LESSON_SUCCESS,
  GETALL_BADGE_SUCCESS,
  ADD_ELEMENT_REQUEST,
  
  ADD_BADGE_SUCCESS,
  ADD_LESSON_SUCCESS,
  ADD_ELEMENT_FAILURE,
  DELETE_ELEMENT_REQUEST,
 
  DELETE_BADGE_SUCCESS,
  DELETE_LESSON_SUCCESS,
  DELETE_ELEMENT_FAILURE,
  CHANGE_ELEMENT_REQUEST,
 
  CHANGE_BADGE_SUCCESS,

  CHANGE_DND
} from "../constants";


import { startLoading, stopLoading, DND } from "../utils";

const initialState = {
  token: null,
  loading: false,
  error: null,
  badges: [],
  lessons: [],
  lesson: {}
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    //LOGIN BLOCK
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

    //ADD BLOCK
    case ADD_ELEMENT_REQUEST:
      return startLoading(state, action);


    case ADD_LESSON_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        lessons: [...state.lessons, action.lessons]
      };

    case ADD_BADGE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        badges: [...state.badges, action.badges]
      };

    case ADD_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //GET COURSES BLOCK
    case GETALL_ELEMENT_REQUEST:
      return startLoading(state, action);



    case GETALL_LESSON_SUCCESS:
      return {
        ...state,
        lessons: action.lessons,
        loading: false,
        error: false
      };

    case GETALL_BADGE_SUCCESS:
      return {
        ...state,
        badges: action.badges,
        loading: false,
        error: false
      };

    case GETALL_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //DELETE COURSES BLOCK
    case DELETE_ELEMENT_REQUEST:
      return startLoading(state, action);



    case DELETE_LESSON_SUCCESS:
      return {
        ...state,
        lessons: state.lessons.filter(lesson => lesson._id !== action.index),
        loading: false,
        error: false
      };

    case DELETE_BADGE_SUCCESS:
      return {
        ...state,
        badges: state.badges.filter(badges => badges._id !== action.index),
        loading: false,
        error: false
      };

    case DELETE_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //DELETE COURSES BLOCK
    case CHANGE_ELEMENT_REQUEST:
      return startLoading(state, action);



    case CHANGE_BADGE_SUCCESS:
      return {
        ...state,
        badges: state.badges.map(badge =>
          action.badge._id === badge._id
            ? {
                _id: action.badge._id,
                title: action.badge.title,
                description: action.badge.description,
                lessonIndex: action.badge.badgeIndex
              }
            : badge
        ),
        loading: false,
        error: false
      };

 
    case CHANGE_DND:
      return DND(state, action.payload.id1, action.payload.id2)

    default:
      return {
        ...state
      };
  }
}

export default reducer;
