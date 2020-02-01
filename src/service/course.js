import request from "superagent";
import { markdownToHtml } from "../store/utils";

import { BaseService } from "./base";

class CourseService extends BaseService {
  async getAll() {
    let response = await request.get(`${this.apiEndpoint}/course/all`).set({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.token
    });
    return response.body;
  }

  async getOne(id) {
    let response = await request.get(`${this.apiEndpoint}/course/${id}`).set({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.token
    });
    return response.body;
  }

  async add(title, annotation, description) {
    let response = await request
      .post(`${this.apiEndpoint}/course/create`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      })
      .send({
        title: title,
        annotation: annotation,
        description: markdownToHtml(description)
      });
    return response.body;
  }

  async change(index, title, annotation, description) {
    let response = await request
      .put(`${this.apiEndpoint}/course/${index}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      })
      .send({
        title: title,
        annotation: annotation,
        description: markdownToHtml(description)
      });
    return response.body;
  }

  async delete(index) {
    let response = await request
      .del(`${this.apiEndpoint}/course/${index}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      });
    return response;
  }

  async dragAndDrop(i1, i2) {
    let response = await request
      .put(`${this.apiEndpoint}/course/dragged`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      })
      .send({
        i1: i1,
        i2: i2
      });
    return response.body;
  }
}

export default new CourseService();
