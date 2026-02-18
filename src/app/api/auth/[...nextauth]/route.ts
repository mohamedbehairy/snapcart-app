import { authOptions } from "@/auth";
import NextAuth from "next-auth";

//# because may use it in different files
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

