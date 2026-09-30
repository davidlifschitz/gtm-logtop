import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

export function loadPage() {
  const dom = new JSDOM(html, { runScripts: "dangerously", pretendToBeVisual: true });
  const { document } = dom.window;
  const $ = (id) => document.getElementById(id);
  const summarize = (text) => {
    $("src").value = text;
    $("run").click();
  };
  const rows = (id) =>
    [...$(id).querySelectorAll("tr")].slice(1).map((tr) => [...tr.cells].map((c) => c.textContent));
  return { dom, window: dom.window, document, $, summarize, rows };
}

export async function downloadCsv(p) {
  let blob;
  p.window.URL.createObjectURL = (b) => ((blob = b), "blob:test");
  p.window.URL.revokeObjectURL = () => {};
  p.window.HTMLAnchorElement.prototype.click = () => {};
  p.$("csv").click();
  return new Promise((resolve) => {
    const r = new p.window.FileReader();
    r.onload = () => resolve(r.result);
    r.readAsText(blob);
  });
}
