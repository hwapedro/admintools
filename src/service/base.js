import { apiEndpoint } from "../configs/api";

export class BaseService {
  constructor() {
    this.apiEndpoint = apiEndpoint;
    this.token = localStorage.getItem("token");
  }
}
