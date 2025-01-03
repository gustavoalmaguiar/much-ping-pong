"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ModeToggleProps {
  className?: string;
  style?: React.CSSProperties;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

export function ModeToggle({
  className,
  style,
  onOpenChange,
  open,
}: ModeToggleProps) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger className="hidden" />
      <DropdownMenuContent style={style} className={className} align="start">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
