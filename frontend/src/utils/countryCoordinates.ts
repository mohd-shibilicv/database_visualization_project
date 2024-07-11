interface Coordinates {
    [country: string]: [number, number];
}

export const countryCoordinates: Coordinates = {
    "United States Of America": [-95.71, 37.09],
    "China": [104.1954, 35.8617],
    "India": [78.9629, 20.5937],
    "United Kingdom": [-3.4359, 55.3781],
    "Germany": [10.4515, 51.1657],
    "Japan": [138.2529, 36.2048],
    "France": [2.2137, 46.2276],
    "Italy": [12.5674, 41.8719],
    "Canada": [-106.3468, 56.1304],
    "Australia": [133.7751, -25.2744],
    "Brazil": [-51.9253, -14.2350],
    "Russia": [105.3188, 61.5240],
    "South Africa": [22.9375, -30.5595],
    // Add more countries as needed
};

export function getCountryCoordinates(country: string): [number, number] {
    return countryCoordinates[country] || [0, 0]; // Return [0, 0] if country not found
}