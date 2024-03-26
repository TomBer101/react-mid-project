import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'

import { getData, combineData, groupBy } from './utils/dataFunctions'
import UsersPage from './pages/UsersPage'
import UserPage from './pages/UserPage'
import AddUserPage from './pages/AddUserPage'
import axios from 'axios'
import UserForm from './components/UserForm'

const USERS_URL = "https://jsonplaceholder.typicode.com/users"
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts"
const TODOS_URL = "https://jsonplaceholder.typicode.com/todos"

function App() {
  //const [combinedData, setCombinedData] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupedTodos, setTodos] = useState([]);
  const [groupedPosts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [userswithUncompletedTodos, setUserswithUncompletedTodos] = useState(new Set());
  const [chosenUser, setChosenUser] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);


  useEffect(() => {
    const populateData = async () => {
      try {
        const [{ data: users }, { data: posts }, { data: todos }] = await Promise.all([
          getData(USERS_URL),
          getData(POSTS_URL),
          getData(TODOS_URL),
        ]);

        setUsers(users);
        setTodos(groupBy(todos, 'userId'));
        setPosts(groupBy(posts, 'userId'));

      } catch (err) {
        console.error('There was an error fetching the data: ', err);
        setError(err)
      } finally {
        setIsLoading(false);
      }

    }

    populateData();


  }, []);

  const deleteUser = (userId) => {
    setChosenUser(null);
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));

    setPosts(prevPosts => {
      delete prevPosts[userId];
      return prevPosts;
    });

    setTodos(prevTodos => {
      delete prevTodos[userId];
      return prevTodos;
    });

  }

  const updateData = (userId, newData) => {
    setUsers(prevUsers => {
      return prevUsers.map(user => {
        if (user.id === userId) {
          // Merge the existing user data with the new data
          return { ...user, ...newData };
        }
        return user;
      });
    });
  }

  const addTodo = async (todoTitle) => {

    try {
      const newTodo = {
        title: todoTitle,
        completed: false,
        userId: chosenUser
      }

      const { data: addedTodo } = await axios.post(TODOS_URL, newTodo);
      console.log('Added todo: ', addedTodo);
      setTodos(prevTodos => {
        const newTodos = { ...prevTodos };
        newTodos[chosenUser].push(addedTodo);
        return newTodos
      }
      );

    } catch (err) {
      console.log('There was an errror adding a todo: ', err);
    }
  }

  const onAddPost = async (post) => {
    try {
      const newPost = {
        ...post,
        userId: chosenUser
      }

      const { data: addedPost } = await axios.post(POSTS_URL, newPost);
      console.log('Adde post: ', addedPost);
      setPosts(prevPosts => {
        const newPosts = { ...prevPosts };
        newPosts[chosenUser].push(addedPost);
        return newPosts;
      })
    } catch (err) {
      console.log('There was an errror adding a post: ', err);

    }
  }

  const addUser = async (user) => {
    try {
      console.log('User to add: ', user);
      const {data : addedUser} = await axios.post(USERS_URL, user);
      console.log('Added user: ', addedUser);
      setUsers(
        [...users, addedUser]
      );
    } catch (err) {
      console.log('There was an errror adding a user: ', err);

    }
  }

  useEffect(() => {
    console.log("todos: ", groupedTodos);
    const openTaskUsers = new Set();
    Object.keys(groupedTodos).forEach(userId => {
      const todos = groupedTodos[userId];
      const hasUncompletedTasks = todos.some(todo => !todo.completed);
      if (hasUncompletedTasks) {
        openTaskUsers.add(userId);
      }
    });

    setUserswithUncompletedTodos(openTaskUsers)
    console.log('after calal: ', userswithUncompletedTodos);
  }
    , [groupedTodos]);

  const handleCompleteTodo = (todoId) => {
    setTodos(prevTodos => {
      const newTodos = { ...prevTodos };
      newTodos[chosenUser] = newTodos[chosenUser].map(todo => todo.id === todoId ? { ...todo, completed: true } : todo);
      return newTodos;
    })
  }


  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div className='app'>
      <div className="users-page-item">
        <UsersPage
          users={users}
          deleteUser={deleteUser}
          updateUser={updateData}
          chooseUser={setChosenUser}
          chosenUser={chosenUser}
          openUserForm={() => setShowUserForm(true)}
          usersWithUncompletedTasks={userswithUncompletedTodos} />
      </div>
      <div className="user-page-item">
        {chosenUser && !showUserForm && <UserPage
          posts={groupedPosts[chosenUser]}
          todos={groupedTodos[chosenUser]}
          onAddTodo={addTodo}
          onAddPost={onAddPost}
          userId={chosenUser}
          markTodoCompleted={handleCompleteTodo} />}
        {
          showUserForm && <UserForm handleAddUser={addUser} onCancel={() => setShowUserForm(false) } />
        }
      </div>
    </div>

  )
}

export default App
