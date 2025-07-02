import React, { useEffect, useState } from "react";
import { fetchEvents } from "../services/api";
import EventChart from "../charts/EventChart";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;

  return (
    <div>
      <h1>Event Analytics</h1>
      <EventChart events={events} />
    </div>
  );
};

export default EventsPage; 