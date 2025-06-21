import { useEffect, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Save } from "lucide-react";

type Props = {
  notes: string;
  setNotes: (v: string) => void;
  lastSaved: Date | null;
  setLastSaved: (d: Date) => void;
};

export default function NotesEditor({
  notes,
  setNotes,
  lastSaved,
  setLastSaved,
}: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (notes.trim()) {
        localStorage.setItem("sessionNotes", notes);
        setLastSaved(new Date());
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [notes, setLastSaved]);

  const wordCount = useMemo(
    () => (notes.trim() ? notes.trim().split(/\s+/).length : 0),
    [notes]
  );
  const charCount = notes.length;

  return (
    <div className="">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          <p className="text-xl font-semibold">Session Notes</p>
        </div>
        <div>
          {" "}
          {lastSaved && (
            <div className="flex items-center gap-1">
              <Save className="w-4 h-4 text-slate-500" />
              <span className="text-md text-slate-500">
                Saved {lastSaved.toLocaleTimeString()}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 mt-2 w-full">
        <div className="flex items-center justify-between">
          <label htmlFor="session-notes" className="text-sm font-medium">
            Enter your session notes:
          </label>{" "}
          <p className="text-xs text-gray-500">
            {wordCount} words &middot; {charCount} characters{" "}
          </p>
        </div>

        <Textarea
          id="session-notes"
          placeholder="Document the session details, patient responses, observations, and key discussion points..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[200px] resize-none border-gray-400"
        />
      </div>
    </div>
  );
}
