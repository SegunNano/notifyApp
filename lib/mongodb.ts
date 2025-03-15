import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

declare global {
    // This prevents TypeScript from throwing an error for global variables
    // The underscore is a convention to indicate it's intended for internal use
    interface Global {
        _mongoClientPromise?: Promise<MongoClient>;
    }
}

const globalWithMongo = global as unknown as Global;

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    if (!globalWithMongo._mongoClientPromise) {
        const client = new MongoClient(MONGO_URI, {});
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise!;
} else {
    const client = new MongoClient(MONGO_URI, {});
    clientPromise = client.connect();
}

export default clientPromise;
