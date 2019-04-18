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

export const DND = (state, id1, id2, name) => {
  switch (name) {
    case 'courses':
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

    case 'lessons':
      let lessons = update(state.lessons, {
        $splice: [[id1, 1], [id2, 0, state.lessons[id1]]]
      });

      return {
        ...state,
        loading: false,
        lessons: lessons.map((lesson, i) => {
          lesson.lessonIndex = i;
          return lesson;
        })
      };

    default:
      break;
  }
};
