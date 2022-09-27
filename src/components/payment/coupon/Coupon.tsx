import React from 'react';

const Coupon = () => {
  return (
    <>
    <div className='flex flex-col xs:flex-row justify-start items-start xs:items-center gap-y-2 xs:gap-y-0 my-4 max-w-[500px] px-2'>
    <label className='min-w-[140px] text-lenssisDark font-bold'><span>할인코드 적용</span></label>
    <div className={`flex items-start justify-start w-full gap-x-2 xs:gap-x-0`}>
    <input name="coupon" onChange={() => {}} value="" className={`w-full h-12 border border-solid border-gray-200 rounded-md max-w-[310px] pl-1 focus:outline-1 focus:outline-[#ABC8DF]`} type="text"/>
    <button className='w-[120px] h-12 bg-lenssisDark text-white font-bold rounded-md ml-1'>적용</button>
   </div>
   </div>
   <div className='flex flex-col xs:flex-row justify-start items-start xs:items-center gap-y-2 xs:gap-y-0 my-4 max-w-[500px] px-2'>
    <label className='min-w-[140px] text-lenssisDark font-bold'><span>쿠폰 등록</span></label>
    
    <button className='w-full xs:w-[200px] h-12 bg-lenssisDark text-white font-bold rounded-md '>쿠폰 등록</button>
   </div>
   </>
  );
};

export default Coupon;