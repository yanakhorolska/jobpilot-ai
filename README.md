JobPilot AI

An AI-powered CLI application that automates job vacancy analysis and organizes extracted information into structured Excel spreadsheets.

Features

Analyze job vacancies from raw text or website URLs.

Extract structured information using Google Gemini AI.

Execute tools through AI Function Calling.

Validate AI-generated data with Zod.

Automatically create and update Excel spreadsheets.

Support multilingual job descriptions.

Fall back to manual text input when a webpage cannot be loaded.

Automatically track application status and creation date.

Tech Stack

Node.js

TypeScript

Google Gemini API

Function Calling / Tool Use

Prompt Engineering

Zod

ExcelJS

Cheerio

REST API

Dotenv

Architecture

Vacancy Text / URL → Content Extraction → Gemini AI → Function Calling → Zod Validation → Excel Export

Installation

Clone the repository:

git clone https://github.com/yanakhorolska/jobpilot-ai.git

Navigate to the project directory:

cd jobpilot-ai

Install dependencies:

npm install

Create a .env file based on .env.example and provide your Gemini API key.

Usage

Analyze a job description

npm start

Paste the vacancy description and type END on a new line.

Analyze a vacancy URL

npm start -- "https://example.com/job"

The extracted information will be saved to jobs.xlsx.

Extracted Information

Company and position

Seniority and location

Salary and work mode

English proficiency

Professional experience

Contract type

Technologies and benefits

Application status

Date added

Vacancy URL

Project Structure

src/
├── index.ts
├── jobSchema.ts
├── getVacancyFromUrl.ts
└── saveJob.ts

Limitations

Some websites use client-side rendering or restrict automated requests. In such cases, vacancy descriptions may need to be provided manually.

AI-generated information should be reviewed for accuracy.

Project Purpose

This project demonstrates practical integration of Large Language Models into software applications, including structured data extraction, tool execution, schema validation, prompt engineering, web content processing, and workflow automation.

Author

Yana Khorolska
