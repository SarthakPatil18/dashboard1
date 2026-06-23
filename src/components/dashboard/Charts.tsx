import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  facultyWorkload,
  roomUtilization,
  optimizationTrend,
  lectureTypeSplit,
} from "@/lib/mock-data";

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--card-foreground)",
  fontSize: 12,
  boxShadow: "var(--shadow-card)",
};

export function FacultyWorkloadChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={facultyWorkload} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f9fafb" }} />
        <Legend verticalAlign="bottom" height={36} iconType="square" iconSize={8} wrapperStyle={{ fontSize: 11, color: "#9ca3af", paddingTop: 10 }} />
        <Bar dataKey="ideal" fill="var(--chart-2)" radius={[6, 6, 0, 0]} name="Ideal" />
        <Bar dataKey="load" fill="var(--chart-1)" radius={[6, 6, 0, 0]} name="Assigned" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RoomUtilizationChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={roomUtilization}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--info)" stopOpacity={0.5} />
            <stop offset="100%" stopColor="var(--info)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#888888" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#888888" }} axisLine={false} tickLine={false} unit="%" />
        <Tooltip contentStyle={tooltipStyle} />
        <Area
          type="monotone"
          dataKey="utilization"
          stroke="var(--info)"
          strokeWidth={2.5}
          fill="url(#areaGrad)"
          name="Utilization"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function OptimizationTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={optimizationTrend}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="gen" tick={{ fontSize: 11, fill: "#888888" }} axisLine={false} tickLine={false} />
        <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: "#888888" }} axisLine={false} tickLine={false} unit="%" />
        <Tooltip contentStyle={tooltipStyle} />
        <Line
          type="monotone"
          dataKey="score"
          stroke="var(--primary)"
          strokeWidth={3}
          dot={{ r: 4, fill: "var(--primary)" }}
          activeDot={{ r: 6 }}
          name="Score"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function LectureSplitChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={lectureTypeSplit}
          dataKey="value"
          nameKey="name"
          innerRadius={56}
          outerRadius={84}
          paddingAngle={3}
          stroke="none"
        >
          {lectureTypeSplit.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}
