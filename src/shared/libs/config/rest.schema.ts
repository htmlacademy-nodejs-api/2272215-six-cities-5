import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormat(validator);

export type RestSchema = {
  PORT: number;
}

export const validateRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
});
