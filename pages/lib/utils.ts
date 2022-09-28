export const cleanupRows = (rows: Record<string, unknown>[] = []) => {
  const serializedRows = rows.map((row: any) => {
    // Split row into array and stringify values if needed.
    const rowEntries = Object.entries(row).map((entry: any) => {
      if (typeof entry[1] === "object") {
        return [entry[0], JSON.stringify(entry[1])];
      } else {
        return entry;
      }
    });

    // Stitch back together
    return rowEntries.reduce((prev, current) => {
      return { ...prev, [current[0]]: current[1] };
    }, {});
  });

  return serializedRows;
};
