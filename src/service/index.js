import request from "superagent";
// import file from "../photo.PNG"

const _apiBase = "http://germangorodnev.com:5000/api/admin";

class AdminService {
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

  async postIconBadges(index, name, token, data) {
    console.log(data);
    let response = await request
      .put(`${_apiBase}/${name}/${index}`)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
      .send(data);
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

export default new AdminService();
const swapi = new AdminService();
const token = localStorage.getItem("token");
swapi.postIconBadges("5d1315a2b0839c5a915d63ad", "badge", token, {
  title: "lol",
  description: "lol",
  icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAqdklEQVR4XuzSP0vDUBTGYZNSFSmI/wdFF9GlOBSXju0igqs46SQOToKzH0L8BG4iSGcFleouaBGKukrpUKxTodwk/rJcLuWm1SXY9Bx4eE+Spbw9QzJCCCGEEEIIIYQQcXD+xY9wnCmssWaxgiXMYob3Y2QKCi2ev8g6PvGGCu9eyBoGYpRSKSKLHJaDIFglp+lhjj3DPoxw2miihgZe8Y5nVAf6ACkrR2yhgHVkjG9mal2+t9mfKL/MfoM7JGo8z5snNjmwDTIPnqOHLnoVUMUDrnGL78QfIEcySexiB3n0PDBzN78jsnTyg7gkL8gK+nJ8308T29hDEWnLcelnOtH7HzVxRafn5GPMNxHLDS7gCPsY/+3hua4bCneNsZbNrvHH6Z0p4Qz3fXR4E8QhDrBo6ShKZydmWrqz9l/GKUpJOMBRnOAYI7DOD3VWFhLZEUUvuO+2SwtiowFccINAYouiRgT1xyCZYcAfASUEUAMJYQKJZCCTgBBIvvwJcSYCEYio+GMUMGCEYGRQAaVd0CDu+77/pE6RA5WiO4DMaFtwqHr9quvdOn3uUq9NcUFwAQEB7CUwMNAUIcljT8H9H2jLoJr7XPV/iv81CgUR7um/fDkMXuiQvhzTFhY5wDXSN8cmfNnAtRAJn8FxH6oAHyt8r+DydtMmloILCgoygc8AW4AECSZQoJswhcj5P4nI5wr74h+NPDxRtrWJyFum2MAJHdHkx/zcnI9GAZp8XF9f6/7m5gY9+cI8O1oCpl0d6vpTETl+CDUgiAhVBv+IWs+b6AiSBgJJanBwMHoSSdGYkRHAPP4gnEdSSTaIZg+QbK4J8X2s8IsfCM+p7GlX/WPu04z+4AQICQnhmDxx/6bQyBk5pPNynubk8vISwJgcmd/1lrq3FD5S6PdnAYK4d5TRv8KLfQmPIgKBJBaEXVxcaILCw8MlPj5e4uLixOFwSFRUFObx9YMm7ujoSA4PD+X4+BgE6rUiIyMhSr0GRXd1dUWSMTYjI4n+WUQ+xNJyP61WcfJCwWGKjtyQHxNo4Ap7wnewb3IVHR2NOViHnGquDg4OZH9/H2OIjALWa5yfn2MeAI7Amy1EE98pPPW3FMyF6lTXZYVvDdujQ0ND9fXp6akWjMvlktzcXMnOzpb09HRJTU2VhIQEiYmJobCwDuaCMP293d1dWV9fl6WlJZmdnZWFhQVZXV2FKfghSDBIpddzTI+n13tE5JGC544j37cKX7DeZRag6MgTxuQKIoHYMjIyNFeZmZmSlpYmycnJEhsbq+ebjWKFo66trWmu5ubmZGZmRvcnJyfgl+trnJ2daa5MIVrtN4X34bT+IEAu8gnqPbMQNlMshYfohgaPxMYLCwulvLxc3G63ZGVlQXAM/RAHU6e5HlOwHrNBVCB3ampKxsbGZHx8XDY3NyFEPJNRkIIkcM3UfaNsBqmDdyS+HmX/B74iHnu0vb09fT8/P19KSkqkqKhIcnJyyOWtAIFNTEzI6OiojIyMyPz8PJ4HAUOUAIRIfuxoiDFeZL+ncHjfKRhC+FJ139ipll5N4WG8s7OjU2p1dbXU1tZKcXEx0i0IgZdCcNgcxeX1hGd+xmsIHOsy6k1PT8vw8LAMDQ2BXC3siIgIW4isg8wasUFEXsqba+HK3t+V8NwUH0DRmcLb3t4Gb9pBa2pqpLS0FFGOpQjsh73gyubLPpSYvQYbnzMwMCA9PT0yOTlJHpGuGXXppHZt+LfCu/CR+xAgxfcZ6gL7NQHTCTwKJGIjSJ2VlZXS2NgoZWVlFCQ2aBLn89DCzduk8hTHORAj6iE8F2m5v79furu7ZWVlRZxOJ+6z1oH4bBECOPH98AZesTiVjX8o4WWa5Yh9AENpAYFVVVVJfX09hAdRwkHBIXm3BWaD9+nQ9jtUrsP6Wq/f1dUlHR0dsry8LImJieAG0VA/V/ODkuW/KXlJrZ+v+rO7FCCNr1ddp7lpM52EhYXp8dbWlq5RWlpapK6uDqJE7QaSbXERdqSzifM6F80+PSNioGZCROzs7JS+vj7cRn3Jg4p9YmbK+UpEnr/G/25TlG1/KX6SIT5bgOjhFOAqLy9PmpubkSG08DY2NmCXLSzCFJMtQHuOz/eGALIErhcXF6WtrU16e3vhxAgiFD9Tsp2Op1T3ttyyBd5SfG6Iz7gmoSAN4oOhOupUVFRIa2srDhkohLER89UACTDJ8Co23/A9Fz8exA5vhg0FBQXS3t4uHo9HkpKSYAdPjARfV3ytAG6evYb/cF3KvleKI6f5igXgNeyE0zQ0NEhTU5OkpKSAK0QgPe8fXs431KukDuPntu+qDWiJrhiS6hoS0eLVBYklEwpSkQINESEjVVdCVdwsRVEtTQVLkEz0VWYtIBGICXcv2jvbNQC94SsLe91CQC8rb/M5vx4anv3OzPlttAPDnDNn7vg7c555vn/HwBmtNatVE89l0cxcsB2/YeHChd21a9e65cuXd2fPnkVKsYlz0IkJNccr6Rk7++sfBAAB24sEryNdT8wHbSN2d+3a1e3bt48xWF4CC0zDpQOQBYjimg5W5ovYsgjeZ8+eATSU+N5yvHTpEmwIQ2IMARJtohyIxxMo/lllwjbzTQI+fH0CnACg98V4WrBgARsEXa93L83OzjrwVCMJ0QKhs6TaEIgwIKy3e/fufq0OHjzYf7t58+b9d6MydsSEAuHX0jW2wA8/CAa8k+pHcvBRxYD4m2C/o0ePdlu3bkXJhcJ5LrCUvO4AsBlo1xwqpWsHLnOzkBg9hw8f7j/6lStX2Cj0aW4XXTDh39MUP3kfzPciYlfg89+JOEPfwwNw6tSpbsmSJTCzDAt/l9p9TRQLcEUAqqrIf4inAha8ceMGrNxbzJOTk/LbMlCGiXS5H6SrmXT59v8LgABuX2pek0NZVewBXVNY0PXr12OBwnZacAdWGJv0ay+Bn7EJwBzgqAXs8I0bN/ai+cyZM/QhkhUp8X/nx6nv3dT+YkxXy4NUFzjDUFBDkBJr167tjh07xtrBMmJIHx9JBN+IJfFKn2okmtUfksOTJ096/f3q1as9CO/fv4/+3BPOc0v8SJMAwtvkcY4FwDF0rUmYQC/gLTsGPeLEiRPd6tWr+fHazQ6cJuBoXTeslFD0urhyPxiijh1+8uTJ7vjx4+hcLK5A6Fk1N9L1X0hVGgi+6QSGz0ZqgiIPbIBDhw4BRKSGx7vF2vl9if1cDamJXbVVUawikczmvHjxYrdz587u4cOHvcR4Dvu9N2LyiXRzJbWvD2dAAaO9qr+Mdpq87YBv7969+K3wskcfPgJZqy8HkX8Q1Qh0rQRW5kLkEYUBgGwcRCLO6zB7BL2XTO0Bmdc/TfXLOVsJSAp3bdq0CUYhcoPDF/AhKQCEgFaz9ks68lCdUGNiHyI3Bnh0aEB44cIFQIhk6/XnF8R+MCHtaKLdqe8y2deDADg3bEd/ieoiT05RFhFrd926dd3Tp0/pA6Q18LnVG7WRQdJiURdP1Q8GMPi9iBn0wtOnT6Ov4n7w3EKGkyr1u1Q/U2Hib6W5X4/eVZGXDRs2YO0i9mFDgSACW+QpiMY4MEMxnN+/wH0BlHnrhhwh0iNHjnQ7duxAd8bgHEkMCCm1mT7489RMDQLgQAH8M7vXx2ERsZDw8SHG+GGuV5QYLWe2WhLlOExJraXyh/NiifIOBw4c6M6fPw8wMKiisUv/4376ZgC+pSQWRJtEPsc1a9Z027Ztg/nkjip98KEs6PelViCLfYhc6zkdACpYNxz7WMbbt2/HgOOdNLdLI45bfCXV6Ta5tUd8NYHktwGdK0SDkxlrDgAOXdSajlcDpIvF2rgSAIvGDSDEaX358mW6ULZL/x7JC7+2uf+UxixyVlJce8WKFagocurmRkDNwJL4Vl/LUR/2iwVzEUuJoik8A5AUjaUFWgAMAw6/4HffeKN7PDuLtMhzCwVCBv8xNZ/73wE4cqJOBbuMHUCQnIXF3eIL4QZCi7FKwGpZzg1WjK/9N6nOnz+fhIY+LEXBQgUEVjDpP56FoM6mub6XvytVKsqiRYvwp7FexFjlOYjUhZae56Ue7xUgc4Bq3lifFxDD8Vyj66GyPH78eGTB4wkZrZFqzgpfqGegM3f9KUf/ZqNdBeIpsN/ixYvJ2nD28+sW0MqAa1vQ0biWWPbnalG4SWQgoaHGUiSzbk310wTmo6QJ1gi22L9/P8yBpwBAO0M6eFpqRCkMWQeSPwd4wVifz1mTa/4WEJ5LIbu333kH36BnnQuAv6lHSNoA5DDPdxxAWtxly5ahD2A9RtQfLWzNGCkZJ22LOW7dEc19E/SMQ/Tikrl161b36NGjiNFVOBr5fa2RxmmDMs+ePXtw4CIhxHwOjsFxbhUDexlEmsjBpLFUQCzAAUrNX7CoxYK8ExGbc+fOKQ8AtwzPcgDSICn+9n4d0ZsDlhLN4keTgu1KrlulbUs2Zq+oaq6avuiAif62+Lt4H5zqpI3REk8ulN+n+lJknFFIKMBnhm4sRjTLFFAOMTx8/UIW7edkjBkYApMxXg5MJqEVEEO9UnMxD/mWJMZScctQ9MzW8xupXh2XAXnyGgeXC4uCaCHWqzSmkhipfXzvj4BpkYlqS/UUrZbbJwSgGAyfIP7Nmzdv4sNrisd83lWrVmH1kuHC+BxoUb6jP/M566E4xoThuZj5xHISxV3elzuyxYqZ6FULBj6V9OXp6enuV2++meuSLoZn8IuOy4BMsL6i/GKOK4M2VGStjONWaemDPhbAlUDWsoDVH24YVAsYDCDduXMnBG9UiDOvXLnS0848BhsBWmOGhhy9ryqOcyu3y8eoT5GUjAlpdT/HdQbmd5Pe/3JiQHCgzB0AbBvji+QOYLCNxYBzo6Dyq6Uow+bNmzmPgFuh9NIChvc5ADROz2tsSM1DVUP9ghEzqjSNF0D44MGD3vKz4muDc5YwGzoRDnrX+aLN2pIeYsVoDNVdJgAn1A9dvxPoPiRWY4zHljWv7qnZnOjK169fx30lAMplIxByjU/wraEAZAIOZ/y19/4HhYzjLVu26ExuyXclMIyr59nzEGi18TXwNRgxBqSyu+/evdvHbSuFbG9y6og111LkHXiDmc3Frfq6CIze5tcR+HPRa75DwEkEpQdt1o8xcu/eve727duaTyDMAYih9qNxRPArAl9QcNhCu/kil4BWcpFEOpuAG4FLz5whWwerfZyLt+ZYCmE0xk1NTXUzMzOleK1OqGHxVlOkKIXrEiBrocWMqYK5A39g9XdQLVtG13MmkpkXFQw8aC3VP6HfxnpOTLxaNDWYLCuY0RwS+HYfVI8L5xT4GPi1BMCaCBzKeHnNxWyN9XysgFMCN7W0KYr6oOYgbZ0sH5ItrMCQZAEp9ayk80Xx2VCsOshiYMV/45YtpRCas/ssLKdkhVwXNABSCVkylrMk+II1T5cBMF39OTWLh8aCOXr1sm4KIlgp3CVx1gKYf1xdR2G5mliu6X0+PsqIGcTeamF8WA7jgp2fFdwRzEV/C3gOAK4jp3I7UhIoUQJMQRQL/O14cQ44UsV0L1AqBpykA3j4ZDrwBQCj7KqEjpcmRhL1H+8BYJqiy0vS6D7Wpx3FBa83RxwBoPS/cRhPoKr1R+LQ9cAagKiextWKgAwRy2I2dLzcICE1ieRWACqjQfM62JT3p36Nb8Z0dT03ApnSoAxsgV4ocRiwcOleYldHFSZoMzCKGRHJz1MrUgqKQnicmP98qn8YogN+uJbVyrlRQKiT85SGYeBWroOQa7Ul313d6m1vgiFuoUERFqx+AEcFcBRyCnXU0wDvrMZHjXLxjAXrkSSNpUywZhkwxXTZx4/A7IznmyRK46fqG+mIhVQOfKZS4QBnvtBgH/ZbPRSA6IDAOSqwHz+QjI4S8zlreZ9aauTLKzKeiv5WC0KpgLEFOh/fugZsGBsAUIfeEb21xID4fEZ82q3InmK6f4m59B6MA9wCXOzczjOmPTLjIKMt9SmBVs+Rhq3/qQE0Lx1qBYPWj+omULYjHcyZatz70iGlmkuFBRySWVOLO7eMm0gtwL/HOrDrYUKdKY4iHM4yuTXv49zvp3G65qFZuiaKxYrGhCaea6LXXUe570/MqLURMIkS4ari/t+0Xc2vJUMU7+o7byB2YkVib2trZyeZWIn4GyzYzIbY2lhbIBKJhRAigURkYocdCwkLM2K+x2DGeO/defPue33VqeqTU3M+67qcSenbXdX9bq5fn+9zqpwb9EAvAFPhgjrxzAeP+3HA4dEFLJAiwqPMain2pNFihQZpxJna7fOgfhdLEngNBy8dwPpjDQQS9HC0oxt6CA6AqljEjKy2J63OxwGJOh+AC9PTiCtWEVzSsu7N2FhmMGYgaHqgyiIXC/Ydp9pQ8rkSPpEEPzq2beC6XQs0OeQccDAOQORqOmjpfn4PF+36Whp8rcfJrZepfYYlEexYNs2LuUkzzmDURTiP1/Hc+/78+/J1OiOgmg8Eu1SJGrfMuVzecJDVk8S4WUrleA66p/UA8GEHgFAXABYPOmc9kMg5Agtm0fK1MZek4XFiSwy3oLfArX2O1m+TMOvdz/Vo67kAFgInkz4GMNm9bK4eSc+E+eYzEB4xcffcL+eG/eVSAHCsF84iACMRfET+GkHuWwSkcCQLmBZ3IOWY7o/cKNp1y6nNdSuvNtk6j0JmODxns6nrlbvqNV6pxpMH6JqfLe335W5/Q/w9WJlnOaKFi5k9+PvOAEyDUBHaK4teEfzQnMX6oFhdY3+geKMI5uDiHMYTx5GoDSMmSAzMFieJozKx89wrm1RB7ZA1jyWOtkE1TcTpGGdi38V/6TXRjeLeexkpPZ+s6jFB0VLRARPmO9QjghAcpx/EAKyRkFMQ8h0kQbo6imAOCEvfs0RbK4I5x7QKlLxYsqfn9aV/SWDb6+IkCQ5Gt2MDkgpcCu63IKPreI/94kUBAc/QawHL/IyVmwP4sLPW7cyYxiS44DQX9X8WA7BaK0+VWgdJ0GMPAAiWj8XpLCXY0kcssODn2GqWP6L+jP5wYWTla4CPaqsjLkiKP5+X1jmCgeuB/Q72qBUKRV4opozfJRH4hpolg+WtYIRwAAIdpVpTfSYGYJXVT+bxGFuLvfUgG1oaIdKatQC5yf/oSDRGrqB/E6eOdL6ob4sHMKsPC3E6DZQ4B4ODD0Fn+zc1Y8Urb8WB1i+rL5lBWUVr62IqALxzuAIAcv3veO4b802PEbLrtJ/AEJwX2dDcKzjvggXJcUTbgJKtMKw3PE5epef4YlJWqWkZztynqdWlUCiNAb9cw+8iDRITQCoxPyOQWheMLwpGbYCh5FH+pXqseQNlbdX9j45gWAYRTPze5YjeScPRaj38OugEIThPnMLwLF9PbPbXBfe3+Ni06VHoPmHUo9+5QEQam6hLW1w01cXcqVtpwzBjavL0aIXIkqZakXnlBI7oYY0sr8jIVP7Bsd6zu1wW8SuIdMAbgRVMNFUD5FllPeR/gSXcJiNoBga/FovduF1b71Fv99EPcE2H1KrtIuvWA7n9zIYLphbkmgGCFnOnLpuUubtIRGAkUEclWQJrni9euTqM5HjGAbQ/tzQ535sRfVZeojgohJ6AXADG+p9ngUaVbjynLyrZlCQ5Ym9/Gq8tHI9ZW0VG1ouBIpYDDYlAhEfbZSNfSvZicDEP43iawTpWHrfIkJpKBkQF53EeoxLy3N/bI2efpD825YCQZ/QChH6VtrNQpAPZD+0+Hp61i2siH11vCn9/RovtT5Ogi2tIYic0nWvGSFfNR2vhrskAUUGrkOpGKnfqEkZy1Xm0RgZK30GWAQB4IQ5cumftQqu5JMQv7sD5UR57XQBcwItQd8N5xEjJgjQkcMVg7DYWwbGPKgKe/znmejag4xbBEei8/Y3bFCgvu1mIvcTFL3JHQ9zGLzENKZYxSoTZ05JkXQklMZzPALyzOhpOSPE75fHh3Np53QNAvOvxeSMSIor7gSuGfIFk/XI3TOzDk/MWyHqLdLzrKsgd8tqN8GGtl3l9MmsZUUJzLOqAxyHWk0mi4D2WU7k1iBCo3Ghpro3KC3Yyp2EtM+e7cOEixn05gWXyhmxYGQMQsqKfdjojWBwOxLQXWGfrQxcJP496DjIgbKzLRToejl6OGHYzbYiXNko/YR2xEUXA7TLoEsGP/H/0YhDwGBDvgcb0uRbktxs3h526gPsOr84Fbtc26ozg9EPG3RXB+rFiu1Ya06a+OQ1wlrMVxVzE5fQ5aUUzULvtMywwebqoup6c0QwMCKbY/RJliNPzGqCV+Mu6+R7jWLdiwNIBpSHAODu29/b3vS4HF/K4FLfmkP7As6t1MZsfVTggpKBDFwBmhHTreqHvLaCoCs5c65BnvIgKNTi6JNvo+iBpM56bfDycSxyYRKolvfbCeAyAZR45V8t92a70xekM01O5GUJwJSK2e+tWfQ5Jz5Y+TcIJ3d+i90ypEZYEHQIgK0ZzMkdA5CLTAwDnFpxz9Ha80tZLV06sZ1phOE9P9EJyjPPZMeCBuE/0cqnZMUOrTzKvdplZszLOpuIOGxYdz0G1lOochOCgLmZ3mVPyueVLxSDvuj2ix8GlLw0A4paeUAvA3SxecoHF/Xp1PH7OnM4CUNrzog5ZEWjaqIal27n+wdbpnPQXjsCH1/UmTN4LxrkmYY7AmIn1kKHy3NoFv3Y2oIKoNRgO4zDV50LH1xJnu49MXqA2BevK4NDCYYHw4Mv5cLoAWVK7L1zMBWlY/QZjXS3mlL0iXNRnbEEcdNFaGgQaLfWKRz8whuv7A1Fi6Gvk/QObQzDiIPDh36cy0gzQ69euFQa0SI37iMbbeXxF53IsdpI9mecOMgifEG0VCAhQJ2zqgUCB26XLmexQv7UcU6zfxfdHc15rDWEktBkvGHJD6m7cLoEcO9M5k1AAvHPyZIl+/Hnzr2HRTIz0EehFsIK33arrfavBIIhgSE4AMdz6Ahtqgbmt3ub59vqAGYMkBvnmANX2Y9OTClrAkKis5P1WsTVMRxbyQ5EMn4UhhNYwFpznMeG90wRqGIhqTL/iBAbsd9vvFVe92G8ZZQewLwgkqIIY9rKKPZDQXJwaZe0m5MWJcfDYr7Y+AprnA7RcK/KabAglHb+2y8WXHHBigZPdh8YHAq4Fd0K9a5pKIfwC5mGuAhUyn+ueMBwYdP7ef7JRzf1puLVcl1TqU8o031kocjBHFjDnjHyuJ9HTy9nz7tcMF/tzzKGjBFY7t5FxKAYc//fFowPAFuSJ1aGMzRYPExWg1/nqDyxr/s7c7+B44gXkLRjf6ZIOGWAhLdclRf9zp1sWJid4b2gELCuAH7lEeMXZdnqaBI0H1Pg5sUiXmS54zrkkcWifE8pUNAZAenhiTnB1LxEc43jXzqgHhyvkYBx83buogxESUl7zc4bW86JWmERX65TuzWiJEj0j48DzFdqg3Z44p7dKL2OdkCUZ4DHxtCvOxfp+P3kdvysVFGkGBoGV3YPllwc5Cra7vxxOcCATvZzH99vvFyz3i3tFmYCkBOwPAiCMRYUEEAdOFOflepzVyNHS8TSwRLu1a383ihX7gMR1KSHX0owV7kT28/6slDQOrDHJexoRPDHjqLRio/0BvdDbwbyJD1HMAWNa1WyG006xOvaNiRRmN3QmgRPHghl5wLDA5+lvHieOQ4AyIuJxGKr/YOAYfMdzC2hX/NKsBGYKdEoIvYGatZ+5X7IB+GYen2y/Y7o0Rq5nXfBjKFo3uCDEBbF5jQRXHMe1wGMZK5q164kk9R5G/eCLXTSxAdRani0Y7DxA/VnIRS0RzOPE5T8KkBmnJs5LjnCQdJNvvb5mTcQcMOaCP5q7YVNHeV3sxuGpmOLMZP45OtfEb/hceU7Do7Wm71ngkq4Yu70cX+/EjBOuSwA4Yy4PwR3nxNOD2wdttwP+4nyRx+tDL4kQW8wFf/B2P8Rtu4A6i9Fj901/EZH1XE8x72+h0U/x988jEfi0JAJaxwqkwvoPspatyAb5/6zfiudvzueHUAvegEaRFS/BYTsOGHPBnyBBIeCCXny3L3baz+WiRM9NdqDsWWPN9wCVO5s5+FpxR3N2Brius0l9k4ERKbZ6p5n7TcfHGYCHFXx63cfXebz6vwMwr7+0qq07HjaMEQpWSy5gc6B+ERplHkfg8lKn/Of2i2w/rqwYVWxVlN3Nz+MMI6bTDUyMIqX13Rdw96TV4WpmHqZYfyaPyzixnRESE1TMfUunwiDBVr6eKOpJ1OzVrSJjgxWGh6CO/ZH9L4Yv8hGE9kO8UCUMKT6l4cLKPikdjDhfy9jgGRWH45iwl2Ne/g971wOpZxXGf8+9dw0CSJUEgRSiktQaq7BaNUlIFlJaVWpURgkaK9GyBI1S0FRNFqkkrcKSJkiZzTRGTSRsTffe07H3vZ33u7/zPb/7tPvu65vvx+O73nvec+/ld59znv8Yhq+zfAsBoQHDWnBNyZYmQpAWlFqIoaMfmhBL1VrqeW3Ob/RYVnXQtRpgmX5VwJrUhh67qWs9D763oOXKk5MtNxIohNfFrVl+hYDIB4xhtmH8w2B0i7JrGk8F9tWlnpt7x+90asInk1sTbakxZ9eVkjEw8zfpDB8voZfugd5fY4vvne3drzQMZXK3Lde2QUBrwLgWPDoLXALgMjjoNOfWzmh9hEW0ae0fgAgTJJ8YOKhj2CWvj1tgGLllSHvpRA3uplAnTtf3yNGShY8S2Rqu8de0Da3QvwZkLfgFgKd0UY4+qnSBEuQRGC8YMkGYcJ2H9/vzz6wYO12kwL2U/XgaNkBw9u3NnUzJL6UDFbyS5V1kjISA+d3js035wBowhs27jWgzZV2SVgtYv56lzXFhDZWORdOOqP9egXf0+hpRnBZ8DwTMeO18S8Au9WzRuJRW+833S0BNwj2zTXTk7KA1GJkATp8OkdURq0isSauhhsJ0FzUitJNubpT06VI24/gJ3+EXZW2T4XFfm3aFngmoMdv8IhvggNwgzbMI6TyS6WOZ99YE4SmSEdLpvR1rNTn3YllqYDbcyZ2JZWxmDytgZ+I1OnEfGaCjJGDe4+AscBXNA4tFE1S8VZVMeoOfI9pJDZdWEv37uAcOj9gKZf+071F9sLWfZQ3pwGIomS08rLl2Vg9rt9afI1rjnvaXMpE0Gomlxo5uXUPc/TrS+SBk3BDYNeJHbrpp87yvvm9yRVs92bQQdWFNJxWsJCCmQQPlRcD2Y5kwk2BYDqw0/HEipfsB7PB8g9ktE0iZJ3IIElJRuob244kGQwJs2Ys6F45+pFaMur8SyvcL+RgNyRtydZg1nwa6alGBVNvj5WksHzIfzJZvM7N9c8CNAC6KGhjOenWXY7Loe5885nkvfp8QS7Dgrqi1TOZCPrfDVqKEAiZ3tyCJYyMUO+Y4cTM94cgICagx13jGnxSXZkVC9TVFQ+RdUFumERdQ5PqgjSluKDSQjfIv/JoYMmKMiE6EiqScbcvyBpYZ01OKgHEteGy+KUperxs8mqo6k5ZwBYp4ghwyAhIpcpd/BxODCWT1d4b7/8zqvsWGrDS2gSvxiKWHsqxFD5hCD1hh9iaAj4kgejyVzgPUrSko6VWQVOxHawJHsEilKs8oXjvVJWudoEwctqj5Z5kRIROkJbAOAqM/grnD6gcAHjezsyJaKu7TM0Wq0N2vhVhLUD9XlyJwiWYhXiEhzYZzUNZ2CezVCddLLDfDsCsL+pCpvjZeMWXHzex2OBD97lTyZSxSEe/xonL5VHRl6VZwSqSdul0RFsQWDax26cdDDv3cwwQYSNt+k2UresQUesSM4XMALwUu7IRwN1V9DIpm5uHOBio5Qf+twuhKi3vIALGOYEM6ayUK0Q3w8USWm7OgNyEjpAdMGT5LTbPz80XCQlSrqGq1SHqV2EdqvIhlr9cOi2YIRz71kXEyZRLZGoRbsvyIPkEE7Amp6bC1SWhczypejsQF+nR8hF4Wj0eCUC8ZE1EcmpZkNmxWiEesYnDU75z8RsLWpsC8f8wgoXdMA7/PNf9Rn8CBikbwMaYbiufPSJq+bJ4UgO7eVSGCcQyXXTVsTXMyail4byXDuQ9at77DbDNOE2aKmu6dhJ/OpfQ8gGccApLmEfM/JHHzXrokUz+P7uHdM3kt+6gGn5vVSCdLL7vlncb9Bmv7/YmU1uI0YoaOhn4tnmfngaup46qoJ5FEYEIIZ3DYIIoSWLYJIZTIR/UYTWbkUqGxDIP70M9kEhNughnNcxtjDcho/8MOk1ESO3ZVTJjWBso91ZoAuYPEZOKxcdEID66mfejoLuvrWnWjKK0cUyOENUNKTfekR0ONI7WRokjqZkxniVnG8Tuf0r7Dh2w7TupUdy6TZdxdbyC8nuU5jABTI/mhZvsBrI/k9ekOWzpUV0D9q6N9oRUZaU9hCNWzYCqJpOCBg2SAuH8DGyV7szwAwrgTUJPww9YgIXKEoUcVeKNN9fv8bqSxEYlHbBt0OpcuqYu1YY1kwi9oIBylgrIzmoBMwi2lm7omloA6zgQxJam8ctGlHqdaqw5ptZGGDbAR5BNYneUYCGfsHZBhZu8nYJ2ZXRBMVhApXjpMpn19OsIiQHuL1HoiNmlOzpLm73lx37LotibWO1rMgDASEq4GcCDLeQFHtedHVEMFu+tqa71n9LVAZExtl6TcFb88F64YWaC+CWa7IXCGuGE0DDiWUroOwM9ZplFHNFmgECywH0VQxLqAj9FrC1y/a4JAERS5hrE9y8somGjAlgQHUkprAHwZapcW9yWW5+T4Lt+XVX26+abXWJ2IJw2dLNSqly3poh3r+MiAxzAi6ElJoyfhnvmUNgB4C4yI9olMWPJGQdBx/V/SxwjC8BGuE9eCd/DDsGlXZ7YVHLeM36Z4cdy9oS1iTt2vE0K/p8Fk8bSdvjuylax6wxzJsgr/Q0yLe9KoNOFXqQnVXSljszrl6lSr25ZrAlOAdHq6lKni84ITWS4Hjc2f3AGVJnxwPqULm8RICS/9Sh2x3j2RjQcuVo9EbIY9o8HdclpAu55dM4TrYfYLKphYwZqE6/JR9x2AK7KEEg7aZ/puqN037jtm5hkukbAgkVAQmt0t/M4dKsFgcgfUWJXlcLAnS/x4K7NNaE33ef6s7Rs9bkWkRE0Z1V0MMh7JsgsCkzugtoxnAbzTBsxXnkLD80g7XpFhQ+uXagxRxMMhpzi2XV/gliwvwMGEgAFYkyS5O8tD4c6qOlSnuh/o9mjaxaI0c3Sminf87sjyBAQmBIyT8DcAe7LcGyYg+wHjhU68Tyz1Xs9QJoOE7oj6Hrg7y93ImBCwHxIeAvBTljsDqfJqndjjlOqGhTYrotZqYG+WGxDExA0TJ+HOlNI5ALaL8JcgigyhdYuavHCgNw00ejxXXT7aSEn7LeBonoTiTp2Er86ndK6ImChXjUMeIoSbQiWhfXuey0ZpxaNZrknA3xhDWB4wjXFFSuk1ABsDlq88mh2jzO1B7SBGPCasR8C/slya5SDGFJZHq2KswBpqJ4C7AoZEtBtDYMYIQZOofEbJh9ZB/z3GGNMZGGeY2XsppWsBXEwkiGjBePJrwPAQz2Pk+6e9M4CsKo7CeKsGwlDARCBCKbXX08BMpESRQi0oQ5IKpbKgTEITwlDkFWSoSsQkJAtqsyKJoLIoJMqqVj8scuc59369t7d73/fxc+7jMfg51/nvvnP/XnbDYyAWsNESVhBgM7VdvBULG/lD9G4Yi7oD7kEDYwGTslydvhUvEX5XIuwMFNDkS37eD9ehEJkPhQjDww9KGd4HnUe+bf5LymR7AjqW7xhchiAeQho5lCylS41z2SZOxtKqDWrwyH4gV/z9fjgFxALOdQlXIMIYl63SO0p0GYPDanlguQQHgVjAXIAAJcoTIIqEuohQs4mYVGAvEAuYNwm7KA9SSah3vFgsXcqbsB2IBcyrhFspt4HIIqpoXY/AcLBH0VNwHkCgO0i4W5Ah2hWjyxf/nZFAPnfAHA4mvcg4mGKaTSu2Klw0jIxT1sAvmJPxwwh69zmCOBfSbraXo3fB15RV8A1yF9+CY7EGkLCPy0bcdqO9hO/4WMqTfO6AuhD9LcGrCKRuqB+/fISVMAFNlWLaF0t1EgEWcXmoilzhQ6nxiraZv4Srki/Q0RzyuQMmBRmk9KY8gM60DzBIcm3GSyAWsBklrFD2yOd+OlOwFkahwPEQEnW2HsqQPIDodAryuQMWuBPepWwB+dwvwxKlLi4fJr9gAS3hMKVbO4SOt7NOswnugwMtM56Idh5BZ9a3YKbMNrhl7SxgxAish1pmF9wAx0NIyAZ4BrVKj+WzgFmYgjI8h//NPrgGjv8TkonvDA9l6lNYLk7BB+AKyPEQ4sm4jTIKyzIOJIfhohULBEy1ns1ZDGPQDmlyHM6D4yGkJnyCdfABovRZPgtYDyYACZGxes7AWXAsYF14Cx3wGZI5B6fBsYB15Q2UEi96HoAT4FjAWeEVlOAnDMFRcHwOOKu8gFZw3AGNBTTGApq88QfaPR1cTtDGyAAAAABJRU5ErkJggg=="
});
