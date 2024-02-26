const Table = ({ table }) => {
  return (
    <table className="text-sm border-collapse">
      <thead>
        <tr>
          {table?.columns.map((col) => (
            <th className="border-2 border-dashed p-2">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table?.output.map((row, idx) => {
          return (
            <tr>
              {Object.values(row).map((col, idx): any => {
                return (
                  <td className="border-2 border-dashed p-2">
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
