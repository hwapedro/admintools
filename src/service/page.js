import { markdownToHtml } from '../store/utils'

import { BaseService } from './base'

export class PageService extends BaseService {
  async getAllPages(id) {
    return this.get(`lesson/${id}/all`)
  }

  async changeTextPage(id, text) {
    const data = { text }
    return this.put(`page/${id}/text`, data)
  }


  async changePage(id, title, description, tasksOnPage) {
    const data = {
      title,
      description: markdownToHtml(description),
      tasksOnPage
    }
    return this.put(`page/${id}/update`, data)
  }

  async addPage(id, title, description, tasks, taskOnPage) {
    const data = { title, description: markdownToHtml(description), tasks, taskOnPage }
    return this.put(`lesson/${id}/addPage`, data)
  }

  async deletePage(id) {
    return this.del(`page/${id}/deletePage`)
  }
}

export default new PageService()
