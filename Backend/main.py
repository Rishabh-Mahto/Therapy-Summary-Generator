import os
import re
from fastapi import FastAPI, HTTPException, Depends, Header
from pydantic import BaseModel
from dotenv import load_dotenv
import openai

# Load environment variables
load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
BACKEND_API_KEY = os.getenv('BACKEND_API_KEY')
if not OPENAI_API_KEY or not BACKEND_API_KEY:
    raise RuntimeError('OPENAI_API_KEY and BACKEND_API_KEY must be set in .env')

openai.api_key = OPENAI_API_KEY

app = FastAPI(title="Therapy Summary Generator")

from fastapi.middleware.cors import CORSMiddleware


app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://therapy-summary-generator.vercel.app"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request & Response Schemas
class Preferences(BaseModel):
    tone: str
    includeActionItems: bool
    anonymizeData: bool
    sessionType: str
    summaryLength: str

class SummaryRequest(BaseModel):
    notes: str
    prefs: Preferences

class SummaryResponse(BaseModel):
    summary: str

# Dependency: verify backend API key
async def verify_api_key(authorization: str = Header(...)):
    # Expect header: Authorization: Bearer <BACKEND_API_KEY>
    prefix = 'Bearer '
    if not authorization.startswith(prefix) or authorization[len(prefix):] != BACKEND_API_KEY:
        raise HTTPException(status_code=401, detail='Invalid or missing API key')
    return True

# Utility: simple PII masking
def mask_pii(text: str) -> str:
    # Mask email addresses
    text = re.sub(r'[\w\.-]+@[\w\.-]+', '[EMAIL]', text)
    # Mask phone numbers (simple patterns)
    text = re.sub(r'\b\d{3}[\-\.\s]?\d{3}[\-\.\s]?\d{4}\b', '[PHONE]', text)
    # Mask Indian phone numbers (with or without +91, spaces, or dashes)
    text = re.sub(r'(\+91[\-\s]?|0)?[6-9]\d{9}', '[PHONE]', text)
    # Mask Aadhaar numbers (12 digits, with or without spaces)
    text = re.sub(r'\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b', '[AADHAAR]', text)
    return text

# Utility: build OpenAI messages
SYSTEM_PROMPT = (
    "You are a clinical assistant that produces structured, professional summaries "
    "of therapy session notes. Follow user preferences carefully."
)

USER_TEMPLATE = (
    "Session Type: {sessionType}\n"
    "Tone: {tone}\n"
    "Summary Length: {summaryLength}\n"
    "Include Action Items: {includeActionItems}\n"
    "Anonymize Data: {anonymizeData}\n\n"
    "Notes:\n{notes}\n"
)

def build_messages(prefs: Preferences, notes: str) -> list[dict]:
    user_content = USER_TEMPLATE.format(
        sessionType=prefs.sessionType,
        tone=prefs.tone,
        summaryLength=prefs.summaryLength,
        includeActionItems='Yes' if prefs.includeActionItems else 'No',
        anonymizeData='Yes' if prefs.anonymizeData else 'No',
        notes=notes.strip()
    )
    return [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_content}
    ]



@app.post('/api/generate-summary', response_model=SummaryResponse)
async def generate_summary(req: SummaryRequest, authorized: bool = Depends(verify_api_key)):
    """
    Generate a therapy session summary via OpenAI, with optional PII anonymization.
    """

     # Step 0: Validate notes
    if not req.notes or not req.notes.strip():
        raise HTTPException(status_code=400, detail="Session notes are required to generate a summary.")

    # Step 1: Anonymize if requested
    text = req.notes
    if req.prefs.anonymizeData:
        text = mask_pii(text)

    # Step 2: Build prompts
    messages = build_messages(req.prefs, text)

    # Step 3: Call OpenAI
    try:
        resp = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.7,
            max_tokens=800,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'OpenAI API error: {str(e)}')

    summary = resp.choices[0].message.content.strip()
    return SummaryResponse(summary=summary)