import Layout from "@/components/Layout";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

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

export default function Profile() {
  const { data: user } = useCurrentUser();
  const router = useRouter();
  return (
    <Layout title="Netflix | Profile">
      <div className='flex items-center justify-center h-full'>
        <div className='flex flex-col'>
          <h1 className='text-3xl md:text-6xl text-white text-center'>
            Who is watching
          </h1>
          <div className='flex items-center justify-center gap-8 mt-10'>
            <div className='' onClick={() => router?.push("/")}>
              <div className='group flex-row w-44 mx-auto'>
                <div className='w-44 bg-black h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden'>
                  <Image
                    src='/images/default-blue.png'
                    width={100}
                    height={100}
                    alt='avatar'
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white'>
                  <p>Name: {user?.currentUser?.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
