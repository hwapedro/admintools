import request from "superagent";
export const apiEndpoint = "http://germangorodnev.com:5000/api/admin";

export class BaseService {
  constructor() {
    this.apiEndpoint = apiEndpoint;
    this.token = localStorage.getItem("token");
  }

  async get(url, headers = {}) {
    const response = await request.get(`${apiEndpoint}/${url}`).set({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.token
    });
    return response.body;
  }

  async post(url, data, headers = {}) {
    const response = await request
      .post(`${apiEndpoint}/${url}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      })
      .send(data);
    return response.body;
  }

  async put(url, data, headers = {}) {
    const response = await request
      .put(`${apiEndpoint}/${url}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      })
      .send(data);
    return response.body;
  }

  async del(url, headers = {}) {
    console.log(123);
    let response = await request.del(`${apiEndpoint}/${url}`).set({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.token
    });
    return response;
  }
}
