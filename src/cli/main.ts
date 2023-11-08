#!/usr/bin/env node
import 'reflect-metadata';
import { CLIApplication } from './cli-application/index.js';

function bootstrap() {
  new CLIApplication();
}

bootstrap();
