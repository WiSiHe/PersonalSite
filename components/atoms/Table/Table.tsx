type Table = {
    data: any[]
    columns: string[]
}

const Table = ({ data, columns }: Table) => {
    return (
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column}
                            className="px-4 py-2 font-semibold text-left border-b border-gray-300"
                        >
                            {column}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, columnIndex) => (
                            <td
                                key={columnIndex}
                                className="px-4 py-2 border-b border-gray-300"
                            >
                                {row[column]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table
