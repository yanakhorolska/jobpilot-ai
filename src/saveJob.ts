import ExcelJS from "exceljs";
import { existsSync } from "node:fs";
import type { Job } from "./jobSchema";

export async function saveJob(job: Job, url?: string): Promise<void> {
  const filePath = "jobs.xlsx";
  const workbook = new ExcelJS.Workbook();

  if (existsSync(filePath)) {
    await workbook.xlsx.readFile(filePath);
  }

  let sheet = workbook.getWorksheet("Jobs");

  if (!sheet) {
    sheet = workbook.addWorksheet("Jobs");

    sheet.columns = [
      { header: "Company", width: 25 },
      { header: "Position", width: 40 },
      { header: "Seniority", width: 15 },
      { header: "Location", width: 25 },
      { header: "Salary", width: 25 },
      { header: "Work Mode", width: 20 },
      { header: "English", width: 15 },
      { header: "Experience", width: 25 },
      { header: "Contract Type", width: 25 },
      { header: "Technologies", width: 60 },
      { header: "Benefits", width: 60 },
      { header: "Status", width: 20 },
      { header: "Date Added", width: 15 },
    ];

    sheet.getRow(1).font = { bold: true };
  }
  sheet.getCell("N1").value = "URL";
  sheet.getCell("N1").font = { bold: true };
  sheet.getColumn(14).width = 50;
  while (sheet.rowCount > 1 && !sheet.getRow(sheet.rowCount).hasValues) {
    sheet.spliceRows(sheet.rowCount, 1);
  }
  sheet.addRow([
    job.company,
    job.position,
    job.seniority,
    job.location,
    job.salary,
    job.workMode,
    job.english,
    job.experience,
    job.contractType,
    job.technologies.join(", "),
    job.benefits.join(", "),
    "New",
    new Date().toISOString().split("T")[0],
    url || "Not specified",
  ]);

  await workbook.xlsx.writeFile(filePath);

  console.log(`✅ Saved to Excel: ${job.position}`);
}
