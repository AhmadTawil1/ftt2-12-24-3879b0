# OPM Process Manager

A full-stack application for managing OPM (Object-Process Methodology) Objects and Processes, with a FastAPI backend and a structured relational database.

---

## Project Purpose

The OPM Process Manager provides a REST API to create, read, update, and delete domain entities modelled after OPM methodology. It tracks:

- **Users** – accounts that interact with the system
- **Children** – child patient records linked to users
- **Diagnoses** – clinical diagnoses associated with children
- **Postnatal Growth Analyses** – growth measurement records for children
- **Treatment Protocols** – prescribed treatment plans
- **Implication Sets** – sets of clinical implications derived from diagnoses
- **Simple Entities** – generic key-value domain objects

All 58 OPM Objects (O1–O58) and 38 OPM Processes (P1–P38) are registered in the application and exposed via `/api/opm/objects`, `/api/opm/processes`, and `/api/opm/elements`.

---

## OPM IDs

### Objects (O1–O58)

| ID  | Name          | ID  | Name          | ID  | Name          |
|-----|---------------|-----|---------------|-----|---------------|
| O1  | System        | O21 | Dashboard     | O41 | Volume        |
| O2  | User          | O22 | Notification  | O42 | Network       |
| O3  | Request       | O23 | Alert         | O43 | Service       |
| O4  | Response      | O24 | Metric        | O44 | Endpoint      |
| O5  | Database      | O25 | Threshold     | O45 | API           |
| O6  | Session       | O26 | Schedule      | O46 | Schema        |
| O7  | Token         | O27 | Task          | O47 | Model         |
| O8  | Configuration | O28 | Job           | O48 | Dataset       |
| O9  | Log           | O29 | Pipeline      | O49 | Feature       |
| O10 | Event         | O30 | Stage         | O50 | Label         |
| O11 | Message       | O31 | Artifact      | O51 | Prediction    |
| O12 | Queue         | O32 | Repository    | O52 | Evaluation    |
| O13 | Cache         | O33 | Branch        | O53 | Feedback      |
| O14 | File          | O34 | Commit        | O54 | Improvement   |
| O15 | Directory     | O35 | Tag           | O55 | Version       |
| O16 | Permission    | O36 | Release       | O56 | Changelog     |
| O17 | Role          | O37 | Deployment    | O57 | Documentation |
| O18 | Policy        | O38 | Environment   | O58 | Archive       |
| O19 | Audit         | O39 | Container     |     |               |
| O20 | Report        | O40 | Image         |     |               |

### Processes (P1–P38)

| ID  | Name         | ID  | Name         | ID  | Name       |
|-----|--------------|-----|--------------|-----|------------|
| P1  | Initialize   | P14 | Sort         | P27 | Replicate  |
| P2  | Configure    | P15 | Aggregate    | P28 | Backup     |
| P3  | Authenticate | P16 | Compute      | P29 | Restore    |
| P4  | Authorize    | P17 | Render       | P30 | Monitor    |
| P5  | Validate     | P18 | Serialize    | P31 | Alert      |
| P6  | Parse        | P19 | Deserialize  | P32 | Notify     |
| P7  | Transform    | P20 | Encrypt      | P33 | Log        |
| P8  | Enrich       | P21 | Decrypt      | P34 | Audit      |
| P9  | Store        | P22 | Compress     | P35 | Report     |
| P10 | Retrieve     | P23 | Decompress   | P36 | Analyze    |
| P11 | Index        | P24 | Upload       | P37 | Optimize   |
| P12 | Search       | P25 | Download     | P38 | Terminate  |
| P13 | Filter       | P26 | Sync         |     |            |

---

## Setup Instructions

### Prerequisites

- Python 3.10+
- pip
- (Optional) A virtual environment tool such as `venv` or `conda`

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Create and activate a virtual environment

```bash
python -m venv .venv
source .venv/bin/activate      # Linux / macOS
.venv\Scripts\activate.bat     # Windows
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Copy the example environment file and edit as needed:

```bash
cp .env.example .env
```

Key variables:

| Variable       | Default                          | Description                        |
|----------------|----------------------------------|------------------------------------|
| `DATABASE_URL` | `sqlite:///./opm.db`             | SQLAlchemy database connection URL |
| `SECRET_KEY`   | `changeme`                       | Secret key for token signing       |

### 5. Run the development server

```bash
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```

The database tables are created automatically on startup via `Base.metadata.create_all()`.

### 6. Access the API

- Interactive docs (Swagger UI): [http://localhost:8000/docs](http://localhost:8000/docs)
- Alternative docs (ReDoc):      [http://localhost:8000/redoc](http://localhost:8000/redoc)
- OPM Objects:                   [http://localhost:8000/api/opm/objects](http://localhost:8000/api/opm/objects)
- OPM Processes:                 [http://localhost:8000/api/opm/processes](http://localhost:8000/api/opm/processes)

---

## API Endpoints Summary

| Prefix                           | Router Module               | Tags                        |
|----------------------------------|-----------------------------|-----------------------------|
| `/api`                           | processes                   | processes                   |
| `/api/users`                     | users                       | users                       |
| `/api/children`                  | children                    | children                    |
| `/api/diagnoses`                 | diagnoses                   | diagnoses                   |
| `/api/postnatal-growth-analyses` | postnatal_growth_analyses   | postnatal_growth_analyses   |
| `/api/treatment-protocols`       | treatment_protocols         | treatment_protocols         |
| `/api/implication-sets`          | implication_sets            | implication_sets            |
| `/api/simple-entities`           | simple_entities             | simple_entities             |

---

## Project Structure

```
.
├── backend/
│   └── app/
│       ├── main.py            # FastAPI entry point, router registration, DB init
│       ├── database.py        # SQLAlchemy engine, SessionLocal, Base
│       ├── models/            # ORM model definitions
│       ├── schemas/           # Pydantic schemas
│       └── routers/           # APIRouter modules for each domain entity
├── requirements.txt
├── .env.example
└── README.md
```

---

## Running Tests

```bash
pytest
```