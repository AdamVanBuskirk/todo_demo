var config = require('../config.json')

export const addTodo = (event: React.FormEvent<HTMLFormElement>) => new Promise((resolve, reject) => {

    event.preventDefault();

    const target = event.target as typeof event.target & {
        name: { value: string };
    };

    fetch(config.baseUrl + "/api/todo", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: target.name.value })
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

export const getTodos = () => new Promise((resolve, reject) => {

    fetch(config.baseUrl + "/api/todo", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
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

export const deleteTodo = (id: number) => new Promise((resolve, reject) => {

    fetch(config.baseUrl + "/api/todo", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
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