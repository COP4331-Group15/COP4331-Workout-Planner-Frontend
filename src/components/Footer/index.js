import React from 'react'
import {animateScroll as scroll} from 'react-scroll'
import {FaFacebook, FaInstagram,FaYoutube,FaTwitter,FaLinkedin} from 'react-icons/fa';
import { 
    FooterContainer,
    FooterWrap,
    FooterLinksContainer,
    FooterLinksWrapper,
    FooterLinkItems,
    FooterLinkTitle,
    FooterLink,
    SocialMedia,
     SocialMediaWrap,
     SocialLogo,
     WebsiteRights,
     SocialIcons,
     SocialIconLinks
 } from './FooterElements'

const Footer = () => {

    const toggleHome = () => {
        scroll.scrollToTop();
      }
    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>About us</FooterLinkTitle>
                                <FooterLink to='about'>How it works</FooterLink>
                                <FooterLink to='discover'>Why was it made</FooterLink>
                                <FooterLink to='/'>Terms of Service</FooterLink> 
                            </FooterLinkItems>
                            <FooterLinkItems>
                            <FooterLinkTitle>Contact us</FooterLinkTitle>
                                <FooterLink to='/'>Support</FooterLink>
                                <FooterLink to='/'>Help</FooterLink>
                                <FooterLink to='/'>Investors</FooterLink> 
                            </FooterLinkItems>
                        </FooterLinksWrapper>
                        <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>Meet the Team</FooterLinkTitle>
                                <FooterLink to="/signin">Thomas Stoeckert</FooterLink>
                                <FooterLink to="/signin">Timothy Golio</FooterLink>
                                <FooterLink to="/signin">Nicholas Habryl</FooterLink>
                                <FooterLink to="/signin">Ricky Egawa</FooterLink>
                                <FooterLink to="/signin">Isaiah Kovacich</FooterLink>
                                <FooterLink to="/signin">Ryan Kendrick</FooterLink> 
                            </FooterLinkItems>
                        </FooterLinksWrapper>
                    </FooterLinksContainer>
                    <SocialMedia>
                        <SocialMediaWrap>
                            <SocialLogo to='/' onClick={toggleHome}>
                                Workout Planner
                            </SocialLogo>
                            <WebsiteRights>Workout Planner © 2021 All rights reserved.</WebsiteRights>
                            <SocialIcons>
                            <SocialIconLinks href="/" target="_blank" aria-label="Facebook">
                                <FaFacebook />
                            </SocialIconLinks>
                            <SocialIconLinks href="/" target="_blank" aria-label="Instagram">
                                <FaInstagram />
                            </SocialIconLinks>
                            <SocialIconLinks href="/" target="_blank" aria-label="Youtube">
                                <FaYoutube />
                            </SocialIconLinks>
                            <SocialIconLinks href="/" target="_blank" aria-label="Twitter">
                                <FaTwitter />
                            </SocialIconLinks>
                            <SocialIconLinks href="/" target="_blank" aria-label="Linkedin">
                                <FaLinkedin />
                            </SocialIconLinks>
                            </SocialIcons>
                        </SocialMediaWrap>
                    </SocialMedia>
                </FooterWrap>
            </FooterContainer>
    )
}

export default Footer
