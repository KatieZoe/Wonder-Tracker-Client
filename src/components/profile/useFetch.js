import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState([]);

  async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    console.log("data from server", data);
    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return data;
}
