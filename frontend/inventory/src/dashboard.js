import React from 'react'
import './dashboard.css';
import Sidebar from './sidebar.js';
import Cards from './cards.js';
import Barchart  from './barchart.js';

export default function dashboard() {
  return (
     <>
    <div className='controller'>

      <div className='left'>
      <Sidebar/>
      </div>
      <div className='right'>
      <div className='card_s'>
      <Cards/>
      </div>
      <div className='chart_bar'>
      <Barchart/>
      </div>
      </div>
    </div>
      
     
    </>
  )
}
