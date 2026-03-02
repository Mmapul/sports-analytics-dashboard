import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

/* ===============================
   SECURITY UTILS
================================ */
function obfuscateHeartRate(hr) {
  return `${hr - 5}–${hr + 5} bpm (secured)`;
}

/* ===============================
   PERFORMANCE DATA
================================ */
const performanceData = [
  { minute: 0, speed: 20, distance: 0.2 },
  { minute: 15, speed: 23, distance: 2.1 },
  { minute: 30, speed: 27, distance: 4.8 },
  { minute: 45, speed: 25, distance: 5.5 },
  { minute: 60, speed: 30, distance: 7.6 },
  { minute: 75, speed: 28, distance: 9.1 },
  { minute: 90, speed: 32, distance: 10.6 }
];

/* ===============================
   PLAYER DATA
================================ */
const players = [
  {
    id: 1,
    name: "Alex Moreno",
    position: "FW",
    xg: 0.42,
    speed: 34.8,
    distance: 10.6,
    heartRate: 164,
    age: 26,
    nationality: "Spain"
  },
  {
    id: 2,
    name: "Jonas Keller",
    position: "MF",
    xg: 0.21,
    speed: 31.2,
    distance: 11.9,
    heartRate: 158,
    age: 24,
    nationality: "Germany"
  },
  {
    id: 3,
    name: "Luca Romano",
    position: "DF",
    xg: 0.08,
    speed: 29.4,
    distance: 10.1,
    heartRate: 162,
    age: 28,
    nationality: "Italy"
  }
];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("xg");
  const [metric, setMetric] = useState("speed");

  // 🔍 NEW: selected player for modal
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const filteredPlayers = players
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b[sortKey] - a[sortKey]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 relative">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Sports Analytics Dashboard
        </h1>
        <span className="text-sm px-3 py-1 rounded bg-emerald-500 text-black font-semibold">
          🔐 Secure Session: ACTIVE
        </span>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="text-sm text-gray-400">xG</p>
          <p className="text-2xl font-bold text-teal-400">0.42</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Sprint Speed</p>
          <p className="text-2xl font-bold">34.8 km/h</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Distance</p>
          <p className="text-2xl font-bold">10.6 km</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-red-500/40">
          <p className="text-sm text-gray-400">Heart Rate</p>
          <p className="text-lg font-bold text-red-400">
            {obfuscateHeartRate(164)}
          </p>
        </div>
      </div>

      {/* CHART */}
      <div className="bg-slate-800 p-6 rounded-xl h-96 mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Performance Over Time
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setMetric("speed")}
              className={`px-3 py-1 rounded ${
                metric === "speed"
                  ? "bg-teal-500 text-black"
                  : "bg-slate-700"
              }`}
            >
              Speed
            </button>
            <button
              onClick={() => setMetric("distance")}
              className={`px-3 py-1 rounded ${
                metric === "distance"
                  ? "bg-teal-500 text-black"
                  : "bg-slate-700"
              }`}
            >
              Distance
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData}>
            <XAxis dataKey="minute" stroke="#cbd5f5" />
            <YAxis stroke="#cbd5f5" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={metric}
              stroke="#38bdf8"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* SCOUTER TABLE */}
      <div className="bg-slate-800 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">
          Scouter — Player Overview
        </h2>

        <input
          type="text"
          placeholder="Search player..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-4 w-full p-2 rounded bg-slate-900 text-white border border-slate-700"
        />

        <table className="w-full text-left">
          <thead className="text-gray-400">
            <tr>
              <th>Name</th>
              <th>Pos</th>
              <th>xG</th>
              <th>Speed</th>
              <th>Distance</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map(player => (
              <tr
                key={player.id}
                onClick={() => setSelectedPlayer(player)}
                className="border-t border-slate-700 cursor-pointer hover:bg-slate-700"
              >
                <td>{player.name}</td>
                <td>{player.position}</td>
                <td>{player.xg}</td>
                <td>{player.speed}</td>
                <td>{player.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔍 PLAYER MODAL */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-xl w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4">
              {selectedPlayer.name}
            </h3>

            <div className="space-y-2">
              <p>Position: {selectedPlayer.position}</p>
              <p>Age: {selectedPlayer.age}</p>
              <p>Nationality: {selectedPlayer.nationality}</p>
              <p>xG: {selectedPlayer.xg}</p>
              <p>Sprint Speed: {selectedPlayer.speed} km/h</p>
              <p>Distance: {selectedPlayer.distance} km</p>
              <p className="text-red-400">
                Heart Rate:{" "}
                {obfuscateHeartRate(
                  selectedPlayer.heartRate
                )}
              </p>
            </div>

            <button
              onClick={() => setSelectedPlayer(null)}
              className="mt-6 w-full bg-teal-500 text-black py-2 rounded font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
