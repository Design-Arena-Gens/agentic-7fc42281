import type { ChannelSnapshot } from '../types';

type ChannelProfileProps = {
  snapshot: ChannelSnapshot;
  onUpdate: (snapshot: ChannelSnapshot) => void;
};

export function ChannelProfile({ snapshot, onUpdate }: ChannelProfileProps) {
  const handleFieldChange = (field: keyof ChannelSnapshot) => (value: string | number) => {
    onUpdate({
      ...snapshot,
      [field]: typeof value === 'number' ? value : value.trim()
    });
  };

  const handleMetricChange =
    (field: keyof ChannelSnapshot['metrics']) => (value: number | string) => {
      const numericValue = typeof value === 'string' ? Number.parseFloat(value) : value;
      onUpdate({
        ...snapshot,
        metrics: {
          ...snapshot.metrics,
          [field]: Number.isNaN(numericValue) ? snapshot.metrics[field] : numericValue
        }
      });
    };

  return (
    <aside className="glass-panel border-white/5 bg-black/40 p-6 lg:p-7">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/20 text-2xl font-bold text-brand-200">
          {snapshot.name
            .split(' ')
            .map((part) => part.at(0))
            .join('')
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <div>
          <p className="section-title">Channel</p>
          <h2 className="text-xl font-semibold text-white/90">{snapshot.name}</h2>
          <p className="text-xs text-white/60">{snapshot.niche}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/60">Channel Handle / URL</span>
          <input
            value={snapshot.handle}
            onChange={(evt) => handleFieldChange('handle')(evt.target.value)}
            placeholder="@creator"
            className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/90 outline-none transition hover:border-brand-400/60 focus:border-brand-400 focus:bg-black/60"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/60">Channel Description</span>
          <textarea
            value={snapshot.description}
            onChange={(evt) => handleFieldChange('description')(evt.target.value)}
            className="h-28 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/90 outline-none transition hover:border-brand-400/60 focus:border-brand-400 focus:bg-black/60"
          />
        </label>
      </div>

      <div className="mt-6">
        <p className="section-title">Key Metrics</p>
        <div className="mt-4 grid gap-3">
          <MetricField
            label="Subscribers"
            value={snapshot.metrics.subscribers}
            suffix="k"
            onChange={handleMetricChange('subscribers')}
          />
          <MetricField
            label="30d Views"
            value={snapshot.metrics.views30d}
            suffix="k"
            onChange={handleMetricChange('views30d')}
          />
          <MetricField
            label="Avg View Duration"
            value={snapshot.metrics.avgViewDuration}
            suffix="min"
            onChange={handleMetricChange('avgViewDuration')}
          />
          <MetricField
            label="Click Through Rate"
            value={snapshot.metrics.ctr}
            suffix="%"
            onChange={handleMetricChange('ctr')}
          />
          <MetricField
            label="Upload Cadence"
            value={snapshot.metrics.uploadCadence}
            suffix="/month"
            onChange={handleMetricChange('uploadCadence')}
          />
        </div>
      </div>

      <div className="mt-6">
        <p className="section-title">Signature Formats</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/65">
          {snapshot.formats.map((format) => (
            <span
              key={format}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 capitalize text-white/70"
            >
              {format}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}

type MetricFieldProps = {
  label: string;
  value: number;
  suffix: string;
  onChange: (value: number) => void;
};

function MetricField({ label, value, suffix, onChange }: MetricFieldProps) {
  return (
    <label className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 px-4 py-3 text-sm text-white/70">
      <span>{label}</span>
      <span className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(evt) => onChange(Number.parseFloat(evt.target.value))}
          className="w-20 rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-right text-sm text-white/90 outline-none focus:border-brand-300"
        />
        <span className="text-xs text-white/50">{suffix}</span>
      </span>
    </label>
  );
}
