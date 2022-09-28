import * as React from "react";
import type { NextPage } from "next";

import type { GetServerSideProps } from "next";

import { db } from "../lib/db";

import DataGrid from "@supabase/react-data-grid";

const TablePage: NextPage<{ rows: any; columns: any }> = ({
  rows,
  columns,
}) => {
  return (
    <div>
      <div className="container m-[4rem]">
        <DataGrid rows={rows} columns={columns} />
      </div>
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

export default TablePage;
