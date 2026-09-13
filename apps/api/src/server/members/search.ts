type SearchableMember = {
  displayName: string;
  githubUsername: string;
  headline: string | null;
};

// Devanagari text can reach us precomposed or decomposed (e.g. a nukta or
// vowel sign typed as a separate code point), and the two forms are different
// strings to `includes`. Normalizing both sides to NFC makes a Nepali name
// match however the member or the searcher's keyboard encoded it.
export function normalizeSearchText(value: string): string {
  return value.normalize("NFC").trim().toLocaleLowerCase();
}

export function memberMatchesQuery(member: SearchableMember, query: string): boolean {
  const q = normalizeSearchText(query);
  if (q.length === 0) {
    return true;
  }
  return [member.displayName, member.githubUsername, member.headline ?? ""].some((field) =>
    normalizeSearchText(field).includes(q),
  );
}
