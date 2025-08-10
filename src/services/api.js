import axios from 'axios';

// Replace this with your actual API Gateway URL
const API_BASE_URL = 'https://x1psc1nto1.execute-api.us-east-2.amazonaws.com/dev';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const inventoryAPI = {
  getItems: () => api.get('/items'),
  createItem: (item) => {
    // Transform planting activity data to match backend expectations
    // For now, let's map the new fields to the old structure
    const transformedItem = {
      name: item.plantName,
      quantity: item.seedsPlanted || 0,
      category: 'Planting Activity',
      description: `Plant: ${item.plantName} (${item.scientificName})
Date: ${item.plantingDate}
Tray: ${item.traySize} cups × ${item.density} seeds × ${item.numberOfTrays} trays
Seeds Purchased: ${item.seedsPurchased}
Seeds Planted: ${item.seedsPlanted}
Tag: ${item.tag}
Notes: ${item.notes || 'None'}`,
      // Store the full planting data for future use
      plantingData: {
        plantName: item.plantName,
        scientificName: item.scientificName,
        commonName: item.commonName,
        seedsPurchased: item.seedsPurchased,
        plantingDate: item.plantingDate,
        traySize: item.traySize,
        density: item.density,
        numberOfTrays: item.numberOfTrays,
        seedsPlanted: item.seedsPlanted,
        notes: item.notes,
        tag: item.tag,
        type: 'planting-activity'
      }
    };
    
    console.log('Sending to API:', transformedItem);
    return api.post('/items', transformedItem);
  },
};

export default api;