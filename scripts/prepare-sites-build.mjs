import { copyFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const mode = process.argv[2];

if (mode === "clean") {
  await rm(dist, { force: true, recursive: true });
} else if (mode === "finalize") {
  await mkdir(path.join(dist, "server"), { recursive: true });
  await mkdir(path.join(dist, ".openai"), { recursive: true });
  await copyFile(
    path.join(root, "sites", "worker.js"),
    path.join(dist, "server", "index.js"),
  );
  await copyFile(
    path.join(root, "api", "intake.js"),
    path.join(dist, "server", "intake.js"),
  );
  await copyFile(
    path.join(root, ".openai", "hosting.json"),
    path.join(dist, ".openai", "hosting.json"),
  );
} else {
  throw new Error("Expected build mode: clean or finalize");
}
