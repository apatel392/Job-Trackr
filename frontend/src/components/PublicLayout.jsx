import React from 'react';
import AuthNavBar from './AuthNavBar';
import { Outlet } from 'react-router-dom';


const PublicLayout = () => {
    return (
        <>
            <AuthNavBar />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default PublicLayout;