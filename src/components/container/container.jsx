import React from 'react'

const container = ({children}) => {
  return (
    <div className='bg-slate-500 px-4 h-full mx-auto'>
        {children}
    </div>
  )
}

export default container