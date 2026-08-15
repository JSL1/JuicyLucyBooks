import React, { useState } from "react";

function CustomerUpdate() {
  const [formData, setFormData] = useState({
    customer_id: "",
    address: "",
    region: "",
    state: "",
    email: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/customers/update-customer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Customer updated successfully");
      } else {
        alert(data.error || "Update failed");
      }
    } catch (error) {
      alert("Error connecting to server: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update Customer</h2>

      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} style={{ marginBottom: "10px" }}>
            <label>{key.replace("_", " ").toUpperCase()}:</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <button type="submit">Update Customer</button>
      </form>
    </div>
  );
}

export default CustomerUpdate;
