
from io import BytesIO
from datetime import datetime
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak
)


def safe(value):
    """Convert missing values into readable text."""
    if value is None or value == "":
        return "Not Available"

    return escape(str(value))


def page_footer(canvas, doc):
    canvas.saveState()

    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.grey)

    canvas.drawString(
        16 * mm,
        10 * mm,
        "S.A.R.T.H.I. | Synthetic Research Simulation"
    )

    canvas.drawRightString(
        A4[0] - 16 * mm,
        10 * mm,
        f"Page {doc.page}"
    )

    canvas.restoreState()


def generate_soldier_report(data: dict) -> BytesIO:

    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=16 * mm,
        leftMargin=16 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title="S.A.R.T.H.I. Soldier Report"
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "ReportTitle",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=19,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#17365D"),
        spaceAfter=8
    )

    subtitle_style = ParagraphStyle(
        "ReportSubtitle",
        parent=styles["Normal"],
        alignment=TA_CENTER,
        fontSize=9,
        textColor=colors.grey,
        spaceAfter=15
    )

    section_style = ParagraphStyle(
        "SectionHeading",
        parent=styles["Heading2"],
        fontSize=12,
        textColor=colors.HexColor("#17365D"),
        spaceBefore=12,
        spaceAfter=7
    )

    cell_style = ParagraphStyle(
        "CellText",
        parent=styles["Normal"],
        fontSize=8,
        leading=11
    )

    header_style = ParagraphStyle(
        "HeaderText",
        parent=cell_style,
        textColor=colors.white,
        fontName="Helvetica-Bold"
    )

    story = []

    soldier = data.get("soldier") or {}

    sections = data.get("health_and_fitness") or {}

    physical = sections.get("physical_fitness") or {}
    health = sections.get("health_recovery") or {}
    injury = sections.get("injury_records") or {}

    latest = data.get("latest_prediction") or {}

    history_data = data.get("prediction_history") or {}
    history = history_data.get("history") or []

    problems = data.get("problem_areas") or []

    readiness = data.get("readiness") or {}

    historical = data.get("historical_injury_outcome") or {}
    historical_data = historical.get("data") or {}

    # ---------------------------------
    # Helper: Create section table
    # ---------------------------------

    def add_table(section_name, rows):

        story.append(
            Paragraph(escape(section_name), section_style)
        )

        table_data = [
            [
                Paragraph("Field", header_style),
                Paragraph("Value", header_style)
            ]
        ]

        for field, value in rows:
            table_data.append([
                Paragraph(safe(field), cell_style),
                Paragraph(safe(value), cell_style)
            ])

        table = Table(
            table_data,
            colWidths=[58 * mm, 116 * mm],
            repeatRows=1,
            hAlign="LEFT"
        )

        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0),
             colors.HexColor("#17365D")),

            ("GRID", (0, 0), (-1, -1),
             0.4, colors.HexColor("#CCCCCC")),

            ("VALIGN", (0, 0), (-1, -1), "TOP"),

            ("LEFTPADDING", (0, 0), (-1, -1), 6),
            ("RIGHTPADDING", (0, 0), (-1, -1), 6),
            ("TOPPADDING", (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),

            ("ROWBACKGROUNDS", (0, 1), (-1, -1),
             [colors.white, colors.HexColor("#F2F5F9")])
        ]))

        story.append(table)
        story.append(Spacer(1, 8))

    # ---------------------------------
    # Report heading
    # ---------------------------------

    story.append(
        Paragraph("S.A.R.T.H.I.", title_style)
    )

    story.append(
        Paragraph(
            "Soldier AI Readiness, Tracking, Health &amp; Intelligence",
            subtitle_style
        )
    )

    story.append(
        Paragraph(
            "Soldier Assessment and Prediction Report",
            styles["Heading2"]
        )
    )

    story.append(
        Paragraph(
            f"Report Generated: {datetime.now().strftime('%d-%m-%Y %H:%M:%S')}",
            styles["Normal"]
        )
    )

    story.append(Spacer(1, 12))

    # ---------------------------------
    # 1. Soldier Profile
    # ---------------------------------

    add_table("1. Soldier Profile", [
        ("Soldier ID", soldier.get("Soldier_ID")),
        ("Soldier Name", soldier.get("Soldier_Name")),
        ("Rank", soldier.get("Rank")),
        ("Age", soldier.get("Age")),
        ("Gender", soldier.get("Gender")),
        ("Assessment Date", physical.get("Assessment_Date")),
        ("Data Provenance", physical.get("Data_Provenance"))
    ])

    # ---------------------------------
    # 2. Physical Fitness
    # ---------------------------------

    add_table("2. Physical Fitness Assessment", [
        ("BPT Distance (km)", physical.get("BPT_Distance_km")),
        ("BPT Time (minutes)", physical.get("BPT_Time_Minutes")),
        ("Rope Climbing Completed", physical.get("Rope_Climbing_Completed")),
        ("Rope Climbing Time (seconds)", physical.get("Rope_Climbing_Time_Seconds")),
        ("Pushups", physical.get("Pushups_Count")),
        ("Pullups", physical.get("Pullups_Count")),
        ("Situps", physical.get("Situps_Count")),
        ("Plank Time (seconds)", physical.get("Plank_Time_Seconds")),
        ("Resting Heart Rate", physical.get("Resting_Heart_Rate_bpm")),
        ("Recovery Heart Rate", physical.get("Recovery_Heart_Rate_bpm")),
        ("Recorded Dataset Fitness Score", physical.get("Physical_Fitness_Score")),
        ("Recorded Fitness Status", physical.get("Fitness_Status")),
        ("Physical Fitness Predicted Score", latest.get("Model_1_Prediction"))
    ])

    # ---------------------------------
    # 3. Health and Recovery
    # ---------------------------------

    add_table("3. Health and Recovery Assessment", [
        ("Sleep Duration", health.get("Sleep Duration")),
        ("Quality of Sleep", health.get("Quality of Sleep")),
        ("Physical Activity Level", health.get("Physical Activity Level")),
        ("Stress Level", health.get("Stress Level")),
        ("BMI Category", health.get("BMI Category")),
        ("Blood Pressure", health.get("Blood Pressure")),
        ("Heart Rate", health.get("Heart Rate")),
        ("Daily Steps", health.get("Daily Steps")),
        ("Sleep Disorder", health.get("Sleep Disorder")),
        (
            "Recorded Dataset Recalculated Score",
            health.get("Fitness_Score_Recalculated")
        ),
        ("Health & Recovery Predicted Score", latest.get("Model_2_Prediction"))
    ])

    # ---------------------------------
    # 4. Injury and Training
    # ---------------------------------

    add_table("4. Injury and Training Details", [
        ("Height (cm)", injury.get("Height_cm")),
        ("Weight (kg)", injury.get("Weight_kg")),
        ("BMI", injury.get("BMI")),
        ("Service Years", injury.get("Service_Years")),
        ("Training Type", injury.get("Training_Type")),
        ("Running Distance (km)", injury.get("Running_Distance_km")),
        ("Running Days Per Week", injury.get("Running_Days_Per_Week")),
        ("Marching Distance (km)", injury.get("Marching_Distance_km")),
        ("Training Hours Per Week", injury.get("Training_Hours_Per_Week")),
        ("Load Carried (kg)", injury.get("Load_Carried_kg")),
        ("Previous Injury", injury.get("Previous_Injury")),
        ("Previous Injury Type", injury.get("Previous_Injury_Type")),
        ("Previous Injury Count", injury.get("Previous_Injury_Count")),
        ("Rest Days Per Week", injury.get("Rest_Days_Per_Week")),
        ("Sleep Hours", injury.get("Sleep_Hours")),
        ("Fitness Level", injury.get("Fitness_Level")),
        ("Terrain", injury.get("Terrain")),
        ("Current Pain", injury.get("Current_Pain")),
        ("Pain Body Part", injury.get("Pain_Body_Part")),
        ("Medical History", injury.get("Medical_History")),
        ("Injury Risk Prediction", latest.get("Model_3_Prediction"))
    ])

    # ---------------------------------
    # 5. Historical Injury Outcome
    # ---------------------------------

    add_table("5. Historical Injury Outcome (Dataset)", [
        ("Source", historical.get("source")),
        ("Injury Occurred", historical_data.get("Injury_Occurred")),
        ("Injury Type", historical_data.get("Injury_Type")),
        ("Injury Body Part", historical_data.get("Injury_Body_Part")),
        ("Injury Severity", historical_data.get("Injury_Severity"))
    ])

    # ---------------------------------
    # 6. Problem Areas
    # ---------------------------------

    problem_rows = []

    for item in problems:

        message = item.get("message", "")

        message = message.replace(
            "Model has flagged potential injury risk.",
            "Injury Risk assessment has flagged a potential concern."
        )

        problem_rows.append((
            item.get("area", "Not Available"),
            (
                f"{message} | "
                f"Status: {item.get('status', 'Not Available')} | "
                f"{item.get('note', '')}"
            )
        ))

    if not problem_rows:
        problem_rows.append((
            "Dashboard Flags",
            "No problem areas flagged by current dashboard rules."
        ))

    add_table("6. Identified Problem Areas", problem_rows)

    # ---------------------------------
    # 7. Prediction History
    # ---------------------------------

    story.append(PageBreak())

    story.append(
        Paragraph("7. Prediction History", section_style)
    )

    story.append(
        Paragraph(
            f"Total Prediction Records: {safe(history_data.get('total_predictions'))}",
            styles["Normal"]
        )
    )

    history_table_data = [[
    "ID",
    "Physical Fitness",
    "Health & Recovery",
    "Injury Risk",
    "Timestamp",
    "Status"
]]

    for item in history:

        values = [
            item.get("Model_1_Prediction"),
            item.get("Model_2_Prediction"),
            item.get("Model_3_Prediction")
        ]

        if all(value is None for value in values):
            status = "Incomplete/Failed"
        elif any(value is None for value in values):
            status = "Partial"
        else:
            status = "Completed"

        history_table_data.append([
            safe(item.get("Prediction_ID")),
            safe(values[0]),
            safe(values[1]),
            safe(values[2]),
            safe(item.get("Prediction_Timestamp")),
            status
        ])

    if not history:
        history_table_data.append([
            "-", "-", "-", "-", "-", "No Records"
        ])

    history_table = Table(
        history_table_data,
        repeatRows=1,
        colWidths=[
            12 * mm,
            25 * mm,
            25 * mm,
            20 * mm,
            53 * mm,
            35 * mm
        ]
    )

    history_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0),
         colors.HexColor("#17365D")),

        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),

        ("GRID", (0, 0), (-1, -1), 0.4, colors.grey),

        ("FONTSIZE", (0, 0), (-1, -1), 7),

        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),

        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),

        ("ROWBACKGROUNDS", (0, 1), (-1, -1),
         [colors.white, colors.HexColor("#F2F5F9")])
    ]))

    story.append(history_table)
    story.append(Spacer(1, 15))

    # ---------------------------------
    # 8. Final Assessment Summary
    # ---------------------------------

    add_table("8. Final Assessment Summary", [
    ("Latest Physical Fitness Prediction", latest.get("Model_1_Prediction")),
    ("Latest Health & Recovery Prediction", latest.get("Model_2_Prediction")),
    ("Latest Injury Risk Prediction", latest.get("Model_3_Prediction")),
    ("Readiness Score", readiness.get("score")),
    ("Readiness Status", readiness.get("status"))
])

    # ---------------------------------
    # 9. Important Limitations
    # ---------------------------------

    story.append(
        Paragraph("9. Data Source and Model Limitations", section_style)
    )

    disclaimer = (
        "<b>Data Provenance:</b> This report is based on "
        "Synthetic Research Simulation data.<br/><br/>"

        "<b>Physical Fitness:</b> Physical fitness prediction is an "
        "experimental machine learning output.<br/><br/>"

        "<b>Health &amp; Recovery:</b> Health and recovery prediction is "
        "experimental and is not clinically validated.<br/><br/>"

        "<b>Injury Risk:</b> Injury risk prediction is not a medical diagnosis "
        "and must not replace professional medical assessment.<br/><br/>"

        "<b>Readiness:</b> Overall combat readiness scoring is disabled "
        "pending model validation. No validated readiness score is provided.<br/><br/>"

        "<b>Important:</b> This report is for academic research and "
        "demonstration purposes only. It is not an operational military "
        "assessment or a clinical report."
    )

    story.append(
        Paragraph(disclaimer, styles["BodyText"])
    )

    # ---------------------------------
    # Generate PDF
    # ---------------------------------

    doc.build(
        story,
        onFirstPage=page_footer,
        onLaterPages=page_footer
    )

    buffer.seek(0)

    return buffer
