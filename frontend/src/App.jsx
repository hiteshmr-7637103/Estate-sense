import { useState } from 'react'
import axios from 'axios'
import './App.css'

const featureGroups = [
  {
    title: "Property Specs",
    features: [
      { id: "RM", label: "Avg. Rooms", info: "Average number of rooms per dwelling" },
      { id: "AGE", label: "Building Age", info: "% of units built before 1940" },
      { id: "TAX", label: "Property Tax", info: "Full-value property-tax rate per $10k" },
      { id: "CHAS", label: "River Proximity", info: "1 if bounds Charles River, 0 otherwise" },
    ]
  },
  {
    title: "Neighborhood Details",
    features: [
      { id: "CRIM", label: "Crime Rate", info: "Per capita crime rate by town" },
      { id: "LSTAT", label: "Social Status", info: "% lower status of the population" },
      { id: "PTRATIO", label: "Student-Teacher Ratio", info: "Pupil-teacher ratio by town" },
      { id: "B", label: "B-Metric", info: "Proportion of residents by ethnicity (historical metric)" },
    ]
  },
  {
    title: "Location & Environment",
    features: [
      { id: "DIS", label: "Distance to Work", info: "Weighted distance to employment centers" },
      { id: "RAD", label: "Highway Access", info: "Index of accessibility to radial highways" },
      { id: "NOX", label: "Air Quality (NOx)", info: "Nitric oxides concentration (parts per 10 million)" },
      { id: "ZN", label: "Large Lot %", info: "% of residential land zoned for lots > 25,000 sq.ft." },
      { id: "INDUS", label: "Business %", info: "% of non-retail business acres per town" },
    ]
  }
];

function App() {
  const [formData, setFormData] = useState({
    CRIM: 0.00632, ZN: 18.0, INDUS: 2.31, CHAS: 0, NOX: 0.538,
    RM: 6.575, AGE: 65.2, DIS: 4.09, RAD: 1, TAX: 296,
    PTRATIO: 15.3, B: 396.9, LSTAT: 4.98
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://estate-sense-backend.onrender.com/api/house-price", formData);
      setPrediction(response.data.price);
    } catch (error) {
      console.error("Error:", error);
      alert("System Offline. Check Backend/Docker.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Estate Sense: Boston Real Estate AI</h1>
        <p>Predicting median home values using Neural Network regression.</p>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <div className="card-container">
            {featureGroups.map((group) => (
              <div key={group.title} className="input-card">
                <h3>{group.title}</h3>
                {group.features.map((f) => (
                  <div key={f.id} className="input-field">
                    <label title={f.info}>{f.label} ({f.id})</label>
                    <input
                      type="number"
                      step="any"
                      name={f.id}
                      value={formData[f.id]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="action-area">
            <button type="submit" className="predict-btn" disabled={loading}>
              {loading ? "Analyzing Data..." : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', verticalAlign: 'text-bottom' }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Generate Valuation
                </>
              )}
            </button>
          </div>
        </form>

        {prediction && (
          <div className="valuation-card fade-in">
            <small>Estimated Median Value</small>
            <div className="price-tag">${(prediction * 1000).toLocaleString()}</div>
            <p>Based on live data processed by our containerized ML engine.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App