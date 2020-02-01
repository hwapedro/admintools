import request from "superagent";
import { markdownToHtml } from "../store/utils";

import { BaseService } from "./base";

class LessonService extends BaseService {
  async getAll() {
    let response = await request.get(`${this.apiEndpoint}/lesson/all`).set({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.token
    });
    return response.body;
  }

  async getOne(lessonId) {
    let response = await request
      .get(`${this.apiEndpoint}/lesson/${lessonId}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      });
    return response.body;
  }

  async add(title, description, exam, courseIndex) {
    let response = await request
      .post(`${this.apiEndpoint}/lesson/create`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      })
      .send({
        title: title,
        description: markdownToHtml(description),
        exam: exam,
        courseIndex: courseIndex
      });
    return response.body;
  }

  async delete(index) {
    let response = await request
      .del(`${this.apiEndpoint}/lesson/${index}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      });
    return response;
  }

  async change(lessonId, title, description, exam, courseIndex) {
    let response = await request
      .put(`${this.apiEndpoint}/lesson/${lessonId}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      })
      .send({
        title: title,
        description: markdownToHtml(description),
        exam: exam,
        courseIndex: courseIndex
      });
    return response.body;
  }

  async DragAndDropLesson(i1, i2, courseIndex) {
    let response = await request
      .put(`${this.apiEndpoint}/lesson/dragged`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      })
      .send({
        i1: i1,
        i2: i2,
        courseIndex: courseIndex
      });
    return response.body;
  }
}

export default new LessonService();
