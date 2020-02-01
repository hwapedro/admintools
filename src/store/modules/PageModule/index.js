import DuckModule from "simple-duck";
import ViewModule from "../ViewModule";
import PageService from "../../../service/page";

const initialState = {
  pages: []
};

class PageModule extends DuckModule {
  constructor(prefix, rootSelector) {
    super(prefix, rootSelector);
    this.ADD_PAGE_SUCCESS = `${this.prefix}ADD_PAGE_SUCCESS`;
    this.DELETE_PAGE_SUCCESS = `${this.prefix}ADD_PAGE_SUCCESS`;
  }

  reduce = (state = initialState, action) => {
    switch (action.type) {
      case this.ADD_PAGE_SUCCESS:
        console.log(action.lesson.pages);
        return {
          ...state,
          pages: [...action.lesson.pages]
        };

      case this.DELETE_PAGE_SUCCESS:
        return {
          ...state,
          pages: [...action.lesson.pages]
        };

      default:
        return super.reduce(state, action);
    }
  };

  addPage = (id, text, tasks, needToComplete) => (dispatch, getState) => {
    dispatch(ViewModule.setLoading(true));
    PageService.addPage(id, text, tasks, needToComplete)
      .then(response => {
        dispatch({
          type: this.ADD_PAGE_SUCCESS,
          lesson: response.lesson
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  deletePage = id => dispatch => {
    dispatch(ViewModule.setLoading(true));

    PageService.deletePage(id)
      .then(response => {
        dispatch({
          type: this.DELETE_PAGE_SUCCESS,
          lesson: response.body.lesson
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  getPages = state => {
    console.log(this.getRoot(state), state);
    return this.getRoot(state).pages;
  };
}

export default new PageModule("/PAGE/", state => state.page);
