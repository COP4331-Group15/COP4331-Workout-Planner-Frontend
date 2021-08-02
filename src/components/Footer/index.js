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
                                <FooterLink to='howitworks'>How it works</FooterLink>
                                <FooterLink to='whymade'>Why was it made</FooterLink>
                                <FooterLink to='tos'>Terms of Service</FooterLink> 
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
                                <FooterLink to="/AboutUs">Thomas Stoeckert</FooterLink>
                                <FooterLink to="/AboutUs">Timothy Golio</FooterLink>
                                <FooterLink to="/AboutUs">Nicholas Habryl</FooterLink>
                                <FooterLink to="/AboutUs">Ricky Egawa</FooterLink>
                                <FooterLink to="/AboutUs">Isaiah Kovacich</FooterLink>
                                <FooterLink to="/AboutUs">Ryan Kendrick</FooterLink> 
                            </FooterLinkItems>
                        </FooterLinksWrapper>
                    </FooterLinksContainer>
                    <SocialMedia>
                        <SocialMediaWrap>
                            <SocialLogo to='/' onClick={toggleHome}>
                                Hercules' Notebook
                            </SocialLogo>
                            <WebsiteRights>Hercules' Notebook © 2021 All rights reserved.</WebsiteRights>
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
