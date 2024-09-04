import { client } from '../database/database.js'

export async function getPaymentStatus(Link) {
    let status = "Pending";
    try {
      await client.connect();
      const db = client.db("value");
      const collection = db.collection("payment");
  
      const existingEntry = await collection.findOne({ Link: Link });
  
      if(existingEntry) {
        status = existingEntry.Status;
      } else {
        console.error("Error connecting to MongoDB Obtainig payment status: NON EXISTING ENTRY");
      }
  
    } catch (error) {
      console.error("Error connecting to MongoDB to obtaing the payment status", error);
      throw error; // Propagate the error
    } finally {
      await client.close();
    }
    console.log("Status asked by GPT: ", status);
    return status; // Return the status
  }
  
  export async function saveLink(from, Link) {
    try {
      await client.connect();
      const db = client.db("value");
      const collection = db.collection("payment");
  
      await collection.insertOne({ Phone: from, Link: Link, Id: "", Status: "Pending"});
  
    } catch (error) {
      console.error("Error connecting to MongoDB saving the payment link", error);
      throw error; // Propagate the error
    } finally {
      await client.close();
    }
  }
  
 export  async function updatePaymentstatus(Link, Id, status) {
    try {
      await client.connect();
      const db = client.db("value");
      const collection = db.collection("payment");
  
      const existingEntry = await collection.findOne({ Link: Link });
  
      if(existingEntry) {
        await collection.updateOne({ Link: Link }, { $set: { Id: Id } });
        await collection.updateOne({ Link: Link }, { $set: { Status: status } });
      } else {
        console.error("Update of the payment status: NON EXISTING ENTRY");
      }
  
    } catch (error) {
      console.error("Error connecting to MongoDB with update the payment status", error);
      throw error; // Propagate the error
    } finally {
      await client.close();
    }
  }
  
  

export async function getPaymentLink(name, amount) {
    try {
        const response = await axios({
            method: "POST",
            url: "https://sandbox.wompi.co/v1/payment_links",
            data: {
                name: name,
                description: name,
                single_use: false,
                collect_shipping: false,
                currency: "COP",
                amount_in_cents: amount * 100000 // Convert amount to cents
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`
            }
        });
  
        console.log('Response:', response);
        const link = `https://checkout.wompi.co/l/${response.data.data.id}`;
        console.log('Payment link:', link);
        return link;
    } catch (error) {
        console.error('Error creating payment link:', error.response ? error.response.data : error.message);
        throw error;
    }
  }
  