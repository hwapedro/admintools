import request from "superagent";
import { BaseService } from "./base";

class AuthService extends BaseService {
  async register(username, password) {
    let response = await request
      .post(`${this.apiEndpoint}/auth/register`)
      .set("Content-Type", "application/json")
      .send({ username: username, password: password })
      .then(response => console.log(response))
      .catch(error => console.log(error));

    return response;
  }

  async login(login, password) {
    let response = await request
      .post(`${this.apiEndpoint}/auth/login`)
      .set("Content-Type", "application/json")
      .send({ login: login, password: password });

    return response;
  }
}

export default new AuthService();
