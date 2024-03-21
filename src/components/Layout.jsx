import React from 'react';
import { Outlet } from 'react-router-dom';
import UsersPage from '../pages/UsersPage';

function Layout() {
    return (
        <div className='layout'>
            <UsersPage />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;