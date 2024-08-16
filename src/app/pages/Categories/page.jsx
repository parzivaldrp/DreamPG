import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Category({ onSubmit }) {
  const [category, setCategory] = useState('');
  const [idealFor, setIdealFor] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Data:", { whoCanStay: category, idealFor: idealFor, budgetRange: budget });
    onSubmit({ whoCanStay: category,  // Use 'whoCanStay' here
    idealFor: idealFor, 
    budgetRange: budget  });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="row gy-3">
        <div className="col-6">
          <label htmlFor="category" className="form-label">Category</label>
          <select className="form-select" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select category</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
            <option value="Co-living">Co-living</option>
          </select>
        </div>
        <div className="col-6">
          <label htmlFor="idealFor" className="form-label">Ideal For</label>
          <select className="form-select" id="idealFor" value={idealFor} onChange={(e) => setIdealFor(e.target.value)}>
            <option value="">Select ideal for</option>
            <option value="Student">Student</option>
            <option value="Working Professional">Professional</option>
          </select>
        </div>
        <div className="col-6">
          <label htmlFor="budget" className="form-label">Budget</label>
          <select className="form-select" id="budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="">Select budget range</option>
            <option value="0-1000">₹0 - ₹1000</option>
            <option value="1000-2000">₹1000 - ₹2000</option>
            <option value="2000-3000">₹2000 - ₹3000</option>
            <option value="3000-4000">₹3000 - ₹4000</option>
            <option value="4000-5000">₹4000 - ₹5000</option>
            <option value="5000-6000">₹5000 - ₹6000</option>
            <option value="6000-7000">₹6000 - ₹7000</option>
            <option value="7000-8000">₹7000 - ₹8000</option>
            <option value="8000-9000">₹8000 - ₹9000</option>
            <option value="9000-10000">₹9000 - ₹10000</option>
          </select>
        </div>
        <div className="col-6">
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Search</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Category;