
from pathlib import Path
import pandas as pd


# Dataset paths
BASE_PATH = Path(
    r"N:\NISHREYASH\software_eneg,ml,dv"
)

DATASETS = {
    "Master": BASE_PATH / "main_datset" / "masterdatset" / "master_dataset.xlsx",

    "Physical Fitness": BASE_PATH / "best_filter_dataset" / "sarthi_model1_physical_fitness_dataset_final.csv",

    "Health Recovery": BASE_PATH / "best_filter_dataset" / "soldier_health_sleep_2000.csv",

    "Injury Risk": BASE_PATH / "best_filter_dataset" / "injury_risk_soldiers_2000.csv"
}


def load_soldier_ids(name, path):

    if not path.is_file():
        raise FileNotFoundError(f"{name} file not found: {path}")

    if path.suffix.lower() == ".xlsx":
        df = pd.read_excel(path)
    else:
        df = pd.read_csv(path)

    if "Soldier_ID" not in df.columns:
        raise ValueError(f"Soldier_ID column missing in {name}")

    ids = df["Soldier_ID"].astype("string").str.strip()

    if ids.isna().any() or ids.eq("").any():
        raise ValueError(f"{name} contains blank Soldier_ID values")

    if ids.duplicated().any():
        raise ValueError(f"{name} contains duplicate Soldier_ID values")

    return set(ids)


if __name__ == "__main__":

    print("\nS.A.R.T.H.I. SOLDIER ID VERIFICATION")
    print("=" * 60)

    all_ids = {}

    for name, path in DATASETS.items():

        ids = load_soldier_ids(name, path)
        all_ids[name] = ids

        print(f"\n{name}")
        print("Unique Soldier IDs:", len(ids))

    master_ids = all_ids["Master"]

    print("\n" + "=" * 60)
    print("MASTER DATASET MATCHING REPORT")
    print("=" * 60)

    for name, ids in all_ids.items():

        missing = master_ids - ids
        extra = ids - master_ids

        print(f"\n{name}")
        print("Matching IDs:", len(master_ids & ids))
        print("Missing from dataset:", len(missing))
        print("Extra IDs:", len(extra))

        if missing:
            print("Missing examples:", sorted(missing)[:5])

        if extra:
            print("Extra examples:", sorted(extra)[:5])

    all_match = all(
        ids == master_ids
        for ids in all_ids.values()
    )

    print("\n" + "=" * 60)

    if all_match:
        print("SUCCESS: ALL FOUR DATASETS HAVE MATCHING SOLDIER IDs")
    else:
        print("WARNING: SOLDIER ID MISMATCH FOUND")

    print("=" * 60)
