import Router from "./component/Router";
import './App.less'
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { setUserInfo } from "./redux/slice/userSlice";
import http from "./libs/http";
import { useNavigate } from "react-router-dom";
function App() {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    dispatch(setUserInfo(getUserInfo()))
  },[])

  const getUserInfo = async() => {
    await http.post('').then((res)=>{
      return res
    }).catch(()=>{
      navigate('/login')
    })
  }

  return (
    <>
      <Router/>
    </>
      
  );
}

export default App