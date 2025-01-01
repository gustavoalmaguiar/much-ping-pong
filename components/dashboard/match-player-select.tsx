import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Player } from "@/types/player";

interface MatchPlayerSelectProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  availablePlayers: Player[];
}

export function MatchPlayerSelect({
  label,
  value,
  onValueChange,
  availablePlayers,
}: MatchPlayerSelectProps) {
  return (
    <div>
      <Label htmlFor={label}>{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select player" />
        </SelectTrigger>
        <SelectContent>
          {availablePlayers.map((player) => (
            <SelectItem key={player.id} value={player.id}>
              {player.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
