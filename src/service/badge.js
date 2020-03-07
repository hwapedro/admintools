import { BaseService } from "./base";

export class BadgeService extends BaseService {
  async getAll() {
    return this.get("badge/all");
  }

  async delete(index) {
    return this.del(`badge/${index}`);
  }

  async add(data) {
    return this.post("badge/create", data);
  }

  async change(index, data) {
    return this.put(`badge/${index}`, data);
  }
}

export default new BadgeService();
