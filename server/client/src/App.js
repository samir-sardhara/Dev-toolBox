import React, { useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000";

function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleFormat = async () => {
    setError("");
    setOutput("");
    try {
      const res = await fetch(`${API_URL}/format-json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ json: input }),
      });
      const data = await res.json();
      if (data.success) setOutput(data.formatted);
      else setError(data.error || "Unknown error");
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="tool-container">
      <textarea
        rows={8}
        placeholder="Paste raw JSON here"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={handleFormat}>Format JSON</button>
      {error && <div className="error">{error}</div>}
      {output && (
        <pre className="output">{output}</pre>
      )}
    </div>
  );
}

function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("encode");

  const handleConvert = async () => {
    setError("");
    setOutput("");
    try {
      const endpoint = mode === "encode" ? "/encode" : "/decode";
      const body =
        mode === "encode"
          ? { text: input }
          : { base64: input };
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) setOutput(data.result);
      else setError(data.error || "Unknown error");
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="tool-container">
      <div className="mode-switch">
        <button
          className={mode === "encode" ? "active" : ""}
          onClick={() => { setMode("encode"); setInput(""); setOutput(""); setError(""); }}
        >
          Encode
        </button>
        <button
          className={mode === "decode" ? "active" : ""}
          onClick={() => { setMode("decode"); setInput(""); setOutput(""); setError(""); }}
        >
          Decode
        </button>
      </div>
      <textarea
        rows={6}
        placeholder={mode === "encode" ? "Enter text to encode" : "Enter Base64 to decode"}
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={handleConvert}>
        {mode === "encode" ? "Encode" : "Decode"}
      </button>
      {error && <div className="error">{error}</div>}
      {output && (
        <pre className="output">{output}</pre>
      )}
    </div>
  );
}

function App() {
  const [tab, setTab] = useState("json");

  return (
    <div className="App">
      <h1>Dev Toolbox</h1>
      <div className="tabs">
        <button
          className={tab === "json" ? "active" : ""}
          onClick={() => setTab("json")}
        >
          JSON Formatter
        </button>
        <button
          className={tab === "base64" ? "active" : ""}
          onClick={() => setTab("base64")}
        >
          Base64 Encoder/Decoder
        </button>
      </div>
      <div className="tab-content">
        {tab === "json" ? <JSONFormatter /> : <Base64Tool />}
      </div>
    </div>
  );
}

export default App; 