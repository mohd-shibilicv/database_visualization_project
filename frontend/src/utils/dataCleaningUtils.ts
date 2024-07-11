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

    // Clean start_year and end_year fields
    if (!item.start_year || !item.end_year) {
      const years = extractYears(item.insight) || extractYears(item.title);
      if (years) {
        updatedItem.start_year = updatedItem.start_year || years.start;
        updatedItem.end_year = updatedItem.end_year || years.end;
      }
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

function extractYears(text: string): {start: string, end: string} | null {
  const yearRegex = /\b(19|20)\d{2}\b/g;
  const years = text.match(yearRegex);
  if (years && years.length > 0) {
    return {
      start: years[0],
      end: years[years.length - 1]
    };
  }
  return null;
}

function extractSector(text: string): string | null {
  const found = sectors.find(sector => text.toLowerCase().includes(sector.toLowerCase()));
  return found || null;
} 

export { cleanData };