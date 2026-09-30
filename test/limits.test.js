import { it, expect } from "vitest";
import { loadPage } from "./page.js";

const line = (i) => `1.1.1.1 - - [20/Aug/2026:12:00:01 +0000] "GET /p${i % 3} HTTP/1.1" 200 1`;

it("says how many lines were ignored past the cap", () => {
  const p = loadPage();
  p.summarize(Array.from({ length: 20005 }, (_, i) => line(i)).join("\n"));
  expect(p.$("stats").textContent).toMatch(/^20000 lines parsed/);
  expect(p.$("warn").textContent).toMatch(/5 lines past the 20,000 cap were ignored/);
});

it("no cap warning under the limit", () => {
  const p = loadPage();
  p.summarize(line(1) + "\n");
  expect(p.$("warn").textContent).toBe("");
});

it("handles CRLF line endings", () => {
  const p = loadPage();
  p.summarize(line(0) + "\r\n" + line(1) + "\r\n");
  expect(p.$("stats").textContent).toBe("2 lines parsed · 0 skipped");
  expect(p.rows("paths").map((r) => r[0])).toEqual(["/p0", "/p1"]);
});
