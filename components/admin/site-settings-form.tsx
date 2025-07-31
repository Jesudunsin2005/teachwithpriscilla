"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { clientDb } from "@/utils/supabase/client-database";

interface SiteSettingsFormProps {
  settings: Record<string, string>;
}

export function SiteSettingsForm({ settings }: SiteSettingsFormProps) {
  const [formData, setFormData] = useState(settings);
  const [originalData] = useState(settings); // Keep original values for comparison
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Get only the changed values
  const getChangedValues = () => {
    const changed: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== originalData[key]) {
        changed[key] = formData[key];
      }
    });
    return changed;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const changedValues = getChangedValues();

      if (Object.keys(changedValues).length === 0) {
        toast({
          title: "No changes",
          description: "No settings were modified.",
        });
        return;
      }

      const updatePromises = Object.entries(changedValues).map(([key, value]) =>
        clientDb.settings.set(key, value)
      );

      const results = await Promise.all(updatePromises);
      const hasError = results.some((result) => result.error);

      if (hasError) {
        throw new Error("Failed to update some settings");
      }

      // Update original data to reflect the new state
      Object.assign(originalData, changedValues);

      toast({
        title: "Settings updated",
        description: `${
          Object.keys(changedValues).length
        } setting(s) have been saved successfully.`,
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your settings.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if there are any changes
  const hasChanges = Object.keys(getChangedValues()).length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Teaching Stats Section */}
      <Card>
        <CardHeader>
          <CardTitle>Teaching Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="teaching_experience_years">
                Years of Teaching Experience
              </Label>
              <Input
                id="teaching_experience_years"
                type="number"
                min="1"
                value={formData.teaching_experience_years || ""}
                onChange={(e) =>
                  handleInputChange("teaching_experience_years", e.target.value)
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="students_taught_count">Students Taught</Label>
              <Input
                id="students_taught_count"
                type="number"
                min="1"
                value={formData.students_taught_count || ""}
                onChange={(e) =>
                  handleInputChange("students_taught_count", e.target.value)
                }
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="about_hero_title">Hero Title</Label>
            <Input
              id="about_hero_title"
              value={formData.about_hero_title || ""}
              onChange={(e) =>
                handleInputChange("about_hero_title", e.target.value)
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="about_hero_description">Hero Description</Label>
            <Textarea
              id="about_hero_description"
              value={formData.about_hero_description || ""}
              onChange={(e) =>
                handleInputChange("about_hero_description", e.target.value)
              }
              rows={3}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Teaching Journey Section */}
      <Card>
        <CardHeader>
          <CardTitle>Teaching Journey</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="about_journey_title">Section Title</Label>
            <Input
              id="about_journey_title"
              value={formData.about_journey_title || ""}
              onChange={(e) =>
                handleInputChange("about_journey_title", e.target.value)
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="about_journey_paragraph_1">First Paragraph</Label>
            <Textarea
              id="about_journey_paragraph_1"
              value={formData.about_journey_paragraph_1 || ""}
              onChange={(e) =>
                handleInputChange("about_journey_paragraph_1", e.target.value)
              }
              rows={4}
              required
            />
          </div>
          <div>
            <Label htmlFor="about_journey_paragraph_2">Second Paragraph</Label>
            <Textarea
              id="about_journey_paragraph_2"
              value={formData.about_journey_paragraph_2 || ""}
              onChange={(e) =>
                handleInputChange("about_journey_paragraph_2", e.target.value)
              }
              rows={4}
              required
            />
          </div>
          <div>
            <Label htmlFor="about_journey_paragraph_3">Third Paragraph</Label>
            <Textarea
              id="about_journey_paragraph_3"
              value={formData.about_journey_paragraph_3 || ""}
              onChange={(e) =>
                handleInputChange("about_journey_paragraph_3", e.target.value)
              }
              rows={4}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Philosophy Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Teaching Philosophy Cards</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Teaching Philosophy</h4>
            <div>
              <Label htmlFor="about_philosophy_title">Title</Label>
              <Input
                id="about_philosophy_title"
                value={formData.about_philosophy_title || ""}
                onChange={(e) =>
                  handleInputChange("about_philosophy_title", e.target.value)
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="about_philosophy_content">Content</Label>
              <Textarea
                id="about_philosophy_content"
                value={formData.about_philosophy_content || ""}
                onChange={(e) =>
                  handleInputChange("about_philosophy_content", e.target.value)
                }
                rows={3}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">My Approach</h4>
            <div>
              <Label htmlFor="about_approach_title">Title</Label>
              <Input
                id="about_approach_title"
                value={formData.about_approach_title || ""}
                onChange={(e) =>
                  handleInputChange("about_approach_title", e.target.value)
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="about_approach_content">Content</Label>
              <Textarea
                id="about_approach_content"
                value={formData.about_approach_content || ""}
                onChange={(e) =>
                  handleInputChange("about_approach_content", e.target.value)
                }
                rows={3}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Who I Work With</h4>
            <div>
              <Label htmlFor="about_work_with_title">Title</Label>
              <Input
                id="about_work_with_title"
                value={formData.about_work_with_title || ""}
                onChange={(e) =>
                  handleInputChange("about_work_with_title", e.target.value)
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="about_work_with_content">Content</Label>
              <Textarea
                id="about_work_with_content"
                value={formData.about_work_with_content || ""}
                onChange={(e) =>
                  handleInputChange("about_work_with_content", e.target.value)
                }
                rows={3}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mission Section */}
      <Card>
        <CardHeader>
          <CardTitle>Mission Statement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="about_mission_title">Mission Title</Label>
            <Input
              id="about_mission_title"
              value={formData.about_mission_title || ""}
              onChange={(e) =>
                handleInputChange("about_mission_title", e.target.value)
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="about_mission_quote">Mission Quote</Label>
            <Textarea
              id="about_mission_quote"
              value={formData.about_mission_quote || ""}
              onChange={(e) =>
                handleInputChange("about_mission_quote", e.target.value)
              }
              rows={4}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card>
        <CardHeader>
          <CardTitle>Call to Action</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="about_cta_title">CTA Title</Label>
            <Input
              id="about_cta_title"
              value={formData.about_cta_title || ""}
              onChange={(e) =>
                handleInputChange("about_cta_title", e.target.value)
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="about_cta_description">CTA Description</Label>
            <Textarea
              id="about_cta_description"
              value={formData.about_cta_description || ""}
              onChange={(e) =>
                handleInputChange("about_cta_description", e.target.value)
              }
              rows={3}
              required
            />
          </div>
          <div>
            <Label htmlFor="about_cta_button_text">Button Text</Label>
            <Input
              id="about_cta_button_text"
              value={formData.about_cta_button_text || ""}
              onChange={(e) =>
                handleInputChange("about_cta_button_text", e.target.value)
              }
              required
            />
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        disabled={isLoading || !hasChanges}
        className="w-full"
      >
        {isLoading
          ? "Saving..."
          : hasChanges
          ? `Save ${Object.keys(getChangedValues()).length} Change(s)`
          : "No Changes to Save"}
      </Button>
    </form>
  );
}
