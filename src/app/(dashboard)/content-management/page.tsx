import React from 'react';
import ContentManagementHeader from './_components/ContentManagementHeader';
import ContentManagementFilter from './_components/ContentManagementFilter';
import ContentManagementContainer from './_components/ContentManagementContainer';

const page = () => {
    return (
        <div>
            <ContentManagementHeader/>
            <ContentManagementFilter/>
            <ContentManagementContainer/>
        </div>
    );
};

export default page;