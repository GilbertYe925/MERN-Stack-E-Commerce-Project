import React from 'react'

const Modal = ({isOpen, onClose, title, children}: {isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode}) => {
  return (
    <>
    {isOpen && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
                <div className="absolute top-[40%] right-[50%] bg-white p-4 rounded-lg z-10 text-right">
                    <button className="text-black text-semibold hover:bg-gray-700 focus:outline-none m4-2" onClick={onClose}>
                        X
                    </button>
                    {children}
                </div>
            </div>
        )
    }
    </>
  )
}

export default Modal
