import request from "superagent";

import { BaseService } from "./base";

export class BadgeService extends BaseService {
  async getAll() {
    let response = await request.get(`${this.apiEndpoint}/badge/all`).set({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.token
    });
    return response.body;
  }

  async delete(index) {
    let response = await request.del(`${this.apiEndpoint}/badge/${index}`).set({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.token
    });
    return response;
  }

  async add(data) {
    let response = await request
      .post(`${this.apiEndpoint}/badge/create`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      })
      .send(data);
    return response.body;
  }

  async change(index, data) {
    let response = await request
      .put(`${this.apiEndpoint}/badge/${index}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " +  this.token
      })
      .send(data);
    return response.body;
  }
}

export default new BadgeService();
