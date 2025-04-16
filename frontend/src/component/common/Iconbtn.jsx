import React from 'react'

const Iconbtn = ({
    text, onclick, children, disabled, outline = false, customClasses="", type
}) => {
    return (
        <button
        disabled={disabled}
        onClick={onclick}
        type={type}
        // className="bg-yellow-400 py-1 px-2 text-black font-semibold rounded-[0.5rem]"
        className={`py-1 px-2 text-black font-semibold rounded-[0.5rem] 
        ${outline ? "border border-yellow-400 bg-transparent text-yellow-400 " : "bg-yellow-400"} 
        ${customClasses}`}
        >
            {
                children ? (
                    <div className='flex items-center py-1 px-2 gap-2'>
                        <span>
                            {text}
                        </span>
                        {children}
                    </div>

                ) : (text)
            }
        </button>
    )
}

export default Iconbtn