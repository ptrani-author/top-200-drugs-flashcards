// FILE: scripts/convert.ts
import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";

type CsvRow = {
  ID: string;
  "Brand Name": string;
  "Generic Name": string;
  "Drug Class"?: string;
  "Primary Use"?: string;
  "Key Red-Flag"?: string;
  "Category (Tag)": string;
};

type Drug = {
  id: number;
  slug: string;
  brandName: string;
  genericName: string;
  drugClass: string;
  primaryUse: string;
  keyRedFlag: string;
  category: string;
};

function trimOrEmpty(v: unknown): string {
  return String(v ?? "").trim();
}

function collapseSpaces(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

function toTitleCase(input: string): string {
  const s = collapseSpaces(input.toLowerCase());
  if (!s) return "";
  return s
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function slugify(input: string): string {
  return collapseSpaces(input)
    .toLowerCase()
    .replace(/['’]/g, "") // remove apostrophes
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function assertRequired(label: string, value: string, rowIndex: number) {
  if (!value) {
    throw new Error(`Row ${rowIndex}: missing required field "${label}"`);
  }
}

function main() {
  const root = process.cwd();
  const csvPath = path.join(root, "scripts", "top200.csv");
  const outPath = path.join(root, "src", "data", "drugs.json");

  if (!fs.existsSync(csvPath)) {
    throw new Error(`CSV not found at: ${csvPath}`);
  }

  const csv = fs.readFileSync(csvPath, "utf8");

  const records = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
    trim: false
  }) as CsvRow[];

  const drugs: Drug[] = records.map((r, idx) => {
    const rowIndex = idx + 2; // header is row 1

    const idRaw = trimOrEmpty(r.ID);
    const id = Number(idRaw);
    if (!Number.isFinite(id)) {
      throw new Error(`Row ${rowIndex}: invalid ID "${idRaw}"`);
    }

    const brandName = trimOrEmpty(r["Brand Name"]);
    const genericName = trimOrEmpty(r["Generic Name"]);
    const category = toTitleCase(trimOrEmpty(r["Category (Tag)"]));

    assertRequired("Brand Name", brandName, rowIndex);
    assertRequired("Generic Name", genericName, rowIndex);
    assertRequired("Category (Tag)", category, rowIndex);

    const drugClass = trimOrEmpty(r["Drug Class"]);
    const primaryUse = trimOrEmpty(r["Primary Use"]);
    const keyRedFlag = trimOrEmpty(r["Key Red-Flag"]);

    const slug = `${slugify(brandName)}-${id}`;

    return {
      id,
      slug,
      brandName,
      genericName,
      drugClass,
      primaryUse,
      keyRedFlag,
      category
    };
  });

  drugs.sort((a, b) => {
    const byCategory = a.category.localeCompare(b.category);
    if (byCategory) return byCategory;

    const byBrand = a.brandName.localeCompare(b.brandName);
    if (byBrand) return byBrand;

    const byGeneric = a.genericName.localeCompare(b.genericName);
    if (byGeneric) return byGeneric;

    return a.id - b.id;
  });

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(drugs, null, 2) + "\n", "utf8");

  console.log(`✅ Wrote ${drugs.length} records to ${path.relative(root, outPath)}`);
}

main();
