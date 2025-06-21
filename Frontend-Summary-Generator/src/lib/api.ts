export async function generateSummaryRequest({
  notes,
  tone,
  sessionType,
  summaryLength,
  includeActionItems,
  anonymizeData,
}: {
  notes: string;
  tone: string;
  sessionType: string;
  summaryLength: string;
  includeActionItems: boolean;
  anonymizeData: boolean;
}): Promise<string> {
  const apiKey = import.meta.env.VITE_BACKEND_API_KEY;
  try {
    const res = await fetch("http://127.0.0.1:8000/api/generate-summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        notes,
        prefs: {
          tone,
          includeActionItems,
          anonymizeData,
          sessionType,
          summaryLength,
        },
      }),
    });

    let data: any = {};
    try {
      data = await res.json();
    } catch {}

    if (!res.ok) {
      throw new Error(
        data.detail || data.message || "Failed to generate summary"
      );
    }
    if (!data.summary) {
      throw new Error("No summary returned from API.");
    }
    return data.summary;
  } catch (err: any) {
    throw new Error(err.message || "Network error. Please try again.");
  }
}
