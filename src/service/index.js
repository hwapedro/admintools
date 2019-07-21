import request from "superagent";
import file from "../photo.PNG"


const _apiBase = "http://germangorodnev.com:5000/api/admin";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOWEzYjc1OTA4NDJiMmE3ZmExODNkNSIsImlhdCI6MTU1NzQwNTYzOX0.2k9ntDEFNGLBJWipOL23nP50MP_h0niyO4h_xegnxko";

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

  async change(index, title, description, token, name) {
    let response = await request
      .put(`${_apiBase}/${name}/${index}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send({ title: title, description: description });
    return response.body;
  }

  async getOneCourse(token, id) {
    let response = await request.get(`${_apiBase}/course/${id}`).set({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
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

  async createTask(token, pageId, type, info) {
    let response = await request
      .post(`${_apiBase}/task/create?page=${pageId}`)
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

  async changeTask(token, taskId, type, info) {
    let response = await request
      .put(`${_apiBase}/task/${taskId}`)
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
    let response = await request.get(`${_apiBase}/lesson/${lessonId}`).set({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
    return response.body;
  }

  async addLesson(title, description, exam, token, name, courseIndex) {
    let response = await request
      .post(`${_apiBase}/${name}/create`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send({
        title: title,
        description: description,
        exam: exam,
        courseIndex: courseIndex
      });
    return response.body;
  }

  async changeLesson(
    lessonId,
    title,
    description,
    exam,
    token,
    name,
    courseIndex
  ) {
    let response = await request
      .put(`${_apiBase}/${name}/${lessonId}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send({
        title: title,
        description: description,
        exam: exam,
        courseIndex: courseIndex
      });
    return response.body;
  }

  async DragAndDropCourse(token, i1, i2) {
    let response = await request
      .put(`${_apiBase}/course/dragged`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send({
        i1: i1,
        i2: i2
      });
    return response.body;
  }

  async DragAndDropLesson(token, i1, i2, courseIndex) {
    let response = await request
      .put(`${_apiBase}/lesson/dragged`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send({
        i1: i1,
        i2: i2,
        courseIndex: courseIndex
      });
    return response.body;
  }

  //NEWS BLOCK

  async changeNews(token, title, text, id) {
    let response = await request
      .put(`${_apiBase}/news/update/${id}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send({ title: title, text: text });
    return response.body;
  }

  async icon(token, id) {
    console.log(file)
    let response = await request
      .put(`${_apiBase}/badge/${id}/icon`)
      .set({
        Authorization: "Bearer " + token
      })
      .send(file);
    return response.body;
  }

 

  // async changeNews(token, id) {
  //   let response = await request
  //     .put(`${_apiBase}/badge/${id}/icon`)
  //     .set({
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token
  //     })
  //   return response;
  // }
}

const swapi = new AdminService();

