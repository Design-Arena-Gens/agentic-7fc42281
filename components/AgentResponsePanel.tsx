import type { AgentMessage, AgentResponse } from '../types';

type AgentResponsePanelProps = {
  response?: AgentResponse;
  loading: boolean;
  history: AgentMessage[];
};

export function AgentResponsePanel({ response, loading, history }: AgentResponsePanelProps) {
  return (
    <div className="glass-panel border-white/5 bg-black/35 p-6 md:col-span-2 lg:col-span-1">
      <div className="flex items-center justify-between">
        <h3 className="section-title">Agent Feed</h3>
        {loading && <span className="text-xs text-brand-200">Synthesizing...</span>}
      </div>

      <div className="mt-4 space-y-6">
        {response?.conversation?.map((message) => (
          <MessageCard key={`${message.role}-${message.timestamp}`} message={message} />
        ))}

        {history.length === 0 && !response && (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-white/60">
            Awaiting your first mission. Issue an objective and the agent will generate a strategic plan,
            tactical scripts, and performance forecasts tailored to your channel telemetry.
          </div>
        )}
      </div>
    </div>
  );
}

function MessageCard({ message }: { message: AgentMessage }) {
  const isAgent = message.role === 'agent';
  return (
    <article
      className={`rounded-2xl border p-5 transition ${
        isAgent
          ? 'border-brand-400/40 bg-brand-500/10'
          : 'border-white/10 bg-white/[0.04]'
      }`}
    >
      <div className="flex items-center justify-between text-xs text-white/50">
        <span className="uppercase tracking-[0.3em]">{isAgent ? 'Agent' : 'Commander'}</span>
        <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-sm text-white/80">{message.content}</p>
    </article>
  );
}
