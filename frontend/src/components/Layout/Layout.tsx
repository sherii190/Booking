import { Layout, theme } from 'antd';
import React from 'react';
import { AppNavbar } from '../Navbar/Navbar';
import './Layout.css';
import { useNavigate, Navigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

interface AppLayoutProps {
    children: React.ReactNode;
    isProtected?: boolean
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, isProtected }) => {

    if (isProtected && !localStorage.getItem("user")) {
        window.location.href = "/Login";
    }

    const {
        token: { colorBgContainer },
    } = theme.useToken();


    return (
        <Layout className="layout">
            <AppNavbar></AppNavbar>
            <Content style={{ padding: '20px 50px' }}>
                <div className="site-layout-content" style={{ background: colorBgContainer }}>
                    {children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center', backgroundColor: '#f0f0f0' }}>
                <div>
                    <p>StädFint AB</p>
                    <p>123 13 Stockholm</p>
                    <p>Hittapågatan 3</p>
                    <p>Telefon: 070 909 856 54</p>
                    <p>Email: info@stadfintab.com</p>
                </div>
            </Footer>
            <Footer style={{ textAlign: 'center' }}>©2023 StädFint AB. All rights reserved. Created by JETSKIIGRUPPEN </Footer>
        </Layout>
    );
};

export default AppLayout;