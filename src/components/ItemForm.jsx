import { useState } from 'react';
import { inventoryAPI } from '../services/api';

function ItemForm({ onItemAdded }) {
  const [formData, setFormData] = useState({
    plantName: '',
    scientificName: '',
    commonName: '',
    seedsPurchased: '',
    plantingDate: '',
    traySize: '',
    density: '',
    numberOfTrays: '',
    notes: '',
    tag: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate tag when key fields change
    if (['plantingDate', 'scientificName', 'commonName'].includes(name)) {
      generateTag();
    }
  };

  const generateTag = () => {
    const { plantingDate, scientificName, commonName } = formData;
    if (plantingDate && scientificName && commonName) {
      const date = new Date(plantingDate);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      const tag = `${month}-${day}-${year}-${scientificName}-${commonName}-${year}`;
      setFormData(prev => ({ ...prev, tag }));
    }
  };

  const calculateSeedsPlanted = () => {
    const { traySize, density, numberOfTrays } = formData;
    if (traySize && density && numberOfTrays) {
      return parseInt(traySize) * parseInt(density) * parseInt(numberOfTrays);
    }
    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const seedsPlanted = calculateSeedsPlanted();
      await inventoryAPI.createItem({
        ...formData,
        seedsPurchased: parseInt(formData.seedsPurchased) || 0,
        traySize: parseInt(formData.traySize) || 0,
        density: parseInt(formData.density) || 0,
        numberOfTrays: parseInt(formData.numberOfTrays) || 0,
        seedsPlanted,
        type: 'planting-activity'
      });
      
      // Clear form
      setFormData({
        plantName: '',
        scientificName: '',
        commonName: '',
        seedsPurchased: '',
        plantingDate: '',
        traySize: '',
        density: '',
        numberOfTrays: '',
        notes: '',
        tag: ''
      });
      
      // Refresh the items list
      onItemAdded();
    } catch (err) {
      setError('Failed to create planting record');
      console.error('Error creating planting record:', err);
    } finally {
      setLoading(false);
    }
  };

  const seedsPlanted = calculateSeedsPlanted();
  const seedsLeftover = (parseInt(formData.seedsPurchased) || 0) - seedsPlanted;

  return (
    <div className="planting-form">
      <h3>New Planting Activity</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="plantName">Plant Name *</label>
            <input
              type="text"
              id="plantName"
              name="plantName"
              placeholder="e.g., Mistflower"
              value={formData.plantName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="scientificName">Scientific Name *</label>
            <input
              type="text"
              id="scientificName"
              name="scientificName"
              placeholder="e.g., Conoclinium coelestinum"
              value={formData.scientificName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="commonName">Common Name *</label>
            <input
              type="text"
              id="commonName"
              name="commonName"
              placeholder="e.g., Mistflower"
              value={formData.commonName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="seedsPurchased">Seeds Purchased *</label>
            <input
              type="number"
              id="seedsPurchased"
              name="seedsPurchased"
              placeholder="Total seeds bought"
              value={formData.seedsPurchased}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="plantingDate">Planting Date *</label>
            <input
              type="date"
              id="plantingDate"
              name="plantingDate"
              value={formData.plantingDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="traySize">Tray Size (cups) *</label>
            <input
              type="number"
              id="traySize"
              name="traySize"
              placeholder="e.g., 288"
              value={formData.traySize}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="density">Density (seeds per cup) *</label>
            <input
              type="number"
              id="density"
              name="density"
              placeholder="e.g., 1"
              value={formData.density}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="numberOfTrays">Number of Trays *</label>
            <input
              type="number"
              id="numberOfTrays"
              name="numberOfTrays"
              placeholder="e.g., 5"
              value={formData.numberOfTrays}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Additional observations, conditions, etc."
              value={formData.notes}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="tag">Generated Tag</label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              readOnly
              className="tag-display"
            />
          </div>
        </div>

        <div className="calculations">
          <div className="calc-item">
            <span className="calc-label">Seeds Planted:</span>
            <span className="calc-value">{seedsPlanted}</span>
          </div>
          <div className="calc-item">
            <span className="calc-label">Seeds Leftover:</span>
            <span className="calc-value">{seedsLeftover}</span>
          </div>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button 
          type="submit" 
          disabled={loading}
          className="submit-button"
        >
          {loading ? 'Creating...' : 'Create Planting Record'}
        </button>
      </form>
    </div>
  );
}

export default ItemForm;