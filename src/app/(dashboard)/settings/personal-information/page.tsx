import React from 'react'
import AdminPersonalInformationForm from './_components/AdminPersonalInformation'
import PersonalInformationHeader from './_components/PersonalInformationHeader'

function page() {
  return (
    <div className=''>
      <PersonalInformationHeader/>
      <div className="w-full h-auto rounded-[12px] border-[1px] border-[#C5C5C5] bg-white mb-[30px]">
        <h1 className="text-gradient text-[32px] lg:text-[32px] font-semibold leading-[38.4px] p-[16px]">
          Profile Settings <span className='text-[22px]' >(Admin)</span>
        </h1>
        <div className="border-b-[1px] border-[#C5C5C5]" />
        <div className="p-[16px]">
        <AdminPersonalInformationForm/>
        </div>
      </div>
    </div>
  )
}

export default page