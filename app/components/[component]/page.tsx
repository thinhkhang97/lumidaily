"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calendar } from "lucide-react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Popover } from "@radix-ui/react-popover";
import { Progress } from "@radix-ui/react-progress";
import { Tabs } from "@radix-ui/react-tabs";
import Link from "next/link";
import React from "react";
import { Dialog } from "@/components/ui/dialog";
import { Tooltip } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

// Component examples for preview
const componentExamples: Record<string, React.ReactNode> = {
  button: <Button>Button Example</Button>,
  checkbox: (
    <div className="flex items-center space-x-2">
      <Checkbox id="example-checkbox" />
      <label htmlFor="example-checkbox">Checkbox Example</label>
    </div>
  ),
  input: <Input placeholder="Input Example" />,
  avatar: (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  calendar: <Calendar />,
  card: <Card>Card Example</Card>,
  dialog: <Dialog>Dialog Example</Dialog>,
  "dropdown-menu": <DropdownMenu>Dropdown Menu Example</DropdownMenu>,
  popover: <Popover>Popover Example</Popover>,
  progress: <Progress value={50} />,
  tabs: <Tabs>Tabs Example</Tabs>,
  tooltip: <Tooltip>Tooltip Example</Tooltip>,
  sonner: <Toaster />,
};

// List of available components
const availableComponents = [
  "button",
  "checkbox",
  "form",
  "input",
  "label",
  "select",
  "slider",
  "switch",
  "avatar",
  "calendar",
  "card",
  "dialog",
  "dropdown-menu",
  "popover",
  "progress",
  "tabs",
  "tooltip",
  "sonner",
  "theme-provider",
];

export default function ComponentPage({
  params,
}: {
  params: { component: string };
}) {
  const componentName = params.component;
  const isValidComponent = availableComponents.includes(componentName);
  const example = componentExamples[componentName];

  if (!isValidComponent) {
    return (
      <div className="container py-10">
        <Link href="/components" className="flex items-center text-sm mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Components
        </Link>
        <h1 className="text-4xl font-bold mb-6">Component Not Found</h1>
        <p>
          The component &quot;{componentName}&quot; does not exist or is not
          available.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <Link href="/components" className="flex items-center text-sm mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Components
      </Link>

      <h1 className="text-4xl font-bold mb-2">
        {formatComponentName(componentName)}
      </h1>
      <p className="text-muted-foreground mb-8">
        UI component details and usage examples.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-medium mb-4">Preview</h2>
          <div className="p-6 border rounded-md flex items-center justify-center min-h-[200px]">
            {example || (
              <div className="text-muted-foreground">No preview available</div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-medium mb-4">Usage</h2>
          <div className="bg-muted p-4 rounded-md overflow-auto">
            <pre className="text-sm">
              <code>{`import { ${formatComponentName(
                componentName
              )} } from "@/components/ui/${componentName}";

// Example usage
<${formatComponentName(componentName)} />`}</code>
            </pre>
          </div>
        </Card>
      </div>
    </div>
  );
}

function formatComponentName(name: string): string {
  // Convert kebab-case to PascalCase
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}
