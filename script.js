// Data from Matthew Walker's "Why We Sleep" and related research
const sleepData = {
    hours: [4, 5, 6, 7, 8, 9, 10],
    mentalHealthRisk: [300, 250, 200, 150, 100, 100, 100], // % increase in risk compared to 8 hours
    memoryPerformance: [40, 50, 60, 80, 100, 100, 100], // % of optimal memory performance
    emotionalStability: [40, 60, 80, 90, 100, 100, 100], // % of optimal emotional stability
    reactionTime: [50, 65, 80, 90, 100, 100, 100] // % of optimal reaction time
};

// Initialize charts
let riskChart, memoryChart, stabilityChart;

// Function to interpolate values between data points
function interpolateValue(hours, data) {
    if (hours <= 4) return data[0];
    if (hours >= 10) return data[6];
    
    const lowerIndex = Math.floor((hours - 4) / 1);
    const upperIndex = Math.ceil((hours - 4) / 1);
    const lowerValue = data[lowerIndex];
    const upperValue = data[upperIndex];
    const weight = (hours - 4) % 1;
    
    return Math.round(lowerValue + (upperValue - lowerValue) * weight);
}

// Update all metrics and charts
function updateMetrics(hours) {
    // Update displayed values
    document.getElementById('sleep-value').textContent = hours;
    document.getElementById('mental-risk').textContent = interpolateValue(hours, sleepData.mentalHealthRisk) + '%';
    document.getElementById('memory-performance').textContent = interpolateValue(hours, sleepData.memoryPerformance) + '%';
    document.getElementById('emotional-stability').textContent = interpolateValue(hours, sleepData.emotionalStability) + '%';
    document.getElementById('reaction-time').textContent = interpolateValue(hours, sleepData.reactionTime) + '%';

    // Update charts
    updateCharts(hours);
}

// Create and update charts
function updateCharts(hours) {
    // Risk Chart
    const riskCtx = document.getElementById('riskChart').getContext('2d');
    if (riskChart) riskChart.destroy();
    riskChart = new Chart(riskCtx, {
        type: 'line',
        data: {
            labels: sleepData.hours,
            datasets: [{
                label: 'Mental Health Risk (%)',
                data: sleepData.mentalHealthRisk,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Sleep Duration vs Mental Health Risk'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Risk Increase (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Sleep Hours'
                    }
                }
            }
        }
    });

    // Memory Chart
    const memoryCtx = document.getElementById('memoryChart').getContext('2d');
    if (memoryChart) memoryChart.destroy();
    memoryChart = new Chart(memoryCtx, {
        type: 'bar',
        data: {
            labels: sleepData.hours,
            datasets: [{
                label: 'Memory Performance (%)',
                data: sleepData.memoryPerformance,
                backgroundColor: '#3498db',
                borderColor: '#2980b9',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Sleep Duration vs Memory Performance'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Performance (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Sleep Hours'
                    }
                }
            }
        }
    });

    // Stability Chart
    const stabilityCtx = document.getElementById('stabilityChart').getContext('2d');
    if (stabilityChart) stabilityChart.destroy();
    stabilityChart = new Chart(stabilityCtx, {
        type: 'line',
        data: {
            labels: sleepData.hours,
            datasets: [{
                label: 'Emotional Stability (%)',
                data: sleepData.emotionalStability,
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Sleep Duration vs Emotional Stability'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Stability (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Sleep Hours'
                    }
                }
            }
        }
    });
}

// Event listener for sleep hours input
document.getElementById('sleep-hours').addEventListener('input', function(e) {
    updateMetrics(parseFloat(e.target.value));
});

// Initialize the app
updateMetrics(7); // Start with 7 hours as default 