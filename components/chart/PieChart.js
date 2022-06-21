import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const PieChart = ({
    type,
    color,
    width,
    label,
    series
}) => {
    const [chartData, setChartData] = useState({
        series: series,
        options: {
            colors: color,
            chart: {
                type: type,
            },
            legend: {
                show: true,
                position: 'bottom',
                fontSize: '16px',
                fontFamily:'Montserrat',
                color:'#f5f5f5'
            },
            labels: label,
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: width
                    }
                }
            }]
        },
    })

    return (
        <>
            <div id="chart" style={{ padding: '40px 0px' }}>
                <ApexCharts options={chartData.options} series={chartData.series} width={width} type="donut" />
            </div>
        </>
    )
}

export default PieChart