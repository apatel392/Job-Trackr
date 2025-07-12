import React from 'react';
import { Link } from 'react-router-dom';

const AuthNavBar = () => {
    return (
        <nav className='bg-blue-600 text-white px-6 py-3 shadow-md'>
            <div className='flex justify-between items-center'>
                <Link to='/' className='text-xl font-bold'>
                    JobTrackr
                </Link>

            </div>
        </nav>
    );
};

export default AuthNavBar;