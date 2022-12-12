import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const CurveChart = ({
    color,
    chartWidth,
    chartHeight,
    chartType,
    strokeCurve,
    xaxisLabelShow,
    yaxisLabelShow,
    graphData,
    graphName,
    filename
}) => {
    const [chartData, setChartData] = useState({
        series: [{
            name: graphName,
            data: graphData
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
                xaxis: {
                    lines: {
                        show: xaxisLabelShow
                    }
                },
                yaxis: {
                    lines: {
                        show: yaxisLabelShow
                    }
                },
            },
            xaxis: {
                categories: ['0 - 10%', '11% - 40%', '41% - 60%', '61% - 100%', 'DocError'],
                show: yaxisLabelShow,
                labels: {
                    show: xaxisLabelShow
                },
                axisBorder: {
                    show: xaxisLabelShow
                },
                axisTicks: {
                    show: xaxisLabelShow
                }
            },
            yaxis: {
                show: yaxisLabelShow,
                labels: {
                    show: yaxisLabelShow
                },
                axisBorder: {
                    show: yaxisLabelShow
                },
                axisTicks: {
                    show: yaxisLabelShow
                }
            },
            dataLabels: {
                enabled: true,
            }
        },
    });

    return (
        <>
            <div>
                <ApexCharts options={chartData.options} series={chartData.series} width={chartWidth} height={chartHeight} type={chartType} />
            </div>
        </>
    );
};

export default CurveChart;