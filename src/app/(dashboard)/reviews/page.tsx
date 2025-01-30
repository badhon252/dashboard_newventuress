import React from 'react'

import ReviewData from './_components/ReviewData'
import ReviewFilter from './_components/ReviewFilter'
import ReviewContainer from './_components/ReviewContainer'

const page = () => {
  return (
    <div>
      <ReviewData/>
      <ReviewFilter/>
      <ReviewContainer/>
    </div>
  )
}

export default page