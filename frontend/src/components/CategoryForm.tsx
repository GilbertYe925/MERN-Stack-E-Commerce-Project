import React from 'react'

const CategoryForm = ({
    value,
    setValue,
    handleSubmit,
    button = 'Submit',
    handleDelete
}: {
    value: string
    setValue: (value: string) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void
    button?: string
    handleDelete?: () => void
}) => {
  return (
    <div className="p-3">
        <form onSubmit={handleSubmit} className="space-y-3">
            <input 
            type="text"  
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            className="py-3 px-4 border rounded-lg w-full" 
            placeholder="Enter category name" />
        </form>
        <div className="flex justify-between">
            <button 
            type="submit" 
            className="bg-pink-500 text-white px-4 py-2 rounded-lg 
            hover:bg-pink-600 focus:outline-none focus:ring-pink-500 focus:ring-opacity-50" 
            onClick={handleSubmit}>{button}</button>
            {handleDelete && (
                <button 
                type="button" 
                className="bg-red-500 text-white px-4 py-2 rounded-lg 
                hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" 
                onClick={handleDelete}>Delete</button>
            )}
        </div>
    </div>
  )
}

export default CategoryForm;