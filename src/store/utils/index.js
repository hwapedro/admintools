export const startLoading = state => ({
    ...state,
    loading: true,
    error: undefined
  })
  
export const stopLoading = (state, { error }) => ({
    ...state,
    loading: false,
    error
  })