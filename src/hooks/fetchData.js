import React, {useState, useEffect, useMemo} from 'react';

const USERS_URL = "https://jsonplaceholder.typicode.com/users"
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts"
const TODOS_URL = "https://jsonplaceholder.typicode.com/todos"

const useFetchCombinedData = async () => {
    const [rawData, setRawData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [userResponse, postsResponse, todosResponse] = await Promise.all([
            fetch(USERS_URL),
            fetch(POSTS_URL),
            fetch(TODOS_URL),
          ]);
  
          const users = await userResponse.json();
          const posts = await postsResponse.json();
          const todos = await todosResponse.json();
  
          setRawData({ users, posts, todos }); // Store raw data
        } catch (error) {
          setError(error);
        }
      };
  
      fetchData();
    }, []);
  
    // Process data using useMemo
    const processedUsers = useMemo(() => {
      if (error || !rawData) {
        return []; // Handle error or loading state
      }
  
      const { users, posts, todos } = rawData;
  
      // Process data into desired format
      const processedUsers = users.map((user) => {
        const userPosts = posts.filter((post) => post.userId === user.id);
        const userTodos = todos.filter((todo) => todo.userId === user.id);
  
        return { ...user, posts: userPosts, todos: userTodos };
      });
  
      return processedUsers;
    }, [rawData, error]);
  
    return { processedUsers, isLoading: !rawData && !error, error }; // Return relevant data
  };
  
  export default useFetchCombinedData;
  