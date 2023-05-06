import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    throw new Error("user is not exist");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not Sign in");
  }

  return { currentUser };
};

export default serverAuth;
