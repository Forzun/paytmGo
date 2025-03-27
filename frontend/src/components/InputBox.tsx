import React from 'react'

interface InputBoxProps { 
    label: string; 
    placeholder: string;
}

const InputBox = ({label , placeholder} : InputBoxProps) => {
  return (
    <div>
        <div className='text-sm font-medium text-lefft-py2 q'>{label}</div>
        <div>
            <input placeholder={placeholder} className='w-full px-2  py-1 border rounded border-slate-200'  />
        </div>
    </div>
  )
}

export default InputBox
