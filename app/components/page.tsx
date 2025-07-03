"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Calendar, ChevronDown, Settings, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const componentsByCategory = {
  "Form Elements": [
    { name: "Button", path: "button" },
    { name: "Checkbox", path: "checkbox" },
    { name: "Form", path: "form" },
    { name: "Input", path: "input" },
    { name: "Label", path: "label" },
    { name: "Select", path: "select" },
    { name: "Slider", path: "slider" },
    { name: "Switch", path: "switch" },
  ],
  "Layout & Structure": [
    { name: "Avatar", path: "avatar" },
    { name: "Calendar", path: "calendar" },
    { name: "Card", path: "card" },
    { name: "Dialog", path: "dialog" },
    { name: "Dropdown Menu", path: "dropdown-menu" },
    { name: "Popover", path: "popover" },
    { name: "Progress", path: "progress" },
    { name: "Tabs", path: "tabs" },
    { name: "Tooltip", path: "tooltip" },
  ],
  "Feedback & Notifications": [{ name: "Sonner", path: "sonner" }],
  "Theme & Providers": [{ name: "Theme Provider", path: "theme-provider" }],
};

// Component examples for preview
const componentExamples: Record<string, React.ReactNode> = {
  button: (
    <div className="flex flex-wrap gap-3">
      <Button variant="default">Primary (Amber)</Button>
      <Button variant="secondary">Secondary (Lavender)</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="sage">Sage Green</Button>
      <Button variant="cream">Parchment Cream</Button>
      <Button variant="destructive">Destructive (Rose)</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  checkbox: (
    <div className="flex items-center space-x-2">
      <Checkbox id="example-checkbox" />
      <label htmlFor="example-checkbox">Checkbox Example</label>
    </div>
  ),
  input: <Input placeholder="Input Example" />,
  label: <Label>Label Example</Label>,
  select: (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
  slider: <Slider defaultValue={[50]} max={100} step={1} className="w-full" />,
  switch: <Switch />,
  avatar: (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  calendar: <Calendar className="h-6 w-6" />,
  card: (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm" className="ml-2">
          Submit
        </Button>
      </CardFooter>
    </Card>
  ),
  dialog: (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog description goes here.</DialogDescription>
        </DialogHeader>
        <div className="py-4">Dialog content goes here.</div>
      </DialogContent>
    </Dialog>
  ),
  "dropdown-menu": (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Options <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  popover: <div className="p-2 border rounded-md">Popover Example</div>,
  progress: <Progress value={50} />,
  tabs: (
    <div className="w-full">
      <Tabs defaultValue="lavender" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="lavender">Lavender</TabsTrigger>
          <TabsTrigger value="amber">Amber</TabsTrigger>
          <TabsTrigger value="sage">Sage</TabsTrigger>
        </TabsList>
        <div className="mt-2">
          <TabsContent value="lavender">
            <Tabs defaultValue="tab1" variant="lavender" className="w-full">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="p-2 border rounded-md mt-2">
                Lavender variant
              </TabsContent>
              <TabsContent value="tab2" className="p-2 border rounded-md mt-2">
                Tab 2 content
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="amber">
            <Tabs defaultValue="tab1" variant="amber" className="w-full">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="p-2 border rounded-md mt-2">
                Amber variant
              </TabsContent>
              <TabsContent value="tab2" className="p-2 border rounded-md mt-2">
                Tab 2 content
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="sage">
            <Tabs defaultValue="tab1" variant="sage" className="w-full">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="p-2 border rounded-md mt-2">
                Sage variant
              </TabsContent>
              <TabsContent value="tab2" className="p-2 border rounded-md mt-2">
                Tab 2 content
              </TabsContent>
            </Tabs>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  ),
  tooltip: (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip content</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  sonner: (
    <div>
      <Button
        variant="outline"
        onClick={() => toast("This is a toast notification")}
      >
        Show Toast
      </Button>
      <Toaster />
    </div>
  ),
  form: <div className="p-2 border rounded-md">Form Example</div>,
  "theme-provider": (
    <div className="p-2 border rounded-md">Theme Provider Example</div>
  ),
};

export default function ComponentsCatalog() {
  return (
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Components Catalog</h1>
        <p className="text-muted-foreground">
          Browse all available UI components in the DailyPomo application.
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Components</TabsTrigger>
          {Object.keys(componentsByCategory).map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(componentsByCategory).flatMap(
              ([category, components]) =>
                components.map((component) => (
                  <ComponentCard
                    key={component.path}
                    name={component.name}
                    category={category}
                    path={component.path}
                  />
                ))
            )}
          </div>
        </TabsContent>

        {Object.entries(componentsByCategory).map(([category, components]) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {components.map((component) => (
                <ComponentCard
                  key={component.path}
                  name={component.name}
                  category={category}
                  path={component.path}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function ComponentCard({
  name,
  category,
  path,
}: {
  name: string;
  category: string;
  path: string;
}) {
  const example = componentExamples[path];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{category}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md p-4 flex items-center justify-center min-h-[120px] mb-4">
          {example || (
            <div className="text-muted-foreground">No preview available</div>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {`UI component for ${name.toLowerCase()} interactions.`}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/components/${path}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
