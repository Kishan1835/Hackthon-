const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// Update the API URL to use the basic model
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

interface GeminiRequest {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
  generationConfig: {
    temperature: number;
    topP: number;
    topK: number;
    maxOutputTokens: number;
  };
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export async function analyzeResume(resumeText: string) {
  if (!GEMINI_API_KEY) {
    console.error("Gemini API key is not configured. Please set it in your .env file.");
    throw new Error("API key not configured.");
  }

  const prompt = `
    You are an expert resume analyzer and career coach. Analyze the following resume text and provide detailed feedback:
    
    ${resumeText}
    
    Please provide the following in JSON format:
    1. An overall score out of 100
    2. Key strengths (list of 3-5 items)
    3. Areas for improvement (list of 3-5 items)
    4. Keyword match percentage for general job applications
    5. ATS compatibility score as a percentage
    6. Recommendations for skills to add or improve
    7. Current market trends that align with this resume (list of 3-5 items)
    
    Format the response as a valid JSON object with the following structure:
    {
      "score": number,
      "strengths": string[],
      "improvements": string[],
      "keywordMatch": number,
      "atsCompatibility": number,
      "skillRecommendations": string[],
      "marketTrends": string[]
    }
  `;

  const requestBody: GeminiRequest = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.2,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 2048,
    },
  };

  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json() as GeminiResponse;

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response from Gemini API");
    }

    const jsonResponse = data.candidates[0].content.parts[0].text;

    // Extract JSON from the response
    const jsonMatch = jsonResponse.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("Failed to parse JSON response from Gemini");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw error;
  }
}

// Generate recommendations based on resume analysis
export async function generateRecommendations(resumeText: string) {
  if (!GEMINI_API_KEY) {
    throw new Error("API key not configured");
  }

  const prompt = `
    Based on the following resume text, generate 5 personalized recommendations that include in-demand skills based on current market trends:
    
    ${resumeText}
    
    Format the response as a valid JSON array with the following structure for each recommendation:
    [
      {
        "id": "1",
        "type": "skill" | "course" | "job",
        "title": string,
        "description": string,
        "relevanceScore": number,
        "link": string,
        "linkText": string,
        "tags": string[]
      }
    ]
    
    For skills recommendations, focus on trending technologies and in-demand skills in the current job market.
    Include market demand or trend information in the description when possible.
    Ensure at least 3 of the recommendations are for skills that are currently trending in the job market.
  `;

  const requestBody: GeminiRequest = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.4,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 2048,
    },
  };

  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json() as GeminiResponse;

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response from Gemini API");
    }

    const jsonResponse = data.candidates[0].content.parts[0].text;

    // Extract JSON from the response
    const jsonMatch = jsonResponse.match(/\[[\s\S]*\]/);

    if (!jsonMatch) {
      throw new Error("Failed to parse JSON response from Gemini");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw error;
  }
}

// Extract text from PDF (mock implementation - would need PDF.js in a real app)
export function extractTextFromPDF(file: File): Promise<string> {
  return new Promise((resolve) => {
    // This is a mock implementation that would normally use PDF.js
    // For this demo, we'll return a placeholder resume text
    setTimeout(() => {
      resolve(`
        JANE DOE
        Software Engineer
        
        EXPERIENCE
        Senior Software Engineer | TechCorp (2020-Present)
        - Led development of microservices architecture
        - Improved application performance by 30%
        - Mentored junior developers
        
        Software Developer | WebSolutions (2018-2020)
        - Developed and maintained web applications using React
        - Implemented CI/CD pipelines
        
        EDUCATION
        Bachelor of Science in Computer Science
        University of Technology (2014-2018)
        
        SKILLS
        JavaScript, TypeScript, React, Node.js, AWS, Docker
      `);
    }, 1500);
  });
}