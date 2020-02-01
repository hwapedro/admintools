import request from "superagent";
import { markdownToHtml } from "../store/utils";

import { BaseService } from "./base";

export class NewsService extends BaseService {
  async getAll() {
    let response = await request.get(`${this.apiEndpoint}/news/all`).set({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.token
    });
    return response.body;
  }

  async add(title, description) {
    console.log(title, description);
    let response = await request
      .post(`${this.apiEndpoint}/news/create`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      })
      .send({
        title: title,
        description: markdownToHtml(description)
      });
    return response.body;
  }

  async delete(index) {
    let response = await request.del(`${this.apiEndpoint}/news/${index}`).set({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.token
    });
    return response;
  }

  async change(id, title, text) {
    let response = await request
      .put(`${this.apiEndpoint}/news/update/${id}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      })
      .send({ title: title, text: text });
    return response.body;
  }
}

export default new NewsService();
