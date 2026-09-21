import { NextResponse } from "next/server";
import { getService } from "@/lib/services";

export const runtime = "nodejs";

type Message = { role: "user" | "assistant"; content: string };

function extractOutputText(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const record = data as Record<string, unknown>;
  if (typeof record.output_text === "string") return record.output_text.trim();
  const output = Array.isArray(record.output) ? record.output : [];
  const texts: string[] = [];
  for (const item of output) {
    if (!item || typeof item !== "object") continue;
    const content = Array.isArray((item as Record<string, unknown>).content) ? (item as Record<string, unknown>).content as unknown[] : [];
    for (const part of content) {
      if (part && typeof part === "object" && typeof (part as Record<string, unknown>).text === "string") texts.push(String((part as Record<string, unknown>).text));
    }
  }
  return texts.join("\n").trim();
}

export async function POST(req: Request) {
  try {
    if ((process.env.AI_ASSISTANT_ENABLED || "true").toLowerCase() === "false") {
      return NextResponse.json({ error: "AI-assisted discovery is temporarily disabled. Please use the manual project request." }, { status: 503 });
    }

    const endpoint = process.env.AZURE_OPENAI_ENDPOINT?.replace(/\/$/, "");
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const model = process.env.AZURE_OPENAI_MODEL;
    if (!endpoint || !apiKey || !model) {
      return NextResponse.json({ error: "AI-assisted discovery is not configured yet. Please use the manual request or contact ENASH." }, { status: 503 });
    }

    const body = await req.json() as { messages?: Message[]; service?: string };
    const service = getService(String(body.service || ""));
    const messages = (Array.isArray(body.messages) ? body.messages : [])
      .filter((item): item is Message => Boolean(item && ["user", "assistant"].includes(item.role) && typeof item.content === "string"))
      .slice(-12)
      .map((item) => ({ role: item.role, content: item.content.slice(0, 3500) }));

    if (!messages.length) return NextResponse.json({ error: "Add a short description of the project first." }, { status: 400 });

    const instructions = `You are the ENASH project discovery assistant for a South African technology company. Help a founder, startup or company turn a rough idea into a useful project brief. Selected service: ${service?.title || "not selected / other"}.

Rules:
- Be concise and practical.
- Ask one focused question at a time, not a long questionnaire.
- Prioritise: business problem, target users, core workflow, must-have features, integrations/data, timeline and budget range.
- Do not promise a final price, delivery date or technical architecture. ENASH will confirm those after review.
- If the user has already given enough information, provide a compact section titled "PROJECT BRIEF" with: Goal, Users, Core workflow, Must-have features, Integrations/data, Timing, Budget/context, Open questions. Then ask whether they want to add anything else before submitting.
- Do not ask for passwords, API keys, identity numbers, card details or other secrets.
- Keep each response under 180 words.`;

    const response = await fetch(`${endpoint}/responses`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": apiKey },
      body: JSON.stringify({ model, instructions, input: messages, max_output_tokens: 500 }),
    });

    if (!response.ok) {
      const providerError = await response.text();
      console.error("Azure OpenAI response error:", response.status, providerError.slice(0, 1200));
      return NextResponse.json({ error: "The AI project assistant could not respond right now. You can continue with a manual project request." }, { status: 502 });
    }

    const data = await response.json();
    const reply = extractOutputText(data);
    if (!reply) return NextResponse.json({ error: "The AI project assistant returned an empty response. Please try again." }, { status: 502 });
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI discovery route error:", error);
    return NextResponse.json({ error: "The AI project assistant could not process that request." }, { status: 400 });
  }
}
