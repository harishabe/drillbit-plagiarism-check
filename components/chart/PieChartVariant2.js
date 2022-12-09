import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const PieChartVariant = ({
    label,
    height,
    series
}) => {
    const [chartData, setChartData] = useState({
        series: series,
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            tooltip: {
                enabled: true,
                style: {
                    fontSize: '12px',
                    fontFamily: 'Montserrat'
                },
                y: {
                    formatter: function () {
                        return '';
                    }
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

    });

    return (
        <>
            <div id="chart" style={ { padding: '40px 0px' } }>
                <ApexCharts options={ chartData.options } series={ chartData.series } height={ height } type="pie" />
            </div>
        </>
    );
};

export default PieChartVariant;