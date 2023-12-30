import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

mongoose.Promise = global.Promise;

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === 'ns not found') return;
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes('a background operation is currently running')) return;
      console.log(error.message);
    }
  }
}

export async function connectToDatabase(databaseName: string) {
  const url = `${process.env.MONGODB_URI}/${databaseName}`;
  await mongoose.connect(url, {
    autoIndex: true,
  });
}

export function setupDB(databaseName: string) {
  // Connect to Mongoose
  beforeAll(async () => {
    await connectToDatabase(databaseName);
  });

  // Cleans up database between each test
  afterEach(async () => {
    await removeAllCollections();
  });

  // Disconnect Mongoose
  afterAll(async () => {
    await dropAllCollections();
    await mongoose.connection.close();
  });
}
