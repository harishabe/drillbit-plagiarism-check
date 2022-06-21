import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const LineChart = ({
    color,
    chartWidth,
    chartHeight,
    chartType,
    strokeCurve
}) => {
    const [chartData, setChartData] = useState({
        series: [{
            name: "Desktops",
            data: [0,10, 41, 35, 51]
        }],
        options: {
            colors: color,
            chart: {
                height: 350,
                type: { chartType },
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: true,
                    tools: {
                        download: false
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: strokeCurve
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['0','0 - 10%', '11% - 40%', '41% - 60%', '61% - 100%'],
            },
        },
    })

    return (
        <>
            <div>
                <ApexCharts options={chartData.options} series={chartData.series} width={chartWidth} height={chartHeight} type={chartType} />
            </div>
        </>
    )
}

export default LineChart