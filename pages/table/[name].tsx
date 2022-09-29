import * as React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import type { GetServerSideProps } from "next";

import { db } from "../../lib/db";
import { cleanupRows } from "../../lib/utils";

import DataGrid from "@supabase/react-data-grid";

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const TablePage: NextPage<{ rows: any; columns: any }> = ({
  rows,
  columns,
}) => {
  const router = useRouter();

  return (
    <div>
      <div className="container m-[4rem]">
        <Link href="/">
          <div className="flex mb-5 text-white gap-2 items-center hover:text-gray-200 cursor-pointer">
            <Arrow />
            <div>
              {router.query.name} ({rows.length})
            </div>
          </div>
        </Link>

        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // @ts-ignore
  const query = db[context.query.name];

  if (query) {
    const columns: { column_name: string }[] =
      await db.$queryRaw`SELECT column_name FROM information_schema.columns WHERE table_name = ${context.query.name};`;

    const rows = await query.findMany();

    const serializedRows = cleanupRows(rows);

    return {
      props: {
        columns: columns.map((col) => ({
          key: col.column_name,
          name: col.column_name,
        })),
        rows: serializedRows,
      },
    };
  }

  return { props: {} };
};

export default TablePage;
