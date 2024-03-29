import { useEffect, useState } from "react";

const Table = ({
  onClick,
  data,
  headerMapping,
  buttonText = [],
  invisibleColumns = [],
}) => {
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    // Extract keys from the first data item
    const keys = data.length > 0 ? Object.keys(data[0]) : [];
    setHeaders(keys.filter((header) => !invisibleColumns.includes(header)));
  }, [data]);

  return (
    <>
      <div className="relative mx-auto overflow-x-auto shadow-md sm:rounded-lg max-h-[600px] max-w-full overflow-y-auto ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              {headers.map((header, index) => (
                <th scope="col" className="px-6 py-3" key={index}>
                  {headerMapping.find((mapping) => mapping.key === header)
                    ?.header || header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                {/* Map over headers to get values for each cell */}
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {index + 1}
                </td>
                {headers.map((header) => (
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    key={header}
                  >
                    {item[header]}
                  </td>
                ))}
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-blue-600 hover:underline"
                    onClick={() => onClick(item)}
                  >
                    {buttonText}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
