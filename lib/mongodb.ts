import { MongoClient, MongoClientOptions } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Create a global variable to store the MongoDB connection
interface GlobalWithMongo {
    _mongoClientPromise?: Promise<MongoClient>;
}

const globalWithMongo = global as GlobalWithMongo;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, {
        // You can specify additional MongoClient options here if needed
    } as MongoClientOptions);

    globalWithMongo._mongoClientPromise = client.connect();
}

clientPromise = globalWithMongo._mongoClientPromise!;

export default clientPromise;
