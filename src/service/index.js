import request from "superagent";

const _apiBase = "http://germangorodnev.com:5000/api/admin";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOWEzYjc1OTA4NDJiMmE3ZmExODNkNSIsImlhdCI6MTU1MzYxMTc0MH0.Y6QPgQKbv0x3P1zhVQorAUEFqrar4BfceXSG6Oso224";

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

  //LESSON PAGE
  async getAllPages(token, id) {
    let response = await request.get(`${_apiBase}/lesson/${id}/all`).set({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
    return response.body;
  }

  async changeTextPage(token, id, text) {
    let response = await request
      .put(`${_apiBase}/page/${id}/text`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send({
        text: text
      });
    return response.body;
  }

  async addPage(token, id, text, tasks, needToComplete) {
    let response = await request
      .put(`${_apiBase}/lesson/${id}/addPage`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send({
        text: text,
        tasks: tasks,
        needToComplete: needToComplete
      });
    return response.body;
  }

  async deletePage(token, id) {
    let response = await request.del(`${_apiBase}/page/${id}/deletePage`).set({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
    return response;
  }

  async createTask(token, pageid, type, info) {
    let response = await request
      .post(`${_apiBase}/task/create?page=${pageid}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send({
        type: type,
        info: info
      });
    return response;
  }

   async deleteTask(token, id, taskid) {
    let response = await request
      .del(`${_apiBase}/page/${id}/removeTask/${taskid}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      });
    return response;
  }

  //LESSON BLOCK
  async getLesson(token, lessonId) {
    let response = await request
      .get(`${_apiBase}/lesson/${lessonId}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      });
    return response.body;
  }

  async addLesson(title, description, exam, token, name) {
    let response = await request
      .post(`${_apiBase}/${name}/create`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send({ title: title, description: description, exam: exam });
    return response.body;
  }

  async changeLesson(courseIndex, title, description, exam, token, name) {
    let response = await request
      .put(`${_apiBase}/${name}/${courseIndex}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send({ title: title, description: description, exam: exam });
    return response.body;
  }
}

const swapi = new AdminService();
// swapi.createTask(token, "5ca5710ad9fd5e30696616a2", "test", { heh: 5 });
// swapi.addTask(token, "5ca5710ad9fd5e30696616a2", "5ca573d6d9fd5e30696616a8" )
