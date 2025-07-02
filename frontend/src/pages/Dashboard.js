import React, { useEffect, useState } from "react";
import { fetchEvents } from "../services/api";
import EventBarChart from "../charts/EventBarChart";

export default function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // New state for date range filter
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchEvents()
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Helper function to check if a date string is valid
  function isValidDateString(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    return !isNaN(d.getTime());
  }

  const filteredEvents = events.filter((event) => {
    // If no date filters applied, return true
    if (!startDate && !endDate) return true;

    const eventDate = new Date(event.timestamp);
    if (isNaN(eventDate.getTime())) return false; // skip invalid event dates

    // Validate startDate and endDate strings before creating Date objects
    if (startDate && isValidDateString(startDate)) {
      const start = new Date(startDate);
      if (eventDate < start) return false;
    }

    if (endDate && isValidDateString(endDate)) {
      const end = new Date(endDate);
      if (eventDate > end) return false;
    }

    return true;
  });

  // Aggregate counts from filtered events
  const eventTypeCounts = filteredEvents.reduce((acc, e) => {
    acc[e.event_type] = (acc[e.event_type] || 0) + 1;
    return acc;
  }, {});

  const pageCounts = filteredEvents.reduce((acc, e) => {
    acc[e.page] = (acc[e.page] || 0) + 1;
    return acc;
  }, {});

  const sourceCounts = filteredEvents.reduce((acc, e) => {
    acc[e.source] = (acc[e.source] || 0) + 1;
    return acc;
  }, {});

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1>Portfolio Analytics Dashboard</h1>

      {/* Date Range Filter */}
      <div style={{ marginBottom: 20 }}>
        <label>
          Start Date:{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label style={{ marginLeft: 20 }}>
          End Date:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      <EventBarChart
        title="Events by Type"
        labels={Object.keys(eventTypeCounts)}
        data={Object.values(eventTypeCounts)}
      />

      <EventBarChart
        title="Events by Page"
        labels={Object.keys(pageCounts)}
        data={Object.values(pageCounts)}
      />

      <EventBarChart
        title="Events by Source"
        labels={Object.keys(sourceCounts)}
        data={Object.values(sourceCounts)}
      />
    </div>
  );
}
