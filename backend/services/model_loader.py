
from pathlib import Path
import joblib


# Base project directory
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
    )
}


# Cached models
_MODELS = None


def load_models():
    global _MODELS

    # Return already loaded models
    if _MODELS is not None:
        return _MODELS

    # Check whether all model files exist
    for name, path in MODEL_PATHS.items():
        if not path.is_file():
            raise FileNotFoundError(
                f"{name} file not found: {path}"
            )

    # Load Model 1
    model_1 = joblib.load(MODEL_PATHS["model_1"])

    # Load Model 2 bundle and extract estimator
    model_2_bundle = joblib.load(MODEL_PATHS["model_2"])

    if not isinstance(model_2_bundle, dict):
        raise ValueError("Model 2 bundle must be a dictionary.")

    if "model" not in model_2_bundle:
        raise ValueError("Model 2 estimator not found in bundle.")

    model_2 = model_2_bundle["model"]

    # Load Model 3
    model_3 = joblib.load(MODEL_PATHS["model_3"])

    # Validate prediction methods
    loaded_models = {
        "model_1": model_1,
        "model_2": model_2,
        "model_3": model_3
    }

    for name, model in loaded_models.items():
        if not callable(getattr(model, "predict", None)):
            raise ValueError(
                f"{name} does not have a valid predict() method."
            )

    # Store models in memory
    _MODELS = {
        **loaded_models,
        "model_2_metadata": {
            "features": model_2_bundle.get("features"),
            "target": model_2_bundle.get("target"),
            "model_name": model_2_bundle.get("model_name"),
            "test_metrics": model_2_bundle.get("test_metrics")
        }
    }

    print("S.A.R.T.H.I. ML Models Loaded Successfully!")

    return _MODELS


def get_models():
    if _MODELS is None:
        return load_models()

    return _MODELS
