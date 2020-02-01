import request from "superagent";

import { BaseService } from "./base";

export class NewsService extends BaseService {
  async changeNews(token, title, text, id) {
    let response = await request
      .put(`${this.apiEndpoint}/news/update/${id}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send({ title: title, text: text });
    return response.body;
  }
}
