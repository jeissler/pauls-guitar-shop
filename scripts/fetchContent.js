import "dotenv/config";

import fs from "fs";
import { google } from "googleapis";

const apiKey = process.env.GOOGLE_API_KEY;
const sheetId = process.env.GOOGLE_SHEET_ID;

const sheets = google.sheets({ version: "v4", auth: apiKey });

const fetchSheet = async (range) => {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range,
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log(`No data found for range ${range}.`);
    return;
  }

  return rows.filter((row) => row.some((cell) => cell && cell.trim() !== ""));
};

const formatContent = (rows) => {
  return rows.slice(1).map((row) => ({
    Section: row[0],
    Content: row[1],
  }));
};

const formatInventory = (rows) => {
  const headers = rows[0];
  const entries = rows.slice(1).map((row) => {
    const item = {};
    headers.forEach((header, index) => {
      if (header && header.trim() !== "" && !header.startsWith("_")) {
        item[header] = row[index] || "";
      }
    });
    return item;
  });

  return entries.sort((a, b) => {
    const brandCompare = a.Brand.localeCompare(b.Brand);
    // Brands are different, sort by brand
    if (brandCompare !== 0) return brandCompare;
    // Brands are the same, sort by model
    return a.Model.localeCompare(b.Model);
  });
};

const writeFile = (content, outputFile) => {
  const outputDir = "./content";
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    `${outputDir}/${outputFile}`,
    JSON.stringify(content, null, 2)
  );
  console.log(`✅ Sheet content written to ${outputFile}`);
};

const fetchContent = async (range, outputFile) => {
  const rows = await fetchSheet(range);
  const content = formatContent(rows);
  writeFile(content, outputFile);
};

const fetchInventory = async (range, outputFile) => {
  const rows = await fetchSheet(range);
  const inventory = formatInventory(rows);
  writeFile(inventory, outputFile);
};

const fetchAllContent = async () => {
  await fetchContent("Content!A1:B100", "content.json");
  await fetchInventory(
    "Inventory - Electric!A1:G100",
    "inventory-electric.json"
  );
  await fetchInventory(
    "Inventory - Acoustic!A1:G100",
    "inventory-acoustic.json"
  );
  await fetchInventory("Inventory - Bass!A1:G100", "inventory-bass.json");
  await fetchInventory(
    "Inventory - Amplifiers!A1:G100",
    "inventory-amplifiers.json"
  );
  await fetchInventory("Inventory - Gear!A1:G100", "inventory-gear.json");
};

fetchAllContent();
