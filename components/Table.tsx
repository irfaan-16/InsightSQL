const Table = ({ table }) => {
  return (
    <table className="text-sm border-collapse">
      <thead>
        <tr>
          {table?.columns.map((col) => (
            <th className="border-2 border-dashed p-2" key={col + Date.now()}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table?.output.map((row, idx) => {
          return (
            <tr key={idx + Date.now()}>
              {Object.values(row).map((col, idx): any => {
                return (
                  <td
                    className="border-2 border-dashed p-2"
                    key={(col as string) + idx}
                  >
                    {col as string}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
