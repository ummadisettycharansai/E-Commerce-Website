interface Column { key: string; label: string; render?: (row: any) => React.ReactNode; }
interface Props { columns: Column[]; data: any[]; loading?: boolean; }

export default function AdminTable({ columns, data, loading }: Props) {
  if (loading) return <div className="animate-pulse space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-12 bg-gray-200 rounded" />)}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((c) => <th key={c.key} className="text-left py-3 px-4 font-semibold text-gray-600">{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
              {columns.map((c) => (
                <td key={c.key} className="py-3 px-4">{c.render ? c.render(row) : row[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!data.length && <p className="text-center py-8 text-gray-500">No data found</p>}
    </div>
  );
}
