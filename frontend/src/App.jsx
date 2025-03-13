import {Routes,Route,Navigate} from "react-router-dom"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Profilepage from "./pages/Profilepage"
import Settings from "./pages/Settings"
import {Toaster} from "react-hot-toast"
import Navbar from "./components/Navbar"
import { UseAuth } from "./store/UseAuth"
import Signup from "./pages/Signup"
import { useEffect } from "react"
import { UseTheme } from "./store/UseTheme"


const App=()=>{
  const {authUser,checkAuth,isCheckingAuth}=UseAuth()

  const {theme}=UseTheme()

  useEffect(() => {
    checkAuth();
  }, [authUser]);

  return(
    <div data-theme={theme} className=" overflow-hidden">
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <Homepage/> : <Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser ? <Signup/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser ? <Login/> : <Navigate to="/"/>}/>
        <Route path="/profilepage" element={authUser ? <Profilepage/> : <Navigate to="/login"/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
