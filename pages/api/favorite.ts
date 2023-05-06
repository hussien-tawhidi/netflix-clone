import prismadb from "@/lib/prismadb";

import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

import { without } from "lodash";
import serverAuth from "@/lib/serverAuth";

export default async function favorite(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req,res);

      const { movieId } = req?.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId ,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid Movie ID");
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return res.status(200).json(user);
    }
    // POST METHOD END  ------------------------------------
    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req,res);

      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: { id: movieId },
      });

      if (!existingMovie) {
        throw new Error("Invalid movie ID");
      }

      const updatedFavoriteFields = without(currentUser.favoriteIds);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser?.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteFields,
        },
      });

      return res.status(200).json(updatedUser);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
