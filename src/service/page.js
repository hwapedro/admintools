import { BaseService } from "./base";

export class PageService extends BaseService {
  async getAllPages(id) {
    return this.get(`lesson/${id}/all`);
  }

  async changeTextPage(id, text) {
    const data = { text };
    return this.put(`page/${id}/text`, data);
  }

  async addPage(id, text, tasks, needToComplete) {
    const data = { text, tasks, needToComplete };
    return this.put(`lesson/${id}/addPage`, data);
  }

  async deletePage(id) {
    return this.del(`page/${id}/deletePage`);
  }
}

export default new PageService();
