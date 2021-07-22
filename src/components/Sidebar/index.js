import React from 'react'
import { 
    SidebarContainer, 
    Icon, 
    CloseIcon, 
    SidebarWrapper, 
    SidebarMenu, 
    SidebarLink,
    SideBtnWrap, 
    SidebarRoute
} from './SidebarElements';

const Sidebar = ({
    isOpen, 
    toggle, 
    id1, 
    id2, 
    id3, 
    id4, 
    idcontent1, 
    idcontent2, 
    idcontent3,
    idcontent4
}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to={id1} onClick={toggle}>
                        {idcontent1}
                    </SidebarLink>
                    <SidebarLink to={id2} onClick={toggle}>
                        {idcontent2}
                    </SidebarLink>
                    <SidebarLink to={id3} onClick={toggle}>
                        {idcontent3}
                    </SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to={id4}>
                        {idcontent4}
                    </SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar;
