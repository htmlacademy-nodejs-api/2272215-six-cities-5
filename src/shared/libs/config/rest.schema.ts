import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  SALT: string;
  MONGO_DB: string;
}

export const validateRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: '',
  },
  MONGO_DB: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'MONGO_DB',
    default: '127.0.0.1'
  },
});
