import express from "express";
import { QueryTypes } from "sequelize";
import sqlz from "../db.js";

const router = express.Router();

// REGISTER CUSTOMER (STORED PROCEDURE)
router.post("/customers", async (req, res) => {
  const { 
    customer_id, lastname, firstname, address, city, state,
    zip, referred, region, email, credit_limit
  } = req.body;

  try {
    await sqlz.query(`
      BEGIN 
         SP_REGISTER_CUSTOMER(
           :customer_id, :lastname, :firstname, :address, :city,
           :state, :zip, :referred, :region, :email, :credit_limit
         ); 
       END;
    `, {
      replacements: {
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
      },
      type: QueryTypes.RAW
    });

    res.status(201).json({ message: "Customer registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE CUSTOMER (STORED PROCEDURE)
router.put("/customers/:customer_id", async (req, res) => {
  const { customer_id } = req.params;
  const { address, region, state, email } = req.body;

  try {
    await sqlz.query(`
      BEGIN 
         SP_UPDATE_CUSTOMER(
           :customer_id, :address, :region, :state, :email
         ); 
       END;
    `, {
      replacements: { 
        customer_id, 
        address, 
        region, 
        state, 
        email 
      },
      type: QueryTypes.RAW
    });

    res.json({ message: "Customer updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
