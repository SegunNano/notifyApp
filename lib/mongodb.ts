import { MongoClient, MongoClientOptions } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const options: MongoClientOptions = {};

// Creating a global variable to store the client promise (to prevent multiple connections in development)
declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        global._mongoClientPromise = new MongoClient(MONGODB_URI, options).connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    clientPromise = new MongoClient(MONGODB_URI, options).connect();
}

export default clientPromise;
