import * as dotenv from 'dotenv';
import * as path from 'path';

export function configDotEnv() {
  // Construct the absolute path to the .env file
  const envPath = path.resolve(__dirname, '.env');
  // Load environment variables from the .env file located in the Config folder
  dotenv.config({ path: envPath });
}
