import { useEffect, useState } from "react";
import axios from "axios";

export default function useDashboardStats() {
  const [stats, setStats] = useState({
    users: 0,
    feedbacks: 0,
    activities: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/dashboard-stats"
        );
        setStats(response.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}
