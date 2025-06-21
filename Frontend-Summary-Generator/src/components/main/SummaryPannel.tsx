import { useState, useEffect } from "react";
import { Copy, Download, FileText, Send } from "lucide-react";
import RichEditor from "./RichEditor";
import { Button } from "../ui/button";
import { toast } from "sonner";
interface SummaryPanelProps {
  summary: string;
  loading?: boolean;
}

export default function SummaryPanel({ summary, loading }: SummaryPanelProps) {
  const [editorContent, setEditorContent] = useState(summary);

  useEffect(() => {
    setEditorContent(summary);
  }, [summary]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    toast.success("Summary copied to clipboard!");
  };

  const downloadAsPDF = () => {
    // Simulate PDF download
    toast.success("PDF download started!");
    console.log("Downloading summary as PDF...");
  };

  const sendToPatient = () => {
    // Simulate sending to patient
    toast.success("Summary sent to patient!");
    console.log("Sending summary to patient...");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center animate-spin">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">
          Generating summary...
        </h3>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Generated Summary</h2>
      </div>

      {summary ? (
        <>
          <RichEditor content={editorContent} onChange={setEditorContent} />
          <div className="flex flex-wrap gap-2 mt-5">
            <Button onClick={copyToClipboard} variant="outline" size="sm">
              <Copy className="w-4 h-4 mr-2" />
              Copy to Clipboard
            </Button>
            <Button onClick={downloadAsPDF} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={sendToPatient} variant="outline" size="sm">
              <Send className="w-4 h-4 mr-2" />
              Send to Patient
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No Summary Generated
          </h3>
          <p className="text-gray-500 max-w-md">
            Enter your session notes and configure your preferences, then click
            “Generate Summary” to create a professional summary.
          </p>
        </div>
      )}
    </div>
  );
}
