import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { getData, combineData } from './utils/dataFunctions'
import UsersPage from './pages/UsersPage'
import UserPage from './pages/UserPage'
import AddUserPage from './pages/AddUserPage'

const USERS_URL = "https://jsonplaceholder.typicode.com/users"
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts"
const TODOS_URL = "https://jsonplaceholder.typicode.com/todos"

function App() {
  const [combinedData, setCombinedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [chosenUser, setChosenUser] = useState(null);


  useEffect(() => {
    const populateData = async () => {
      try {
        const [{ data: users }, { data: posts }, { data: todos }] = await Promise.all([
          getData(USERS_URL),
          getData(POSTS_URL),
          getData(TODOS_URL),
        ]);
        // console.log(users);
        // console.log(posts);
        // console.log(todos);


        const combinedData = combineData(users, todos, posts);
        // console.log(combinedData);
        setCombinedData(combinedData);
      } catch (err) {
        console.error('There was an error fetching the data: ', err);
        setError(err)
      } finally {
        setIsLoading(false);
      }

    }

    populateData();

  }, []);


  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
      <div className='app'>
        <div className="users-page-item">
        <UsersPage users={combinedData} />

        </div>
      </div>

  )
}

export default App
