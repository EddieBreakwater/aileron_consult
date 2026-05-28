import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type ChartDatum = {
  label: string;
  yours: number | null;
  median: number | null;
  flag?: number | null;
};

interface Props {
  data: ChartDatum[];
  title?: string;
  height?: number;
  defaultMode?: "bar" | "line";
}

export function BenchmarkChart({ data, title, height = 320, defaultMode = "bar" }: Props) {
  const [mode, setMode] = useState<"bar" | "line">(defaultMode);

  const yoursColor = "#0EA5A4"; // Surgical Teal
  const medianColor = "#0B1E3A"; // Medical Navy
  const flagColor = "#B91C1C"; // destructive

  return (
    <div className="rounded-xl border border-border/70 bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        {title && <h3 className="font-serif text-lg text-primary">{title}</h3>}
        <div className="ml-auto flex gap-1 rounded-md border border-border/70 p-0.5">
          <Button
            type="button"
            size="sm"
            variant={mode === "bar" ? "default" : "ghost"}
            onClick={() => setMode("bar")}
            className="h-7 px-3 text-xs"
          >
            Bar
          </Button>
          <Button
            type="button"
            size="sm"
            variant={mode === "line" ? "default" : "ghost"}
            onClick={() => setMode("line")}
            className="h-7 px-3 text-xs"
          >
            Line
          </Button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        {mode === "bar" ? (
          <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3E8EE" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11 }}
              interval={0}
              angle={-25}
              textAnchor="end"
              height={70}
            />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #E3E8EE",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 4 }} />
            <Bar dataKey="yours" name="Your practice" fill={yoursColor} radius={[3, 3, 0, 0]} />
            <Bar dataKey="median" name="Specialty median" fill={medianColor} radius={[3, 3, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 4, right: 12, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3E8EE" />
            <XAxis dataKey="label" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #E3E8EE",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 4 }} />
            <Line
              type="monotone"
              dataKey="yours"
              name="Your practice"
              stroke={yoursColor}
              strokeWidth={2.5}
              dot={{ fill: yoursColor, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="median"
              name="Specialty median"
              stroke={medianColor}
              strokeWidth={2.5}
              strokeDasharray="4 3"
              dot={{ fill: medianColor, r: 3 }}
            />
            {data.some(d => d.flag != null) && (
              <Line
                type="monotone"
                dataKey="flag"
                name="Flag threshold"
                stroke={flagColor}
                strokeWidth={1.5}
                strokeDasharray="2 2"
                dot={false}
              />
            )}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
