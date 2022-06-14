import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Navbar';

const Layout = () => (
    <>
        <Navbar />
        <div>
            <Outlet />
        </div>
    </>
);

export default Layout;