# S.A.R.T.H.I. — API Documentation

Base URL (local development): `http://127.0.0.1:8000`  
Interactive Swagger UI (built into FastAPI): `http://127.0.0.1:8000/docs`

All endpoints are defined in [backend/main.py](../backend/main.py). No user authentication or API token header is configured on the backend; access is governed by CORS rules (`ALLOWED_ORIGINS` + localhost Vite defaults + configured Netlify origins).

---

## Endpoint Summary

| Method | Path | Description | Database Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Root welcome and status check | None |
| `GET` | `/health` | Backend and MySQL connectivity health check | `SELECT 1` |
| `GET` | `/readiness-directory` | Full roster with live Fusion Engine scores and summary counts | `SELECT` across 4 tables |
| `GET` | `/soldiers/{soldier_id}` | Basic soldier profile metadata | `SELECT` on `soldiers` |
| `GET` | `/soldiers/{soldier_id}/complete-profile` | Raw records from physical, health, and injury tables | `SELECT` across 3 tables |
| `POST` | `/predict/soldier/{soldier_id}` | Runs Fusion Engine for a DB soldier and logs result | `SELECT` + `INSERT` into `prediction_history` |
| `GET` | `/prediction-history/{soldier_id}` | Longitudinal prediction logs for a soldier | `SELECT` on `prediction_history` |
| `GET` | `/dashboard/{soldier_id}` | Unified dashboard payload (profile, records, fusion, problem areas, history) | `SELECT` across 5 tables |
| `GET` | `/soldiers/{soldier_id}/report` | Generates and downloads a 9-section A4 PDF dossier | Calls `/dashboard/{soldier_id}` |
| `POST` | `/predict/fusion` | Runs Fusion Engine directly on supplied JSON feature payloads | None |

---

## Detailed Endpoint Reference

### 1. `GET /`

Basic availability check.

**Response `200 OK`:**
```json
{
  "message": "Welcome to S.A.R.T.H.I. Backend",
  "status": "Running",
  "project": "S.A.R.T.H.I."
}
```

---

### 2. `GET /health`

Verifies database connectivity using `SELECT 1` over the SQLAlchemy engine.

**Response `200 OK` (Database reachable):**
```json
{
  "status": "Healthy",
  "backend": "Operational",
  "database": "Connected"
}
```

**Response `200 OK` (Database unreachable — `SQLAlchemyError`):**
```json
{
  "status": "Degraded",
  "backend": "Operational",
  "database": "Disconnected"
}
```

---

### 3. `GET /readiness-directory`

Loads all soldiers ordered by `Soldier_ID`, joins their `physical_fitness`, `health_recovery`, and `injury_records` rows in memory, and runs all three ML models + Fusion Engine for each soldier.

**Response `200 OK`:**
```json
{
  "project": "S.A.R.T.H.I.",
  "total_soldiers": 2000,
  "summary": {
    "combat_ready": 850,
    "conditionally_ready": 400,
    "not_combat_ready": 750,
    "assessment_unavailable": 0
  },
  "soldiers": [
    {
      "soldier_id": "SARTHI-0001",
      "name": "Nisha Mehta",
      "rank": "Sepoy",
      "unit": null,
      "age": 42,
      "gender": "Female",
      "assessment_date": "2025-01-10",
      "readiness_score": 57.66,
      "readiness_status": "Not Combat Ready - Injury Risk Flagged",
      "physical_fitness_score": 51.13,
      "injury_probability": 72.4,
      "injury_prediction": "Yes",
      "assessment_available": true,
      "physical_fitness": { "...": "..." },
      "health_recovery": { "...": "..." },
      "injury_risk": { "...": "..." },
      "fusion": { "...": "..." }
    }
  ]
}
```

---

### 4. `GET /soldiers/{soldier_id}`

Fetches master profile fields from the `soldiers` table.

**Path Parameters:** `soldier_id` (e.g., `SARTHI-0001`).

