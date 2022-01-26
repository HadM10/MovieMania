import React from 'react';
import { Link } from 'react-router-dom'
import { nav } from "react-bootstrap"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
function SideBar(props) {
    return (
        <SideNav>
            <NavItem eventKey="Home">
                <NavIcon className="d-none d-md-block bg-dark">
                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    <a href="/">
                        MovieMania
                    </a>
                </NavIcon>
            </NavItem>
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="Home">
                <NavItem eventKey="Home">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        <Link to={"/"} className="nav-link">
                            Home
                        </Link>
                    </NavText>
                </NavItem>
                <NavItem eventKey="ComingSoon">
                    <NavIcon>
                        <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        <Link to={"/ComingSoon"} className="nav-link">
                            Coming soon
                        </Link>
                    </NavText>
                </NavItem>
                {props.user ? (
                    <NavItem eventKey="Profile">
                        <NavIcon>
                            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            <Link to={"/Profile"} className="nav-link">
                                Profile
                            </Link>
                        </NavText>
                    </NavItem>
                ) : null}
                <NavItem eventKey="Login">
                    <NavIcon>
                        <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        {props.user ? (
                            <Link onClick={props.logout} className="nav-link" style={{ cursor: 'pointer' }}>
                                Logout {props.user.name}
                            </Link>
                        ) : (
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        )}
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    )
}

export default SideBar;