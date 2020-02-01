import request from "superagent";

import { BaseService } from "./base";

export class BadgeService extends BaseService {
  async createBadge(token, data) {
    console.log(data);
    let response = await request
      .post(`${this.apiEndpoint}/badge/create`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send(data);
    return response.body;
  }

  async changeBadge(token, index, data) {
    let response = await request
      .put(`${this.apiEndpoint}/badge/${index}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send(data);
    return response.body;
  }
}
