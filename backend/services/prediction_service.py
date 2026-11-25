
import pandas as pd
import math

from services.model_loader import get_models


def validate_numeric_features(input_data: dict, features: list):
    """
    Validate numeric inputs and reject invalid values.
    """

    for feature in features:

        value = input_data[feature]

        if isinstance(value, bool) or isinstance(value, str):
            raise ValueError(
                f"{feature} must be a numeric value"
            )

        try:
            numeric_value = float(value)

        except (TypeError, ValueError):
            raise ValueError(
                f"{feature} must be a valid number"
            )

        if not math.isfinite(numeric_value):
            raise ValueError(
                f"{feature} cannot be NaN or infinite"
            )



def validate_prediction_score(value, model_name):
    """
    Validate model prediction output.
    """

    try:
        score = float(value)

    except (TypeError, ValueError):
        raise ValueError(
            f"{model_name} returned an invalid prediction"
        )

    if not math.isfinite(score):
        raise ValueError(
            f"{model_name} returned a non-finite prediction"
        )

    return score







def predict_physical_fitness(input_data: dict):
    """
    Predict physical fitness score using Model 1.
    """

    models = get_models()
    model = models["model_1"]

    required_features = [
        "Age",
        "BPT_Distance_km",
        "BPT_Time_Minutes",
        "Rope_Climbing_Completed",
        "Rope_Climbing_Time_Seconds",
        "Pushups_Count",
        "Pullups_Count",
        "Situps_Count",
        "Plank_Time_Seconds",
        "Resting_Heart_Rate_bpm",
        "Recovery_Heart_Rate_bpm"
    ]

    missing_features = [
        feature for feature in required_features
        if feature not in input_data
    ]

    if missing_features:
        raise ValueError(
            f"Missing required features: {missing_features}"
        )
    validate_feature_keys(
        input_data,
        required_features
    )

    numeric_features = [
        "Age",
        "BPT_Distance_km",
        "BPT_Time_Minutes",
        "Rope_Climbing_Time_Seconds",
        "Pushups_Count",
        "Pullups_Count",
        "Situps_Count",
        "Plank_Time_Seconds",
        "Resting_Heart_Rate_bpm",
        "Recovery_Heart_Rate_bpm"
    ]

    validate_numeric_features(
        input_data,
        numeric_features
    )

    # Convert database text into Boolean
    rope_value = input_data["Rope_Climbing_Completed"]

    if isinstance(rope_value, str):
        rope_value = rope_value.strip().lower()

        if rope_value in ["true", "1", "yes"]:
            rope_value = True

        elif rope_value in ["false", "0", "no"]:
            rope_value = False

        else:
            raise ValueError(
                "Invalid Rope_Climbing_Completed value"
            )

    elif not isinstance(rope_value, bool):
        raise ValueError(
            "Invalid Rope_Climbing_Completed value"
        )

    input_values = []

    for feature in required_features:

        if feature == "Rope_Climbing_Completed":
            input_values.append(rope_value)

        else:
            input_values.append(input_data[feature])

    input_df = pd.DataFrame(
        [input_values],
        columns=required_features
    )

    prediction = model.predict(input_df)

    if len(prediction) != 1:
        raise ValueError(
            "Physical Fitness model returned an unexpected number of predictions"
        )

    prediction_score = validate_prediction_score(
        prediction[0],
        "Physical Fitness Model"
    )

    return {
        "model": "Physical Fitness",
        "predicted_fitness_score": prediction_score
    }

def predict_health_recovery(input_data: dict):
    """
    Predict health and recovery score using Model 2.
    Experimental output; not clinically validated.
    """

    models = get_models()
    model = models["model_2"]

    required_features = models["model_2_metadata"]["features"]

    missing_features = [
        feature for feature in required_features
        if feature not in input_data
    ]

    if missing_features:
        raise ValueError(
            f"Missing required features: {missing_features}"
        )

    validate_feature_keys(
        input_data,
        required_features
    )

    validate_numeric_features(
        input_data,
        required_features
    )
    input_df = pd.DataFrame(
        [[input_data[feature] for feature in required_features]],
        columns=required_features
    )

    prediction = model.predict(input_df)

    if len(prediction) != 1:
        raise ValueError(
            "Health & Recovery model returned an unexpected number of predictions"
        )

    prediction_score = validate_prediction_score(
        prediction[0],
        "Health & Recovery Model"
    )

    return {
        "model": "Health & Recovery",
        "predicted_fitness_score": prediction_score,
        "status": "Experimental - Not Clinically Validated"
    }


def predict_injury_risk(input_data: dict):
    """
    Predict injury risk using Model 3.
    """

    models = get_models()
    model = models["model_3"]

    required_features = list(model.feature_names_in_)

    missing_features = [
        feature for feature in required_features
        if feature not in input_data
    ]

    if missing_features:
        raise ValueError(
            f"Missing required features: {missing_features}"
        )

    numeric_features = [
        "Age",
        "Height_cm",
        "Weight_kg",
        "BMI",
        "Service_Years",
        "Running_Distance_km",
        "Running_Days_Per_Week",
        "Marching_Distance_km",
        "Training_Hours_Per_Week",
        "Load_Carried_kg",
        "Previous_Injury_Count",
        "Rest_Days_Per_Week",
        "Sleep_Hours",
        "Current_Pain"
    ]

    validate_numeric_features(
        input_data,
        numeric_features
    )

    validate_feature_keys(input_data, required_features)

    input_df = pd.DataFrame(
        [[input_data[feature] for feature in required_features]],
        columns=required_features
    )

    predictions = model.predict(input_df)

    if len(predictions) != 1:
        raise ValueError(
            "Injury Risk model returned an unexpected number of predictions"
        )

    prediction = str(predictions[0])

    if prediction not in ["Yes", "No"]:
        raise ValueError(
            "Injury Risk model returned an invalid class"
        )

    probabilities = model.predict_proba(input_df)[0]

    classes = model.classes_.tolist()

    if "Yes" not in classes:
        raise ValueError(
            "Injury Risk model does not contain the Yes class"
        )

    injury_probability = validate_prediction_score(
        probabilities[classes.index("Yes")],
        "Injury Risk Model"
    )

    if not 0 <= injury_probability <= 1:
        raise ValueError(
            "Injury Risk model returned an invalid probability"
        )
    return {
        "model": "Injury Risk",
        "predicted_injury": prediction,
        "injury_probability": round(
            injury_probability * 100, 2
        ),
        "status": "Model Prediction - Not a Medical Diagnosis"
    }

def validate_feature_keys(input_data: dict, required_features: list):
    """
    Reject unexpected input features.
    """

    unexpected_features = [
        feature for feature in input_data
        if feature not in required_features
    ]

    if unexpected_features:
        raise ValueError(
            f"Unexpected features: {unexpected_features}"
        )