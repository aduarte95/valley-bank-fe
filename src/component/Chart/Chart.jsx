import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.piecelabel.js';
import './Chart.scss';

function Chart({savingsBalance, balance}) {
    const data = {
        labels: [
            'My savings',
            'My balance'
        ],
        datasets: [{
            data: [savingsBalance, balance],
            backgroundColor: [
            '#f8c136',
            '#36A2EB'
            ],
            hoverBackgroundColor: [
                '#f8c136d0',
                '#36a3ebc5'
            ]
        }]
    };
		
    
		return (
        <div className="chart-container">
            <div className="chart-container__chart--border chart-container__chart">
            {balance !== 0 ?
                 <Doughnut width={250} height={250} data={data} 
                options={
                    { 
                        maintainAspectRatio: false, 
                        legend: {
                            display: true,
                            labels: {
                                fontColor: 'rgb(0, 0, 0)'
                            }
                        },
                        pieceLabel: {
                            render: 'value',
                            fontColor: '#fff',
                        }                     
                    }
                    }/> :
                 <div className="alert alert-info" role="alert">
                    You don't any savings
                </div>}
            </div>
		</div>
		);
}

export default Chart;