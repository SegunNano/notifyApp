import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string; // Ensuring it's a string

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Extending global to include our MongoDB client
declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI, {});

    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise as Promise<MongoClient>;

export default clientPromise;
