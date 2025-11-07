import type { AgentRequestPayload } from '../types';
import clsx from 'clsx';

type PersonaSelectorProps = {
  persona: AgentRequestPayload['persona'];
  onChange: (value: AgentRequestPayload['persona']) => void;
};

const personaOptions: { id: AgentRequestPayload['persona']; title: string; description: string }[] = [
  {
    id: 'growth-strategist',
    title: 'Growth Strategist',
    description: 'Macro channel operating system, monetization levers, growth sprints.'
  },
  {
    id: 'content-architect',
    title: 'Content Architect',
    description: 'Narrative design, storytelling frameworks, editorial calendar optimization.'
  },
  {
    id: 'community-ops',
    title: 'Community Ops',
    description: 'Engagement loops, retention cohorts, community-driven growth experiments.'
  }
];

export function PersonaSelector({ persona, onChange }: PersonaSelectorProps) {
  return (
    <div className="glass-panel border-white/5 bg-black/40 p-6 shadow-2xl shadow-brand-950/40">
      <h2 className="section-title mb-4">Agent Persona</h2>
      <div className="flex flex-col gap-3">
        {personaOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={clsx(
              'rounded-2xl border px-4 py-4 text-left transition focus:outline-none',
              'hover:border-brand-400/60 hover:bg-brand-500/10',
              persona === option.id
                ? 'border-brand-400 bg-brand-500/20 shadow-inner shadow-brand-500/40'
                : 'border-white/10 bg-white/[0.04]'
            )}
          >
            <p className="text-sm font-semibold text-white/90">{option.title}</p>
            <p className="mt-1 text-xs text-white/60">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
