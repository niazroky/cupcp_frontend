
// ---------- components/ExamRegSummaryHelper/useRegistrations.js ----------

import { useState, useEffect } from 'react';
import axios from 'axios';
import apiRoutes from '../../api/apiRoute';

export default function useRegistrations() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Not authenticated.");
      return;
    }
    axios.get(
      apiRoutes.examRegistrationSummary,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(({ data }) => setData(data))
    .catch(err => setError(err.response?.data?.detail || "Failed to load summary."));
  }, []);

  return { data, error };
}