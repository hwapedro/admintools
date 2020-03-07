import { markdownToHtml } from "../store/utils";
import { BaseService } from "./base";

class CourseService extends BaseService {
  async getAll() {
    return this.get("course/all");
  }

  async getOne(id) {
    return this.get(`course/${id}`);
  }

  async add(title, annotation, description) {
    const data = {
      title: title,
      annotation: annotation,
      description: markdownToHtml(description)
    };
    return this.post("course/create", data);
  }

  async change(index, title, annotation, description) {
    const data = {
      title: title,
      annotation: annotation,
      description: markdownToHtml(description)
    };
    return this.put(`course/${index}`, data);
  }

  async delete(index) {
    return this.del(`course/${index}`);
  }

  async dragAndDrop(i1, i2) {
    const data = {
      i1: i1,
      i2: i2
    };
    return this.put(`course/dragged`, data);
  }
}

export default new CourseService();
