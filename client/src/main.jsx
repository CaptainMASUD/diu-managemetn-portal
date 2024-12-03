import React,{StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css"
import { persistor, store } from './Redux/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Profile from './Components/Profile/Profile';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import AdminPanel from './Components/Admin/AdminPanel';
import StudentPanel from './Components/Student/StudentPanel';
import TeacherPanel from './Components/Teacher/TeacherPanel';
import AboutPage from './Components/About/About';
import Courses from './Components/Courses/Course';
import Contact from './Components/Contact/Contact';

const router = createBrowserRouter([
  {
    path :'/',
    element: <Layout/>,
    children : [
      {
        path:'',
        element : <Home/>
      },
      
      {
        path:'login',
        element : <Login/>
      },
      
      {
        path:'register',
        element : <Register/>
      },
      {
        path:'profile',
        element : <Profile/>
      },
      {
        path:'admin',
        element : <AdminPanel/>
      },
      {
        path:'student',
        element : <StudentPanel/>
      },
      
      {
        path:'teacher',
        element : <TeacherPanel/>
      },
      {
        path:'about',
        element : <AboutPage/>
      },
      {
        path:'courses',
        element : <Courses/>
      },
      {
        path:'contact',
        element : <Contact/>
      },
      

      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
</StrictMode>
)
