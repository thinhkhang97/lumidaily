"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Color palette from color-pallet.md
const colorPalette = {
  white: "#FFF",
  parchmentCream: "#F8E9D4",
  lumiLavender: "#D8BFD8",
  softAmber: "#E89A4F",
  sageGreen: "#B8D1B8",
  dustyRose: "#D89797",
  deepSlate: "#6A6A6A",
};

export default function ButtonPage() {
  return (
    <div className="container py-10">
      <Link href="/components" className="flex items-center text-sm mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Components
      </Link>

      <h1 className="text-4xl font-bold mb-2">Button Component</h1>
      <p className="text-muted-foreground mb-8">
        Buttons following the LumiDaily color palette.
      </p>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
            <CardDescription>
              Different button styles based on the LumiDaily color palette.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <ButtonExample
                variant="default"
                label="Primary (Amber)"
                colorCode={colorPalette.softAmber}
                description="Primary action buttons using Soft Amber (#E89A4F)"
              />

              <ButtonExample
                variant="secondary"
                label="Secondary (Lavender)"
                colorCode={colorPalette.lumiLavender}
                description="Secondary action buttons using Lumi Lavender (#D8BFD8)"
              />

              <ButtonExample
                variant="outline"
                label="Outline"
                colorCode="transparent"
                description="Outlined buttons with Soft Amber hover effect"
              />

              <ButtonExample
                variant="sage"
                label="Sage Green"
                colorCode={colorPalette.sageGreen}
                description="Alternative buttons using Sage Green (#B8D1B8)"
              />

              <ButtonExample
                variant="cream"
                label="Parchment Cream"
                colorCode={colorPalette.parchmentCream}
                description="Alternative buttons using Parchment Cream (#F8E9D4)"
              />

              <ButtonExample
                variant="destructive"
                label="Destructive (Rose)"
                colorCode={colorPalette.dustyRose}
                description="Destructive action buttons using Dusty Rose (#D89797)"
              />

              <ButtonExample
                variant="ghost"
                label="Ghost"
                colorCode="transparent"
                description="Ghost buttons with hover effect"
              />

              <ButtonExample
                variant="link"
                label="Link"
                colorCode="transparent"
                description="Link-style buttons with underline on hover"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Button Sizes</CardTitle>
            <CardDescription>Different button sizes available.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <Button size="sm">Small</Button>
                <span className="text-xs text-muted-foreground">Small</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Button size="default">Default</Button>
                <span className="text-xs text-muted-foreground">Default</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Button size="lg">Large</Button>
                <span className="text-xs text-muted-foreground">Large</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Button size="icon" variant="outline">
                  <ArrowLeft />
                </Button>
                <span className="text-xs text-muted-foreground">Icon</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Button States</CardTitle>
            <CardDescription>Different button states.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center gap-2">
                <Button>Normal</Button>
                <span className="text-xs text-muted-foreground">Normal</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Button disabled>Disabled</Button>
                <span className="text-xs text-muted-foreground">Disabled</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Button className="opacity-80">Hover</Button>
                <span className="text-xs text-muted-foreground">Hover</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Example</CardTitle>
            <CardDescription>
              Example code for using the Button component.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md overflow-auto">
              <pre className="text-sm">
                <code>{`import { Button } from "@/components/ui/button";

// Default (Primary) Button
<Button>Primary Button</Button>

// Secondary Button
<Button variant="secondary">Secondary Button</Button>

// Outline Button
<Button variant="outline">Outline Button</Button>

// Sage Green Button
<Button variant="sage">Sage Button</Button>

// Parchment Cream Button
<Button variant="cream">Cream Button</Button>

// Destructive Button
<Button variant="destructive">Delete</Button>

// Ghost Button
<Button variant="ghost">Ghost Button</Button>

// Link Button
<Button variant="link">Link Button</Button>

// Different Sizes
<Button size="sm">Small Button</Button>
<Button size="default">Default Button</Button>
<Button size="lg">Large Button</Button>
<Button size="icon"><IconComponent /></Button>

// Disabled State
<Button disabled>Disabled Button</Button>`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ButtonExample({
  variant,
  label,
  colorCode,
  description,
}: {
  variant:
    | "default"
    | "secondary"
    | "outline"
    | "sage"
    | "cream"
    | "destructive"
    | "ghost"
    | "link";
  label: string;
  colorCode: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 border p-4 rounded-md">
      <Button variant={variant}>{label}</Button>
      <div className="mt-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <div
            className="w-4 h-4 rounded-full border"
            style={{ backgroundColor: colorCode }}
          />
          <span className="text-xs">{colorCode}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1 max-w-[180px]">
          {description}
        </p>
      </div>
    </div>
  );
}