**Response `200 OK`:**
```json
{
  "Soldier_ID": "SARTHI-0001",
  "Soldier_Name": "Nisha Mehta",
  "Rank": "Sepoy",
  "Gender": "Female",
  "Age": 42
}
```

**Error `404 Not Found`:** `{"detail": "Soldier not found"}`.

---

### 5. `GET /soldiers/{soldier_id}/complete-profile`

Fetches complete database rows from `physical_fitness`, `health_recovery`, and `injury_records` for a soldier.

**Response `200 OK`:**
```json
{
  "physical_fitness": { "...": "..." },
  "health_recovery": { "...": "..." },
  "injury_records": { "...": "..." }
}
```

**Error `404 Not Found`:** Returned if records are missing across all three tables (`{"detail": "Soldier records not found"}`).

---

### 6. `POST /predict/soldier/{soldier_id}`

Fetches a soldier's records from the database, selects the exact features required by Models 1, 2, and 3, executes `run_fusion_engine`, and inserts a record into `prediction_history`.

**Response `200 OK`:**
```json
{
  "soldier_id": "SARTHI-0001",
  "prediction_result": {
    "project": "S.A.R.T.H.I.",
    "fusion_status": "completed",
    "successful_models": 3,
    "total_models": 3,
    "predictions": {
      "physical_fitness": { "status": "success", "data": { "model": "Physical Fitness", "predicted_fitness_score": 51.13 } },
      "health_recovery": { "status": "success", "data": { "model": "Health & Recovery", "predicted_fitness_score": 5.80, "status": "Experimental - Not Clinically Validated" } },
      "injury_risk": { "status": "success", "data": { "model": "Injury Risk", "predicted_injury": "Yes", "injury_probability": 72.4, "status": "Model Prediction - Not a Medical Diagnosis" } }
    },
    "readiness_score": 57.66,
    "readiness_score_status": "Enabled - Research Demonstration",
    "readiness_status": "Not Combat Ready - Injury Risk Flagged",
    "readiness_details": {
      "score": 57.66,
      "status": "Not Combat Ready - Injury Risk Flagged",
      "components": {
        "physical_fitness": 51.13,
        "health_recovery_normalized": 58.0,
        "injury_probability": 72.4,
        "injury_safety": 27.6
      },
      "weights": { "physical_fitness": 0.4, "health_recovery": 0.3, "injury_safety": 0.3 },
      "thresholds": { "combat_ready": 80, "conditionally_ready": 60, "injury_risk_override": 50 }
    },
    "readiness_error": null,
    "disclaimer": "Academic research demonstration only. Not validated for clinical or operational military decisions."
  }
}
```

**Errors:**
- `404 Not Found` if `soldier_id` or any of its 3 assessment tables are missing.
- `500 Internal Server Error` if saving to `prediction_history` fails (`SQLAlchemyError`).

---

### 7. `GET /prediction-history/{soldier_id}`

Returns all stored predictions for a soldier ordered newest-first (`Prediction_Timestamp DESC`).

**Response `200 OK`:**
```json
{
  "soldier_id": "SARTHI-0001",
  "total_predictions": 2,
  "history": [
    {
      "Prediction_ID": 14,
      "Soldier_ID": "SARTHI-0001",
      "Model_1_Prediction": 51.13,
      "Model_2_Prediction": 5.8,
      "Model_3_Prediction": "Yes",
      "Prediction_Timestamp": "2026-04-01T12:00:00"
    }
  ]
}
```

**Error `404 Not Found`:** `{"detail": "Soldier not found"}`.

---

### 8. `GET /dashboard/{soldier_id}`

