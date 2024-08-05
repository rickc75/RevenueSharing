// src/express.d.ts

import { User } from '@prisma/client'; // Import your Prisma User type

declare module 'express' {
  export interface Request {
    user?: User; // Optional, as user may not always be present
  }
}

