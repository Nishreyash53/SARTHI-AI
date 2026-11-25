
from pathlib import Path
import pandas as pd


# Existing dataset locations
DATASETS = {
    "Injury Risk": Path(
        r"N:\NISHREYASH\software_eneg,ml,dv\best_filter_dataset\injury_risk_soldiers_2000.csv"
    ),

    "Physical Fitness": Path(
        r"N:\NISHREYASH\software_eneg,ml,dv\best_filter_dataset\sarthi_model1_physical_fitness_dataset_final.csv"
    ),

    "Health and Sleep": Path(
        r"N:\NISHREYASH\software_eneg,ml,dv\best_filter_dataset\soldier_health_sleep_2000.csv"
    ),

    "Master Soldier": Path(
        r"N:\NISHREYASH\software_eneg,ml,dv\main_datset\masterdatset\master_dataset.xlsx"
    )
}


def inspect_dataset(name, file_path):

    print("\n" + "=" * 65)
    print(f"DATASET: {name}")
    print("=" * 65)

    if not file_path.is_file():
        print("ERROR: File not found!")
        print("Path:", file_path)
        return

    try:
        if file_path.suffix.lower() == ".csv":
            df = pd.read_csv(file_path)

        elif file_path.suffix.lower() == ".xlsx":
            excel_data = pd.ExcelFile(file_path)

            print("Excel Sheets:", excel_data.sheet_names)

            for sheet in excel_data.sheet_names:
                df = pd.read_excel(file_path, sheet_name=sheet)

                print(f"\n--- Sheet: {sheet} ---")
                print("Rows:", df.shape[0])
                print("Columns:", df.shape[1])
                print("Column Names:", df.columns.tolist())
                print("\nData Types:")
                print(df.dtypes.to_string())
                print("\nMissing Values:")
                print(df.isnull().sum().to_string())
                print("\nFirst 3 Records:")
                print(df.head(3).to_string(index=False))

            return

        else:
            print("ERROR: Unsupported file format.")
            return

        print("File:", file_path.name)
        print("Rows:", df.shape[0])
        print("Columns:", df.shape[1])

        print("\nColumn Names:")
        print(df.columns.tolist())

        print("\nData Types:")
        print(df.dtypes.to_string())

        print("\nMissing Values:")
        print(df.isnull().sum().to_string())

        print("\nFirst 3 Records:")
        print(df.head(3).to_string(index=False))

        if "Soldier_ID" in df.columns:
            print("\nUnique Soldier IDs:", df["Soldier_ID"].nunique())
            print("Duplicate Soldier IDs:", df["Soldier_ID"].duplicated().sum())

    except Exception as error:
        print("INSPECTION ERROR:", str(error))


if __name__ == "__main__":

    print("\nS.A.R.T.H.I. DATA SOURCE INSPECTION")

    for dataset_name, dataset_path in DATASETS.items():
        inspect_dataset(dataset_name, dataset_path)

    print("\n" + "=" * 65)
    print("DATASET INSPECTION COMPLETED")
    print("=" * 65)

