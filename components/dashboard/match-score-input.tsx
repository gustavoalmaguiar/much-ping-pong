import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MatchScoreInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function MatchScoreInput({
  label,
  value,
  onChange,
}: MatchScoreInputProps) {
  return (
    <div>
      <Label htmlFor={label}>{label}</Label>
      <Input
        id={label}
        type="number"
        min="0"
        max="11"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label.includes("Winner") ? "11" : "9"}
      />
    </div>
  );
}
