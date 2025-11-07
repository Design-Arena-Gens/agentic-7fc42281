import type { AgentResponse, ChannelSnapshot } from '../types';

type InsightRadarProps = {
  snapshot: ChannelSnapshot;
  response?: AgentResponse;
};

const axis = [
  { key: 'retention', label: 'Retention' },
  { key: 'velocity', label: 'Velocity' },
  { key: 'discoverability', label: 'Discoverability' },
  { key: 'monetization', label: 'Monetization' },
  { key: 'loyalty', label: 'Loyalty' }
] as const;

export function InsightRadar({ snapshot, response }: InsightRadarProps) {
  const scores = response?.scores ?? {
    retention: 62,
    velocity: 71,
    discoverability: 54,
    monetization: 49,
    loyalty: 68
  };

  return (
    <section className="glass-panel border-white/5 bg-black/35 p-6">
      <h3 className="section-title mb-3">Signal Radar</h3>
      <p className="text-sm text-white/70">
        Translating your channel telemetry into actionable signal strength across the growth pillars.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-[220px,1fr]">
        <Radar scores={scores} />

        <div className="grid gap-3">
          {axis.map(({ key, label }) => (
            <div key={key} className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>{label}</span>
                <span>{scores[key]}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-purple-400"
                  style={{ width: `${scores[key]}%` }}
                />
              </div>
              <p className="mt-3 text-xs text-white/55">
                {response?.insights?.[key] ??
                  defaultInsightCopy(key as (typeof axis)[number]['key'], snapshot)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Radar({ scores }: { scores: Record<(typeof axis)[number]['key'], number> }) {
  const points = axis.map((item, index) => {
    const angle = (Math.PI * 2 * index) / axis.length - Math.PI / 2;
    const radius = (scores[item.key] / 100) * 90;
    const x = 100 + radius * Math.cos(angle);
    const y = 100 + radius * Math.sin(angle);
    return `${x},${y}`;
  });

  const polygonPoints = [...points, points[0]].join(' ');

  return (
    <div className="relative mx-auto flex h-[220px] w-[220px] items-center justify-center">
      <svg viewBox="0 0 200 200" className="h-full w-full">
        {[0.2, 0.4, 0.6, 0.8, 1].map((ratio) => (
          <polygon
            key={ratio}
            points={axis
              .map((_, index) => {
                const angle = (Math.PI * 2 * index) / axis.length - Math.PI / 2;
                const radius = ratio * 90;
                const x = 100 + radius * Math.cos(angle);
                const y = 100 + radius * Math.sin(angle);
                return `${x},${y}`;
              })
              .join(' ')}
            fill="none"
            stroke="rgba(148, 163, 255, 0.15)"
          />
        ))}
        <polygon points={polygonPoints} fill="rgba(76, 77, 255, 0.25)" stroke="#4c4dff" strokeWidth={2} />
        {axis.map((item, index) => {
          const angle = (Math.PI * 2 * index) / axis.length - Math.PI / 2;
          const x = 100 + 100 * Math.cos(angle);
          const y = 100 + 100 * Math.sin(angle);
          return <line key={item.key} x1={100} y1={100} x2={x} y2={y} stroke="rgba(148, 163, 255, 0.15)" />;
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-center text-xs uppercase tracking-[0.4em] text-white/50">
        Signal
      </div>
    </div>
  );
}

function defaultInsightCopy(
  key: (typeof axis)[number]['key'],
  snapshot: ChannelSnapshot
): string {
  switch (key) {
    case 'retention':
      return `Avg view duration at ${snapshot.metrics.avgViewDuration} min indicates mid-video drop-off. Build retention hooks at 35% and 65% marks.`;
    case 'velocity':
      return `Posting ${snapshot.metrics.uploadCadence}/month keeps runway warm. Layer shorts as accelerants for major tentpoles.`;
    case 'discoverability':
      return `CTR at ${snapshot.metrics.ctr}% suggests thumbnail and title experiments can unlock more browse traffic.`;
    case 'monetization':
      return `Activate layered monetization across memberships, sponsorships, and digital products aligned to your ${snapshot.niche} niche.`;
    case 'loyalty':
      return `Convert viewers to superfans using community hangouts and narrative arcs that deepen ${snapshot.name} universe.`;
    default:
      return '';
  }
}
