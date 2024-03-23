
import axios from "axios"

export const getData =  (url) => {
    return axios.get(url);
}

export const combineData = (users, todos, posts) => {
    const result = users.map((user) => {
        const userPosts = posts.filter((post) => post.userId === user.id);
        const userTodos = todos.filter((todo) => todo.userId === user.id);

        return {...user, posts : userPosts, todos : userTodos};
    });

    return result;
}

export const groupBy = (data, key) => {
    return data.reduce((acc, item) => {
        const keyValue = item[key];
        if (!acc[keyValue]) {
            acc[keyValue] = [];
        }
        acc[keyValue].push(item);
        return acc;
    }, {});
}