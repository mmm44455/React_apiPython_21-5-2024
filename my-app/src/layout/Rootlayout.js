import {  Outlet, useNavigate } from 'react-router-dom'
import { AiTwotoneHome } from "react-icons/ai";
import { FaClipboard } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import { CiSettings, CiTimer } from "react-icons/ci";
import { useEffect } from 'react';
import './Rootlayout.css'
import Topnav from '../common/componets/Topnav';
import UserContextProvider from '../common/context/UserContext/useContextProvier'

const Rootlyout=()=>{
    const nav = useNavigate()
   

    const onclikHome = ()=>{
        nav("/")
    }
    const onclikBoard = () =>{
        nav("/board")
    }
    const onLogut = ()=>{
        localStorage.removeItem("token");
        nav("/login")
    }
  
    const onAcc = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        nav("/account")
    }
    return(
        <div className='page-container'>
           <UserContextProvider>
             <div className='top-nav'>
        <Topnav />
        </div>
        <div className='page-container-1'>
            <div className='side-nav'>
                <ul>
                    <li className='back-link' onClick={onclikHome}>
                       <AiTwotoneHome className='icon-link' />Trang chủ 
                    </li>
                    <li  className='back-link' onClick={onclikBoard}>
                        <FaClipboard  className='icon-link'/>Danh sách sinh viên
                    </li> 
                    <li  className='back-link' onClick={onAcc}>
                        <CiSettings  className='icon-link'/>Thêm sinh viên
                    </li> 
                
                    <button className='loginout' onClick={onLogut}>
                <IoLogInOutline /> Đăng xuất 
                </button>
                </ul>
               
            </div>
            <div className='page-body'>
                <Outlet  ></Outlet>
            </div>
        </div>
           </UserContextProvider>
           
         
        
        </div>
    )
}
export default Rootlyout