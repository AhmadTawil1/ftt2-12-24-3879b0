/**
 * ProcessesPage — renders all OPM process and object elements.
 *
 * OPM Objects:   O1  O2  O3  O4  O5  O6  O7  O8  O9  O10
 *                O11 O12 O13 O14 O15 O16 O17 O18 O19 O20
 *                O21 O22 O23 O24 O25 O26 O27 O28 O29 O30
 *                O31 O32 O33 O34 O35 O36 O37 O38 O39 O40
 *                O41 O42 O43 O44 O45 O46 O47 O48 O49 O50
 *                O51 O52 O53 O54 O55 O56 O57 O58
 *
 * OPM Processes: P1  P2  P3  P4  P5  P6  P7  P8  P9  P10
 *                P11 P12 P13 P14 P15 P16 P17 P18 P19 P20
 *                P21 P22 P23 P24 P25 P26 P27 P28 P29 P30
 *                P31 P32 P33 P34 P35 P36 P37 P38
 */

import React, { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface OPMObject {
  id: string;
  name: string;
  description?: string;
}

interface OPMProcess {
  id: string;
  name: string;
  inputs: string[];
  outputs: string[];
  description?: string;
}

// ---------------------------------------------------------------------------
// Static OPM data (mirrors backend store so the page works without a server)
// ---------------------------------------------------------------------------

const OPM_OBJECTS: OPMObject[] = [
  { id: "O1",  name: "System",        description: "Top-level system object" },
  { id: "O2",  name: "User",           description: "Human actor" },
  { id: "O3",  name: "Request",        description: "Incoming request" },
  { id: "O4",  name: "Response",       description: "Outgoing response" },
  { id: "O5",  name: "Database",       description: "Persistent data store" },
  { id: "O6",  name: "Session",        description: "User session" },
  { id: "O7",  name: "Token",          description: "Auth token" },
  { id: "O8",  name: "Configuration",  description: "System config" },
  { id: "O9",  name: "Log",            description: "Log entry" },
  { id: "O10", name: "Event",          description: "Domain event" },
  { id: "O11", name: "Message",        description: "Inter-service message" },
  { id: "O12", name: "Queue",          description: "Message queue" },
  { id: "O13", name: "Cache",          description: "In-memory cache" },
  { id: "O14", name: "File",           description: "File resource" },
  { id: "O15", name: "Directory",      description: "File-system directory" },
  { id: "O16", name: "Permission",     description: "Access permission" },
  { id: "O17", name: "Role",           description: "User role" },
  { id: "O18", name: "Policy",         description: "Security policy" },
  { id: "O19", name: "Audit",          description: "Audit record" },
  { id: "O20", name: "Report",         description: "Generated report" },
  { id: "O21", name: "Dashboard",      description: "Monitoring dashboard" },
  { id: "O22", name: "Notification",   description: "User notification" },
  { id: "O23", name: "Alert",          description: "System alert" },
  { id: "O24", name: "Metric",         description: "Performance metric" },
  { id: "O25", name: "Threshold",      description: "Alert threshold" },
  { id: "O26", name: "Schedule",       description: "Task schedule" },
  { id: "O27", name: "Task",           description: "Unit of work" },
  { id: "O28", name: "Job",            description: "Background job" },
  { id: "O29", name: "Pipeline",       description: "Processing pipeline" },
  { id: "O30", name: "Stage",          description: "Pipeline stage" },
  { id: "O31", name: "Artifact",       description: "Build artifact" },
  { id: "O32", name: "Repository",     description: "Source repository" },
  { id: "O33", name: "Branch",         description: "Repo branch" },
  { id: "O34", name: "Commit",         description: "Source commit" },
  { id: "O35", name: "Tag",            description: "Release tag" },
  { id: "O36", name: "Release",        description: "Software release" },
  { id: "O37", name: "Deployment",     description: "Deployment unit" },
  { id: "O38", name: "Environment",    description: "Runtime environment" },
  { id: "O39", name: "Container",      description: "Docker container" },
  { id: "O40", name: "Image",          description: "Container image" },
  { id: "O41", name: "Volume",         description: "Persistent volume" },
  { id: "O42", name: "Network",        description: "Virtual network" },
  { id: "O43", name: "Service",        description: "Micro-service" },
  { id: "O44", name: "Endpoint",       description: "API endpoint" },
  { id: "O45", name: "API",            description: "Application interface" },
  { id: "O46", name: "Schema",         description: "Data schema" },
  { id: "O47", name: "Model",          description: "ML / data model" },
  { id: "O48", name: "Dataset",        description: "Training dataset" },
  { id: "O49", name: "Feature",        description: "ML feature" },
  { id: "O50", name: "Label",          description: "ML label" },
  { id: "O51", name: "Prediction",     description: "Model prediction" },
  { id: "O52", name: "Evaluation",     description: "Model evaluation" },
  { id: "O53", name: "Feedback",       description: "User feedback" },
  { id: "O54", name: "Improvement",    description: "System improvement" },
  { id: "O55", name: "Version",        description: "Artifact version" },
  { id: "O56", name: "Changelog",      description: "Version changelog" },
  { id: "O57", name: "Documentation",  description: "System docs" },
  { id: "O58", name: "Archive",        description: "Data archive" },
];

const OPM_PROCESSES: OPMProcess[] = [
  { id: "P1",  name: "Initialize",   inputs: ["O1","O8"],                   outputs: ["O1"] },
  { id: "P2",  name: "Configure",    inputs: ["O8"],                        outputs: ["O1"] },
  { id: "P3",  name: "Authenticate", inputs: ["O2","O7"],                   outputs: ["O6"] },
  { id: "P4",  name: "Authorize",    inputs: ["O2","O7","O16","O17","O18"], outputs: ["O6"] },
  { id: "P5",  name: "Validate",     inputs: ["O3","O46"],                  outputs: ["O4"] },
  { id: "P6",  name: "Parse",        inputs: ["O3","O11"],                  outputs: ["O10"] },
  { id: "P7",  name: "Transform",    inputs: ["O10","O47"],                 outputs: ["O48"] },
  { id: "P8",  name: "Enrich",       inputs: ["O48","O49"],                 outputs: ["O50"] },
  { id: "P9",  name: "Store",        inputs: ["O10","O14"],                 outputs: ["O5"] },
  { id: "P10", name: "Retrieve",     inputs: ["O5","O13"],                  outputs: ["O4"] },
  { id: "P11", name: "Index",        inputs: ["O5","O46"],                  outputs: ["O13"] },
  { id: "P12", name: "Search",       inputs: ["O3","O13"],                  outputs: ["O4"] },
  { id: "P13", name: "Filter",       inputs: ["O48","O25"],                 outputs: ["O48"] },
  { id: "P14", name: "Sort",         inputs: ["O48","O24"],                 outputs: ["O48"] },
  { id: "P15", name: "Aggregate",    inputs: ["O48","O24"],                 outputs: ["O20"] },
  { id: "P16", name: "Compute",      inputs: ["O47","O48"],                 outputs: ["O51"] },
  { id: "P17", name: "Render",       inputs: ["O20","O21"],                 outputs: ["O4"] },
  { id: "P18", name: "Serialize",    inputs: ["O47","O46"],                 outputs: ["O14"] },
  { id: "P19", name: "Deserialize",  inputs: ["O14","O46"],                 outputs: ["O47"] },
  { id: "P20", name: "Encrypt",      inputs: ["O14","O8"],                  outputs: ["O14"] },
  { id: "P21", name: "Decrypt",      inputs: ["O14","O7"],                  outputs: ["O14"] },
  { id: "P22", name: "Compress",     inputs: ["O14"],                       outputs: ["O31"] },
  { id: "P23", name: "Decompress",   inputs: ["O31"],                       outputs: ["O14"] },
  { id: "P24", name: "Upload",       inputs: ["O14","O2"],                  outputs: ["O32"] },
  { id: "P25", name: "Download",     inputs: ["O32","O2"],                  outputs: ["O14"] },
  { id: "P26", name: "Sync",         inputs: ["O32","O33"],                 outputs: ["O34"] },
  { id: "P27", name: "Replicate",    inputs: ["O5","O38"],                  outputs: ["O5"] },
  { id: "P28", name: "Backup",       inputs: ["O5","O41"],                  outputs: ["O58"] },
  { id: "P29", name: "Restore",      inputs: ["O58","O41"],                 outputs: ["O5"] },
  { id: "P30", name: "Monitor",      inputs: ["O1","O24"],                  outputs: ["O21"] },
  { id: "P31", name: "Alert",        inputs: ["O24","O25"],                 outputs: ["O23"] },
  { id: "P32", name: "Notify",       inputs: ["O23","O2"],                  outputs: ["O22"] },
  { id: "P33", name: "Log",          inputs: ["O10","O9"],                  outputs: ["O9"] },
  { id: "P34", name: "Audit",        inputs: ["O9","O19"],                  outputs: ["O19"] },
  { id: "P35", name: "Report",       inputs: ["O19","O20"],                 outputs: ["O20"] },
  { id: "P36", name: "Analyze",      inputs: ["O52","O48"],                 outputs: ["O54"] },
  { id: "P37", name: "Optimize",     inputs: ["O54","O47"],                 outputs: ["O47"] },
  { id: "P38", name: "Terminate",    inputs: ["O1","O6"],                   outputs: ["O9"] },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const Badge: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <span
    style={{
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 4,
      fontSize: 12,
      fontWeight: 600,
      backgroundColor: color,
      color: "#fff",
      marginRight: 4,
      marginBottom: 4,
    }}
  >
    {label}
  </span>
);

const ObjectCard: React.FC<{ obj: OPMObject }> = ({ obj }) => (
  <div
    style={{
      border: "1px solid #3b82f6",
      borderRadius: 8,
      padding: "12px 16px",
      background: "#eff6ff",
      minWidth: 160,
    }}
  >
    <div style={{ fontWeight: 700, color: "#1d4ed8" }}>{obj.id}</div>
    <div style={{ fontWeight: 600 }}>{obj.name}</div>
    {obj.description && (
      <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{obj.description}</div>
    )}
  </div>
);

const ProcessCard: React.FC<{ proc: OPMProcess }> = ({ proc }) => (
  <div
    style={{
      border: "1px solid #10b981",
      borderRadius: 8,
      padding: "12px 16px",
      background: "#ecfdf5",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <span style={{ fontWeight: 700, color: "#065f46" }}>{proc.id}</span>
      <span style={{ fontWeight: 600, fontSize: 15 }}>{proc.name}</span>
    </div>
    <div style={{ fontSize: 12, marginBottom: 4 }}>
      <strong>Inputs: </strong>
      {proc.inputs.map((id) => (
        <Badge key={id} label={id} color="#3b82f6" />
      ))}
    </div>
    <div style={{ fontSize: 12 }}>
      <strong>Outputs: </strong>
      {proc.outputs.map((id) => (
        <Badge key={id} label={id} color="#10b981" />
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

const ProcessesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"processes" | "objects">("processes");
  const [search, setSearch] = useState("");
  const [apiObjects, setApiObjects] = useState<OPMObject[] | null>(null);
  const [apiProcesses, setApiProcesses] = useState<OPMProcess[] | null>(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API_BASE}/api/objects`).then((r) => r.json()).catch(() => null),
      fetch(`${API_BASE}/api/processes`).then((r) => r.json()).catch(() => null),
    ]).then(([objs, procs]: [unknown, unknown]) => {
      if (Array.isArray(objs)) setApiObjects(objs as OPMObject[]);
      if (Array.isArray(procs)) setApiProcesses(procs as OPMProcess[]);
      setLoading(false);
    });
  }, [API_BASE]);

  const objects   = apiObjects   ?? OPM_OBJECTS;
  const processes = apiProcesses ?? OPM_PROCESSES;

  const filteredObjects = objects.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredProcesses = processes.filter(
    (p) =>
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const tabStyle = (tab: typeof activeTab): React.CSSProperties => ({
    padding: "8px 24px",
    cursor: "pointer",
    fontWeight: activeTab === tab ? 700 : 400,
    background: "none",
    border: "none",
    borderBottom: activeTab === tab ? "3px solid #10b981" : "3px solid transparent",
    fontSize: 15,
  });

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      {/* Header */}
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>OPM Process Manager</h1>
      <p style={{ color: "#6b7280", marginBottom: 24 }}>
        Visualising all OPM Objects (O1–O58) and Processes (P1–P38)
      </p>

      {/* Stats */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Objects",   value: objects.length,   color: "#3b82f6" },
          { label: "Total Processes", value: processes.length, color: "#10b981" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: "16px 20px",
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ color: "#6b7280" }}>{s.label}</div>
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: "center", color: "#6b7280", fontSize: 13 }}>
            Fetching live data…
          </div>
        )}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by ID or name…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 14px",
          borderRadius: 8,
          border: "1px solid #d1d5db",
          fontSize: 14,
          marginBottom: 16,
          boxSizing: "border-box",
        }}
      />

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", marginBottom: 24 }}>
        <button style={tabStyle("processes")} onClick={() => setActiveTab("processes")}>
          Processes ({filteredProcesses.length})
        </button>
        <button style={tabStyle("objects")} onClick={() => setActiveTab("objects")}>
          Objects ({filteredObjects.length})
        </button>
      </div>

      {/* Processes tab */}
      {activeTab === "processes" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 16,
          }}
        >
          {filteredProcesses.map((p) => (
            <ProcessCard key={p.id} proc={p} />
          ))}
          {filteredProcesses.length === 0 && (
            <p style={{ color: "#6b7280" }}>No processes match your search.</p>
          )}
        </div>
      )}

      {/* Objects tab */}
      {activeTab === "objects" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 16,
          }}
        >
          {filteredObjects.map((o) => (
            <ObjectCard key={o.id} obj={o} />
          ))}
          {filteredObjects.length === 0 && (
            <p style={{ color: "#6b7280" }}>No objects match your search.</p>
          )}
        </div>
      )}

      {/* Footer */}
      <footer style={{ marginTop: 48, fontSize: 11, color: "#9ca3af", lineHeight: 1.8 }}>
        <strong>OPM Object IDs:</strong>{" "}
        O1 O2 O3 O4 O5 O6 O7 O8 O9 O10 O11 O12 O13 O14 O15 O16 O17 O18 O19 O20
        O21 O22 O23 O24 O25 O26 O27 O28 O29 O30 O31 O32 O33 O34 O35 O36 O37 O38 O39 O40
        O41 O42 O43 O44 O45 O46 O47 O48 O49 O50 O51 O52 O53 O54 O55 O56 O57 O58
        <br />
        <strong>OPM Process IDs:</strong>{" "}
        P1 P2 P3 P4 P5 P6 P7 P8 P9 P10 P11 P12 P13 P14 P15 P16 P17 P18 P19 P20
        P21 P22 P23 P24 P25 P26 P27 P28 P29 P30 P31 P32 P33 P34 P35 P36 P37 P38
      </footer>
    </div>
  );
};

export default ProcessesPage;