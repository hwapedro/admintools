import request from "superagent";

import { BaseService } from "./base";

export class PageService extends BaseService {
  async getAllPages(id) {
    let response = await request
      .get(`${this.apiEndpoint}/lesson/${id}/all`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      });
    return response.body;
  }

  async changeTextPage(id, text) {
    let response = await request
      .put(`${this.apiEndpoint}/page/${id}/text`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      })
      .send({
        text: text
      });
    return response.body;
  }

  async addPage(id, text, tasks, needToComplete) {
    let response = await request
      .put(`${this.apiEndpoint}/lesson/${id}/addPage`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      })
      .send({
        text: text,
        tasks: tasks,
        needToComplete: needToComplete
      });
    return response.body;
  }

  async deletePage(id) {
    let response = await request
      .del(`${this.apiEndpoint}/page/${id}/deletePage`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      });
    return response;
  }
}

export default new PageService();
