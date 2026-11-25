
import logging
import math

from services.prediction_service import (
    predict_physical_fitness,
    predict_health_recovery,
    predict_injury_risk
)

logger = logging.getLogger(__name__)

# S.A.R.T.H.I. Research Demonstration Weights
PHYSICAL_WEIGHT = 0.40
HEALTH_WEIGHT = 0.30
INJURY_WEIGHT = 0.30

# Readiness thresholds
READY_THRESHOLD = 80
CONDITIONAL_THRESHOLD = 60

# Injury safety override
INJURY_RISK_THRESHOLD = 50


def _run_model(model_function, input_data):
    try:
        if not isinstance(input_data, dict):
            raise TypeError("Model input must be a dictionary.")

        result = model_function(input_data)

        if not isinstance(result, dict):
            raise ValueError("Model returned an invalid result.")

        return {
            "status": "success",
            "data": result
        }

    except Exception:
        logger.exception(
            "Model execution failed: %s",
            model_function.__name__
        )

        return {
            "status": "failed",
            "error": "Model prediction failed. Please verify the input data."
        }


def calculate_readiness(results):
    """
    Calculate combined readiness using all three model outputs.

    Formula:
    40% Physical Fitness
    30% Health and Recovery
    30% Injury Safety

    Research demonstration only.
    """

    for result in results.values():
        if result["status"] != "success":
            return None

    physical_score = float(
        results["physical_fitness"]["data"][
            "predicted_fitness_score"
        ]
    )

    health_score = float(
        results["health_recovery"]["data"][
            "predicted_fitness_score"
        ]
    )

    injury_probability = float(
        results["injury_risk"]["data"][
            "injury_probability"
        ]
    )

    injury_prediction = str(
        results["injury_risk"]["data"][
            "predicted_injury"
        ]
    )

    values = [
        physical_score,
        health_score,
        injury_probability
    ]

    if not all(math.isfinite(value) for value in values):
        raise ValueError("Invalid non-finite model output.")

    if not 0 <= physical_score <= 100:
        raise ValueError("Physical fitness score must be between 0 and 100.")

    if not 0 <= health_score <= 10:
        raise ValueError("Health score must be between 0 and 10.")

    if not 0 <= injury_probability <= 100:
        raise ValueError("Injury probability must be between 0 and 100.")

    # Normalize Model 2 from 0-10 to 0-100
    normalized_health = health_score * 10

    # Convert injury probability into safety score
    injury_safety = 100 - injury_probability

    # Combined readiness score
    readiness_score = (
        physical_score * PHYSICAL_WEIGHT
        + normalized_health * HEALTH_WEIGHT
        + injury_safety * INJURY_WEIGHT
    )

    readiness_score = round(readiness_score, 2)

    # Injury risk override
    if (
        injury_prediction.strip().lower() == "yes"
        or injury_probability >= INJURY_RISK_THRESHOLD
    ):
        readiness_status = "Not Combat Ready - Injury Risk Flagged"

    elif readiness_score >= READY_THRESHOLD:
        readiness_status = "Combat Ready"

    elif readiness_score >= CONDITIONAL_THRESHOLD:
        readiness_status = "Conditionally Ready"

    else:
        readiness_status = "Not Combat Ready"

    return {
        "score": readiness_score,
        "status": readiness_status,
        "components": {
            "physical_fitness": round(physical_score, 2),
            "health_recovery_normalized": round(normalized_health, 2),
            "injury_probability": round(injury_probability, 2),
            "injury_safety": round(injury_safety, 2)
        },
        "weights": {
            "physical_fitness": PHYSICAL_WEIGHT,
            "health_recovery": HEALTH_WEIGHT,
            "injury_safety": INJURY_WEIGHT
        },
        "thresholds": {
            "combat_ready": READY_THRESHOLD,
            "conditionally_ready": CONDITIONAL_THRESHOLD,
            "injury_risk_override": INJURY_RISK_THRESHOLD
        }
    }


def run_fusion_engine(
    physical_data: dict,
    health_data: dict,
    injury_data: dict
):
    # Execute all three models
    results = {
        "physical_fitness": _run_model(
            predict_physical_fitness,
            physical_data
        ),
        "health_recovery": _run_model(
            predict_health_recovery,
            health_data
        ),
        "injury_risk": _run_model(
            predict_injury_risk,
            injury_data
        )
    }

    successful_models = sum(
        1
        for result in results.values()
        if result["status"] == "success"
    )

    total_models = len(results)

    if successful_models == total_models:
        fusion_status = "completed"
    elif successful_models > 0:
        fusion_status = "partial_failure"
    else:
        fusion_status = "failed"

    readiness = None
    readiness_error = None

    if successful_models == total_models:
        try:
            readiness = calculate_readiness(results)
        except (ValueError, TypeError, KeyError) as error:
            logger.exception("Readiness calculation failed.")
            readiness_error = str(error)

    return {
        "project": "S.A.R.T.H.I.",
        "fusion_status": fusion_status,
        "successful_models": successful_models,
        "total_models": total_models,
        "predictions": results,

        "readiness_score": (
            readiness["score"] if readiness else None
        ),

        "readiness_score_status": (
            "Enabled - Research Demonstration"
            if readiness
            else "Unavailable - Model execution or score validation failed"
        ),

        "readiness_status": (
            readiness["status"] if readiness else "Not Available"
        ),

        "readiness_details": readiness,
        "readiness_error": readiness_error,

        "disclaimer": (
            "Academic research demonstration only. "
            "Not validated for clinical or operational military decisions."
        )
    }
