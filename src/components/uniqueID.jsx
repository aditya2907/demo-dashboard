import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const MyComponent = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    // Simulating a POST request (Replace this with your actual API call)
    fetch("https://example.com/api", {
      method: "POST",
      body: JSON.stringify({ someData: "value" }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && typeof data === "object") {
          // Add unique ID to each row
          const updatedData = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
              key,
              { ...value, id: uuidv4() },
            ])
          );
          setJsonData(updatedData);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2>Data with Unique IDs</h2>
      {jsonData ? (
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyComponent;