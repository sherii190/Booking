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
            <Footer style={{ textAlign: 'center' }}>©2023 Created by --</Footer>
        </Layout>
    );
};

export default AppLayout;