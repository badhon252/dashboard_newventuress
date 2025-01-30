import React from 'react';
import SupportHeader from './_components/SupportHeader';
import SupportFilter from './_components/SupportFilter';
import AdminSupportContainer from './_components/AdminSupportContainer';

const page = () => {
    return (
        <div>
            <SupportHeader/>
            <SupportFilter/>
            <AdminSupportContainer/>
        </div>
    );
};

export default page;