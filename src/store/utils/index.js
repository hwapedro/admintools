export const startLoading = state => ({
    ...state,
    loading: true,
    error: null
  })
  
export const stopLoading = (state, { error }) => ({
    ...state,
    loading: false,
    error
  })