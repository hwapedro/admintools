import update from "immutability-helper";

export const startLoading = state => ({
  ...state,
  loading: true,
  error: null
});

export const stopLoading = (state, { error }) => ({
  ...state,
  loading: false,
  error: false
});

export const getError = (state, { error }) => ({
  ...state,
  loading: false,
  error: true
});

export const DND = (state, id1, id2, name) => {
  id1--;
  id2--;
  switch (name) {
    case "courses":
      let courses = update(state.courses, {
        $splice: [[id1, 1], [id2, 0, state.courses[id1]]]
      });
      return {
        ...state,
        courses: courses.map((course, i) => {
          course.courseIndex = i + 1;
          return course;
        })
      };

    case "lessons":
      let lessons = update(state.course.lessons, {
        $splice: [[id1, 1], [id2, 0, state.course.lessons[id1]]]
      });
      return {
        ...state,
        course: {
          ...state.course,
          lessons: lessons.map((lesson, i) => {
            lesson.lessonIndex = i + 1;
            return lesson;
          })
        }
      };

    default:
      break;
  }
};
