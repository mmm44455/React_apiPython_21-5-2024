import React from 'react';
import App from '../App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from '../pages/App/HomePage';
import BoardPage from '../pages/App/BoardPage';
import Rootlyout from '../layout/Rootlayout';
import Account from '../pages/App/AccountPage';
import CountDownTimer from '../example/CountDownTimer';

const router = createBrowserRouter([
 
  {
    path:"/login",
    element:<App></App>,
  },
  {
    path:"/",
    element:<Rootlyout/>,
    children:
    [
        {
            path:'/',
            element:<HomePage/>
        },
        {
            path:'board',
            element:<BoardPage />
        },
        {
          path:'account',
          element:<Account/>
        },{
          path:'time',
          element:<CountDownTimer/>
        }
    ]
  },
 
])
const AppRouter= ()=>{
    return (
        <RouterProvider router={router} />
    )
}
export default AppRouter
