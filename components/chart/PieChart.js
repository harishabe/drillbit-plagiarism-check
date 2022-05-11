import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const PieChart = () => {
    const [chartData, setChartData] = useState({
        series: [44, 55],        
        options: {
            colors:['#2B4CB0', '#4795EE'],
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
                        position: 'bottom',
                        horizontalAlign: 'center',
                    }
                }
            }]
        },
    })

    return (
        <>
            <div id="chart">
                <ApexCharts options={chartData.options} series={chartData.series} width="398"  type="donut" />
            </div>
        </>
    )
}

export default PieChart;