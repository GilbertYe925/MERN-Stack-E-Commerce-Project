import React from 'react'

interface EmptyStateProps {
  title: string
  message: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-component rounded-2xl py-12 px-12 w-[45rem] flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-text-primary">{title}</h2>
        <p className="text-center text-text-primary playfair-display text-md">{message}</p>
      </div>
    </div>
  )
}

export default EmptyState
