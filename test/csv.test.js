import { it, expect } from "vitest";
import { loadPage, downloadCsv } from "./page.js";

it("exports parsed rows", async () => {
  const p = loadPage();
  p.summarize('1.1.1.1 - - [20/Aug/2026:12:00:01 +0000] "GET /a HTTP/1.1" 200 -');
  expect(await downloadCsv(p)).toBe(
    'ip,time,method,path,status,size\n"1.1.1.1","20/Aug/2026:12:00:01 +0000","GET","/a","200","-"'
  );
});

it("neutralizes cells that spreadsheets would treat as formulas", async () => {
  const p = loadPage();
  p.summarize('1.1.1.1 - - [20/Aug/2026:12:00:01 +0000] "=cmd /x HTTP/1.1" 200 5\n' +
    '1.1.1.1 - - [20/Aug/2026:12:00:02 +0000] "GET @SUM(1) HTTP/1.1" 200 5');
  const lines = (await downloadCsv(p)).split("\n");
  expect(lines[1]).toContain(`"'=cmd"`);
  expect(lines[2]).toContain(`"'@SUM(1)"`);
});
