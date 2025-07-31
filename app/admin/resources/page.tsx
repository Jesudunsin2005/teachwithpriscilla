import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Download, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Resource } from "@/lib/types";
import { serverDb } from "@/utils/supabase/database";

export const metadata = {
  title: "Resources - Admin Dashboard",
};

export default async function AdminResourcesPage() {
  const { data: resources, error } = await serverDb.resources.getAll();

  if (error) {
    console.error("Error fetching resources:", error);
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
            <p className="text-gray-600">Manage downloadable teaching resources</p>
          </div>
          <Button asChild>
            <Link href="/admin/resources/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Resource
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-red-500">Error loading resources. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
          <p className="text-gray-600">Manage downloadable teaching resources</p>
        </div>
        <Button asChild>
          <Link href="/admin/resources/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Resource
          </Link>
        </Button>
      </div>

      {!resources || resources.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Download className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No resources yet
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Get started by adding your first teaching resource.
            </p>
            <Button asChild>
              <Link href="/admin/resources/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Resource
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {resources.map((resource) => (
            <Card key={resource.id}>
              <CardHeader>
                <CardTitle className="line-clamp-1">{resource.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {resource.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <p>Created: {formatDate(resource.created_at)}</p>
                    <p>File: {resource.file_path}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/api/download/${resource.id}`} download>
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
