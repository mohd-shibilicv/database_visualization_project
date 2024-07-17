import { allCountries, regionMap, sectors } from '../constants/utils';
import { DataItem } from '../types';

function cleanData(data: DataItem[]): DataItem[] {
  return data.map(item => {
    let updatedItem = { ...item };

    // Clean country field
    if (!item.country) {
      updatedItem.country = extractCountry(item.insight) || extractCountry(item.title) || '';
    }

    // Clean region field
    if (!item.region) {
      updatedItem.region = getRegionFromCountry(updatedItem.country) || '';
    }

    // Clean sector field
    if (!item.sector) {
      updatedItem.sector = extractSector(item.insight) || extractSector(item.title) || '';
    }

    return updatedItem;
  });
}

function extractCountry(text: string): string | null {
  const found = allCountries.find(country => text.includes(country));
  return found || null;
}

function getRegionFromCountry(country: string): string | null {
  return regionMap[country] || null;
}

function extractSector(text: string): string | null {
  const found = sectors.find(sector => text.toLowerCase().includes(sector.toLowerCase()));
  return found || null;
} 

export { cleanData };