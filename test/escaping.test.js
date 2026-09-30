import { it, expect } from "vitest";
import { loadPage } from "./page.js";

it("renders log values as text, not HTML", () => {
  const p = loadPage();
  p.summarize('6.6.6.6 - - [20/Aug/2026:12:00:01 +0000] "GET /<img src=x onerror=alert(1)> HTTP/1.1" 404 0');
  expect(p.$("paths").querySelector("img")).toBeNull();
  expect(p.rows("paths")).toEqual([["/<img src=x onerror=alert(1)>", "1"]]);
});
