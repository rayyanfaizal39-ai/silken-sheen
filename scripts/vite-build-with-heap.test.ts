import { describe, expect, it } from "vitest";
import { chooseHeapMb } from "./vite-build-with-heap.mjs";

describe("vite build heap sizing", () => {
  it("raises the heap to half of RAM on an 8 GB builder, capped at 4 GB", () => {
    expect(chooseHeapMb({ totalMb: 8192, defaultMb: 2096 })).toEqual({ heapMb: 4096, source: "half of RAM, capped at 4096 MB" });
    expect(chooseHeapMb({ totalMb: 65536, defaultMb: 2096 }).heapMb).toBe(4096);
  });

  it("never lowers Node's own default", () => {
    expect(chooseHeapMb({ totalMb: 15800, defaultMb: 4144 })).toEqual({ heapMb: 4144, source: "node default" });
  });

  it("stays within half of RAM on small machines", () => {
    expect(chooseHeapMb({ totalMb: 4096, defaultMb: 1050 }).heapMb).toBe(2048);
  });

  it("respects an explicit NODE_OPTIONS heap limit", () => {
    expect(chooseHeapMb({ totalMb: 8192, defaultMb: 2096, nodeOptions: "--max-old-space-size=6144" })).toEqual({ heapMb: 6144, source: "NODE_OPTIONS" });
  });
});
