import { describe, it, expect } from "vitest";
import { loadPage } from "./page.js";

const LOG = [
  '1.1.1.1 - - [20/Aug/2026:12:00:01 +0000] "GET /a?x=1 HTTP/1.1" 200 612 "-" "curl"',
  '1.1.1.1 - - [20/Aug/2026:12:00:02 +0000] "GET /a HTTP/1.1" 200 612',
  '2.2.2.2 - - [20/Aug/2026:12:00:03 +0000] "POST /b HTTP/1.1" 404 -',
  "garbage line",
].join("\n");

describe("summarize", () => {
  it("counts paths, statuses and IPs", () => {
    const p = loadPage();
    p.summarize(LOG);
    expect(p.rows("paths")).toEqual([["/a", "2"], ["/b", "1"]]);
    expect(p.rows("status")).toEqual([["200", "2"], ["404", "1"]]);
    expect(p.rows("ips")).toEqual([["1.1.1.1", "2"], ["2.2.2.2", "1"]]);
    expect(p.$("stats").textContent).toBe("3 lines parsed · 1 skipped");
    expect(p.$("csv").disabled).toBe(false);
  });

  it("warns when nothing parses", () => {
    const p = loadPage();
    p.summarize("nope\nstill nope");
    expect(p.$("warn").textContent).toMatch(/No combined-log lines/);
    expect(p.$("out").classList.contains("hidden")).toBe(true);
  });

  it("clear resets the page", () => {
    const p = loadPage();
    p.summarize(LOG);
    p.$("reset").click();
    expect(p.$("src").value).toBe("");
    expect(p.$("csv").disabled).toBe(true);
    expect(p.$("out").classList.contains("hidden")).toBe(true);
  });
});
