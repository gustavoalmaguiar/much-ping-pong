"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Trophy,
  Users,
  User,
  Target,
  Calendar,
  Home,
  Menu,
  X,
} from "lucide-react";
import { AuthButton } from "@/components/auth/auth-button";
import Image from "next/image";
import { useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/matches", label: "Matches", icon: Trophy },
  { href: "/rankings", label: "Rankings", icon: Users },
  { href: "/challenges", label: "Challenges", icon: Target },
  // { href: "/season", label: "Season", icon: Calendar },
  // { href: "/profile", label: "Profile", icon: User },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleLogoDoubleClick = (e: MouseEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setShowThemeMenu(true);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 mx-auto lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with Theme Toggle */}
          <div className="relative">
            <Image
              src="/much.svg"
              alt="much. Consulting Logo"
              width={32}
              height={32}
              className="w-8 h-8"
              onDoubleClick={handleLogoDoubleClick}
            />
            {showThemeMenu && (
              <ModeToggle
                style={{
                  position: "fixed",
                  left: `${menuPosition.x}px`,
                  top: `${menuPosition.y}px`,
                }}
                onOpenChange={setShowThemeMenu}
                open={showThemeMenu}
              />
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent",
                  pathname === href
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Button & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <AuthButton />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="container px-4 py-3 mx-auto space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent",
                  pathname === href
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
            <div className="pt-2 pb-1 flex items-center gap-2">
              <AuthButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
