
from pathlib import Path
import joblib


# Project model directory
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models"


# Existing trained model paths
MODEL_PATHS = {
    "model_1": (
        MODEL_DIR
        / "Model_1"
        / "sarthi_model1_physical_fitness_v1.joblib"
    ),

    "model_2": (
        MODEL_DIR
        / "Model_2"
        / "sarthi_model2_fitness_regression.joblib"
    ),

    "model_3": (
        MODEL_DIR
        / "Model_3"
        / "sarthi_model3_injury_risk.joblib"
    ),
}


def inspect_model_1():
    model = joblib.load(MODEL_PATHS["model_1"])

    return {
        "model_name": "Physical Fitness",
        "model_type": type(model).__name__,
        "features": list(model.feature_names_in_),
        "feature_count": model.n_features_in_,
        "pipeline_steps": list(model.named_steps.keys()),
        "prediction_available": hasattr(model, "predict")
    }


def inspect_model_2():
    data = joblib.load(MODEL_PATHS["model_2"])

    model = data["model"]

    return {
        "model_name": data["model_name"],
        "model_type": type(model).__name__,
        "features": data["features"],
        "feature_count": len(data["features"]),
        "target": data["target"],
        "prediction_available": hasattr(model, "predict"),
        "test_metrics": data["test_metrics"]
    }


def inspect_model_3():
    model = joblib.load(MODEL_PATHS["model_3"])

    return {
        "model_name": "Injury Risk",
        "model_type": type(model).__name__,
        "features": list(model.feature_names_in_),
        "feature_count": model.n_features_in_,
        "pipeline_steps": list(model.named_steps.keys()),
        "classes": model.classes_.tolist(),
        "prediction_available": hasattr(model, "predict"),
        "probability_available": hasattr(model, "predict_proba")
    }


def inspect_all_models():
    results = {
        "model_1": inspect_model_1(),
        "model_2": inspect_model_2(),
        "model_3": inspect_model_3()
    }

    return results


if __name__ == "__main__":
    import json

    inspection_results = inspect_all_models()

    print("\n===== S.A.R.T.H.I. ML MODEL INSPECTION =====\n")

    print(json.dumps(inspection_results, indent=4))

    print("\n===== INSPECTION COMPLETED =====")
