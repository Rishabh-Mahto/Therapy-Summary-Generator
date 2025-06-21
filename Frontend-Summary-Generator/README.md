# Therapy Session Summary Generator

A modern web app for clinicians to generate structured, professional summaries of therapy session notes using OpenAI GPT models.  
Includes rich text editing, session note auto-save, privacy/anonymization options, and a secure backend.

---

## Features

- **Session Notes Input**: Large textarea with word/char counter, autosave to localStorage, and "last saved" indicator.
- **Summary Preferences**: Choose tone, session type, summary length, action items, and anonymization.
- **Generate Summary**: Button triggers backend API call, shows loading, and handles errors gracefully.
- **Summary Output**: Editable rich-text preview with formatting (bold, italic, underline, alignment).
- **Actions**: Copy to clipboard, Download as PDF, and Send to Patient (simulated, with toast notifications).
- **PII Masking**: Optionally anonymize sensitive data before sending to OpenAI.
- **Secure API**: Backend protected with API key.
- **Responsive UI**: Built with React, Tailwind CSS, and shadcn/ui components.
- **Error Handling**: User-friendly error messages and toasts for missing notes or API errors.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui, TipTap (rich editor), Lucide Icons, Sonner (toasts)
- **Backend**: FastAPI, Python, OpenAI API, Pydantic, dotenv
- **Other**: localStorage (auto-save)

---

## Getting Started

### 1. **Clone the repo**

```sh
git clone https://github.com/Rishabh-Mahto/Therapy-Summary-Generator.git
cd Therapy-Project
```

### 2. **Backend Setup**

```sh
cd Backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
# Create a .env file with your OpenAI and backend API keys:
# OPENAI_API_KEY=sk-...
# BACKEND_API_KEY=mysecret123
uvicorn main:app --reload
```

### 3. **Frontend Setup**

```sh
cd ../Frontend-Summary-Generator
npm install
npm run dev
```

Visit [http://localhost:5173]

---

## Sample Prompt

**Session Notes:**

```
Client discussed recent stress at work and difficulty sleeping. Explored coping strategies and set a goal to try mindfulness exercises before bed.
```

**Preferences:**

- Tone: Clinical
- Session Type: Therapy
- Summary Length: Medium
- Include Action Items: Yes
- Anonymize Data: No

---

## 🛡️ Security

- All backend endpoints require a valid API key in the `Authorization` header.
- PII masking is available for anonymizing emails, phone numbers, and SSNs.

---

## Toast Notifications

- Uses [Sonner] via shadcn/ui for all notifications simulation.
- Example:  
  `toast("Summary copied to clipboard!")`

---

## Tech Notes

- **RichEditor** uses TipTap with a custom toolbar for formatting.
- **Auto-save** in `NotesEditor` saves notes to localStorage every second after typing stops.
- **API call** logic is in `src/lib/api.ts` for maintainability.

---

## Future Scope & Possible Enhancements

- **Advanced PII Masking:**  
  Integrate NLP-based PII detection libraries (e.g., spaCy, Presidio) for more robust anonymization of sensitive information beyond regex patterns.

- **User Authentication:**  
  Add user accounts and authentication (e.g., with JWT or OAuth) to allow clinicians to securely save and manage their summaries.

- **Session History & Storage:**  
  Allow users to view, edit, and export previous session summaries. Integrate with a database for persistent storage.

- **Export Options:**  
  Support exporting summaries as PDF, DOCX, or direct EHR integration.


![image](https://github.com/user-attachments/assets/98a3b40b-0e5f-4f57-8305-7fd692d8c7ce)

