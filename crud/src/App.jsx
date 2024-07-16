

import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuth } from './Utils/contextAPI.jsx';


// Un - Auth
import LoginLayout from './components/Layout/loginLayout/index.jsx';
import LoginPage from './Pages/RegistrationPage/loginPage.jsx';
import SingUpPage from './Pages/RegistrationPage/singUpPage.jsx';
import ErrorPage from './components/Error.jsx';

// Auth
import DashboardLayout from './components/Layout/dashboardLayout/index.jsx';
import ProductPage from './Pages/Product/index.jsx';
import CreateProduct from './Pages/CreateProduct/index.jsx';
import UserList from './Pages/Users/index.jsx';
import ProductList from './Pages/ProductList/index.jsx';





function App() {
  const { isAuth } = useAuth();

  const router = createBrowserRouter([

    {
      id: "root",
      path: "/",
      loader() {
        return { user: isAuth || "" };
      },
      element: <LoginLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: "login", element: <LoginPage /> },
        { path: "sign-up", element: <SingUpPage /> },
      ]
    },
    {

      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={"product"} />, index: true },
        {
          path: "product", element: <ProductList />,
          children: [
            { path: ":id", element: <ProductPage /> },
          ]
        },
        { path: "create-product", element: <CreateProduct /> },
        { path: "edit-product/:id", element: <CreateProduct /> },
        { path: "user-list", element: <UserList /> },

        { path: "*", element: <ErrorPage /> },
      ]
    },
    { path: "*", element: <ErrorPage error="404" /> },
  ]
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
export default App
