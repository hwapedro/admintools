import DuckModule from 'simple-duck'

import { DEFAULT_STATE } from './defaultState.js'

class ViewModule extends DuckModule {
  constructor(prefix, rootSelector) {
    super(prefix, rootSelector)
    this.SET_LOADING = `${prefix}SET_LOADING`
    this.SET_ERROR = `${prefix}SET_ERROR`
  }

  reduce = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case this.SET_LOADING:
        return { ...state, loading: action.payload, error: false }
      case this.SET_ERROR:
        return { ...state, loading: false, error: action.payload }
      default:
        return super.reduce(state, action)
    }
  }

  setLoading = (loading) => (dispatch) => {
    dispatch({
      type: this.SET_LOADING,
      payload: loading,
    })
  }

  isLoading = (state) => {
    return this.getRoot(state).loading
  }

  setError = (error) => (dispatch) => {
    dispatch({
      type: this.SET_ERROR,
      payload: error,
    })
  }

  isError = (state) => {
    return this.getRoot(state).error
  }
}

export default new ViewModule('/VIEW/', (state) => state.view)
