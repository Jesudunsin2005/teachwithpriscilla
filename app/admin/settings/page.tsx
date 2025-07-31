import { SiteSettingsForm } from "@/components/admin/site-settings-form";
import { serverDb } from "@/utils/supabase/database";

export const metadata = {
  title: "Site Settings - Admin Dashboard",
};

export default async function AdminSettingsPage() {
  // Default values for all settings
  const defaultSettings = {
    // Teaching Stats
    teaching_experience_years: "5",
    students_taught_count: "200",

    // Hero Section
    about_hero_title: "Hi, I'm Priscilla!",
    about_hero_description:
      "A passionate English teacher dedicated to helping non-native kids and beginners (teens/adults) discover the joy of language learning through patience, creativity, and care.",

    // Teaching Journey Section
    about_journey_title: "My Teaching Journey",
    about_journey_paragraph_1:
      "My journey into teaching English began with a simple realization: language learning should be an adventure, not a chore. After years of working with children from diverse backgrounds, I've discovered that every student has a unique way of connecting with English.",
    about_journey_paragraph_2:
      "What drives me most is witnessing those magical \"aha!\" moments when a concept finally clicks. Whether it's a shy 6-year-old saying their first complete sentence or a teenager finally understanding a grammar rule they've been struggling with, these breakthroughs remind me why I love what I do.",
    about_journey_paragraph_3:
      "I believe that learning English should build confidence, not tear it down. That's why I focus on creating a safe, encouraging environment where mistakes are celebrated as stepping stones to success.",

    // Philosophy Cards
    about_philosophy_title: "My Teaching Philosophy",
    about_philosophy_content:
      "Every child deserves to feel confident and excited about learning. I create personalized lessons that meet each student where they are and help them grow at their own pace.",
    about_approach_title: "My Approach",
    about_approach_content:
      "I use interactive games, storytelling, and real-world conversations to make learning engaging and memorable. Grammar and vocabulary become natural parts of fun activities.",
    about_work_with_title: "Who I Work With",
    about_work_with_content:
      "I specialize in teaching non-native English speakers, from young children taking their first steps in English to teenagers and adults preparing for exams or building conversational skills.",

    // Mission Section
    about_mission_title: "My Mission",
    about_mission_quote:
      "To create a world where every child feels confident and excited about learning English. Through patience, creativity, and genuine care, I help young learners build not just language skills, but also the confidence to express themselves and connect with others.",

    // CTA Section
    about_cta_title: "Ready to Start Learning?",
    about_cta_description:
      "I'd love to help your child discover the joy of English learning. Let's schedule a lesson and begin this exciting journey together!",
    about_cta_button_text: "Book a Lesson with Me",
  };

  let settings = { ...defaultSettings };

  try {
    const settingsKeys = Object.keys(defaultSettings);
    const settingsResults = await Promise.all(
      settingsKeys.map((key) => serverDb.settings.get(key))
    );

    settingsResults.forEach((result, index) => {
      if (result.data) {
        const key = settingsKeys[index];
        settings[key as keyof typeof settings] = result.data.value;
      }
    });
  } catch (error) {
    console.error("Error loading settings in admin, using defaults:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-600">
          Manage editable content across your site
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">About Page Content</h2>
        <p className="text-sm text-gray-600 mb-4">
          Update the content displayed on the About page. All changes will be
          reflected immediately.
        </p>
        <SiteSettingsForm settings={settings} />
      </div>
    </div>
  );
}
