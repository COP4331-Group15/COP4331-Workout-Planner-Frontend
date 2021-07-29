import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import {NavBarHome} from '../components/Navbar/data'
import Sidebar from '../components/Sidebar'
import {SidebarHome} from '../components/Sidebar/data'
import HeroSection from '../components/HeroSection'
import InfoSection from '../components/InfoSection'
import { homeObjOne, homeObjTwo, homeObjThree } from '../components/InfoSection/data'
import Footer from '../components/Footer'

const Home = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
        <Sidebar isOpen={isOpen} toggle={toggle} {...SidebarHome}/>
        <Navbar toggle={toggle} {...NavBarHome}/>
        <HeroSection />
        <InfoSection {...homeObjOne}/>
        <InfoSection {...homeObjTwo}/>
        <InfoSection {...homeObjThree}/>
        <Footer></Footer>
        </>
    )
}

export default Home;
