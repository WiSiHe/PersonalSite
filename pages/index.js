import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="p-6 max-w-sm mx-auto bg-dark rounded-xl shadow-md flex items-center space-x-4">
          <div>
            <div className="text-xl font-medium text-black">ChitChat</div>
            <p className="text-gray-500">You have a new message!</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p className="text-black-800">I&#39;m a footer</p>
      </footer>
    </div>
  );
}
