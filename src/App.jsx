import { useEffect, useState } from 'react'

import './App.css'

import { getData, groupBy } from './utils/dataFunctions'
import UsersPage from './pages/UsersPage'
import UserPage from './pages/UserPage'
import axios from 'axios'
import UserForm from './components/UserForm'

const USERS_URL = "https://jsonplaceholder.typicode.com/users"
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts"
const TODOS_URL = "https://jsonplaceholder.typicode.com/todos"

function App() {
  const [users, setUsers] = useState([]);
  const [groupedTodos, setTodos] = useState({});
  const [groupedPosts, setPosts] = useState({});
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
        console.log('TODOS finally populate data: ', groupedTodos);
        console.log('POSTS finally populate data: ', groupedPosts);
      }

    }

    populateData();


  }, []);

  useEffect(() => {
    console.log('after users changed:')
    console.log(groupedPosts);
    console.log(groupedTodos);
  }, [users])

  const deleteUser = (userId) => {
    setChosenUser(userId === chosenUser ? null : chosenUser);
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
      setPosts(prevPosts => {
        const newPosts = { ...prevPosts };
        newPosts[chosenUser].push(addedPost);
        return newPosts;
      })
    } catch (err) {
      console.log('There was an errror adding a post: ', err);

    }
  }

  const handleChoosingUser = (userId) => {
    setChosenUser(userId);
    setShowUserForm(false);
  }

  const addUser = async (user) => {
    try {
      const {data : addedUser} = await axios.post(USERS_URL, user);
      addedUser.id += users.length;
      setUsers(
        [...users, addedUser]
      );
      setPosts(prevPosts => {
        return { ...prevPosts, [addedUser.id]: [] };
      });      
      
      setTodos(prevTodos => {
        return { ...prevTodos, [addedUser.id]: [] };
      });


    } catch (err) {
      console.log('There was an errror adding a user: ', err);

    } finally {
      console.log("grouped posts after user added: ",groupedPosts);
      console.log("todos posts after user added: ",groupedTodos);
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
          chooseUser={handleChoosingUser}
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
