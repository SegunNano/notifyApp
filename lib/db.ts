export const runtime = "nodejs";
import mongoose from 'mongoose';
export const db = mongoose.connection;

export const disconnect = () => mongoose.connection.close();

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        console.log('Already Connected to mongoDB :)');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('Succesfully Connected to mongoDB :)');
    } catch (error) {
        console.error('MONGODB ERROR: ', error);
        // process.exit();
    }

    mongoose.connection.on('error', (error) => {
        console.error('MONGODB ERROR: ', error);
    });

};
export default connectDB