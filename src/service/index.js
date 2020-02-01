import request from "superagent";
import { markdownToHtml } from "../store/utils";
import { BaseService } from "./base";

class AdminService extends BaseService {
  async getAll(token, name) {
    let response = await request.get(`${this.apiEndpoint}/${name}/all`).set({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
    return response.body;
  }

  async add(title, description, token, name) {
    let response = await request
      .post(`${this.apiEndpoint}/${name}/create`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send({ title: title, description: markdownToHtml(description) });
    return response.body;
  }

  async delet(index, token, name) {
    let response = await request
      .del(`${this.apiEndpoint}/${name}/${index}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      });
    return response;
  }

  async change(index, title, description, token, name) {
    let response = await request
      .put(`${this.apiEndpoint}/${name}/${index}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send({ title: title, description: markdownToHtml(description) });
    return response.body;
  }

  //LESSON PAGE

  //LESSON BLOCK

  //NEWS BLOCK
}

export default new AdminService();
