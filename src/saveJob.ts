import ExcelJS from "exceljs";
import { existsSync } from "node:fs";

export interface Job {
  company: string;
  position: string;
  salary: string;
  workMode: string;
  english: string;
  technologies: string[];
}

export async function saveJob(job: Job): Promise<void> {
  const filePath = "jobs.xlsx";
  const workbook = new ExcelJS.Workbook();

  if (existsSync(filePath)) {
    await workbook.xlsx.readFile(filePath);
  }

  let sheet = workbook.getWorksheet("Jobs");

  if (!sheet) {
    sheet = workbook.addWorksheet("Jobs");

    sheet.columns = [
      { header: "Company", key: "company", width: 25 },
      { header: "Position", key: "position", width: 35 },
      { header: "Salary", key: "salary", width: 25 },
      { header: "Work Mode", key: "workMode", width: 25 },
      { header: "English", key: "english", width: 15 },
      { header: "Technologies", key: "technologies", width: 45 },
    ];

    sheet.getRow(1).font = { bold: true };
  }

  sheet.addRow({
    ...job,
    technologies: job.technologies.join(", "),
  });

  await workbook.xlsx.writeFile(filePath);

  console.log(`✅ Saved to Excel: ${job.position}`);
}
