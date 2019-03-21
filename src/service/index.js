import request from "superagent";

const _apiBase = "http://germangorodnev.com:5000/api/admin";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjODI2NmNmMjIwMzgyMWFjYjM5MjUwOSIsImlhdCI6MTU1MjA1Njk2Nn0.FQbPc-Es3jaFXhaIu40ltwow3lk1vbok_FqXTnY-0sY";

export default class AdminService {
  async register(username, password) {
    let response = await request
      .post(`${_apiBase}/auth/register`)
      .set("Content-Type", "application/json")
      .send({ username: username, password: password })
      .then(response => console.log(response))
      .catch(error => console.log(error));

    return response;
  }

  async login(login, password) {
    let response = await request
      .post(`${_apiBase}/auth/login`)
      .set("Content-Type", "application/json")
      .send({ login: login, password: password });

    return response;
  }

  async getAll(token, name) {
    let response = await request.get(`${_apiBase}/${name}/all`).set({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
    return response.body;
  }

  async add(title, description, token, name) {
    let response = await request
      .post(`${_apiBase}/${name}/create`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send({ title: title, description: description });
    return response.body;
  }

  async delet(index, token, name) {
    let response = await request.del(`${_apiBase}/${name}/${index}`).set({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
    return response;
  }

  async change(courseIndex, title, description, token, name) {
    let response = await request
      .put(`${_apiBase}/${name}/${courseIndex}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send({ title: title, description: description });
    return response.body;
  }

  // async getImg() {
  //   let responce = request
  //     .put(`${_apiBase}/badge/avatar`)
  //     .set("Content-Type", "image/png")
  //     .set("Content-Disposition", "inline")
  //     .send(theFile) // <--------------------------- THIS LINE instead of .attach()
  //     .then(data => {
  //       console.log(data);
  //     });
  // }
}
//avatar png super
const swapi = new AdminService();

// swapi.getAll(token).then(data => console.log(data));
// swapi.register('dimababin', '123').then(data => console.log(data));
// swapi.login("dimababin", "123").then(data => console.log(data));
// swapi.getAllCourses().then(data => console.log(data));
//swapi.addCourses('title', 'description').then(data => console.log(data));