"""Seed a PostgreSQL (e.g. Vercel Neon) database from sarthi_db_deploy.sql."""

import os
import re
import sys
from pathlib import Path
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

from database import _normalize_postgres_url

BASE_DIR = Path(__file__).resolve().parent
SQL_DUMP_PATH = BASE_DIR.parent / "sarthi_db_deploy.sql"

PG_DDL = [
    """
    CREATE TABLE IF NOT EXISTS soldiers (
        "Soldier_ID" VARCHAR(50) PRIMARY KEY,
        "Soldier_Name" TEXT,
        "Rank" TEXT,
        "Gender" TEXT,
        "Age" INTEGER
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS physical_fitness (
        "Soldier_ID" VARCHAR(50) PRIMARY KEY REFERENCES soldiers("Soldier_ID"),
        "Age" INTEGER,
        "Gender" TEXT,
        "Rank" TEXT,
        "Assessment_Date" TEXT,
        "Data_Provenance" TEXT,
        "BPT_Distance_km" DOUBLE PRECISION,
        "BPT_Time_Minutes" DOUBLE PRECISION,
        "Rope_Climbing_Completed" TEXT,
        "Rope_Climbing_Time_Seconds" DOUBLE PRECISION,
        "Pushups_Count" INTEGER,
        "Pullups_Count" INTEGER,
        "Situps_Count" INTEGER,
        "Plank_Time_Seconds" INTEGER,
        "Resting_Heart_Rate_bpm" INTEGER,
        "Recovery_Heart_Rate_bpm" INTEGER,
        "Physical_Fitness_Score" DOUBLE PRECISION,
        "Fitness_Status" TEXT
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS health_recovery (
        "Soldier_ID" VARCHAR(50) PRIMARY KEY REFERENCES soldiers("Soldier_ID"),
        "Age" INTEGER,
        "Gender" TEXT,
        "Sleep Duration" DOUBLE PRECISION,
        "Quality of Sleep" INTEGER,
        "Physical Activity Level" INTEGER,
        "Stress Level" INTEGER,
        "BMI Category" TEXT,
        "Blood Pressure" TEXT,
        "Heart Rate" INTEGER,
        "Daily Steps" INTEGER,
        "Sleep Disorder" TEXT,
        "Fitness_Score_Recalculated" DOUBLE PRECISION
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS injury_records (
        "Soldier_ID" VARCHAR(50) PRIMARY KEY REFERENCES soldiers("Soldier_ID"),
        "Soldier_Name" TEXT,
        "Rank" TEXT,
        "Age" INTEGER,
        "Gender" TEXT,
        "Height_cm" DOUBLE PRECISION,
        "Weight_kg" DOUBLE PRECISION,
        "BMI" DOUBLE PRECISION,
        "Service_Years" INTEGER,
        "Training_Type" TEXT,
        "Running_Distance_km" DOUBLE PRECISION,
        "Running_Days_Per_Week" INTEGER,
        "Marching_Distance_km" DOUBLE PRECISION,
        "Training_Hours_Per_Week" DOUBLE PRECISION,
        "Load_Carried_kg" DOUBLE PRECISION,
        "Previous_Injury" TEXT,
        "Previous_Injury_Type" TEXT,
        "Previous_Injury_Count" INTEGER,
        "Rest_Days_Per_Week" INTEGER,
        "Sleep_Hours" DOUBLE PRECISION,
        "Fitness_Level" TEXT,
        "Terrain" TEXT,
        "Current_Pain" INTEGER,
        "Pain_Body_Part" TEXT,
        "Medical_History" TEXT,
        "Injury_Occurred" TEXT,
        "Injury_Type" TEXT,
        "Injury_Body_Part" TEXT,
        "Injury_Severity" TEXT
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS prediction_history (
        "Prediction_ID" BIGSERIAL PRIMARY KEY,
        "Soldier_ID" VARCHAR(50) NOT NULL REFERENCES soldiers("Soldier_ID"),
        "Model_1_Prediction" REAL,
        "Model_2_Prediction" REAL,
        "Model_3_Prediction" VARCHAR(100),
        "Prediction_Timestamp" TIMESTAMPTZ DEFAULT NOW()
    )
    """,
    """
    CREATE INDEX IF NOT EXISTS fk_prediction_soldier ON prediction_history ("Soldier_ID")
    """,
]

TABLE_ORDER = [
    "soldiers",
    "physical_fitness",
    "health_recovery",
    "injury_records",
    "prediction_history",
]


def main():
    load_dotenv(BASE_DIR / ".env.local")
    load_dotenv(BASE_DIR / ".env")
    raw_url = (
        os.getenv("POSTGRES_URL")
        or os.getenv("DATABASE_URL_POOLED")
        or os.getenv("DATABASE_URL")
    )
    if not raw_url:
        raise RuntimeError("POSTGRES_URL or DATABASE_URL must be set to seed PostgreSQL.")
    if not SQL_DUMP_PATH.is_file():
        raise FileNotFoundError(f"Missing SQL dump at {SQL_DUMP_PATH}")

    pg_engine = create_engine(_normalize_postgres_url(raw_url), pool_pre_ping=True)

    # Collect INSERT lines grouped by table
    inserts = {tbl: [] for tbl in TABLE_ORDER}
    insert_re = re.compile(r"^INSERT INTO `([^`]+)` VALUES (.+);$")
    with SQL_DUMP_PATH.open("r", encoding="utf-8") as fh:
        for line in fh:
            m = insert_re.match(line.rstrip("\r\n"))
            if m and m.group(1) in inserts:
                # Convert MySQL escaped single quotes (\') to SQL standard ('')
                values_sql = m.group(2).replace("\\'", "''")
                inserts[m.group(1)].append(values_sql)

    with pg_engine.begin() as conn:
        for ddl in PG_DDL:
            conn.execute(text(ddl))

        for table in TABLE_ORDER:
            existing = conn.execute(text(f"SELECT COUNT(*) FROM {table}")).scalar()
            if existing and existing > 0:
                print(f"Skipping {table}: already has {existing} rows")
                continue
            chunks = inserts[table]
            for chunk in chunks:
                conn.execute(text(f"INSERT INTO {table} VALUES {chunk}"))
            count = conn.execute(text(f"SELECT COUNT(*) FROM {table}")).scalar()
            print(f"Seeded {table}: {count} rows")

        # Sync prediction_history sequence past max Prediction_ID
        conn.execute(
            text(
                "SELECT setval(pg_get_serial_sequence('prediction_history', 'Prediction_ID'), "
                "COALESCE((SELECT MAX(\"Prediction_ID\") FROM prediction_history), 1), true)"
            )
        )

    print("Neon/PostgreSQL seeding completed successfully.")


if __name__ == "__main__":
    main()
