export function getErrorMessage (error: unknown, defaultError: string = 'Unknown Error'): string {
  if(error instanceof Error) {
    return error.message;
  } else if(typeof error === 'string') {
    return error;
  } else {
    return defaultError;
  }
}
