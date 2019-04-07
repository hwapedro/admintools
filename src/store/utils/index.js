import update from "immutability-helper";

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

export const changeDnD = (state, id1, id2) => ({
  ...state,
  courses:
  update(state.courses, {
    $splice: [
      [id1, 1],
      [id2, 0, state.courses[id1]]
    ]
  })
})