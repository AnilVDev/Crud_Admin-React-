import React, { useState } from "react";
import "./App.css";
import Adminhome from "./component/Adminhome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import CreateUser from "./component/CreateUser";
import EditUser from "./component/EditUser";
import UserLogin from "./component/UserLogin"
import UserHome from "./component/UserHome";
import AdminLogin from "./component/AdminLogin";
import Authcontext from "./context/Logincontext";

function App() {

  const [accessToken, setAccessToken] = useState(localStorage.getItem('authToken') ? localStorage.getItem('authToken') : "")
  const [userDecode, setUserDecode] = useState(localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')) : "")


  return (
    <div className="App">

    <Authcontext.Provider value={{accessToken, setAccessToken, userDecode, setUserDecode}} >

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin props={{name: 'User Login'}} />} />
          <Route path="userhome" element={<UserHome />} />
          <Route path='signup/' element={<CreateUser props={{name : 'Signup'}} />} />

          <Route path="adminlogin/" >
            <Route index element={<AdminLogin />}/>
            <Route path="users/" element={<Adminhome />}/>
            <Route path="users/createUser" element={<CreateUser props={{name : 'createuser'}} />} />
            <Route path="users/:id" element={<EditUser />} />
          </Route>
        </Routes>
      </BrowserRouter>

      </Authcontext.Provider>
    </div>
  );
}

export default App;