import update from "immutability-helper";

export const startLoading = state => ({
  ...state,
  loading: true,
  error: null
});

export const stopLoading = (state, { error }) => ({
  ...state,
  loading: false,
  error
});

export const DND = (state, id1, id2) => {
  let courses = update(state.courses, {
    $splice: [[id1, 1], [id2, 0, state.courses[id1]]]
  });

  return {
    ...state,
    loading: false,
    courses: courses.map((course, i) => {
      course.courseIndex = i;
      return course;
    })
  };
};
