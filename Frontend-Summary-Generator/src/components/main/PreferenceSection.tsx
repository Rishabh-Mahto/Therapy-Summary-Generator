import {
  Brain,
  Heart,
  Shield,
  Stethoscope,
  Users,
  Workflow,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";

type Props = {
  tone: string;
  setTone: (v: string) => void;
  sessionType: string;
  setSessionType: (v: string) => void;
  summaryLength: string;
  setSummaryLength: (v: string) => void;
  includeActionItems: boolean;
  setIncludeActionItems: (v: boolean) => void;
  anonymizeData: boolean;
  setAnonymizeData: (v: boolean) => void;
};

export default function PreferenceSection({
  tone,
  setTone,
  sessionType,
  setSessionType,
  summaryLength,
  setSummaryLength,
  includeActionItems,
  setIncludeActionItems,
  anonymizeData,
  setAnonymizeData,
}: Props) {
  const toneOptions = [
    { value: "clinical", label: "Clinical" },
    { value: "empathetic", label: "Empathetic" },
    { value: "neutral", label: "Neutral" },
  ];

  const sessionTypes = [
    {
      value: "therapy",
      label: "Therapy",
      icon: <Brain className="w-4 h-4 mr-1" />,
    },
    {
      value: "psychiatry",
      label: "Psychiatry",
      icon: <Stethoscope className="w-4 h-4 mr-1" />,
    },
    {
      value: "couples",
      label: "Couples",
      icon: <Users className="w-4 h-4 mr-1" />,
    },
    {
      value: "sexual-health",
      label: "Sexual Health",
      icon: <Heart className="w-4 h-4 mr-1" />,
    },
  ];

  const summaryLengths = [
    { value: "short", label: "Short" },
    { value: "medium", label: "Medium" },
    { value: "detailed", label: "Detailed" },
  ];

  return (
    <div className="w-full">
      <p className="text-lg font-semibold leading-0 ">Summary Preferences</p>
      <div className="w-full">
        {" "}
        <div className="md:space-y-2 grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 mt-5 w-full">
          <div className="w-[100%]">
            {" "}
            <label className="text-xs font-medium">Tone</label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white z-2 m-0">
                {toneOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-medium">Session Type</label>
            <Select value={sessionType} onValueChange={setSessionType}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white z-2">
                {sessionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center">
                      {type.icon}
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="">
            <label className="text-xs font-medium">Summary Length</label>
            <Select value={summaryLength} onValueChange={setSummaryLength}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white z-2">
                {summaryLengths.map((length) => (
                  <SelectItem key={length.value} value={length.value}>
                    {length.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* toggle */}
        <div className="mt-3 md:mt-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex items-center gap-2">
              <Workflow className="w-4 h-4" />
              <div>
                <label className="text-sm leading-0">
                  Include Action Items
                </label>
                <p className="text-xs leading-0 mt-1 text-gray-500">
                  Add actionable next steps to the summary
                </p>
              </div>
            </div>
            <Switch
              className="bg-gray-200"
              checked={includeActionItems}
              onCheckedChange={setIncludeActionItems}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <div>
                <label className="text-sm leading-0">Anonymize Data</label>
                <p className="text-xs leading-0 mt-1 text-gray-500">
                  Remove identifying information
                </p>
              </div>
            </div>
            <Switch
              className="bg-gray-200"
              checked={anonymizeData}
              onCheckedChange={setAnonymizeData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
