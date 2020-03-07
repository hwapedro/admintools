import { BaseService } from "./base";

class AuthService extends BaseService {
  async register(username, password) {
    const data = { username, password };
    return this.post("auth/register", data);
  }

  async login(login, password) {
    const data = { login, password };
    return this.post("auth/login", data);
  }
}

export default new AuthService();
