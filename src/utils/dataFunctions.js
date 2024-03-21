
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