import React from 'react'

const Book = () => {
  return (
    <div >
        <label className='block font-semibold'>Book Name</label>
        <input type='text' className='p-2 border border-black rounded-md '></input><br></br>
        <label className='block font-semibold'>Author Name</label>
        <input type='text' className='p-2 border border-black rounded-md  '></input>
        <button className='p-3 bg-green-500 border border-black'>Submit</button>
    </div>
  )
}

export default Book;

