export function Logo({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  const textColor = dark ? 'text-cream' : 'text-ink';

  return (
    <div className={`flex items-center ${className}`}>
      <span className={`font-[family-name:var(--font-logo)] font-bold uppercase tracking-wide text-xl ${textColor}`}>
        Foro Legal
      </span>
    </div>
  );
}
