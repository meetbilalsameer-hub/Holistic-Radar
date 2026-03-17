// Database client placeholder
// When PostgreSQL is configured, uncomment the Prisma setup below:
//
// import { PrismaClient } from "@prisma/client"
//
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// }
//
// export const prisma = globalForPrisma.prisma ?? new PrismaClient()
//
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// In-memory storage for development without database
const store = new Map<string, unknown>()

export const db = {
  get: (key: string) => store.get(key),
  set: (key: string, value: unknown) => store.set(key, value),
  delete: (key: string) => store.delete(key),
  entries: () => Array.from(store.entries()),
}
