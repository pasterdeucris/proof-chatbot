const { MongoClient } = require('mongodb');
const uri = process.env.MONGO; //Database

const client = new MongoClient(uri); //Database

async function obtainFlujo(from, name, phon_no_id) {
    let flow = 0;
    try {
        await client.connect();
        const db = client.db("value");
        const collection = db.collection("users");

        const existingEntry = await collection.findOne({ Phone: from });

        if(existingEntry) {
            flow = existingEntry.Flow;
        } else {
            thread = await createThread()
            await collection.insertOne({ Name: name, Phone: from, Thread: thread.id, Flow: 1, phon_no_id: phon_no_id });
            flow = 0;
        }
    } catch (error) {
        console.error("Error connecting to MongoDB Obtaining the FLOW NUMBER:", error);
        throw error; // Propagate the error
    } finally {
        await client.close();
    }
    return flow; // Return the flow value
}

async function getThread(from) {
    let thread = 0;
    try {
        await client.connect();
        const db = client.db("value");
        const collection = db.collection("users");

        const existingEntry = await collection.findOne({ Phone: from });

        if(existingEntry) {
            thread = existingEntry.Thread;
        } else {
            console.error("Error connecting to MongoDB Obtaining the THREAD: NON EXISTING ENTRY");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB Obtaining the THREAD:", error);
        throw error; // Propagate the error
    } finally {
        await client.close();
    }
    return thread; // Return the thread
}

async function AssignFlow(from, flow) {
    try {
        await client.connect();
        const db = client.db("value");  // Replace with your database name
        const collection = db.collection("users");  // Replace with your collection name

        const existingEntry = await collection.findOne({ Phone: from });

        if (existingEntry) {
            await collection.updateOne({ Phone: from }, { $set: { Flow: flow } });
        } else {
            console.error("Error connecting to MongoDB changing the flow");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB Assigning FLOW:", error);
        throw error; // Propagate the error
    } finally {
        await client.close();
    }
}

async function getName(from) {
    let name = 0;
    try {
        await client.connect();
        const db = client.db("value");
        const collection = db.collection("users");

        const existingEntry = await collection.findOne({ Phone: from });

        if(existingEntry) {
            name = existingEntry.Name;
        } else {
            console.error("Error connecting to MongoDB Obtaining the NAME: NON EXISTING ENTRY");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB Obtaining the Name:", error);
        throw error; // Propagate the error
    } finally {
        await client.close();
    }
    return name; // Return the thread
}

async function getphon_no_id(from) {
    let no_id = "";
    try {
        await client.connect();
        const db = client.db("value");
        const collection = db.collection("users");

        const existingEntry = await collection.findOne({ Phone: from });

        if(existingEntry) {
            no_id = existingEntry.phon_no_id;
        } else {
            console.error("Error connecting to MongoDB Obtaining the Phone Number ID: NON EXISTING ENTRY");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB to obtaining the phone no id", error);
        throw error; // Propagate the error
    } finally {
        await client.close();
    }
    console.log("Phone Number ID: ", no_id);
    return no_id; // Return the status
}

module.exports = {
    client,
    obtainFlujo,
    getThread,
    AssignFlow,
    getName,
    getphon_no_id
};