import React, { useEffect, useState } from "react";
import { fetchEvents } from "../services/api";
import EventBarChart from "../charts/EventBarChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DashboardPage.css";

// Helper to extract ISO string from timestamp
function getEventDateString(e) {
  const rawTimestamp = typeof e.timestamp === "string"
    ? e.timestamp
    : (e.timestamp && e.timestamp.$date)
      ? e.timestamp.$date
      : null;
  if (!rawTimestamp) return null;
  const dateObj = new Date(rawTimestamp);
  if (isNaN(dateObj.getTime())) return null;
  return dateObj.toISOString().slice(0, 10);
}

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
        console.log("Fetched events timestamps:", data.map(e => getEventDateString(e)));
        const uniqueDates = [...new Set(data.map(e => getEventDateString(e)))].filter(Boolean);
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

    const eventDateStr = getEventDateString(e);
    if (!eventDateStr) return false;

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

  // Get all valid event dates for min/max
  const eventDates = events
    .map(getEventDateString)
    .filter(Boolean);
  const minDate = eventDates.length ? eventDates.reduce((a, b) => a < b ? a : b) : "";
  const maxDate = eventDates.length ? eventDates.reduce((a, b) => a > b ? a : b) : "";

  return (
    <div className="dashboard-container">
      <h1>Portfolio Analytics Dashboard</h1>

      <div className="filter-row">
        <div className="filter-group">
          <label>Start Date:</label>
          <DatePicker
            selected={startDate ? new Date(startDate) : null}
            onChange={date => setStartDate(date ? date.toISOString().slice(0, 10) : "")}
            dateFormat="yyyy-MM-dd"
            minDate={minDate ? new Date(minDate) : null}
            maxDate={maxDate ? new Date(maxDate) : null}
            placeholderText="yyyy-mm-dd"
            isClearable
          />
        </div>

        <div className="filter-group">
          <label>End Date:</label>
          <DatePicker
            selected={endDate ? new Date(endDate) : null}
            onChange={date => setEndDate(date ? date.toISOString().slice(0, 10) : "")}
            dateFormat="yyyy-MM-dd"
            minDate={minDate ? new Date(minDate) : null}
            maxDate={maxDate ? new Date(maxDate) : null}
            placeholderText="yyyy-mm-dd"
            isClearable
          />
        </div>
      </div>
      <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
        <strong>Note:</strong> Please use the date picker (calendar icon) to select dates. Manually typing dates may not work due to browser locale settings.
      </p>

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
