import axios from "axios";
const apiUrl = "https://react-to-doapp-server.herokuapp.com/api/tasks";

export function getTasks() {
     return  axios.get(apiUrl);
}

export function addTask(task) {
    return axios.post(apiUrl, task);
}

export function updateTask(id, task) {
    return axios.put(apiUrl + "/" + id, task);
}

export function deleteTask(id) {
    return axios.delete(apiUrl + "/" + id);
}
export function deleteCompleted() {
    return axios.delete(apiUrl + "/");
}
export function updateTaskContent(id,task){
    return axios.put(apiUrl + "/Update" + id, task);
}