"use client"
import React from 'react';
import CustomerFilter from './CustomerFilter';
import CustomerContainer from './CustomerContainer';
import { useVendorManagementFilter } from '@/zustand/features/vendor-management/useFilterForVendorManagement';

const VendorManagementContainer = () => {
    const { searchQuery, setSearchQuery } = useVendorManagementFilter();
    return (
        <div>
            <CustomerFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <CustomerContainer searchQuery={searchQuery}/>
        </div>
    );
};

export default VendorManagementContainer;