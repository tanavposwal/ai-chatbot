import type { Message } from "ai";
import { useSWRConfig } from "swr";
import { useCopyToClipboard } from "usehooks-ts";

import type { Vote } from "@/lib/db/schema";

import { CopyIcon, ThumbDownIcon, ThumbUpIcon } from "./icons";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { memo } from "react";
import equal from "fast-deep-equal";
import { toast } from "sonner";
import { Copy, ThumbsDown, ThumbsUp } from "lucide-react";

export function PureMessageActions({
  chatId,
  message,
  vote,
  isLoading,
}: {
  chatId: string;
  message: Message;
  vote: Vote | undefined;
  isLoading: boolean;
}) {
  const { mutate } = useSWRConfig();
  const [_, copyToClipboard] = useCopyToClipboard();

  if (isLoading) return null;
  if (message.role === "user") return null;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex flex-row gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="text-muted-foreground p-2 h-fit w-fit"
              variant="ghost"
              size="icon"
              onClick={async () => {
                const textFromParts = message.parts
                  ?.filter((part) => part.type === "text")
                  .map((part) => part.text)
                  .join("\n")
                  .trim();

                if (!textFromParts) {
                  toast.error("There's no text to copy!");
                  return;
                }

                await copyToClipboard(textFromParts);
                toast.success("Copied to clipboard!");
              }}>
              <Copy />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Copy</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              data-testid="message-upvote"
              className="text-muted-foreground !pointer-events-auto p-2 h-fit w-fit"
              disabled={vote?.isUpvoted}
              variant="ghost"
              size="icon"
              onClick={async () => {
                const upvote = fetch("/api/vote", {
                  method: "PATCH",
                  body: JSON.stringify({
                    chatId,
                    messageId: message.id,
                    type: "up",
                  }),
                });

                toast.promise(upvote, {
                  loading: "Upvoting Response...",
                  success: () => {
                    mutate<Array<Vote>>(
                      `/api/vote?chatId=${chatId}`,
                      (currentVotes) => {
                        if (!currentVotes) return [];

                        const votesWithoutCurrent = currentVotes.filter(
                          (vote) => vote.messageId !== message.id
                        );

                        return [
                          ...votesWithoutCurrent,
                          {
                            chatId,
                            messageId: message.id,
                            isUpvoted: true,
                          },
                        ];
                      },
                      { revalidate: false }
                    );

                    return "Upvoted Response!";
                  },
                  error: "Failed to upvote response.",
                });
              }}>
              <ThumbsUp />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Upvote Response</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              data-testid="message-downvote"
              className="text-muted-foreground !pointer-events-auto p-2 h-fit w-fit"
              variant="ghost"
              size="icon"
              disabled={vote && !vote.isUpvoted}
              onClick={async () => {
                const downvote = fetch("/api/vote", {
                  method: "PATCH",
                  body: JSON.stringify({
                    chatId,
                    messageId: message.id,
                    type: "down",
                  }),
                });

                toast.promise(downvote, {
                  loading: "Downvoting Response...",
                  success: () => {
                    mutate<Array<Vote>>(
                      `/api/vote?chatId=${chatId}`,
                      (currentVotes) => {
                        if (!currentVotes) return [];

                        const votesWithoutCurrent = currentVotes.filter(
                          (vote) => vote.messageId !== message.id
                        );

                        return [
                          ...votesWithoutCurrent,
                          {
                            chatId,
                            messageId: message.id,
                            isUpvoted: false,
                          },
                        ];
                      },
                      { revalidate: false }
                    );

                    return "Downvoted Response!";
                  },
                  error: "Failed to downvote response.",
                });
              }}>
              <ThumbsDown />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Downvote Response</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export const MessageActions = memo(
  PureMessageActions,
  (prevProps, nextProps) => {
    if (!equal(prevProps.vote, nextProps.vote)) return false;
    if (prevProps.isLoading !== nextProps.isLoading) return false;

    return true;
  }
);
