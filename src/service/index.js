import request from "superagent";

const _apiBase = "http://germangorodnev.com:5000/api/admin";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjODI2NmNmMjIwMzgyMWFjYjM5MjUwOSIsImlhdCI6MTU1MjA1Njk2Nn0.FQbPc-Es3jaFXhaIu40ltwow3lk1vbok_FqXTnY-0sY'

export default class AdminService {

  async register(username, password) {
    let response = await request
      .post(`${_apiBase}/auth/register`)
      .set("Content-Type", "application/json")
      .send({ username: username, password: password })
      .then(response => console.log(response))
      .catch(error => console.log(error));

    return response.body;
  }

  async login(login, password) {
    let response = await request
      .post(`${_apiBase}/auth/login`)
      .set("Content-Type", "application/json")
      .send({ login: login, password: password })
    return response;
  }

  async getAllCourses() {
    let response = await request
    .get(`${_apiBase}/course/all`)
    .set({
      "Content-Type": "application/json",
      'Authorization': "Bearer " + token
    })
    return response.body;
  }
}

const swapi = new AdminService();
// 

// swapi.register('dimababin', '123').then(data => console.log(data));
swapi.login("dimababin", "123").then(data => console.log(data));
swapi.getAllCourses().then(data => console.log(data));
