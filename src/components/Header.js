import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="py-5 px-5 w-full bg-plantgreen flex flex-row justify-between" style={
        { "borderBottomLeftRadius":"5pt",
          "borderBottomRightRadius":"5pt",
          "height":"fit-content",
          "minHeight":"50px",
        }
      }>
        <Link className='hover:text-action' to="/">Übersicht</Link>
        <div className='flex justify-end gap-3'>
        </div>
      </div>
  )
}

export default Header