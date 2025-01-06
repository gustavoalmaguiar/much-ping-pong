"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { MatchType, RequirementType } from "@prisma/client";

const formSchema = z.object({
  requirementType: z.nativeEnum(RequirementType),
  requirementValue: z
    .number()
    .min(1, "Requirement value must be at least 1")
    .optional(),
  xpReward: z.number().min(1, "XP reward must be at least 1"),
  isActive: z.boolean(),
  matchType: z.nativeEnum(MatchType).optional(),
});

interface ChallengeFormProps {
  onSubmit: (challenge: z.infer<typeof formSchema>) => void;
}

function generateChallengeText(
  type: RequirementType,
  value: number,
  matchType?: string,
) {
  const titles: Record<RequirementType, string> = {
    winStreak: value === 1 ? "Win a Game" : `Win ${value} Games in a Row`,
    winCount: value === 1 ? "Win a Game" : `Win ${value} Games`,
    lossCount: value === 1 ? "Lose a Game" : `Lose ${value} Games`,
    xpGain: `Earn ${value} XP`,
    playMatches: value === 1 ? "Play a Match" : `Play ${value} Matches`,
    matchTypeCount: matchType
      ? value === 1
        ? `Play a ${matchType} Match`
        : `Play ${value} ${matchType} Matches`
      : "Play Specific Match Type",
  };

  const descriptions: Record<RequirementType, string> = {
    winStreak:
      value === 1
        ? "Win a single game. Your streak resets if you lose."
        : `Achieve a winning streak of ${value} consecutive games. Your streak resets if you lose a game.`,
    winCount:
      value === 1
        ? "Win a single game. This challenge tracks your victories."
        : `Win a total of ${value} games. This challenge tracks your overall victories.`,
    lossCount:
      value === 1
        ? "Lose a single game. This challenge tracks your losses."
        : `Lose a total of ${value} games. This challenge tracks your overall losses.`,
    xpGain:
      value === 1
        ? "Earn 1 experience point (XP) through playing games and completing other challenges."
        : `Accumulate ${value} experience points (XP) through playing games and completing other challenges.`,
    playMatches:
      value === 1
        ? "Participate in a single match. Win or lose, what matters is playing the game!"
        : `Participate in ${value} matches. Win or lose, what matters is playing the game!`,
    matchTypeCount: matchType
      ? value === 1
        ? `Play a single match in ${matchType} mode.`
        : `Play ${value} matches in ${matchType} mode.`
      : "Play matches in a specific game mode.",
  };

  return {
    title: titles[type],
    description: descriptions[type],
  };
}

export function ChallengeForm({ onSubmit }: ChallengeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requirementType: RequirementType.winStreak,
      requirementValue: 1,
      xpReward: 100,
      isActive: true,
    },
  });

  const requirementType = form.watch("requirementType");
  const requirementValue = form.watch("requirementValue");
  const matchType = form.watch("matchType");

  const showMatchType = requirementType === RequirementType.matchTypeCount;

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const { title, description } = generateChallengeText(
      values.requirementType,
      values.requirementValue || 1,
      values.matchType,
    );

    const challenge = {
      ...values,
      title,
      description,
      id: Date.now().toString(),
      createdAt: new Date(),
      requirementValue: values.requirementValue || 1,
      matchType: values.matchType,
    };
    onSubmit(challenge);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="requirementType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Challenge Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a challenge type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(RequirementType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requirementValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Value</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? "" : parseInt(e.target.value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {showMatchType && (
          <FormField
            control={form.control}
            name="matchType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Match Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select match type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="singles">Singles</SelectItem>
                    <SelectItem value="duo">Duo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="xpReward"
          render={({ field }) => (
            <FormItem>
              <FormLabel>XP Reward</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? "" : parseInt(e.target.value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active Challenge</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Preview of generated title and description */}
        {requirementType && requirementValue && (
          <div className="space-y-2 rounded-lg border p-4 bg-muted">
            <h3 className="font-semibold">Preview:</h3>
            <p className="font-medium">
              {
                generateChallengeText(
                  requirementType,
                  requirementValue || 1,
                  matchType,
                ).title
              }
            </p>
            <p className="text-sm text-muted-foreground">
              {
                generateChallengeText(
                  requirementType,
                  requirementValue || 1,
                  matchType,
                ).description
              }
            </p>
          </div>
        )}

        <Button type="submit">Create Challenge</Button>
      </form>
    </Form>
  );
}
