//importing
import { createContext, useContext, useEffect, useState } from "react";

//this is for createcontext
export const myData = createContext();

//this is for data
export const ForMyDataProvider = ({ children }) => {
  const logedInUserId = localStorage.getItem("uid");
  const [userData, setUserData] = useState({});
  const [isPassword, setIsPassword] = useState(true);

  //this is for getting data Logedin User
  const getUserData = async () => {
    const url = `https://backend.militaryhousingcenter.net/api/requestuser/${logedInUserId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setUserData(data);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in get loged in user data", err);
    }
  };

  //this is for getting user data on first time load
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <myData.Provider
      value={{ userData, logedInUserId, isPassword, setIsPassword }}>
      {children}
    </myData.Provider>
  );
};

//this is for my custome hook
export const useRiazHook = () => {
  const myAllData = useContext(myData);

  if (myAllData) {
    return myAllData;
  } else {
    console.log(
      "there is error in usecontext hook in store file and component not wraped correctly "
    );
  }
};
