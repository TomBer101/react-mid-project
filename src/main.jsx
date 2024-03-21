import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import AddUserPage from './pages/AddUserPage.jsx';

// const router = createBrowserRouter([
//   {
//     path : "users",
//     element : <Layout />,
//     children : [
//       {
//         path : "add",
//         element : <AddUserPage />
//       },
//       {
//         path : ":userId",
//         element : <AddUserPage />
//       }
//     ]
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
