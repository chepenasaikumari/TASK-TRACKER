import { useEffect, useState } from "react";

function InsightsPanel() {
  const [insights, setInsights] = useState(null);

  async function fetchInsights() {
    const res = await fetch("http://localhost:3000/insights");
    const data = await res.json();
    setInsights(data);
  }

  useEffect(() => {
    fetchInsights();
  }, []);

  if (!insights) return <p>Loading insights...</p>;

  return (
    <div className="insights-panel">
      <h2>Smart Insights</h2>
      <div className="insights-summary">{insights.summary}</div>
    </div>
  );
}

export default InsightsPanel;
