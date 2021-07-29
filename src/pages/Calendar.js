import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Calendar from '../components/Calendar';
import {NavBarCalendar} from '../components/Navbar/data'
import { SidebarCalendar } from '../components/Sidebar/data';

const CalendarPage = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} {...SidebarCalendar}/>
            <Navbar toggle={toggle} {...NavBarCalendar}/>
          <Calendar></Calendar>  
        </>
    )
}

export default CalendarPage
