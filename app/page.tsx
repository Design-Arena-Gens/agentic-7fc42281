"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AgentResponsePanel } from '../components/AgentResponsePanel';
import { ChannelProfile } from '../components/ChannelProfile';
import { InsightRadar } from '../components/InsightRadar';
import { PersonaSelector } from '../components/PersonaSelector';
import { StrategyBoard } from '../components/StrategyBoard';
import type { AgentMessage, AgentRequestPayload, AgentResponse, ChannelSnapshot } from '../types';
import { DEFAULT_CHANNEL_SNAPSHOT } from '../lib/defaultSnapshot';
import useSWR from 'swr';

const fetcher = (url: string, payload: AgentRequestPayload) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(async (res) => {
    if (!res.ok) {
      const message = await res.text();
      throw new Error(message || 'Agent failed to respond');
    }
    return (await res.json()) as AgentResponse;
  });

export default function HomePage() {
  const [channel, setChannel] = useState<ChannelSnapshot>(DEFAULT_CHANNEL_SNAPSHOT);
  const [persona, setPersona] = useState<AgentRequestPayload['persona']>('growth-strategist');
  const [goal, setGoal] = useState('Boost average view duration above 50% within the next 60 days.');
  const [message, setMessage] = useState(
    'Audit the last 5 videos and craft a 3-video mini-series that improves retention and drives subscriber conversion.'
  );
  const [history, setHistory] = useState<AgentMessage[]>([]);

  const payload = useMemo<AgentRequestPayload>(
    () => ({
      persona,
      goal,
      message,
      history,
      channel
    }),
    [persona, goal, message, history, channel]
  );

  const { data, mutate, isLoading, error } = useSWR(
    `/api/agent?persona=${persona}`,
    () => fetcher('/api/agent', payload),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      revalidateIfStale: false,
      keepPreviousData: true,
      suspense: false
    }
  );

  const runAgent = useCallback(async () => {
    const response = await mutate();
    return response;
  }, [mutate]);

  useEffect(() => {
    const stored = window.localStorage.getItem('creator-agent-state');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as {
          channel: ChannelSnapshot;
          persona: AgentRequestPayload['persona'];
          goal: string;
          message: string;
          history: AgentMessage[];
        };
        setChannel(parsed.channel);
        setPersona(parsed.persona);
        setGoal(parsed.goal);
        setMessage(parsed.message);
        setHistory(parsed.history);
      } catch {
        window.localStorage.removeItem('creator-agent-state');
      }
    } else {
      runAgent().catch(() => undefined);
    }
  }, [runAgent]);

  useEffect(() => {
    const payloadToPersist = {
      channel,
      persona,
      goal,
      message,
      history
    };
    window.localStorage.setItem('creator-agent-state', JSON.stringify(payloadToPersist));
  }, [channel, persona, goal, message, history]);

  useEffect(() => {
    if (data?.conversation) {
      setHistory(data.conversation);
    }
  }, [data]);

  const handleSubmit = useCallback(
    async (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      const response = await runAgent();
      if (response?.conversation) {
        setHistory(response.conversation);
      }
    },
    [runAgent]
  );

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 pb-16 pt-12 md:px-8">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <span className="badge">Creator Agent v1.0</span>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Command your <span className="gradient-text">YouTube operations</span> from a single agentic
            mission control.
          </h1>
          <p className="text-white/70 md:text-lg">
            Decode audience signals, script magnetic videos, and deploy channel growth flywheels powered by
            deterministic heuristics trained on top-performing creators.
          </p>
        </div>
        <PersonaSelector persona={persona} onChange={setPersona} />
      </header>

      <section className="glass-panel grid gap-6 p-6 lg:grid-cols-[340px,1fr] lg:gap-8 lg:p-8">
        <ChannelProfile snapshot={channel} onUpdate={setChannel} />
        <div className="flex flex-col gap-6">
          <div className="glass-panel border-white/5 bg-black/40 p-6">
            <h2 className="section-title mb-4">Mission Objective</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col">
                  <span className="text-sm text-white/60">Channel Goal</span>
                  <textarea
                    className="mt-2 h-24 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 outline-none transition hover:border-brand-400/60 focus:border-brand-400 focus:bg-black/50"
                    value={goal}
                    onChange={(evt) => setGoal(evt.target.value)}
                  />
                </label>
                <label className="flex flex-col">
                  <span className="text-sm text-white/60">Agent Command</span>
                  <textarea
                    className="mt-2 h-24 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 outline-none transition hover:border-brand-400/60 focus:border-brand-400 focus:bg-black/50"
                    value={message}
                    onChange={(evt) => setMessage(evt.target.value)}
                  />
                </label>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-purple-400 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-brand-500/40 transition hover:scale-[1.015] hover:shadow-brand-400/40 active:scale-95"
              >
                {isLoading ? 'Running Agent…' : 'Deploy Mission'}
              </button>
              {error && <p className="text-sm text-red-400">Agent failed: {error.message}</p>}
            </form>
          </div>
          <StrategyBoard response={data} />
        </div>
      </section>

      <section className="card-grid">
        <InsightRadar snapshot={channel} response={data} />
        <AgentResponsePanel response={data} loading={isLoading} history={history} />
      </section>
    </main>
  );
}
