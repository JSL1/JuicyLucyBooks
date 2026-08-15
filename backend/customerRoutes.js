
// Backend API routes for Task 3 (Customer Register & Update)

const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const sequelize = require("./db.js");

// ROUTE: Register Customer
// Calls: SP_REGISTER_CUSTOMER

router.post("/register-customer", async (req, res) => {
  const {
    customer_id,
    lastname,
    firstname,
    address,
    city,
    state,
    zip,
    referred,
    region,
    email,
    credit_limit
  } = req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `BEGIN 
         SP_REGISTER_CUSTOMER(
           :customer_id, :lastname, :firstname, :address, :city,
           :state, :zip, :referred, :region, :email, :credit_limit
         ); 
       END;`,
      {
        customer_id,
        lastname,
        firstname,
        address,
        city,
        state,
        zip,
        referred,
        region,
        email,
        credit_limit
      }
    );

    await connection.commit();
    res.json({ message: "Customer registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ROUTE: Update Customer
// Calls: SP_UPDATE_CUSTOMER
router.post("/update-customer", async (req, res) => {
  const { customer_id, address, region, state, email } = req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `BEGIN 
         SP_UPDATE_CUSTOMER(
           :customer_id, :address, :region, :state, :email
         ); 
       END;`,
      { customer_id, address, region, state, email }
    );

    await connection.commit();
    res.json({ message: "Customer updated successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
