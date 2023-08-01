import * as React from "react";
import type { NextPage } from "next";
import Link from "next/link";

import type { GetServerSideProps } from "next";

import { db } from "../lib/db";

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 23"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Home: NextPage<{ tables: { table_name: string }[] }> = ({ tables }) => {
  return (
    <div className="max-w-xs mx-auto m-[4rem] border-sm">
      {tables.map(({ table_name }) => (
        <Link key={table_name} href={`/table/${table_name}`}>
          <div className="justify-between flex text-[#ddd] text-center border border-[#444] py-1 px-4 container text-sm mb-2 bg-[#212121] hover:bg-[#1b1b1b] cursor-pointer">
            {table_name}
            <Arrow />
          </div>
        </Link>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tables: { table_name: string }[] =
    await db.$queryRaw`select table_schema, table_name from information_schema.tables where table_schema not in ('information_schema', 'pg_catalog') and table_type = 'BASE TABLE'`;

  return {
    props: {
      tables,
    },
  };
};

export default Home;
