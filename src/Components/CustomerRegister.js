import React, { useState } from "react";

function CustomerRegister() {
  const [formData, setFormData] = useState({
    customer_id: "",
    lastname: "",
    firstname: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    referred: "",
    region: "",
    email: "",
    credit_limit: ""
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
        process.env.API_URL + "api/customers/register-customer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Customer registered successfully");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      alert("Error connecting to server: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register Customer</h2>

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

        <button type="submit">Register Customer</button>
      </form>
    </div>
  );
}

export default CustomerRegister;
