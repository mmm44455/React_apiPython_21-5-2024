
import LoginFooter from './componets/LoginFooter'
import LoginForm from './componets/LoginForm'
import Logo from './componets/Logo'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
export default function LoginPage(){
    const nav = useNavigate()

    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem("token");
        if(tokenFromLocalStorage){
          nav("/");
        }
      }, []);
    
    return(
        <div className='main'>
        <Logo/>
        <LoginForm></LoginForm>
        <LoginFooter></LoginFooter>
        </div>
       
    )
}