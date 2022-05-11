import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const ColumnChart = () => {
    const [chartData, setChartData] = useState({
        series: [
            {
                name: 'Net Profit',
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
            },
            {
                name: 'Revenue',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
            }
        ],
        options: {
            colors: ['#2B4CB0', '#4795EE'],
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    show: true,
                    tools: {
                        download: false                     }
                }
            },
            plotOptions: {
                bar: {
                    startingShape: 'flat',
                    endingShape: 'rounded',
                    columnWidth: '22%',
                    dataLabels: {
                        position: "top"
                    }
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
                title: {
                    text: ''
                }
            },
            fill: {
                opacity: 1,
                colors: ['#2B4CB0', '#4795EE']
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands"
                    }
                }
            }
        },
    })

    return (
        <>
            <div id="chart">
                <ApexCharts options={chartData.options} series={chartData.series} type="bar" height={350} />
            </div>
        </>
    )
}

export default ColumnChart;