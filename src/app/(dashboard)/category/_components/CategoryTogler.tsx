'use client'
import React from 'react'
import CategoryHeader from './CategoryHeader'
import AddnewCategory from './AddnewCategory'
import CategoryList from './CategoryList'
import CategoryFilter from './category-filter'
function CategoryTogler() {
    const [showcategory, setShowCategory] = React.useState(false)
  


  return (
    <div className='space-y-[30px] mb-[30px]'>
        <CategoryHeader setShowCategory={setShowCategory} showcategory={showcategory}/>
          <CategoryFilter />
        {
        showcategory ? <AddnewCategory setShowCategory={setShowCategory} /> : <CategoryList />
        }
       
    </div>
  )
}

export default CategoryTogler