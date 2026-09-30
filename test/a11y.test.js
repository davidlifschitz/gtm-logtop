import { it, expect } from "vitest";
import { loadPage } from "./page.js";

it("file input stays in the tab order and is labelled", () => {
  const { $, window } = loadPage();
  const file = $("file");
  expect(window.getComputedStyle(file).display).not.toBe("none");
  expect(window.getComputedStyle(file).visibility).not.toBe("hidden");
  expect(file.tabIndex).toBeGreaterThanOrEqual(0);
  expect(file.labels.length).toBeGreaterThan(0);
});

it("textarea has a real label", () => {
  const { $ } = loadPage();
  const labels = [...$("src").labels].map((l) => l.textContent.trim());
  expect(labels.join(" ")).toMatch(/paste/i);
});

it("warnings and results summary are live regions", () => {
  const { $ } = loadPage();
  expect($("warn").getAttribute("role") || $("warn").getAttribute("aria-live")).toBeTruthy();
  expect($("stats").getAttribute("aria-live")).toBe("polite");
});
