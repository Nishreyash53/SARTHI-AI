
from typing import Any

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import text

from database import get_db
from services.fusion_engine import run_fusion_engine


app = FastAPI(
    title="S.A.R.T.H.I. API",
    description="Soldier AI Readiness, Tracking, Health & Intelligence",
    version="1.0.0"
)


# Fusion API Request Structure
class FusionRequest(BaseModel):
    physical_data: dict[str, Any]
    health_data: dict[str, Any]
    injury_data: dict[str, Any]


# Home Endpoint
@app.get("/")
def home():
    return {
        "message": "Welcome to S.A.R.T.H.I. Backend",
        "status": "Running",
        "project": "S.A.R.T.H.I."
    }


# Health Check Endpoint
@app.get("/health")
def health_check():
    return {
        "status": "Healthy",
        "backend": "Operational"
    }


# Soldier Profile API
@app.get("/soldiers/{soldier_id}")
def get_soldier_profile(
    soldier_id: str,
    db: Session = Depends(get_db)
):
    query = text("""
        SELECT
            Soldier_ID,
            Soldier_Name,
            `Rank`,
            Gender,
            Age
        FROM soldiers
        WHERE Soldier_ID = :soldier_id
    """)

    result = db.execute(
        query,
        {"soldier_id": soldier_id}
    ).mappings().first()

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Soldier not found"
        )

    return dict(result)



@app.get("/soldiers/{soldier_id}/complete-profile")
def get_complete_soldier_profile(
    soldier_id: str,
    db: Session = Depends(get_db)
):
    tables = [
        "physical_fitness",
        "health_recovery",
        "injury_records"
    ]

    result = {}

    for table in tables:
        query = text(f"""
            SELECT *
            FROM `{table}`
            WHERE Soldier_ID = :soldier_id
        """)

        record = db.execute(
            query,
            {"soldier_id": soldier_id}
        ).mappings().first()

        result[table] = dict(record) if record else None

    if all(value is None for value in result.values()):
        raise HTTPException(
            status_code=404,
            detail="Soldier records not found"
        )

    return result





@app.post("/predict/soldier/{soldier_id}")
def predict_soldier_from_database(
    soldier_id: str,
    db: Session = Depends(get_db)
):
    tables = [
        "physical_fitness",
        "health_recovery",
        "injury_records"
    ]

    records = {}

    for table in tables:
        query = text(f"""
            SELECT *
            FROM `{table}`
            WHERE Soldier_ID = :soldier_id
        """)

        record = db.execute(
            query,
            {"soldier_id": soldier_id}
        ).mappings().first()

        if record is None:
            raise HTTPException(
                status_code=404,
                detail=f"Record missing in {table}"
            )

        records[table] = dict(record)

    result = run_fusion_engine(
        physical_data=records["physical_fitness"],
        health_data=records["health_recovery"],
        injury_data=records["injury_records"]
    )

    return {
        "soldier_id": soldier_id,
        "prediction_result": result
    }




# Fusion Prediction Endpoint
@app.post("/predict/fusion")
def predict_fusion(request: FusionRequest):

    try:
        result = run_fusion_engine(
            physical_data=request.physical_data,
            health_data=request.health_data,
            injury_data=request.injury_data
        )

        return result

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )
