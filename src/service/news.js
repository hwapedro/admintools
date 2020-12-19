import { markdownToHtml } from '../store/utils'

import { BaseService } from './base'

export class NewsService extends BaseService {
  async getAll() {
    return this.get('news/all')
  }

  async add(title, description, icon) {
    const data = { title, description: markdownToHtml(description), icon }
    return this.post('news/create', data)
  }

  async delete(index) {
    return this.del(`news/${index}`)
  }

  async change(id, title, description, icon) {
    const data = {
      title,
      description: markdownToHtml(description),
      icon,
    }
    return this.put(`news/${id}`, data)
  }
}

export default new NewsService()
