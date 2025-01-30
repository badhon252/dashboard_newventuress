"use client"
import React, { useState } from 'react';
import BlogManagementFilter from './_components/BlogManagementFilter';
import BlogManagementHeader from './_components/BlogManagementHeader';
import BlogManagementContainer from './_components/BlogManagementContainer';
import AddBlogForm from './_components/AddBlogForm';

const page = () => {
    const [addBlogForm, setAddBlogForm] = useState(false);
    return (
        <div>
            <BlogManagementHeader addBlogForm={addBlogForm} setAddBlogForm={setAddBlogForm} />
            <BlogManagementFilter />
            {
                addBlogForm ? <AddBlogForm /> : <BlogManagementContainer />
            }
            {/* <BlogManagementContainer />
            <AddBlogForm /> */}
        </div>
    );
};

export default page;