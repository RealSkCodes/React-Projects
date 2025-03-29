import { useContext, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

const Analytics = () => {
  // const { jobs } = useContext(JobsDataContext);
  const [jobsStatusCount, setJobsStatusCount] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [jobs] = useState([
    {
      _id: "1",
      company: "Google",
      role: "Software Engineer",
      area: "Mountain View, CA",
      postedDate: "2024-02-15",
      submitDate: "2024-02-18",
      status: "Applied",
      source: "LinkedIn",
      salary: "$120,000",
      notes: "Had an initial screening with HR.",
      interviewDate: "2024-02-25",
      todos: ["Prepare system design interview", "Review algorithms"],
    },
  ]);
  useEffect(() => {
    if (!jobs || jobs.length === 0) return;

    const statusColors = {
      Draft: "#8884d8",
      Applied: "#82ca9d",
      "Interview Scheduled": "#ff7300",
      "Interview Completed": "#FFFF00",
      "Offer Received": "#008080",
      Accepted: "#00f",
      Rejected: "#f00",
      Withdrawn: "#8b0000",
    };

    const statusCount = {
      Draft: 0,
      Applied: 0,
      "Interview Scheduled": 0,
      "Interview Completed": 0,
      "Offer Received": 0,
      Accepted: 0,
      Rejected: 0,
      Withdrawn: 0,
    };

    Array.isArray(jobs) && jobs.length > 0
      ? jobs.forEach((job) => {
          if (statusCount.hasOwnProperty(job.status)) {
            statusCount[job.status] += 1;
          }
        })
      : null;

    const statusArray = Object.keys(statusCount)
      .map((status) => ({
        status,
        count: statusCount[status],
        fill: statusColors[status],
      }))
      .filter((data) => data.count > 0);

    setJobsStatusCount(statusArray);

    const interviewData = ["Interview Completed", "Offer Received", "Rejected"]
      .map((status) => ({
        name: status,
        value: statusCount[status],
        fill: statusColors[status],
      }))
      .filter((data) => data.value > 0);

    setChartData(interviewData);
  }, [jobs]);

  return (
    <div className="w-full h-screen items-center p-4 bg-background text-text">
      <h1 className="text-2xl mb-10 text-text font-bold font-geist">Analytics</h1>
      <div className="flex flex-wrap justify-center gap-10">
        <div className="bg-background_2 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Job Status Distribution</h2>
          <BarChart width={800} height={400} data={jobsStatusCount} margin={{ bottom: 40 }}>
            <XAxis dataKey="status" stroke="#8884d8" tick={{ overflow: "visible" }} angle={-45} interval={0} />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="count" barSize={30}>
              {jobsStatusCount.map((entry, index) => (
                <Cell key={`bar-cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="bg-background_2 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Interview Success Rate</h2>
          {chartData.length > 0 ? (
            <PieChart width={400} height={400}>
              <Pie data={chartData} cx="50%" cy="50%" outerRadius={100} dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={`pie-cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
