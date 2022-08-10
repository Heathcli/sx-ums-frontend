import Router from "./component/Router";
import './App.less'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./redux/hooks";
import http from "./libs/http";
import { setUserInfo } from "./redux/slice/userSlice";
function App() {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    getUserInfo()
}, [])

const getUserInfo = async () => {
    await http.post('/name').then((res) => {
        dispatch(setUserInfo(res))
    }).catch(() => {
        navigate('/login')
    })
}
  return (
      <Router/>
  );
}

export default App