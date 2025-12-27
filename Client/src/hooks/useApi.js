import { useState } from "react";

const useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const request = async (...arg) => {
    setLoading(true);
    const response = await apiFunc(...arg);
    setLoading(false);

    if (!response.ok) {
      setStatus(response.status);
      setError(true);
      return;
    }
    setError(false);
    setData(response.data);
  };
  return { data, request, loading, error, status };
};

export default useApi;
