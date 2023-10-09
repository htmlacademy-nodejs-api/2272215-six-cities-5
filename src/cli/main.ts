#!/usr/bin/env node

import { CLIApplication } from './cli-application/index.js';

function bootstrap() {
  new CLIApplication();
}

bootstrap();
