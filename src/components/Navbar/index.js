import React, {useState, useEffect} from 'react';
import { FaBars, FaDumbbell } from 'react-icons/fa';
import {animateScroll as scroll} from 'react-scroll';
import firebase from "../../services/";
import {useHistory} from "react-router-dom";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
  NavbarSpace
} from './NavbarElements';

const Navbar = ({ 
  toggle, 
  id1, 
  id2, 
  id3,
  id4, 
  id5,
  idcontent1, 
  idcontent2, 
  idcontent3,
  idcontent4,
  idcontent5
}) => {
  const [scrollNav, setScrollNav] = useState(false)
  
  const history = useHistory()
  
  const changeNav = ()=> {
    if(window.scrollY >= 80) {
      setScrollNav(true)
    } else {
      setScrollNav(false)
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav)
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  }
  
    const handleLogout = ()=>{
    firebase.auth().signOut().then(()=>{history.push('/Login')})

  }

    return (
      <>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavbarSpace>
            <FaDumbbell/>

            <NavLogo to='/' onClick={toggleHome}>Workout Planner</NavLogo>            </NavbarSpace>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavMenu>
              <NavItem>
                <NavLinks to ={id1} smooth={true} duration={500} spy={true} exact='true' offset={-80}>{idcontent1}</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to ={id2} smooth={true} duration={500} spy={true} exact='true' offset={-80}>{idcontent2}</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to ={id3} smooth={true} duration={500} spy={true} exact='true' offset={-80}>{idcontent3}</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to = '/' onClick ={handleLogout} smooth={true} duration={500} spy={true} exact='true' offset={-80}>{idcontent5}</NavLinks>
              </NavItem>
            </NavMenu>
            <NavBtn>
                <NavBtnLink to={id4}>{idcontent4}</NavBtnLink>
            </NavBtn>
        </NavbarContainer>
        </Nav>
        </>
    )
}

export default Navbar;
