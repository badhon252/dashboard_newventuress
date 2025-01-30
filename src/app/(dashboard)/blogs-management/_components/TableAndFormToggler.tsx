"use client"
import React, { useState } from 'react';
import BlogManagementHeader from './BlogManagementHeader';
import BlogManagementFilter from './BlogManagementFilter';
import AddBlogForm from './AddBlogForm';
import BlogManagementContainer from './BlogManagementContainer';


const TableAndFormToggler = () => {
    const [addBlogForm, setAddBlogForm] = useState(false);
    return (
        <div>
            <BlogManagementHeader addBlogForm={addBlogForm} setAddBlogForm={setAddBlogForm} />
            <BlogManagementFilter />
            {
                addBlogForm ? <AddBlogForm /> : <BlogManagementContainer />
            }
        </div>
    );
};

export default TableAndFormToggler;