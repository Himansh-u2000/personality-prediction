import React, { useState } from "react";
import {
  Search,
  SortAsc,
  Download,
  Filter,
  ChevronDown,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StudentResults = () => {
  // Sample data - replace with actual data from your backend
  const initialData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      date: "2024-03-20",
      score: 85,
      department: "Engineering",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      date: "2024-03-19",
      score: 92,
      department: "Business",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      date: "2024-03-18",
      score: 78,
      department: "Arts",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      date: "2024-03-17",
      score: 95,
      department: "Science",
    },
    {
      id: 5,
      name: "Alex Brown",
      email: "alex@example.com",
      date: "2024-03-16",
      score: 88,
      department: "Engineering",
    },
  ];

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] =
    useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [filterDepartment, setFilterDepartment] =
    useState("all");
  const [showFilters, setShowFilters] =
    useState(false);

  // Calculate statistics
  const averageScore = Math.round(
    data.reduce(
      (acc, curr) => acc + curr.score,
      0
    ) / data.length
  );
  const highestScore = Math.max(
    ...data.map((student) => student.score)
  );
  const lowestScore = Math.min(
    ...data.map((student) => student.score)
  );

  // Chart data
  const chartData = data.map((student) => ({
    name: student.name.split(" ")[0],
    score: student.score,
  }));

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key])
        return direction === "asc" ? -1 : 1;
      if (a[key] > b[key])
        return direction === "asc" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  // Filter function
  const handleFilter = (department) => {
    setFilterDepartment(department);
    if (department === "all") {
      setData(initialData);
    } else {
      setData(
        initialData.filter(
          (student) =>
            student.department === department
        )
      );
    }
  };

  // Search function
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filteredData = initialData.filter(
      (student) =>
        student.name
          .toLowerCase()
          .includes(term.toLowerCase()) ||
        student.email
          .toLowerCase()
          .includes(term.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <div
      className="max-w-7xl mx-auto p-6"
      style={{ backgroundColor: "#DFF2EB" }}
    >
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-500">
              Average Score
            </div>
            <div
              className="text-3xl font-bold mt-2"
              style={{ color: "#4A628A" }}
            >
              {averageScore}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-500">
              Highest Score
            </div>
            <div
              className="text-3xl font-bold mt-2"
              style={{ color: "#4A628A" }}
            >
              {highestScore}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-500">
              Lowest Score
            </div>
            <div
              className="text-3xl font-bold mt-2"
              style={{ color: "#4A628A" }}
            >
              {lowestScore}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            Score Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#4A628A"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) =>
              handleSearch(e.target.value)
            }
          />
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-lg flex items-center gap-2 bg-white border hover:bg-gray-50"
            onClick={() =>
              setShowFilters(!showFilters)
            }
          >
            <Filter size={20} />
            Filters
          </button>
          <button
            className="px-4 py-2 rounded-lg flex items-center gap-2 text-white"
            style={{ backgroundColor: "#4A628A" }}
          >
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <select
                className="p-2 border rounded-lg"
                value={filterDepartment}
                onChange={(e) =>
                  handleFilter(e.target.value)
                }
              >
                <option value="all">
                  All Departments
                </option>
                <option value="Engineering">
                  Engineering
                </option>
                <option value="Business">
                  Business
                </option>
                <option value="Arts">Arts</option>
                <option value="Science">
                  Science
                </option>
              </select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left">
                    <button
                      className="flex items-center gap-1 text-sm font-semibold"
                      onClick={() =>
                        handleSort("name")
                      }
                    >
                      Name
                      <ChevronDown size={16} />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      className="flex items-center gap-1 text-sm font-semibold"
                      onClick={() =>
                        handleSort("date")
                      }
                    >
                      Date
                      <ChevronDown size={16} />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      className="flex items-center gap-1 text-sm font-semibold"
                      onClick={() =>
                        handleSort("score")
                      }
                    >
                      Score
                      <ChevronDown size={16} />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      {student.name}
                    </td>
                    <td className="px-6 py-4">
                      {student.email}
                    </td>
                    <td className="px-6 py-4">
                      {student.department}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(
                        student.date
                      ).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold">
                        {student.score}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentResults;