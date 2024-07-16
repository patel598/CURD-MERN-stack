import React, { createContext, useContext, useEffect, useState } from 'react';


// custom import
import ToastMessage from './Toaster';
import BaseUrl, { LOGIN } from '../API/BaseUrl';

// Creating a context for authentication
const AuthContext = createContext();

// Creating a provider component
export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(false)
  const [getSingleData, setGetSingleData] = useState({})
  const [isAuth, setIsAuth] = useState(false)

  const atk = localStorage.getItem("atk")
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ""

  useEffect(() => {
    atk ? setIsAuth(true) : setIsAuth(false)
  }, [atk])


  // login user API
  const signin = async (bodyParam) => {
    try {
      setLoading(true)
      const { data } = await BaseUrl.post(LOGIN, bodyParam)
      if (data?.status) {
        ToastMessage("success", data?.message)
        localStorage.setItem("rtk", data?.refreshToken)
        localStorage.setItem("atk", data?.token)
        localStorage.setItem("user", JSON.stringify(data?.user))
        setLoading(false)
        setIsAuth(true)
      } else {
        ToastMessage("error", data?.message)
        setLoading(false)
      }
    } catch (error) {
      ToastMessage("error", error?.response?.data?.message)
      setLoading(false)
    }
  };

  const getProductDataById = async (url) => {
    try {
      const { data } = await BaseUrl.get(url)
      if(data?.status){

        setGetSingleData(data.data)
      }

    } catch (error) {

    }
  }

  return (
    <AuthContext.Provider value={{ signin, loading, getProductDataById, getSingleData, setGetSingleData, isAuth, setIsAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
