import { z } from "zod";

export const JobSchema = z.object({
  company: z.string().describe("Company or product name"),
  position: z.string().describe("Complete job title"),
  seniority: z.string().describe("Required seniority level"),
  location: z.string().describe("Country and city"),
  salary: z.string().describe("Salary, currency and gross/net"),
  workMode: z.string().describe("Remote, Hybrid or On-site"),
  english: z.string().describe("Required English level"),
  experience: z.string().describe("Required professional experience"),
  contractType: z.string().describe("Type of employment contract"),
  technologies: z
    .array(z.string())
    .describe("All mentioned technologies, including AI agents"),
  benefits: z.array(z.string()).describe("All offered employee benefits"),
});

export type Job = z.infer<typeof JobSchema>;
