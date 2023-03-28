import './Navbar.css';
import logo from './logo.png';
import { FC } from "react";
import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UnorderedListOutlined, UserOutlined, LoginOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Row, theme, Typography, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header, Content, Footer } = Layout;


export const AppNavbar: FC = () => {


    let u: any = localStorage.getItem("user");
    if (u) u = JSON.parse(u);


    const [user, setUser] = useState(u);
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const signout = () => {
        localStorage.removeItem("user");
        navigate("/");
        setUser(null);
    }

    return (
        <>
            <Header className='space-between'>
                <div>
                <img className='logo' src={logo} alt="" onClick={() => window.location.href = '/'} />
                </div>
                <div style={{ width: "100%" }}>
                    <Menu mode="horizontal"  inlineCollapsed={collapsed}>
                        <Menu.Item key="1" onClick={e => navigate("/")}>Home</Menu.Item>

                        {user &&
                            <>
                                <Menu.Item key="2" onClick={e => navigate("/reservations")}>Reservations</Menu.Item>
                                <Menu.Item key="3" onClick={e => navigate("/")}>
                                    {user.userName}
                                </Menu.Item>
                                <Menu.Item key="4" onClick={signout}>
                                    Sign out
                                </Menu.Item>
                            </>
                        }
                        {!user &&
                            <>
                                <Menu.Item key="5" onClick={e => navigate("/Login")}>Sign in</Menu.Item>
                            </>
                        }
                    </Menu>
                    <MenuOutlined className="menu-icon" onClick={toggleCollapsed} />
                </div>
            </Header>
        </>
    );
}