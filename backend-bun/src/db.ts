import mongoose from 'mongoose';

export async function connectToDatabase() {
  try {
    return mongoose.connect(`${process.env.MONGODB_URI!}/${process.env.NODE_ENV}`, {
      autoIndex: true,
    });
  } catch (err) {
    console.error('Could not connect to database');
    console.error(err);
  }
}

export function disconnectFromDatabase() {
  try {
    return mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}
