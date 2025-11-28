import { createContext, useState, useMemo, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const ThemeModeContext = createContext({ toggleTheme: () => {} });

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');
  let [loginUser, setLoginUser] = useState("");
  let token = localStorage.getItem("token");

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(()=>{
    // console.log(loginUser);
    // console.log("바뀐 mode : "+mode);
    if(loginUser){
      let param = {
        mode : mode
      };
      // console.log(param);
      fetch("http://localhost:3020/user/mode/"+loginUser,{
          method : "PUT",
          headers : {
              "Content-type" : "application/json"
          },
          body : JSON.stringify(param)
      })
          .then( res => res.json() )
          .then( data => {
             
          } )
    }
  },[mode]);

  useEffect(()=>{
    if(token){
      const decoded = jwtDecode(token);
      setLoginUser(decoded.userId);
    }
  },[])

  const value = useMemo(() => ({ mode, toggleTheme }), [mode]);

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
};