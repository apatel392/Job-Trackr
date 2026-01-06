const fs = require("fs");
const docxParser = require("docx-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// 🔹 Main Function: Generate Interview Q&A
exports.generateInterviewQA = async (resumeText, jobDescription) => {

  const prompt = `
You are an AI interview coach.

Your task:
1. Read the Job Description (JD) and Candidate Resume (Resume).
2. Generate interview questions that are highly relevant to the role and candidate’s background.
3. Provide strong model answers, aligning candidate’s skills with the JD.

Output requirements:
- ONLY valid JSON (no markdown, no backticks).
- JSON must follow this exact schema:

{
  "technical": [
    { "q": "string", "a": "string" },
    ...
  ],
  "behavioral": [
    { "q": "string", "a": "string" },
    ...
  ]
}

Rules:
- Technical: 5–7 questions focused on the JD’s skills, tools, and technologies.
- Behavioral: 3–5 questions focused on soft skills, problem-solving, and teamwork.
- Do NOT include explanations outside of the JSON.

Candidate Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  // Step 3: Call Gemini
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);

  // Step 4: Parse JSON safely
  let text = result.response.text();
  text = text.replace(/```json|```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    console.error("Parsing error, returning raw:", err.message);
    parsed = { raw: text };
  }

  return parsed;
};
