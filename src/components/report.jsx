import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const ReportTab = ({ tabData, parameters }) => {
  const nodeID = tabData.nodeID;
  const nodeParams = parameters.filter((p) => p.NodeID === nodeID);

  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    const initialValues = {};
    nodeParams.forEach((p) => {
      initialValues[p.ParamName] = p.DefaultValue || "";
    });
    setFormData(initialValues);
  }, [nodeID]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        url: `/api/${tabData.procName}`,
        method: tabData.method?.toLowerCase() || "post",
        ...(tabData.method === "GET"
          ? { params: formData }
          : { data: formData }),
      });

      setResult(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setResult({ error: "Fetch failed" });
    }
  };

  const renderField = (param) => {
    const { ParamName, InputType, Options } = param;
    const value = formData[ParamName];

    switch (InputType) {
      case "dropdown":
        return (
          <FormControl fullWidth key={ParamName} margin="normal">
            <InputLabel>{ParamName}</InputLabel>
            <Select
              value={value}
              label={ParamName}
              onChange={(e) => handleChange(ParamName, e.target.value)}
            >
              {(Options || []).map((opt) => (
                <MenuItem value={opt} key={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case "date":
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns} key={ParamName}>
            <DatePicker
              label={ParamName}
              value={value}
              onChange={(newVal) => handleChange(ParamName, newVal)}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />
          </LocalizationProvider>
        );

      default:
        return (
          <TextField
            key={ParamName}
            label={ParamName}
            value={value}
            onChange={(e) => handleChange(ParamName, e.target.value)}
            fullWidth
            margin="normal"
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{tabData.nodeText}</h2>
      <p>{tabData.description}</p>

      {nodeParams.map(renderField)}

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Run Report
      </Button>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Output</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </form>
  );
};

export default ReportTab;