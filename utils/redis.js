// A Redis Class
import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient(); //  create a new Redis client

    this.client.on('error', (error) => {
      console.error(error);
    });
  }

  isAlive() {
    //  that returns <true> when the connection to Redis is a success otherwise, <false>
    return this.client.connected;
  }

  async get(key) {
    //  that returns the value of a key
    const asyncGet = promisify(this.client.get).bind(this.client);
    try {
      const value = await asyncGet(key);
      return value;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async set(key, value, duration) {
    const asyncSet = promisify(this.client.setex).bind(this.client);
    //  that sets a key to a certain value
    //  that sets a key to a certain value with an expiration time
    try {
      asyncSet(key, duration, value);
    } catch (error) {
      console.error(error);
    }
  }

  async del(key) {
    //  that deletes a key
    try {
      this.client.del(key);
    } catch (error) {
      console.error(error);
    }
  }
}

const redisClient = new RedisClient(); //  create a new instance of RedisClient
export default redisClient; //  export the instance
