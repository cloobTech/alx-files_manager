// Database connection module
import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    // Environment variables
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${host}:${port}/`; // Connection URL
    this.client = new MongoClient(url); // Create a new MongoClient

    // set connection state
    this.isConnect = false;

    // Connect to the DB
    this.client.connect((error) => {
      if (error) {
        console.error('DB connection error:', error);
      } else {
        this.isConnect = true;
        console.log('DB connected successfully');
      }
    });

    this.db = this.client.db(database);
  }

  // Check if the connection is alive
  isAlive() {
    return this.isConnect;
  }

  //  Create an index on the collection users
  async nbUsers() {
    try {
      const count = await this.db.collection('users').countDocuments();
      return count;
    } catch (error) {
      console.error(error);
      return 0;
    }
  }

  //  Create an index on the collection files
  async nbFiles() {
    try {
      const count = await this.db.collection('files').countDocuments();
      return count;
    } catch (error) {
      console.error(error);
      return 0;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
