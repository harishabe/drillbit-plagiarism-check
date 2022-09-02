import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const PieChart = ({
    type,
    color,
    width,
    label,
    height,
    series
}) => {
    const [chartData, setChartData] = useState({
        series: series,
        options: {
            colors: color,
            chart: {
                height: height,
                type: type,
            },
            legend: {
                show: true,
                position: 'bottom',
                fontSize: '16px',
                fontFamily:'Montserrat',
                color:'#f5f5f5'
            },
            tooltip: {
                enabled: true,
                style: {
                    fontSize: '12px',
                    fontFamily: 'Montserrat'
                }
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
            <div id="chart" style={{ padding: '24px 0px' }}>
                <ApexCharts options={chartData.options} series={chartData.series} height={height} type="donut" />
            </div>
        </>
    )
}

export default PieChart