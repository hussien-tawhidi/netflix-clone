import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function auth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [varient, setVarient] = useState("login");

  const toggleVarient = useCallback(() => {
    setVarient((currentVarient) =>
      currentVarient === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <Layout title='Netflix | user Authentications'>
      <div className="relative h-[100vh] w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className='bg-black w-full h-full lg:bg-opacity-50 sm:bg-opacity-50'>
          <div className='px-12 py-6 z-10'>
            <Link href='/'>
              <Image
                src='/images/logo.png'
                alt='logo'
                width={100}
                height={100}
                className='object-cover cursor-pointer'
              />
            </Link>
          </div>
          <div className='flex justify-center'>
            <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
              <h2 className='text-white text-4xl mb-8 font-semibold'>
                {varient === "login" ? "Sign in" : "Create an account"}
              </h2>
              <div className='flex flex-col gap-4'>
                {varient !== "login" && (
                  <Input
                    label='Name'
                    onChange={(ev: any) => setName(ev.target.value)}
                    id='name'
                    type='text'
                    value={name}
                  />
                )}
                <Input
                  label='Email'
                  onChange={(ev: any) => setEmail(ev.target.value)}
                  id='email'
                  type='email'
                  value={email}
                />

                <Input
                  label='Password'
                  onChange={(ev: any) => setPassword(ev.target.value)}
                  id='password'
                  type='password'
                  value={password}
                />
                <button
                  type='submit'
                  onClick={varient === "login" ? login : register}
                  className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition duration-100'>
                  Login
                </button>
                <div className='flex flex-row item-center gap-4 mt-8 justify-center'>
                  <div
                    className='w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 duration-200'
                    onClick={() => signIn("google", { callbackUrl: "/" })}>
                    <FcGoogle size={30} />
                  </div>
                  <div
                    className='w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 duration-200'
                    onClick={() => signIn("github", { callbackUrl: "/" })}>
                    <FaGithub size={30} />
                  </div>
                </div>
                <p className='text-neutral-500 mt-12 text-center'>
                  {varient === "login"
                    ? "First time using ?"
                    : "Have already an account"}
                  <span
                    className='text-white ml-1 hover:underline cursor-pointer'
                    onClick={toggleVarient}>
                    {varient === "login" ? "Create an account" : "Login"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
