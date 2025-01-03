"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Player } from "@/types/player";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { useState } from "react";

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
  availablePlayers = [],
}: MatchPlayerSelectProps) {
  const [open, setOpen] = useState(false);
  const selectedPlayer = availablePlayers.find((player) => player.id === value);

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedPlayer ? (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={selectedPlayer.image || ""}
                    alt={selectedPlayer.name}
                  />
                  <AvatarFallback>
                    {selectedPlayer.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{selectedPlayer.name}</span>
              </div>
            ) : (
              "Select player..."
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder="Search player..." />
            <CommandList>
              <CommandEmpty>No player found.</CommandEmpty>
              <CommandGroup>
                {availablePlayers.map((player) => (
                  <CommandItem
                    key={player.id}
                    value={player.name}
                    onSelect={() => {
                      onValueChange(value === player.id ? "" : player.id);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === player.id ? "opacity-100" : "opacity-0",
                        )}
                      />
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={player.image || ""}
                          alt={player.name}
                        />
                        <AvatarFallback>
                          {player.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{player.name}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
