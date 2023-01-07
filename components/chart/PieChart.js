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
    filename
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
                }
            },
            legend: {
                show: true,
                position: 'bottom',
                fontSize: '12px',
                fontFamily: 'Montserrat',
                color: '#f5f5f5'
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
    }

    const [chartData, setChartData] = useState(donutChart)

    return (
        <>
            <div id="chart" style={{ padding: type === 'donut' ? '40px 0px' : '' }}>
                <ApexCharts options={chartData.options} series={chartData.series} height={height} type={type} />
            </div>
        </>
    );
};

export default PieChart;