import { UserProfile, WellnessTip } from '../context/WellnessContext';

const GEMINI_API_KEY = 'AIzaSyCdhcKuRU1BdRBhZ7vTQRsFsCymbV0lkWg';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

const parseJSON = (text: string): any => {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  throw new Error('No valid JSON found in response');
};

const callGeminiAPI = async (prompt: string, retries = 3): Promise<string> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error('No text in API response');
      }

      return text;
    } catch (error) {
      if (attempt === retries) {
        throw new Error(`Failed after ${retries} attempts: ${error}`);
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
  throw new Error('Failed to call API');
};

export const generateWellnessTips = async (profile: UserProfile): Promise<WellnessTip[]> => {
  const prompt = `You are a wellness expert. Generate exactly 5 personalized wellness tips for someone with the following profile:
- Age: ${profile.age}
- Gender: ${profile.gender}
- Goal: ${profile.goal}

Return ONLY valid JSON in this exact format with no additional text:
{
  "tips": [
    {
      "id": 1,
      "title": "Short Title",
      "short": "One line description (max 60 characters)",
      "icon": "🌅"
    }
  ]
}

Use relevant emojis for icons. Make tips actionable, specific, and tailored to their goal.`;

  const response = await callGeminiAPI(prompt);
  const parsed = parseJSON(response);

  if (!parsed.tips || !Array.isArray(parsed.tips)) {
    throw new Error('Invalid response format');
  }

  return parsed.tips.map((tip: any, index: number) => ({
    id: Date.now() + index,
    title: tip.title || 'Wellness Tip',
    short: tip.short || 'Improve your wellness',
    icon: tip.icon || '💡',
  }));
};

export const generateTipDetails = async (tip: WellnessTip, profile: UserProfile | null): Promise<{ explanation: string; steps: string[] }> => {
  const profileContext = profile
    ? `considering their profile (Age: ${profile.age}, Gender: ${profile.gender}, Goal: ${profile.goal})`
    : '';

  const prompt = `You are a wellness expert. Provide detailed guidance for this wellness tip ${profileContext}:

Title: ${tip.title}
Description: ${tip.short}

Return ONLY valid JSON in this exact format with no additional text:
{
  "explanation": "A 2-3 paragraph detailed explanation of why this tip is beneficial and how it works",
  "steps": [
    "Step 1: Clear, actionable instruction",
    "Step 2: Clear, actionable instruction",
    "Step 3: Clear, actionable instruction"
  ]
}

Make it practical, science-backed, and motivating. Include 3-5 actionable steps.`;

  const response = await callGeminiAPI(prompt);
  const parsed = parseJSON(response);

  return {
    explanation: parsed.explanation || 'No explanation available.',
    steps: Array.isArray(parsed.steps) ? parsed.steps : ['Follow the tip as described.'],
  };
};
