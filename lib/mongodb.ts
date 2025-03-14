import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const options = {};

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Extend the global object to avoid TypeScript errors
declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(MONGODB_URI, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(MONGODB_URI, options);
    clientPromise = client.connect();
}

export default clientPromise;
