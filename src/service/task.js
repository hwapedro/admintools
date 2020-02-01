import request from "superagent";

import { BaseService } from "./base";

export class TaskService extends BaseService {
  async createTask(pageId, type, info, answer) {
    let response = await request
      .post(`${this.apiEndpoint}/task/create?page=${pageId}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      })
      .send({
        type: type,
        info: info,
        answer: answer
      });
    return response;
  }

  async change(taskId, type, info, answer) {
    console.log(taskId, type, info, answer)
    let response = await request
      .put(`${this.apiEndpoint}/task/${taskId}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      })
      .send({
        type: type,
        info: info,
        answer: answer
      });
    return response;
  }

  async delete(id, taskid) {
    let response = await request
      .del(`${this.apiEndpoint}/page/${id}/removeTask/${taskid}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      });
    return response;
  }
}

export default new TaskService()