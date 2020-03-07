import { BaseService } from "./base";

export class TaskService extends BaseService {
  async createTask(pageId, type, info, answer) {
    const data = { type, info, answer };
    return this.post(`task/create?page=${pageId}`, data);
  }

  async change(taskId, type, info, answer) {
    const data = { type, info, answer };
    return this.put(`task/${taskId}`, data);
  }

  async delete(id, taskid) {
    return this.del(`page/${id}/removeTask/${taskid}`);
  }
}

export default new TaskService();
