import { markdownToHtml } from "../store/utils";

import { BaseService } from "./base";

class LessonService extends BaseService {
  async getAll() {
    return this.get("lesson/all");
  }

  async getOne(lessonId) {
    return this.get(`lesson/${lessonId}`);
  }

  async add(title, description, exam, courseIndex) {
    const data = {
      title,
      description: markdownToHtml(description),
      exam,
      courseIndex
    };
    return this.post("lesson/create", data);
  }

  async delete(index) {
    return this.del(`lesson/${index}`);
  }

  async change(lessonId, title, description, exam, courseIndex) {
    const data = {
      title,
      description: markdownToHtml(description),
      exam,
      courseIndex
    };
    return this.put(`lesson/${lessonId}`, data);
  }

  async DragAndDropLesson(i1, i2, courseIndex) {
    const data = { i1, i2, courseIndex };

    return this.put("lesson/dragged", data).body;
  }
}

export default new LessonService();
