import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const ColumnChart = ({
    color,
    xaxisData,
    columnWidth,
    height,
    seriesData,
    type,
    borderRadius,
    filename
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
                enabled: true,
                formatter: function (val) {
                    return val;
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    fontFamily:'DM Sans',
                    fontWeight:'600',
                    colors: ['#454745']
                }
            },            
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: xaxisData,
                labels:{
                    style: {
                        fontSize: '12px',
                        fontFamily:'DM Sans',
                        fontWeight:'600',
                    },
                    trim: true,
                    hideOverlappingLabels: false,
                    rotate: 0
                },
            },
            yaxis: {
                title: {
                    text: ''
                },
                labels:{
                    style: {
                        fontSize: '12px',
                        fontFamily:'DM Sans',
                        fontWeight:'600',
                    }
                },
            },
            fill: {
                opacity: 1,
                colors: color
            },
            tooltip: {
                enabled: true,
                style: {
                    fontSize: '12px',
                    fontFamily: 'DM Sans',
                    fontWeight:'600'
                },
                y: {
                    formatter: function (val) {
                        return val;
                    }
                }
            }
        },
    });

    return (
        <>
            <div id="chart">
                <ApexCharts options={chartData.options} series={chartData.series} type={type} height={height} />
            </div>
        </>
    );
};

export default ColumnChart;