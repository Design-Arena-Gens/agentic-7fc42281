import type { AgentResponse } from '../types';

type StrategyBoardProps = {
  response?: AgentResponse;
};

export function StrategyBoard({ response }: StrategyBoardProps) {
  const playbook = response?.playbook ?? [];
  const runway = response?.runway ?? [];
  const experiments = response?.experiments ?? [];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="glass-panel border-white/5 bg-black/35 p-6">
        <div className="flex items-center justify-between">
          <h3 className="section-title">Playbook</h3>
          <span className="text-xs text-brand-200">{playbook.length} actions</span>
        </div>
        <ul className="mt-4 space-y-3">
          {playbook.map((item, index) => (
            <li key={item.focus} className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">
              <p className="text-xs text-brand-200">Step {index + 1}</p>
              <p className="mt-1 font-semibold text-white/90">{item.focus}</p>
              <p className="mt-2 text-sm text-white/70">{item.detail}</p>
            </li>
          ))}
          {playbook.length === 0 && (
            <li className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-white/50">
              Deploy the agent to receive a tactical playbook tailored to your mission.
            </li>
          )}
        </ul>
      </div>

      <div className="glass-panel border-white/5 bg-black/35 p-6">
        <div className="flex items-center justify-between">
          <h3 className="section-title">Launch Runway</h3>
          <span className="text-xs text-brand-200">{runway.length} milestones</span>
        </div>
        <ul className="mt-4 space-y-3">
          {runway.map((milestone) => (
            <li key={milestone.label} className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">
              <p className="font-semibold text-white/90">{milestone.label}</p>
              <p className="mt-2 text-sm text-white/70">{milestone.outcome}</p>
              <p className="mt-3 text-xs uppercase tracking-wider text-brand-200">{milestone.timeline}</p>
            </li>
          ))}
          {runway.length === 0 && (
            <li className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-white/50">
              The runway visualizes milestones and success metrics for the next 90 days.
            </li>
          )}
        </ul>
      </div>

      <div className="glass-panel border-white/5 bg-black/35 p-6 lg:col-span-2">
        <div className="flex items-center justify-between">
          <h3 className="section-title">Experiment Stack</h3>
          <span className="text-xs text-brand-200">{experiments.length} queued</span>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {experiments.map((experiment) => (
            <article
              key={experiment.title}
              className="rounded-2xl border border-white/5 bg-white/[0.04] p-4"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-brand-200">{experiment.category}</p>
              <p className="mt-2 font-semibold text-white/90">{experiment.title}</p>
              <p className="mt-2 text-sm text-white/70">{experiment.description}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-white/50">
                <span>Impact: {experiment.impact}</span>
                <span>Effort: {experiment.effort}</span>
              </div>
            </article>
          ))}
          {experiments.length === 0 && (
            <article className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-white/50 md:col-span-3">
              Experiments will stack sequentially by impact vs. effort scoring when the agent runs.
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
