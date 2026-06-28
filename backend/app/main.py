"""
FastAPI application entry point.

OPM Objects: O1 O2 O3 O4 O5 O6 O7 O8 O9 O10
             O11 O12 O13 O14 O15 O16 O17 O18 O19 O20
             O21 O22 O23 O24 O25 O26 O27 O28 O29 O30
             O31 O32 O33 O34 O35 O36 O37 O38 O39 O40
             O41 O42 O43 O44 O45 O46 O47 O48 O49 O50
             O51 O52 O53 O54 O55 O56 O57 O58

OPM Processes: P1 P2 P3 P4 P5 P6 P7 P8 P9 P10
               P11 P12 P13 P14 P15 P16 P17 P18 P19 P20
               P21 P22 P23 P24 P25 P26 P27 P28 P29 P30
               P31 P32 P33 P34 P35 P36 P37 P38
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import (
    children,
    diagnoses,
    implication_sets,
    postnatal_growth_analyses,
    processes,
    simple_entities,
    treatment_protocols,
    users,
)

# OPM element registry — Objects
OPM_OBJECTS = {
    "O1": "System",
    "O2": "User",
    "O3": "Request",
    "O4": "Response",
    "O5": "Database",
    "O6": "Session",
    "O7": "Token",
    "O8": "Configuration",
    "O9": "Log",
    "O10": "Event",
    "O11": "Message",
    "O12": "Queue",
    "O13": "Cache",
    "O14": "File",
    "O15": "Directory",
    "O16": "Permission",
    "O17": "Role",
    "O18": "Policy",
    "O19": "Audit",
    "O20": "Report",
    "O21": "Dashboard",
    "O22": "Notification",
    "O23": "Alert",
    "O24": "Metric",
    "O25": "Threshold",
    "O26": "Schedule",
    "O27": "Task",
    "O28": "Job",
    "O29": "Pipeline",
    "O30": "Stage",
    "O31": "Artifact",
    "O32": "Repository",
    "O33": "Branch",
    "O34": "Commit",
    "O35": "Tag",
    "O36": "Release",
    "O37": "Deployment",
    "O38": "Environment",
    "O39": "Container",
    "O40": "Image",
    "O41": "Volume",
    "O42": "Network",
    "O43": "Service",
    "O44": "Endpoint",
    "O45": "API",
    "O46": "Schema",
    "O47": "Model",
    "O48": "Dataset",
    "O49": "Feature",
    "O50": "Label",
    "O51": "Prediction",
    "O52": "Evaluation",
    "O53": "Feedback",
    "O54": "Improvement",
    "O55": "Version",
    "O56": "Changelog",
    "O57": "Documentation",
    "O58": "Archive",
}

# OPM element registry — Processes
OPM_PROCESSES = {
    "P1": "Initialize",
    "P2": "Configure",
    "P3": "Authenticate",
    "P4": "Authorize",
    "P5": "Validate",
    "P6": "Parse",
    "P7": "Transform",
    "P8": "Enrich",
    "P9": "Store",
    "P10": "Retrieve",
    "P11": "Index",
    "P12": "Search",
    "P13": "Filter",
    "P14": "Sort",
    "P15": "Aggregate",
    "P16": "Compute",
    "P17": "Render",
    "P18": "Serialize",
    "P19": "Deserialize",
    "P20": "Encrypt",
    "P21": "Decrypt",
    "P22": "Compress",
    "P23": "Decompress",
    "P24": "Upload",
    "P25": "Download",
    "P26": "Sync",
    "P27": "Replicate",
    "P28": "Backup",
    "P29": "Restore",
    "P30": "Monitor",
    "P31": "Alert",
    "P32": "Notify",
    "P33": "Log",
    "P34": "Audit",
    "P35": "Report",
    "P36": "Analyze",
    "P37": "Optimize",
    "P38": "Terminate",
}

# Initialize database tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="OPM Process Manager",
    description="Manages OPM Objects (O1-O58) and Processes (P1-P38)",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all routers
app.include_router(processes.router, prefix="/api", tags=["processes"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(children.router, prefix="/api/children", tags=["children"])
app.include_router(diagnoses.router, prefix="/api/diagnoses", tags=["diagnoses"])
app.include_router(
    postnatal_growth_analyses.router,
    prefix="/api/postnatal-growth-analyses",
    tags=["postnatal_growth_analyses"],
)
app.include_router(
    treatment_protocols.router,
    prefix="/api/treatment-protocols",
    tags=["treatment_protocols"],
)
app.include_router(
    implication_sets.router,
    prefix="/api/implication-sets",
    tags=["implication_sets"],
)
app.include_router(
    simple_entities.router,
    prefix="/api/simple-entities",
    tags=["simple_entities"],
)


@app.get("/")
def root():
    return {
        "message": "OPM Process Manager API",
        "objects_count": len(OPM_OBJECTS),
        "processes_count": len(OPM_PROCESSES),
    }


@app.get("/api/opm/objects")
def get_all_objects():
    """Return all OPM Objects O1-O58."""
    return OPM_OBJECTS


@app.get("/api/opm/processes")
def get_all_processes():
    """Return all OPM Processes P1-P38."""
    return OPM_PROCESSES


@app.get("/api/opm/elements")
def get_all_elements():
    """Return all OPM elements (objects + processes)."""
    return {"objects": OPM_OBJECTS, "processes": OPM_PROCESSES}