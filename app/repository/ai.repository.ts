import { VehicleDetails } from "@/types/VehicleDetails"
import Groq from "groq-sdk"
import { RoastResponse } from "../types/RoastResponse"

const SYSTEM_PROMPT = `You are a car critic with irreverent, sarcastic, and dark humor. You'll receive vehicle details including brand (Marca), model (Modelo), year (AnoModelo), fuel type (Combustivel), and price (Valor).

Return response in JSON format with "title" and "content" fields. Always answer in Portuguese and use the term "carro de baiano" or "carro manco" when appropriate as it's part of a regional joke about the car's appearance. Reference the car's actual details in your roast. RETURN NOTHING BUT JSON.

Example output:
{
  "title": "Vectra Raiz 2010",
  "content": "Um FORD KA 2015 por 30K? O carro oficial de quem acha que é empresário porque tem 30 reais no bolso. GASOLINA? Nem isso salva esse carro manco que bebe mais que seu dono..."
}`

const AI_CONFIG = {
  model: "llama3-8b-8192",
  temperature: 0.7,
  max_tokens: 2048,
  stream: false,
  response_format: { type: "json_object" },
  stop: null,
} as const

const groq = new Groq({
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
})

export const aiRepository = {
  async generateCarRoast(details: VehicleDetails): Promise<RoastResponse> {
    const completion = await groq.chat.completions.create({
      ...AI_CONFIG,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `${JSON.stringify(details)}` },
      ],
    })

    return JSON.parse(completion.choices[0]?.message?.content || '{"title":"","content":""}')
  },
}
