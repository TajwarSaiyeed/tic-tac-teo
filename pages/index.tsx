import { TicTacToe } from "@/components/TicTacToe";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tic Tac Toe</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-2xl font-bold uppercase text-center">T3 APP</h1>
        <h2 className="text-xl font-bold uppercase text-center">
          T3 - TypeScript + TailwindCSS + NextJS
        </h2>
        <div className="flex gap-5 flex-col w-full h-full justify-center items-center">
          <TicTacToe />
        </div>
      </main>
    </>
  );
}
