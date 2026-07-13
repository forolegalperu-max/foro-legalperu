import { stats } from '../../data/stats';
import { useCountUp } from '../../hooks/useCountUp';

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: animated } = useCountUp(value);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center">
      <p className="font-display text-4xl md:text-5xl font-semibold text-ink tabular-nums">
        {animated.toLocaleString('es-PE')}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-ink-muted">{label}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative bg-cream-dark/50 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
          {stats.map((stat) => (
            <StatItem key={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
