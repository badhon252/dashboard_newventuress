import React from 'react';
import TableAndFormToggler from './_components/TableAndFormToggler';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const page = async () => {
    const currentUser = await auth();

    if (!currentUser) redirect("/");

    return (
        <div>
            <TableAndFormToggler token={currentUser.user.token} />
        </div>
    );
};

export default page;