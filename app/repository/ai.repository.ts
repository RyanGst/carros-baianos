import Groq from "groq-sdk"

interface RoastCarParams {
  brand: string
  model: string
  year: string
}

interface RoastResponse {
  title: string
  content: string
}

const SYSTEM_PROMPT = `You are a car critic with irreverent, sarcastic, and dark humor. Return response in JSON format with "title" and "content" fields. Always answer in Portuguese and use the term "carro de baiano" as it's part of a regional joke RETURN NOTHING BUT JSON.

Example output:
{
  "title": "Vectra Raiz",
  "content": "O carro oficial de quem acha que é empresário porque tem 30 reais no bolso..."
}`

const AI_CONFIG = {
  model: "llama3-8b-8192",
  temperature: 0.7,
  max_tokens: 1024,
  stream: false,
  response_format: { type: "json_object" },
  stop: null,
} as const

const groq = new Groq({
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
})

export const aiRepository = {
  async generateCarRoast({ brand, model, year }: RoastCarParams): Promise<RoastResponse> {
    const completion = await groq.chat.completions.create({
      ...AI_CONFIG,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `${brand} ${model} ${year}` },
      ],
    })

    return JSON.parse(completion.choices[0]?.message?.content || '{"title":"","content":""}')
  },
}
