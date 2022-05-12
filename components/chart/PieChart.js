import React, { useState } from 'react'
import dynamic from 'next/dynamic'
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

const PieChart = () => {
  const [chartData, setChartData] = useState({
    series: [44, 55],        
    options: {
      colors:['#2B4CB0', '#4795EE'],
      chart: {
        type: 'donut',
      },
      legend: {
        show:true,
        position: 'bottom',
      },
      labels: ['value 1', 'value 2'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          }
        }
      }]
    },
  })

  return (
    <>
      <div id="chart" style={{padding:'50px 0px'}}>
        <ApexCharts options={chartData.options} series={chartData.series} width="358"  type="donut" />
      </div>
    </>
  )
}

export default PieChart