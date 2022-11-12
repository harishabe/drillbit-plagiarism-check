import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const RadialBarChart = ({
    type,
    color,
    height,
    label,
    labelData,
    series
}) => {
    const [chartData, setChartData] = useState({
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
                    }
                }
            },
            tooltip: {
                enabled: true,
                style: {
                    fontSize: '12px',
                    fontFamily: 'Montserrat'
                },
                y: {
                    formatter: function () {
                        return labelData;
                    }
                }
            },
            plotOptions: {
                radialBar: {
                    inverseOrder: false,
                    borderRadius: 5,
                    startAngle: 0,
                    endAngle: 360,
                    offsetX: 0,
                    offsetY: 0,
                    hollow: {
                        margin: 5,
                        size: '54%',
                        background: 'transparent',
                        image: undefined,
                        imageWidth: 150,
                        imageHeight: 150,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        imageClipped: true,
                        position: 'front',
                        dropShadow: {
                            enabled: false,
                            top: 0,
                            left: 0,
                            blur: 3,
                            opacity: 0.5
                        }
                    },
                    track: {
                        show: true,
                        startAngle: undefined,
                        endAngle: undefined,
                        background: 'rgba(0, 0, 0, 0.2)',
                        strokeWidth: '97%',
                        opacity: 4,
                        margin: 5,
                        dropShadow: {
                            enabled: false,
                            top: 0,
                            left: 0,
                            blur: 3,
                            opacity: 0.5
                        }
                    },
                    dataLabels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '18px',
                            fontFamily: undefined,
                            fontWeight: 600,
                            color: '#999999',
                            offsetY: -10
                        },
                        value: {
                            show: true,
                            fontSize: '25px',
                            fontFamily: undefined,
                            fontWeight: 600,
                            color: '#999999',
                            offsetY: 16,
                            formatter: function () {
                                return labelData;
                            }
                        },
                    },
                }
            },
            labels: label
        }
    });
    return (
        <div id="radialBar">
            <ApexCharts options={chartData.options} series={chartData.series} type={type} height={height} />
        </div>
    );
};

export default RadialBarChart;