import React from 'react';
import NotificationFilter from './_components/NotificationFilter';
import NotificationContainer from './_components/NotificationContainer';

const page = () => {
    return (
        <div>
            <NotificationFilter />
            <NotificationContainer/>
        </div>
    );
};

export default page;