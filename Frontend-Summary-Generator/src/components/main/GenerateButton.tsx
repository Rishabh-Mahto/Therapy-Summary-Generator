import { Button } from "@/components/ui/button";
import { FileText, Loader2 } from "lucide-react";

type Props = {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
};

export default function GenerateButton({ onClick, disabled, loading }: Props) {
  return (
    <div className="w-full md:w-[250px]">
      {" "}
      <Button
        onClick={onClick}
        disabled={disabled}
        size="lg"
        className="w-full bg-black text-white mt-5 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-4 h-4 mr-2" /> Generating...
          </>
        ) : (
          <>
            <FileText className="w-4 h-4 mr-2" /> Generate Summary
          </>
        )}
      </Button>
    </div>
  );
}
