import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const UsageChart = ({
    SERIES_DATA
}) => {
    const [chartData, setChartData] = useState({
        series: [
            {
                name: 'Used Account',
                data: SERIES_DATA
            }
        ],
        options: {
            chart: {
                height: 350,
                type: 'bar'
            },
            plotOptions: {
                bar: {
                    startingShape: 'flat',
                    columnWidth: '25%',
                    borderRadius: 5,
                    dataLabels: {
                        position: 'top'
                    }
                }
            },
            colors: ['#2B4CB0'],
            stroke: {
                show: true,
                width: 2,
                colors: ['#2B4CB0']
            },
            dataLabels: {
                enabled: false
            }
        },
    });

    return (
        <>
            <div id="chart">
                <ApexCharts options={chartData.options} series={chartData.series} type="bar" height={350} />
            </div>
        </>
    )
}

export default UsageChart;