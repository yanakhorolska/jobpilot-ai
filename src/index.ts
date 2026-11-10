import "dotenv/config";

import {
  GoogleGenAI,
  FunctionCallingConfigMode,
  type FunctionDeclaration,
} from "@google/genai";

import { z } from "zod";
import { saveJob } from "./saveJob";

const JobSchema = z.object({
  company: z.string(),
  position: z.string(),
  salary: z.string(),
  workMode: z.string(),
  english: z.string(),
  technologies: z.array(z.string()),
});

const saveJobTool: FunctionDeclaration = {
  name: "saveJob",
  description: "Save a job vacancy into an Excel file",
  parametersJsonSchema: {
    type: "object",
    properties: {
      company: { type: "string" },
      position: { type: "string" },
      salary: { type: "string" },
      workMode: { type: "string" },
      english: { type: "string" },
      technologies: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: [
      "company",
      "position",
      "salary",
      "workMode",
      "english",
      "technologies",
    ],
  },
};

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY");
}

const ai = new GoogleGenAI({ apiKey });

const vacancy = `
Frontend Developer at FutureTech.
Remote from Poland.
Salary: 9000 PLN gross.
English B2.
Requirements: React, TypeScript, REST API.
`;

async function main() {
  console.log("🤖 JobPilot AI is analyzing...");

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",

    contents: `
      Analyze this job vacancy and save it
      using the saveJob tool.

      Do not invent missing information.
      Use "Not specified" for missing text fields.

      Vacancy:
      ${vacancy}
    `,

    config: {
      tools: [{ functionDeclarations: [saveJobTool] }],
      toolConfig: {
        functionCallingConfig: {
          mode: FunctionCallingConfigMode.ANY,
          allowedFunctionNames: ["saveJob"],
        },
      },
    },
  });

  const toolCall = response.functionCalls?.find(
    (call) => call.name === "saveJob",
  );

  if (!toolCall) {
    throw new Error("Gemini did not request saveJob");
  }

  console.log("🔧 Tool requested:", toolCall.name);

  const job = JobSchema.parse(toolCall.args);

  await saveJob(job);

  console.log("✅ Agent tool execution completed!");
}

main().catch(console.error);
