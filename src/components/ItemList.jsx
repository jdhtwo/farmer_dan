import { useState, useEffect } from 'react';
import { inventoryAPI } from '../services/api';
import ItemForm from './ItemForm';

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await inventoryAPI.getItems();
      setItems(response.data.items || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch planting records');
      console.error('Error fetching planting records:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleItemAdded = () => {
    // Refresh the items list when a new item is added
    fetchItems();
  };

  const renderPlantingCard = (item) => {
    // Check if this is a planting activity item
    if (item.plantingData) {
      const planting = item.plantingData;
      return (
        <div key={item.id} className="planting-card">
          <div className="card-header">
            <h3 className="plant-name">{planting.plantName}</h3>
            <span className="planting-date">{new Date(planting.plantingDate).toLocaleDateString()}</span>
          </div>
          
          <div className="card-content">
            <div className="info-row">
              <span className="label">Scientific Name:</span>
              <span className="value">{planting.scientificName}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Common Name:</span>
              <span className="value">{planting.commonName}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Tag:</span>
              <span className="value tag-value">{planting.tag}</span>
            </div>
            
            <div className="seeds-section">
              <div className="seeds-row">
                <span className="label">Seeds Purchased:</span>
                <span className="value">{planting.seedsPurchased?.toLocaleString()}</span>
              </div>
              <div className="seeds-row">
                <span className="label">Seeds Planted:</span>
                <span className="value planted">{planting.seedsPlanted?.toLocaleString()}</span>
              </div>
              <div className="seeds-row">
                <span className="label">Seeds Leftover:</span>
                <span className="value leftover">{((planting.seedsPurchased || 0) - (planting.seedsPlanted || 0)).toLocaleString()}</span>
              </div>
            </div>
            
            <div className="tray-section">
              <div className="info-row">
                <span className="label">Tray Size:</span>
                <span className="value">{planting.traySize} cups</span>
              </div>
              <div className="info-row">
                <span className="label">Density:</span>
                <span className="value">{planting.density} seed{planting.density !== 1 ? 's' : ''} per cup</span>
              </div>
              <div className="info-row">
                <span className="label">Number of Trays:</span>
                <span className="value">{planting.numberOfTrays}</span>
              </div>
            </div>
            
            {planting.notes && (
              <div className="notes-section">
                <span className="label">Notes:</span>
                <p className="notes-text">{planting.notes}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Fallback to old inventory display
    return (
      <div key={item.id} className="planting-card">
        <div className="card-header">
          <h3 className="plant-name">{item.name}</h3>
          <span className="planting-date">Inventory Item</span>
        </div>
        
        <div className="card-content">
          <div className="info-row">
            <span className="label">Quantity:</span>
            <span className="value">{item.quantity}</span>
          </div>
          
          <div className="info-row">
            <span className="label">Category:</span>
            <span className="value">{item.category}</span>
          </div>
          
          {item.description && (
            <div className="notes-section">
              <span className="label">Description:</span>
              <p className="notes-text">{item.description}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading && items.length === 0) return <div className="loading">Loading planting records...</div>;

  return (
    <div className="planting-list">
      <ItemForm onItemAdded={handleItemAdded} />
      
      <h2>Planting Records ({items.length})</h2>
      
      {error && <div className="error-message">Error: {error}</div>}
      
      {items.length === 0 ? (
        <p className="empty-state">No planting records found. Add your first planting activity using the form above!</p>
      ) : (
        <div className="planting-grid">
          {items.map(renderPlantingCard)}
        </div>
      )}
    </div>
  );
}

export default ItemList;