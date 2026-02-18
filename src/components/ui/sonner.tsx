"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4 text-green-600 dark:text-green-500" />
        ),
        info: <InfoIcon className="size-4 text-blue-600 dark:text-blue-500" />,
        warning: (
          <TriangleAlertIcon className="size-4 text-yellow-600 dark:text-yellow-500" />
        ),
        error: (
          <OctagonXIcon className="size-4 text-red-600 dark:text-red-500" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin text-gray-600 dark:text-gray-400" />
        ),
      }}
      toastOptions={{
        style: {
          backgroundColor: "var(--card)",
          color: "var(--card-foreground)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
        },
        classNames: {
          description: "!text-card-foreground !opacity-70",
          title: "!text-card-foreground !font-semibold",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
