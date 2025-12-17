import Papa from "papaparse";

export async function loadSensorsCSV() {
  const res = await fetch("/data/sensors.csv");
  const text = await res.text();

  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data.map((row: any) => ({
    timestamp: new Date(row.Timestamp), // MUST match CSV header

    accelerometerX: Number(row.Accel_X),
    accelerometerY: Number(row.Accel_Y),
    accelerometerZ: Number(row.Accel_Z),

    inclinometer: Number(row.Inclinometer),
    extensometer: Number(row.Extensometer),
    piezometer: Number(row.Piezometer),
  }));
}
