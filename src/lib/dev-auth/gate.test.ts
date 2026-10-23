import { describe, expect, it } from "vitest";
import { DEV_AUTH_BYPASS_FORBIDDEN, devAuthBypassActive, hostnameOf, isLocalDevHost } from "./gate";

const on = {
  dev: true,
  prod: false,
  flag: "true",
  hostname: "localhost",
  cloudConfigured: false,
};

describe("dev auth bypass gate", () => {
  it("turns on only for a localhost dev build with the flag and no cloud project", () => {
    expect(devAuthBypassActive(on)).toBe(true);
    expect(devAuthBypassActive({ ...on, hostname: "127.0.0.1" })).toBe(true);
    expect(devAuthBypassActive({ ...on, hostname: "::1" })).toBe(true);
    expect(devAuthBypassActive({ ...on, hostname: "[::1]" })).toBe(true);
  });

  it("stays off without the flag, off localhost, or when Supabase is configured", () => {
    expect(devAuthBypassActive({ ...on, flag: undefined })).toBe(false);
    expect(devAuthBypassActive({ ...on, flag: "false" })).toBe(false);
    expect(devAuthBypassActive({ ...on, hostname: "www.myacademy.my" })).toBe(false);
    expect(devAuthBypassActive({ ...on, hostname: "" })).toBe(false);
    expect(devAuthBypassActive({ ...on, cloudConfigured: true })).toBe(false);
  });

  it("hard-fails if a production build asks for the bypass", () => {
    expect(() => devAuthBypassActive({ ...on, dev: false, prod: true })).toThrow(
      DEV_AUTH_BYPASS_FORBIDDEN,
    );
    expect(() => devAuthBypassActive({ ...on, dev: false, prod: false })).toThrow(
      DEV_AUTH_BYPASS_FORBIDDEN,
    );
    expect(devAuthBypassActive({ ...on, dev: false, prod: true, flag: undefined })).toBe(false);
  });

  it("reads the host without its port", () => {
    expect(hostnameOf("localhost:8080")).toBe("localhost");
    expect(hostnameOf("[::1]:8080")).toBe("::1");
    expect(isLocalDevHost("localhost")).toBe(true);
    expect(isLocalDevHost("preview.myacademy.my")).toBe(false);
  });
});
