import React, { useState } from 'react';
import './App.css';

// Mock API responses
const apiResponses = {
  userInfo: {
    fields: [
      { name: 'firstName', type: 'text', label: 'First Name', required: true },
      { name: 'lastName', type: 'text', label: 'Last Name', required: true },
      { name: 'age', type: 'number', label: 'Age', required: false }
    ]
  },
  addressInfo: {
    fields: [
      { name: 'street', type: 'text', label: 'Street', required: true },
      { name: 'city', type: 'text', label: 'City', required: true },
      { name: 'state', type: 'dropdown', label: 'State', options: ['California', 'Texas', 'New York'], required: true },
      { name: 'zipCode', type: 'text', label: 'Zip Code', required: false }
    ]
  },
  paymentInfo: {
    fields: [
      { name: 'cardNumber', type: 'text', label: 'Card Number', required: true },
      { name: 'expiryDate', type: 'date', label: 'Expiry Date', required: true },
      { name: 'cvv', type: 'password', label: 'CVV', required: true },
      { name: 'cardholderName', type: 'text', label: 'Cardholder Name', required: true }
    ]
  }
};

function App() {
  const [formData, setFormData] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [progress, setProgress] = useState(0);
  const [submittedData, setSubmittedData] = useState([]);

  const handleSelection = (event) => {
    const selectedForm = event.target.value;
    const fields = apiResponses[selectedForm]?.fields || [];
    setFormFields(fields);
    setFormData({});
    setProgress(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const filledFields = Object.keys(formData).filter(key => formData[key]).length;
    setProgress(((filledFields + 1) / formFields.length) * 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData([...submittedData, formData]);
    alert('Form submitted successfully!');
    setFormData({});
    setFormFields([]);
    setProgress(0);
  };

  return (
    <div className="App">
      <h1>Dynamic Form</h1>
      <div>
        <label>Select Form Type:</label>
        <select onChange={handleSelection}>
          <option value="">Select...</option>
          <option value="userInfo">User Information</option>
          <option value="addressInfo">Address Information</option>
          <option value="paymentInfo">Payment Information</option>
        </select>
      </div>

      {formFields.length > 0 && (
        <form onSubmit={handleSubmit}>
          {formFields.map(field => (
            <div key={field.name} className="form-group">
              <label>{field.label}</label>
              {field.type === 'dropdown' ? (
                <select name={field.name} onChange={handleChange} required={field.required}>
                  <option value="">Select...</option>
                  {field.options.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required={field.required}
                />
              )}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}

      <div className="progress-bar" style={{ width: `${progress}%` }} />

      {submittedData.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(submittedData[0]).map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index}>
                {Object.values(data).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
