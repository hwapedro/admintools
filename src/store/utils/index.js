import update from "immutability-helper";
import showdown from "showdown";

const converter = new showdown.Converter({tables: true});

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

export const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// i18n constants
export const i18nSelector = [
  { label: "Russian", value: "ru" },
  { label: "English", value: "en" }
  // { label: "Spanish", value: "sp" },
  // { label: "German", value: "ge" }
];

export const i18n = {
  en: "",
  ru: ""
};

export const markdownToHtml = data => {
  for (const text in data) {
    data[text] = converter.makeHtml(data[text]);
  }
  return data;
};
