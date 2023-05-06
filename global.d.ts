// import { PrismaClient } from ".prisma/client";

// declare global{
//     namespace globalThis{
//         var prismadb:PrismaClient
//     }
// }
import type { PrismaClient } from "@prisma/client";
import type { MongoClient } from "mongodb";

declare global {
  namespace globalThis {
    var prismadb: PrismaClient;
  }
}
