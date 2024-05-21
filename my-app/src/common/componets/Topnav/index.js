import { useContext } from "react"
import "./sytle.css"
import UserContext from "../../context/UserContext/useContext"
const Topnav =()=>{
    const userCtx = useContext(UserContext)
    const {username}=userCtx
    return(
        <>
            <h5 className="welcome">Xin chào tài khoản {username}</h5>
        </>
    )
}
export default Topnav