import * as cheerio from "cheerio";

export async function getVacancyFromUrl(url: string): Promise<string> {
  const parsedUrl = new URL(url);

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error("Invalid URL protocol");
  }

  const response = await fetch(parsedUrl, {
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  $("script, style, nav, footer, header, noscript").remove();

  const text = $("body").text().replace(/\s+/g, " ").trim();

  if (!text) {
    throw new Error("No vacancy content found");
  }

  return text;
}
