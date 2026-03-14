interface Props { title: string; value: string | number; icon: React.ReactNode; color?: string; }

export default function DashboardCard({ title, value, icon, color = 'bg-primary' }: Props) {
  return (
    <div className="card p-6 flex items-center gap-4">
      <div className={`${color} text-white p-3 rounded-xl`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
