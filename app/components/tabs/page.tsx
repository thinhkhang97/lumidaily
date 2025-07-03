"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function TabsPage() {
  return (
    <div className="container py-10">
      <Link href="/components" className="flex items-center text-sm mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Components
      </Link>

      <h1 className="text-4xl font-bold mb-2">Tabs Component</h1>
      <p className="text-muted-foreground mb-8">
        Tab components following the LumiDaily color palette.
      </p>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Default Tabs</CardTitle>
            <CardDescription>
              Default tabs using the system theme colors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="p-4 border rounded-md mt-4">
                <h3 className="text-lg font-medium mb-2">Tab 1 Content</h3>
                <p>This is the content for the first tab.</p>
              </TabsContent>
              <TabsContent value="tab2" className="p-4 border rounded-md mt-4">
                <h3 className="text-lg font-medium mb-2">Tab 2 Content</h3>
                <p>This is the content for the second tab.</p>
              </TabsContent>
              <TabsContent value="tab3" className="p-4 border rounded-md mt-4">
                <h3 className="text-lg font-medium mb-2">Tab 3 Content</h3>
                <p>This is the content for the third tab.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lavender Tabs</CardTitle>
            <CardDescription>
              Tabs using Lumi Lavender (#D8BFD8) for active tabs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tab1" variant="lavender">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="p-4 border rounded-md mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: colorPalette.lumiLavender }}
                  />
                  <h3 className="text-lg font-medium">Lumi Lavender</h3>
                </div>
                <p>Color code: {colorPalette.lumiLavender}</p>
              </TabsContent>
              <TabsContent value="tab2" className="p-4 border rounded-md mt-4">
                <h3 className="text-lg font-medium mb-2">Tab 2 Content</h3>
                <p>This is the content for the second tab.</p>
              </TabsContent>
              <TabsContent value="tab3" className="p-4 border rounded-md mt-4">
                <h3 className="text-lg font-medium mb-2">Tab 3 Content</h3>
                <p>This is the content for the third tab.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amber Tabs</CardTitle>
            <CardDescription>
              Tabs using Soft Amber (#E89A4F) for active tabs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tab1" variant="amber">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="p-4 border rounded-md mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: colorPalette.softAmber }}
                  />
                  <h3 className="text-lg font-medium">Soft Amber</h3>
                </div>
                <p>Color code: {colorPalette.softAmber}</p>
              </TabsContent>
              <TabsContent value="tab2" className="p-4 border rounded-md mt-4">
                <h3 className="text-lg font-medium mb-2">Tab 2 Content</h3>
                <p>This is the content for the second tab.</p>
              </TabsContent>
              <TabsContent value="tab3" className="p-4 border rounded-md mt-4">
                <h3 className="text-lg font-medium mb-2">Tab 3 Content</h3>
                <p>This is the content for the third tab.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sage Tabs</CardTitle>
            <CardDescription>
              Tabs using Sage Green (#B8D1B8) for active tabs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tab1" variant="sage">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="p-4 border rounded-md mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: colorPalette.sageGreen }}
                  />
                  <h3 className="text-lg font-medium">Sage Green</h3>
                </div>
                <p>Color code: {colorPalette.sageGreen}</p>
              </TabsContent>
              <TabsContent value="tab2" className="p-4 border rounded-md mt-4">
                <h3 className="text-lg font-medium mb-2">Tab 2 Content</h3>
                <p>This is the content for the second tab.</p>
              </TabsContent>
              <TabsContent value="tab3" className="p-4 border rounded-md mt-4">
                <h3 className="text-lg font-medium mb-2">Tab 3 Content</h3>
                <p>This is the content for the third tab.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cream Tabs</CardTitle>
            <CardDescription>
              Tabs using Parchment Cream (#F8E9D4) for active tabs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tab1" variant="cream">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="p-4 border rounded-md mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: colorPalette.parchmentCream }}
                  />
                  <h3 className="text-lg font-medium">Parchment Cream</h3>
                </div>
                <p>Color code: {colorPalette.parchmentCream}</p>
              </TabsContent>
              <TabsContent value="tab2" className="p-4 border rounded-md mt-4">
                <h3 className="text-lg font-medium mb-2">Tab 2 Content</h3>
                <p>This is the content for the second tab.</p>
              </TabsContent>
              <TabsContent value="tab3" className="p-4 border rounded-md mt-4">
                <h3 className="text-lg font-medium mb-2">Tab 3 Content</h3>
                <p>This is the content for the third tab.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Example</CardTitle>
            <CardDescription>
              Example code for using the Tabs component with variants.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md overflow-auto">
              <pre className="text-sm">
                <code>{`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Default Tabs
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Tab 1 content</TabsContent>
  <TabsContent value="tab2">Tab 2 content</TabsContent>
</Tabs>

// Lavender Tabs
<Tabs defaultValue="tab1" variant="lavender">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Tab 1 content</TabsContent>
  <TabsContent value="tab2">Tab 2 content</TabsContent>
</Tabs>

// Amber Tabs
<Tabs defaultValue="tab1" variant="amber">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Tab 1 content</TabsContent>
  <TabsContent value="tab2">Tab 2 content</TabsContent>
</Tabs>

// Sage Tabs
<Tabs defaultValue="tab1" variant="sage">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Tab 1 content</TabsContent>
  <TabsContent value="tab2">Tab 2 content</TabsContent>
</Tabs>

// Cream Tabs
<Tabs defaultValue="tab1" variant="cream">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Tab 1 content</TabsContent>
  <TabsContent value="tab2">Tab 2 content</TabsContent>
</Tabs>`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
