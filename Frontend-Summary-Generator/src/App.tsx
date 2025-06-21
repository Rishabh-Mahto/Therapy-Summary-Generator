import { useState } from "react";
import "./App.css";
import NotesEditor from "./components/main/NotesEditor";
import PreferenceSection from "./components/main/PreferenceSection";
import GenerateButton from "./components/main/GenerateButton";
import SummaryPanel from "./components/main/SummaryPannel";
import { toast } from "sonner";
import { generateSummaryRequest } from "./lib/api";

function App() {
  const [notes, setNotes] = useState<string>("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [tone, setTone] = useState<string>("clinical");
  const [includeActionItems, setIncludeActionItems] = useState<boolean>(true);
  const [anonymizeData, setAnonymizeData] = useState<boolean>(false);
  const [sessionType, setSessionType] = useState<string>("therapy");
  const [summaryLength, setSummaryLength] = useState<string>("medium");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedSummary, setGeneratedSummary] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!notes.trim()) {
      toast.error("Please enter session notes before generating a summary.");
      return;
    }

    const wordCount = notes.trim().split(/\s+/).length;
    if (wordCount < 10) {
      setGeneratedSummary(
        "Not enough information provided. Please enter more detailed session notes to generate a meaningful summary."
      );
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedSummary("");
    try {
      const summary = await generateSummaryRequest({
        notes,
        tone,
        sessionType,
        summaryLength,
        includeActionItems,
        anonymizeData,
      });
      setGeneratedSummary(summary);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-yellow-200 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <header className="text-center space-y-1 md:space-y-2">
            <h1 className="text-2xl md:text-4xl font-bold">
              Therapy Session Summary Tool
            </h1>
            <p className="text-sm md:text-lg text-gray-600">
              Document session notes and generate summaries
            </p>
          </header>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white border-0 p-5 rounded-lg shadow-sm">
              <NotesEditor
                notes={notes}
                setNotes={setNotes}
                lastSaved={lastSaved}
                setLastSaved={setLastSaved}
              />

              <hr className="border-t border-gray-300 my-4" />

              <PreferenceSection
                tone={tone}
                setTone={setTone}
                sessionType={sessionType}
                setSessionType={setSessionType}
                summaryLength={summaryLength}
                setSummaryLength={setSummaryLength}
                includeActionItems={includeActionItems}
                setIncludeActionItems={setIncludeActionItems}
                anonymizeData={anonymizeData}
                setAnonymizeData={setAnonymizeData}
              />

              <GenerateButton
                onClick={handleGenerate}
                disabled={isGenerating}
                loading={isGenerating}
              />
              {error && (
                <div className="text-red-600 text-sm mt-2">{error}</div>
              )}
            </div>
            <div className="bg-white border-0 p-5 rounded-lg shadow-sm">
              <SummaryPanel summary={generatedSummary} loading={isGenerating} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
