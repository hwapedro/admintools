import { markdownToHtml } from "../store/utils";

import { BaseService } from "./base";

export class NewsService extends BaseService {
  async getAll() {
    return this.get("news/all");
  }

  async add(title, description) {
    const data = { title, description: markdownToHtml(description) };
    return this.post("news/create", data);
  }

  async delete(index) {
    return this.del(`news/${index}`);
  }

  async change(id, title, description) {
    const data = {
      title,
      description
    };
    return this.put(`news/${id}`, data).body;
  }
}

export default new NewsService();
