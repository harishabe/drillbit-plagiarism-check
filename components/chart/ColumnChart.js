import React, { useState } from 'react'
import dynamic from 'next/dynamic'
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

const ColumnChart = ({
    color,
    xaxisData,
    columnWidth,
    height,
    seriesData,
    type,
    borderRadius
}) => {
    const [chartData, setChartData] = useState({
        series: seriesData,
        options: {
            colors: color,
            chart: {
                type: type,
                height: height,
                toolbar: {
                    show: true,
                    tools: {
                        download: false
                    }
                }
            },
            plotOptions: {
                bar: {
                    startingShape: 'flat',
                    columnWidth: columnWidth,
                    borderRadius: borderRadius,
                    dataLabels: {
                        position: 'top'
                    }
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2    ,
                colors: ['transparent']
            },
            xaxis: {
                categories: xaxisData,
            },
            yaxis: {
                title: {
                    text: ''
                }
            },
            fill: {
                opacity: 1,
                colors: color
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val
                    }
                }
            },
            dataLabels: {
                enabled: true,
            }
        },
    })

    return (
        <>
            <div id="chart">
                <ApexCharts options={chartData.options} series={chartData.series} type={type} height={height} />
            </div>
        </>
    )
}

export default ColumnChart