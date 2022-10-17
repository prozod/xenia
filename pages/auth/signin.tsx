import { ChevronRightIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Button from "../../src/components/button/button.component";
import Form from "../../src/components/form/form.component";
import Gradients from "../../src/components/gradients/gradients.component";
import { getProviders, signIn, SessionProviderProps } from "next-auth/react";
import Head from "next/head";

const formAnimation = {
  initial: {
    scale: 0.5,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.25,
      delay: 1,
    },
  },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: {
      delay: 0.25,
      duration: 0.25,
    },
  },
};

const AccountPage = ({ providers }: { providers: SessionProviderProps }) => {
  const [inputs, setInputs] = useState({ email: "", password: "" });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //implement email auh in the future
  }

  return (
    <>
      <Head>
        <title>Xenia | Sign In</title>
        <meta name="description" content="Sign in on Xenia" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Gradients />
      <section className="box flex items-center justify-center z-0 h-full">
        <motion.div
          variants={formAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          className="btn-gradient-outline p-[2px] z-0 rounded-md"
        >
          <Form onSubmit={handleSubmit}>
            <div className="mb-4 items-center flex items-center flex-col">
              <h1 className="font-bold text-lg">
                Welcome to{" "}
                <span className="rounded-full bg-gradient-to-r from-indigo-400/20 to-fuchsia-500/20 px-2 text-fuchsia-300">
                  Xenia
                </span>
              </h1>
              <small className="text-white/60">Please log in</small>
            </div>
            <small className="text-xs font-medium text-white/80 w-72 mb-4">
              Unfortunately, email and password accounts are currently not
              implemented,{" "}
              <strong className="font-bold text-red-400">
                {" "}
                please use the Google authentication
              </strong>{" "}
              method. <br /> Thank you!
            </small>
            <Form.Group>
              <Form.Input
                placeholder="Email"
                type="text"
                id="email"
                aria-labelledby="Email address"
                autoComplete="on"
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
              />
              <Form.Label text="Email" htmlFor="email" />
            </Form.Group>
            <Form.Group>
              <Form.Input
                placeholder="Password"
                type="password"
                id="password"
                aria-labelledby="Password"
                autoComplete="off"
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
              <Form.Label text="Password" htmlFor="email" />
            </Form.Group>
            <Button.Outline
              type="submit"
              expand
              text="Sign in"
              iconRight={<ChevronRightIcon width={18} height={18} />}
              disabled
            />
            <small className="border-b-[0.5px] border-t-[0.5px] border-white/20 py-1 my-2 opacity-30 text-center text-xs uppercase font-bold">
              alternatively, sign in with...
            </small>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <Button.GradientOutline
                  key={provider.name}
                  expand
                  type="button"
                  text={`Sign in with ${provider.name}`}
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  iconRight={<ChevronRightIcon width={18} height={18} />}
                />
              </div>
            ))}
          </Form>
        </motion.div>
      </section>
    </>
  );
};

export default AccountPage;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
