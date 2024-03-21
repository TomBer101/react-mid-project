import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { getData, combineData } from './utils/dataFunctions'

const USERS_URL = "https://jsonplaceholder.typicode.com/users"
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts"
const TODOS_URL = "https://jsonplaceholder.typicode.com/todos"

function App() {
  const [combinedData, setCombinedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);


  useEffect(() => {
    const populateData = async () => {
      try {
        const [{data : users}, {data : posts}, {data : todos}] = await Promise.all([
          getData(USERS_URL),
          getData(POSTS_URL),
          getData(TODOS_URL),
        ]);
        console.log(users);
        console.log(posts);
        console.log(todos);

  
        const combinedData = combineData(users, todos, posts);
        console.log(combinedData);
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
    <>
      Hello
    </>
  )
}

export default App
