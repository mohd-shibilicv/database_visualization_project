import React from 'react'
import { ChartProps } from '../../types'
import Globe from '../globe/Globe'

const CountryChart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Globe data={data} />
    </div>
  )
}

export default CountryChart