'use client'
import React from 'react'
import SubCategoryHeader from './SubCategoryHeader'
import AddNewSubCategory from './AddNewSubCategory'
import SubCategorList from './SubCategorList'

const SubCategory = () => {
     const [showcategory, setShowCategory] = React.useState(false)
  return (
    <div className='space-y-[30px] mb-[30px]'>

    <SubCategoryHeader setShowCategory={setShowCategory} showcategory={showcategory}/>
          {
                showcategory ? <AddNewSubCategory setShowCategory={setShowCategory} /> : <SubCategorList />
                }
        </div>
  )
}

export default SubCategory
