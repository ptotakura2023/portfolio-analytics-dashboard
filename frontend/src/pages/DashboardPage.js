import React, { useEffect, useState } from "react";
import { fetchEvents } from "../services/api";
import EventBarChart from "../charts/EventBarChart";
import "./DashboardPage.css";

export default function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchEvents()
      .then((res) => {
        const data = res.data || res;
        console.log("Fetched events timestamps:", data.map(e => e.timestamp));
        const uniqueDates = [...new Set(data.map(e => {
          const d = new Date(e.timestamp);
          return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
        }))].filter(Boolean);
        console.log("Unique event dates:", uniqueDates);
        setEvents(data);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter events by date range safely, skipping invalid timestamps
  const filteredEvents = events.filter((e) => {
    if (!startDate && !endDate) return true;

    console.log("Event timestamp:", e.timestamp);

    let eventDateStr = "";
    try {
      const dateObj = new Date(e.timestamp);
      if (!isNaN(dateObj.getTime())) {
        eventDateStr = dateObj.toISOString().slice(0, 10);
      } else {
        return false; // Skip invalid date
      }
    } catch {
      return false; // Skip malformed date
    }

    if (startDate && eventDateStr < startDate) return false;
    if (endDate && eventDateStr > endDate) return false;

    return true;
  });

  // Aggregate event counts by type
  const eventTypeCounts = filteredEvents.reduce((acc, e) => {
    acc[e.event_type] = (acc[e.event_type] || 0) + 1;
    return acc;
  }, {});

  // Aggregate event counts by page
  const pageCounts = filteredEvents.reduce((acc, e) => {
    acc[e.page] = (acc[e.page] || 0) + 1;
    return acc;
  }, {});

  // Aggregate event counts by source
  const sourceCounts = filteredEvents.reduce((acc, e) => {
    acc[e.source] = (acc[e.source] || 0) + 1;
    return acc;
  }, {});

  const eventDates = events
    .map(e => {
      const d = new Date(e.timestamp);
      return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
    })
    .filter(Boolean);
  const minDate = eventDates.length ? eventDates.reduce((a, b) => a < b ? a : b) : "";
  const maxDate = eventDates.length ? eventDates.reduce((a, b) => a > b ? a : b) : "";

  return (
    <div className="dashboard-container">
      <h1>Portfolio Analytics Dashboard</h1>

      <div className="filter-row">
        <div className="filter-group">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            min={minDate}
            max={maxDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            min={minDate}
            max={maxDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : filteredEvents.length === 0 ? (
        <p className="no-events-text">No events in this date range.</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
