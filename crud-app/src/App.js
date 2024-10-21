import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css';
import AddCategory from './module/AddCategory';
import Category from './module/Category';
import RootLayout from './module/RootLayout';
import Detail from './module/Detail';
import Update from './module/Update';
import LogIn from './module/LogIn';
import SignUp from './module/SignUp';


const router = createBrowserRouter([
  { path: 'login', element: <LogIn /> },
  { path: 'signup', element: <SignUp /> },
  {
    path: 'dashboard', element: <RootLayout />, children: [
      { path: '', element: <Category /> },
      { path: 'category', element: <Category /> },
      { path: 'add-category', element: <AddCategory /> },
      { path: 'detail/:id', element: <Detail /> },
      { path: 'edit/:id', element: <Update /> }
    ]
  }

])


function App() {
  return (
    < >
      <RouterProvider router={router} />
    </>
  );
}

export default App;