Primary endpoint consumed by the frontend soldier dossier view and the PDF report service. Returns:
- `soldier`: Profile metadata
- `health_and_fitness`: `physical_fitness`, `health_recovery`, and `injury_records` (with dataset outcome columns popped)
- `historical_injury_outcome`: Separated dataset outcome (`Injury_Occurred`, `Injury_Type`, `Injury_Body_Part`, `Injury_Severity`)
- `latest_prediction` & `prediction_history`: Most recent saved DB prediction and full history list
- `problem_areas`: Rule-based flags generated from live Fusion outputs (`Injury Risk`, `Physical Fitness < 50`) and health telemetry (`Stress Level >= 7`, `Quality of Sleep <= 6`)
- `readiness`: Live Fusion Engine `score`, `status`, `score_status`, `details`, and `error`

**Error `404 Not Found`:** `{"detail": "Soldier ID '{soldier_id}' not found"}`.

---

### 9. `GET /soldiers/{soldier_id}/report`

Generates a downloadable ReportLab A4 PDF (`SARTHI_{soldier_id}_Report.pdf`) built from `get_soldier_dashboard(soldier_id, db)`.

**Response `200 OK`:**
- Content-Type: `application/pdf`
- Header: `Content-Disposition: attachment; filename="SARTHI_{soldier_id}_Report.pdf"`

**Error `404 Not Found`:** Propagated from `get_soldier_dashboard` if soldier ID does not exist.

---

### 10. `POST /predict/fusion`

Stateless Fusion Engine execution directly from client-supplied feature dictionaries (`FusionRequest`). Unknown top-level keys are rejected (`extra="forbid"`), and each model rejects missing or unexpected features.

**Request Body:**
```json
{
  "physical_data": {
    "Age": 28,
    "BPT_Distance_km": 5.0,
    "BPT_Time_Minutes": 23.5,
    "Rope_Climbing_Completed": true,
    "Rope_Climbing_Time_Seconds": 18.0,
    "Pushups_Count": 48,
    "Pullups_Count": 14,
    "Situps_Count": 52,
    "Plank_Time_Seconds": 120,
    "Resting_Heart_Rate_bpm": 62,
    "Recovery_Heart_Rate_bpm": 98
  },
  "health_data": {
    "Age": 28,
    "Sleep Duration": 7.5,
    "Quality of Sleep": 8,
    "Physical Activity Level": 75,
    "Stress Level": 4,
    "Heart Rate": 64,
    "Daily Steps": 9500
  },
  "injury_data": {
    "Rank": "Sepoy",
    "Age": 28,
    "Gender": "Male",
    "Height_cm": 176.0,
    "Weight_kg": 72.0,
    "BMI": 23.2,
    "Service_Years": 5,
    "Training_Type": "Endurance",
    "Running_Distance_km": 6.0,
    "Running_Days_Per_Week": 5,
    "Marching_Distance_km": 10.0,
    "Training_Hours_Per_Week": 14.0,
    "Load_Carried_kg": 18.0,
    "Previous_Injury": "No",
    "Previous_Injury_Type": "None",
    "Previous_Injury_Count": 0,
    "Rest_Days_Per_Week": 2,
    "Sleep_Hours": 7.5,
    "Fitness_Level": "High",
    "Terrain": "Plains",
    "Current_Pain": 0,
    "Pain_Body_Part": "None",
    "Medical_History": "None"
  }
}
```

**Response `200 OK`:** Returns the Fusion Engine result object (`project`, `fusion_status`, `successful_models`, `total_models`, `predictions`, `readiness_score`, `readiness_status`, `readiness_details`, `disclaimer`).

**Errors:** `422 Unprocessable Entity` on schema validation errors; `500 Internal Server Error` if execution raises an unhandled exception.

---

## Quick Verification Commands

```bash
# Check health
curl http://127.0.0.1:8000/health

# Fetch dashboard for SARTHI-0001
curl http://127.0.0.1:8000/dashboard/SARTHI-0001

# Download PDF report
curl -o SARTHI-0001.pdf http://127.0.0.1:8000/soldiers/SARTHI-0001/report
```
