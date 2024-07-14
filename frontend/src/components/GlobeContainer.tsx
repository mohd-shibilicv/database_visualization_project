import React from 'react'
import Globe from './globe/Globe'
import { ChartProps } from '../types'

const GlobeContainer: React.FC<ChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: '100vh' }} className='mt-10'>
      <Globe data={data} />
    </div>
  )
}

export default GlobeContainer