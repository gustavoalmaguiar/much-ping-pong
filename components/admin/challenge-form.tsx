"use client";

import { useState, useEffect } from "react";
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
import { Challenge, RequirementType } from "@prisma/client";
import { useAllPlayers } from "@/utils/hooks/use-all-players";

const formSchema = z.object({
  requirementType: z.nativeEnum(RequirementType),
  requirementValue: z.number().min(1, "Requirement value must be at least 1").optional(),
  xpReward: z.number().min(1, "XP reward must be at least 1"),
  isActive: z.boolean(),
  specificOpponent: z.string().optional(),
  matchType: z.enum(["singles", "duo"]).optional(),
});

interface ChallengeFormProps {
  onSubmit: (challenge: Challenge) => void;
}

function generateChallengeText(type: RequirementType, value: number, specificOpponent?: string, matchType?: string) {
  const titles: Record<RequirementType, string> = {
    winStreak: value === 1
      ? 'Win a Game'
      : `Win ${value} Games in a Row`,
    winCount: value === 1
      ? 'Win a Game'
      : `Win ${value} Games`,
    lossCount: value === 1
      ? 'Lose a Game'
      : `Lose ${value} Games`,
    xpGain: `Earn ${value} XP`,
    playMatches: value === 1
      ? 'Play a Match'
      : `Play ${value} Matches`,
    specificWin: specificOpponent
      ? `Win Against ${specificOpponent}`
      : 'Win Against Specific Player',
    matchTypeCount: matchType
      ? value === 1
        ? `Play a ${matchType} Match`
        : `Play ${value} ${matchType} Matches`
      : 'Play Specific Match Type'
  };

  const descriptions: Record<RequirementType, string> = {
    winStreak: value === 1
      ? 'Win a single game. Your streak resets if you lose.'
      : `Achieve a winning streak of ${value} consecutive games. Your streak resets if you lose a game.`,
    winCount: value === 1
      ? 'Win a single game. This challenge tracks your victories.'
      : `Win a total of ${value} games. This challenge tracks your overall victories.`,
    lossCount: value === 1
      ? 'Lose a single game. This challenge tracks your losses.'
      : `Lose a total of ${value} games. This challenge tracks your overall losses.`,
    xpGain: value === 1
      ? 'Earn 1 experience point (XP) through playing games and completing other challenges.'
      : `Accumulate ${value} experience points (XP) through playing games and completing other challenges.`,
    playMatches: value === 1
      ? 'Participate in a single match. Win or lose, what matters is playing the game!'
      : `Participate in ${value} matches. Win or lose, what matters is playing the game!`,
    specificWin: specificOpponent
      ? `Win a game against ${specificOpponent}.`
      : 'Win a game against a specific player.',
    matchTypeCount: matchType
      ? value === 1
        ? `Play a single match in ${matchType} mode.`
        : `Play ${value} matches in ${matchType} mode.`
      : 'Play matches in a specific game mode.'
  };

  return {
    title: titles[type],
    description: descriptions[type],
  };
}

export function ChallengeForm({ onSubmit }: ChallengeFormProps) {
  const { data: players } = useAllPlayers();
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
  const specificOpponent = form.watch("specificOpponent");
  const matchType = form.watch("matchType");

  const showRequirementValue = requirementType !== RequirementType.specificWin;
  const showSpecificOpponent = requirementType === RequirementType.specificWin;
  const showMatchType = requirementType === RequirementType.matchTypeCount;

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const selectedPlayer = players?.find(p => p.id === values.specificOpponent);
    const { title, description } = generateChallengeText(
      values.requirementType,
      values.requirementValue || 1,
      selectedPlayer?.name || undefined,
      values.matchType
    );

    const challenge: Challenge = {
      ...values,
      title,
      description,
      id: Date.now().toString(),
      createdAt: new Date(),
      requirementValue: values.requirementValue || 1,
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
                      {type.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {showRequirementValue && (
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
                      const value = e.target.value === '' ? '' : parseInt(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {showSpecificOpponent && (
          <FormField
            control={form.control}
            name="specificOpponent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Opponent</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a player" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {players?.map((player) => (
                      <SelectItem key={player.id} value={player.id}>
                        {player.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {showMatchType && (
          <FormField
            control={form.control}
            name="matchType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Match Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    const value = e.target.value === '' ? '' : parseInt(e.target.value);
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
                <FormLabel className="text-base">
                  Active Challenge
                </FormLabel>
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
        {requirementType && (showRequirementValue ? requirementValue : true) && (
          <div className="space-y-2 rounded-lg border p-4 bg-muted">
            <h3 className="font-semibold">Preview:</h3>
            <p className="font-medium">
              {generateChallengeText(
                requirementType,
                requirementValue || 1,
                players?.find(p => p.id === specificOpponent)?.name || undefined,
                matchType
              ).title}
            </p>
            <p className="text-sm text-muted-foreground">
              {generateChallengeText(
                requirementType,
                requirementValue || 1,
                players?.find(p => p.id === specificOpponent)?.name || undefined,
                matchType
              ).description}
            </p>
          </div>
        )}

        <Button type="submit">Create Challenge</Button>
      </form>
    </Form>
  );
}

