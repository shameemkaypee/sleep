// Data from Matthew Walker's "Why We Sleep" and related research
const sleepData = {
    hours: [4, 5, 6, 7, 8, 9, 10],
    mentalHealthRisk: [300, 250, 200, 150, 0, 0, 0], // % increase in risk compared to 8 hours (fixed)
    memoryPerformance: [40, 50, 60, 80, 100, 100, 100], // % of optimal memory performance
    emotionalStability: [40, 60, 80, 90, 100, 100, 100], // % of optimal emotional stability
    reactionTime: [50, 65, 80, 90, 100, 100, 100], // % of optimal reaction time
    creativity: [30, 45, 60, 80, 100, 100, 100], // % of optimal creativity
    immunity: [30, 45, 60, 80, 100, 100, 100] // % of optimal immune function
};

// Initialize charts
let riskChart, memoryChart, stabilityChart, reactionChart, creativityChart, immunityChart;

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
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            title: {
                display: true,
                text: '',
                font: {
                    size: 16
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Percentage'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Sleep Hours'
                }
            }
        }
    };

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
            ...chartOptions,
            plugins: {
                ...chartOptions.plugins,
                title: {
                    ...chartOptions.plugins.title,
                    text: 'Sleep Duration vs Mental Health Risk'
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
            ...chartOptions,
            plugins: {
                ...chartOptions.plugins,
                title: {
                    ...chartOptions.plugins.title,
                    text: 'Sleep Duration vs Memory Performance'
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
            ...chartOptions,
            plugins: {
                ...chartOptions.plugins,
                title: {
                    ...chartOptions.plugins.title,
                    text: 'Sleep Duration vs Emotional Stability'
                }
            }
        }
    });

    // Reaction Time Chart
    const reactionCtx = document.getElementById('reactionChart').getContext('2d');
    if (reactionChart) reactionChart.destroy();
    reactionChart = new Chart(reactionCtx, {
        type: 'bar',
        data: {
            labels: sleepData.hours,
            datasets: [{
                label: 'Reaction Time (%)',
                data: sleepData.reactionTime,
                backgroundColor: '#9b59b6',
                borderColor: '#8e44ad',
                borderWidth: 1
            }]
        },
        options: {
            ...chartOptions,
            plugins: {
                ...chartOptions.plugins,
                title: {
                    ...chartOptions.plugins.title,
                    text: 'Sleep Duration vs Reaction Time'
                }
            }
        }
    });

    // Creativity Chart
    const creativityCtx = document.getElementById('creativityChart').getContext('2d');
    if (creativityChart) creativityChart.destroy();
    creativityChart = new Chart(creativityCtx, {
        type: 'line',
        data: {
            labels: sleepData.hours,
            datasets: [{
                label: 'Creativity (%)',
                data: sleepData.creativity,
                borderColor: '#f1c40f',
                backgroundColor: 'rgba(241, 196, 15, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            ...chartOptions,
            plugins: {
                ...chartOptions.plugins,
                title: {
                    ...chartOptions.plugins.title,
                    text: 'Sleep Duration vs Creativity'
                }
            }
        }
    });

    // Immunity Chart
    const immunityCtx = document.getElementById('immunityChart').getContext('2d');
    if (immunityChart) immunityChart.destroy();
    immunityChart = new Chart(immunityCtx, {
        type: 'bar',
        data: {
            labels: sleepData.hours,
            datasets: [{
                label: 'Immune Function (%)',
                data: sleepData.immunity,
                backgroundColor: '#e67e22',
                borderColor: '#d35400',
                borderWidth: 1
            }]
        },
        options: {
            ...chartOptions,
            plugins: {
                ...chartOptions.plugins,
                title: {
                    ...chartOptions.plugins.title,
                    text: 'Sleep Duration vs Immune Function'
                }
            }
        }
    });
}

// Event listener for sleep hours input
document.getElementById('sleep-hours').addEventListener('input', function(e) {
    updateMetrics(parseFloat(e.target.value));
});

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    updateMetrics(7); // Start with 7 hours as default
}); 