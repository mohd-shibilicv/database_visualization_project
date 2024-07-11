import { CountryData } from '../types';

export const showTooltip = (event: MouseEvent, d: CountryData) => {
    const tooltip = document.getElementById('globe-tooltip');
    if (tooltip) {
        tooltip.style.display = 'block';
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
        tooltip.innerHTML = `
            <strong>Country:</strong> ${d.country}<br>
            <strong>Number of Insights:</strong> ${d.insightCount}<br>
            <strong>Average Intensity:</strong> ${d.avgIntensity.toFixed(2)}<br>
            <strong>Average Likelihood:</strong> ${d.avgLikelihood.toFixed(2)}<br>
            <strong>Average Relevance:</strong> ${d.avgRelevance.toFixed(2)}
        `;
    }
};

export const hideTooltip = () => {
    const tooltip = document.getElementById('globe-tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
};