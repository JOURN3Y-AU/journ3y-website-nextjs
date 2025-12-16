'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { usePages } from "@/hooks/usePages";
import { PagesTable } from "./pages/PagesTable";
import { Loader2 } from "lucide-react";

export const AdminPageManagement = () => {
  const { pages, loading, createPage, updatePage, deletePage } = usePages();

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Management</CardTitle>
        <CardDescription>
          Manage all pages in your site. Changes to published pages will automatically update the sitemap.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PagesTable
          pages={pages}
          onCreate={createPage}
          onUpdate={updatePage}
          onDelete={deletePage}
        />
      </CardContent>
    </Card>
  );
};