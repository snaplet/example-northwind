import * as React from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

import type { GetServerSideProps } from "next";

import { db } from "./lib/db";

import DataGrid from "@supabase/react-data-grid";

const Home: NextPage<{ rows: any; columns: any }> = ({ rows, columns }) => {
  return (
    <div className={styles.container}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const customers = await db.customers.findMany();

  const columns: { column_name: string }[] =
    await db.$queryRaw`SELECT column_name FROM information_schema.columns WHERE table_name = 'customers';`;

  return {
    props: {
      columns: columns.map((col) => ({
        key: col.column_name,
        name: col.column_name,
      })),
      rows: customers,
    },
  };
};

export default Home;
