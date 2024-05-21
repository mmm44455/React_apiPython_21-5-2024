import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom";
const useToken = ()=>{
    const [token,setToken]=useState(null)
    const nav = useNavigate();
    useEffect(()=>{
        const tokenFromLocal = localStorage.getItem("token")
        if( tokenFromLocal === undefined ||  tokenFromLocal === null){
            nav("/login");
            return;
          }
        setToken(tokenFromLocal)
    },[])
    return token
}
export default useToken