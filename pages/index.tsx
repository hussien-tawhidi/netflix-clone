import Billboard from "@/components/Billboard";
import Layout from "@/components/Layout";
import MoviesList from "@/components/movies";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useMovieLists from "@/hooks/useMovieLists";
import { NextPageContext } from "next";
import { getSession, signOut, useSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieLists();
  const { data: favorites = [] } = useFavorites();
  const { data: user } = useCurrentUser();
  console.log(user?.currentUser?.name);
  return (
    <Layout title='Netflix Home clone'>
      <div>
        <Billboard />
        <div className='pb-40'>
          <MoviesList title='Trending now' data={movies}/>
          <MoviesList title='Trending now' data={favorites}/>
        </div>
      </div>
    </Layout>
  );
}
