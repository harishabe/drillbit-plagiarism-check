import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const PieChart = ({
    type,
    color,
    width,
    label,
    height,
    series,
    filename,
    legendHeight,
    offsetY,
}) => {
    const donutChart = {
        series: series,
        options: {
            colors: color,
            chart: {
                height: height,
                type: type,
                toolbar: {
                    show: true,
                    tools: {
                        download: true
                    },
                    export: {
                        csv: {
                            filename: filename
                        },
                        svg: {
                            filename: filename
                        },
                        png: {
                            filename: filename
                        }
                    },
                },
                offsetY: offsetY ? offsetY : 0
            },
            legend: {
                show: true,
                position: 'bottom',
                fontSize: '12px',
                fontFamily: 'DM Sans',
                color: '#454745 !important',
                fontWeight:'600',
                height: legendHeight
            },
            tooltip: {
                enabled: true,
                style: {
                    fontSize: '12px',
                    fontFamily: 'DM Sans',
                    fontWeight:'600'
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
    }

    const [chartData, setChartData] = useState(donutChart)

    return (
        <>
            <div id="chart">
                <ApexCharts options={chartData.options} series={chartData.series} height={height} type={type} />
            </div>
        </>
    );
};

export default PieChart;