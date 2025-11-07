import { NextResponse } from 'next/server';
import { runAgent } from '../../../lib/agentEngine';
import type { AgentRequestPayload } from '../../../types';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as AgentRequestPayload;

    if (!payload?.channel || !payload?.persona) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const response = runAgent(payload);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Agent error', error);
    return NextResponse.json({ error: 'Agent failed to process request' }, { status: 500 });
  }
}
