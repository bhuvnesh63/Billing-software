import React, {  useState } from 'react'
import './sidebar.css'
import { FaBars,FaBookReader, FaTh, FaWpforms, } from 'react-icons/fa'
import {  AiOutlineOrderedList, AiOutlineProfile } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { GiArchiveRegister, GiTimeBomb } from "react-icons/gi";
import { MdMeetingRoom, MdOutlineAppRegistration, MdOutlineEmojiTransportation, MdOutlineHolidayVillage, MdRoomService } from "react-icons/md";
import { BsFillBookFill } from 'react-icons/bs';
import { SiWebmoney,SiTrendmicro } from 'react-icons/si'
import { RiBillFill } from 'react-icons/ri';
import { SiGoogleclassroom } from "react-icons/si";







const Sidebar = ({children}) => {

    const [ isOpen, setIsOpen ] = useState(false);
  const toggle= () => setIsOpen (!isOpen );
  const menuItem = [
 
    {
      path: "/",
      name: "Dashboard",
      icon: <FaTh />
    },

    {
      path: "/sale",
      name: "Sale",
      icon: <MdMeetingRoom />
    },
    
    {
      path: "/additem",
      name: "Add-Item",
      icon: <SiGoogleclassroom />
    },
    
    {
      path: "/gstsale",
      name: "Gst-Sale",
      icon: <MdRoomService />
    },
    {
        path: "/billing",
        name: "Billing",
        icon: <RiBillFill />
      },

]
  return (
    <>
    <div className="container-fluid  ">
      <div style={{width: isOpen ? "200px" : "50px",paddingTop:"20px"}} className='sidebar'>
        <div className='top_section'>
          <p style={{display: isOpen ? "block" : "none"}} className='logo'>
            <span className='dash-title'>Admin</span>
          </p>
          <div style={{marginLeft: isOpen ? "50px" : "15px",paddingTop:"15px"}} className='bars'>
            <FaBars onClick={toggle} />
          </div>
        </div>
        {
          menuItem.map((item,index)=>(
            <Link to={item.path} key={index} className="link" 
            activeclassName="active">
              <div className='icon'> {item.icon}</div>
              <div style={{display: isOpen ? "block" : "none"}}  className='Link_text'>{item.name}</div>
            </Link>
          ))
        }
      </div>
      <main style={{width:"100%",height:"100vh",overflow:"scroll"}}>{children}</main>
    </div>
 
    </>
  )
}

export default Sidebar