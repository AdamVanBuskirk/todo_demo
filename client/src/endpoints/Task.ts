var config = require('../config.json')

export const addTask = (event: React.FormEvent<HTMLFormElement>) => new Promise((resolve, reject) => {

    event.preventDefault();

    const target = event.target as typeof event.target & {
        listId: { value: number };
        description: { value: string };
        dueDate: { value: string };
        priority: { value : number };
    };

    fetch(config.baseUrl + "/api/task", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            listId: target.listId.value,
            description: target.description.value,
            dueDate: target.dueDate.value,
            priority: target.priority.value
        })
    })
    .then(response => {
        if (response.ok) {
            resolve(response.json());
        } else {
            response.text().then(function (text) {
                reject(text);
            });
        }
    });
});

export const editTask = (event: React.FormEvent<HTMLFormElement>) => new Promise((resolve, reject) => {

    event.preventDefault();

    const target = event.target as typeof event.target & {
        listId: { value: number };
        taskId: { value: number };
        description: { value: string };
        dueDate: { value: string };
        priority: { value : number };
        taskComplete: { checked : boolean };
    };

    fetch(config.baseUrl + "/api/task", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            listId: target.listId.value,
            taskId: target.taskId.value,
            description: target.description.value,
            dueDate: target.dueDate.value,
            priority: target.priority.value,
            complete: target.taskComplete.checked
        })
    })
    .then(response => {
        if (response.ok) {
            resolve(response.json());
        } else {
            response.text().then(function (text) {
                reject(text);
            });
        }
    });
});

export const deleteTask = (taskId: number, listId: number) => new Promise((resolve, reject) => {

    fetch(config.baseUrl + "/api/task", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ taskId: taskId, listId: listId })
    })
    .then(response => {
        if (response.ok) {
            resolve(response.json());
        } else {
            response.text().then(function (text) {
                reject(text);
            });
        }
    });
});
