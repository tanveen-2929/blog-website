import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ErrorPage from './ErrorPage.jsx';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import "./../node_modules/bootstrap-icons/font/bootstrap-icons.min.css"
import './index.css'
import App from './App.jsx'
import { Home , About, SignIn, SignUp,Forgot,Reset,Password,Profile,Avatar,Category,Create,CategoryList,CreateCategory,Login
  , Dashboard,Blog,Article,Update,List,UserLayout,AdminLayout,AuthLayout,Users,Articles} from './components/Index.js'
import {AuthProvider,useAuth} from './context/AuthContext.jsx'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({element})=>{
  const {isUserLoggedIn,setIsUserLoggedIn,isAdminLoggedIn,setIsAdminLoggedIn}=useAuth()
  return isUserLoggedIn ? element : <Navigate to="signin"/>
}
const SecureRoute = ({element})=>{
  const {isUserLoggedIn,setIsUserLoggedIn,isAdminLoggedIn,setIsAdminLoggedIn}=useAuth()
  return isAdminLoggedIn ? element : <Navigate to="login"/>
}
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthProvider><App /></AuthProvider>,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/blog/:category", element: <Blog /> },
        { path: "/article/:id", element: <Article /> },

        
      ],
    },
    {
      element:  <AuthProvider><UserLayout /></AuthProvider>,
      errorElement: <ErrorPage />,
      children: [
        { path: "/profile", element: <PrivateRoute element={<Profile/>}/> },
        { path: "/avatar", element: <PrivateRoute element={<Avatar /> }/>},
        { path: "/password", element: <PrivateRoute element={<Password />}/> },
        { path: "/create", element: <PrivateRoute element={<Create />}/> },
        { path: "/list", element: <PrivateRoute element={<List /> }/>},
        { path: "/update/:id", element: <PrivateRoute element={<Update /> }/>},
      ],
    },
    {
      element: <AdminLayout />,
      children: [
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/category", element: <Category /> },
        { path: "/users", element: <Users /> },
        { path: "/articles", element: <Articles /> },
      ],
    },
    {
      element: <AuthProvider><AuthLayout /></AuthProvider>,
      errorElement: <ErrorPage />,
      children: [
        { path: "/signin", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/forgot", element: <Forgot /> },
        { path: "/reset", element: <Reset /> },
        { path: "/login", element: <Login /> },
      ],
    },
  ]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    </StrictMode>,
)
