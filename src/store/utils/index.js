import update from "immutability-helper";

export const startLoading = state => ({
  ...state,
  loading: true,
  error: null
});

export const stopLoading = (state, { error }) => ({
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
        loading: false,
        courses: courses.map((course, i) => {
          console.log(course, i);
          course.courseIndex = i + 1;

          return course;
        })
      };

    case "lessons":
      console.log(id1, id2)
      let lessons = update(state.course.lessons, {
        $splice: [[id1, 1], [id2, 0, state.course.lessons[id1]]]
      });
      return {
        ...state,
        loading: false,
        course: {
          ...state.course,
          lessons: lessons.map((lesson, i) => {
            lesson.lessonIndex = i + 1;
            return lesson;
          })
        }
      };

    // case "lessons":

    //     let lessons = update(state.lessons, {
    //       $splice: [[id1, 1], [id2, 0, state.lessons[id1]]]
    //     });
    //     console.log(lessons)
    //     return {
    //       ...state,
    //       loading: false,
    //       lessons: lessons.map((lesson, i) => {

    //         lesson.lessonIndex = i + 1;
    //         return lesson;
    //       })
    //     };

    default:
      break;
  }
};
