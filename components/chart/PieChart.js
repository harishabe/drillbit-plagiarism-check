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
                fontSize: '16px',
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

    const pieChart = {
        series: series,
        options: {
            chart: {
                width: 380,
                type: 'pie',
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
            labels: label,
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
    }

    const [chartData, setChartData] = useState(type === 'donut' ? donutChart : pieChart)

    return (
        <>
            <div id="chart" style={{ padding: '40px 0px' }}>
                <ApexCharts options={ chartData.options } series={ chartData.series } height={ height } type={ type } />
            </div>
        </>
    );
};

export default PieChart;