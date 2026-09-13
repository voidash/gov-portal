export function MemberAvatar({
  member,
  size = 56,
  className = "dn-member-avatar",
}: {
  member: { avatarUrl: string | null; displayName: string };
  size?: number;
  className?: string;
}) {
  if (member.avatarUrl === null) {
    return (
      <span
        className="dn-member-avatar-fallback"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        {member.displayName.slice(0, 1).toUpperCase()}
      </span>
    );
  }
  return (
    // biome-ignore lint/performance/noImgElement: avatars are locally served files with varying keys; next/image adds no value here
    <img
      className={className}
      src={member.avatarUrl}
      width={size}
      height={size}
      alt=""
      style={{ width: size, height: size }}
    />
  );
}
