import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing in .env");
}

const ai = new GoogleGenAI({ apiKey });

const vacancy = `
Junior Fullstack Developer at TechNova.
100% remote from Poland.
Salary: 7000-10000 PLN gross.
English B2.
Requirements: React, TypeScript, Node.js,
REST API and PostgreSQL.
`;

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",

    contents: `
      You are JobPilot AI, a job vacancy analyzer.

      Extract job information from the vacancy.
      Do not invent missing details.
      For missing text fields, use "Not specified".

      Vacancy:
      ${vacancy}
    `,

    config: {
      responseMimeType: "application/json",

      responseJsonSchema: {
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
    },
  });

  if (!response.text) {
    throw new Error("Empty response from Gemini");
  }

  const job = JSON.parse(response.text);

  console.log(JSON.stringify(job, null, 2));
}

main().catch(console.error);
