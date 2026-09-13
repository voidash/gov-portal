import { describe, expect, it } from "vitest";

import { memberMatchesQuery } from "@/server/members/search";

const member = {
  displayName: "सुनिता श्रेष्ठ",
  githubUsername: "SunitaS",
  headline: "Frontend developer",
};

describe("memberMatchesQuery", () => {
  it("matches a Devanagari display name", () => {
    expect(memberMatchesQuery(member, "सुनिता")).toBe(true);
    expect(memberMatchesQuery(member, "श्रेष्ठ")).toBe(true);
  });

  it("matches a Devanagari name typed in decomposed form", () => {
    // "ऩ" (U+0929) is canonically equal to "न" + nukta (U+0928 U+093C).
    const stored = { ...member, displayName: "ऩेपाल" };
    expect(memberMatchesQuery(stored, "ऩ")).toBe(true);
  });

  it("matches a stored decomposed name from a precomposed query", () => {
    const stored = { ...member, displayName: "ऩेपाल" };
    expect(memberMatchesQuery(stored, "ऩे")).toBe(true);
  });

  it("does not match an unrelated Devanagari name", () => {
    expect(memberMatchesQuery(member, "राम")).toBe(false);
  });

  it("stays case-insensitive for Latin fields and ignores surrounding spaces", () => {
    expect(memberMatchesQuery(member, "  sunitas ")).toBe(true);
    expect(memberMatchesQuery(member, "FRONTEND")).toBe(true);
  });

  it("matches everyone for an empty query and tolerates a null headline", () => {
    expect(memberMatchesQuery({ ...member, headline: null }, "")).toBe(true);
    expect(memberMatchesQuery({ ...member, headline: null }, "developer")).toBe(false);
  });
});
