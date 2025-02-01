import { Button } from '@/components/ui/button'
import React from 'react'

function PersonalInformationHeader() {
  return (
    <div className="h-[80px] w-full bg-white p-[8px] rounded-[12px] flex items-center justify-end mb-[20px]">
      <div>
        <Button>
          Add Licemse
        </Button>
      </div>
    </div>
  )
}

export default PersonalInformationHeader