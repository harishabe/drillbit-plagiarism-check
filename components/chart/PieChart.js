import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const PieChart = () => {
    const [chartData, setChartData] = useState({
        series: [44, 55],
        colors:['#F44336', '#E91E63'],
        options: {
            chart: {
                type: 'donut',
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    })

    return (
        <>
            <div id="chart">
                <ApexCharts options={chartData.options} series={chartData.series} width="498"  type="donut" />
            </div>
        </>
    )
}

export default PieChart;