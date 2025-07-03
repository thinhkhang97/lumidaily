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
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {`UI component for ${name.toLowerCase()} interactions.`}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/components/${path}`}>View Component</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
