import React from "react";
import EventBarChart from "../charts/EventBarChart";

export default function EventChart({ title, labels, data }) {
  return <EventBarChart title={title} labels={labels} data={data} />;
} 