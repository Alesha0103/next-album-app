import React from 'react'
import { Arrow } from '../arrow/arrow'

export const Header = () => {
  return (
    <div className="photos-header">
      <div className="photos-header__container">
        <Arrow/>
        <h1 className="photos-header__title">My Album</h1>
        <Arrow rotate/>
      </div>
    </div>
  )
}
