import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, BookOpen, Users, Award } from "lucide-react";
import { PreplyStats } from "@/components/preply-stats";
import { serverDb } from "@/utils/supabase/database";

export const metadata = {
  title: "About Priscilla - Teach with Priscilla",
  description:
    "Learn about Priscilla, a passionate English teacher dedicated to helping non-native kids and beginners master the English language.",
};

export default async function AboutPage() {
  // Default values for all dynamic content
  const defaultContent = {
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

    // Stats (existing)
    teaching_experience_years: "5",
    students_taught_count: "200",
  };

  // Get dynamic values from database with fallbacks
  let content = { ...defaultContent };

  try {
    const settingsKeys = Object.keys(defaultContent);
    const settingsResults = await Promise.all(
      settingsKeys.map((key) => serverDb.settings.get(key))
    );

    settingsResults.forEach((result, index) => {
      if (result.data) {
        const key = settingsKeys[index];
        content[key] = result.data.value;
      }
    });
  } catch (error) {
    console.error("Error loading site settings, using defaults:", error);
    // Use default values if there's any error
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="mb-8">
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Priscilla - English Teacher"
            width={200}
            height={200}
            className="rounded-full mx-auto"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
          {content.about_hero_title}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {content.about_hero_description}
        </p>
      </div>

      {/* Preply Stats */}
      <div className="max-w-2xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          My Teaching Impact
        </h2>
        <PreplyStats />
      </div>

      {/* Story Section */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {content.about_journey_title}
          </h2>
          <div className="prose prose-lg text-gray-600">
            <p>{content.about_journey_paragraph_1}</p>
            <p>{content.about_journey_paragraph_2}</p>
            <p>{content.about_journey_paragraph_3}</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Heart className="h-8 w-8 text-red-500" />
                <h3 className="text-xl font-semibold">
                  {content.about_philosophy_title}
                </h3>
              </div>
              <p className="text-gray-600">
                {content.about_philosophy_content}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <BookOpen className="h-8 w-8 text-blue-500" />
                <h3 className="text-xl font-semibold">
                  {content.about_approach_title}
                </h3>
              </div>
              <p className="text-gray-600">{content.about_approach_content}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Users className="h-8 w-8 text-green-500" />
                <h3 className="text-xl font-semibold">
                  {content.about_work_with_title}
                </h3>
              </div>
              <p className="text-gray-600">{content.about_work_with_content}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats/Achievements */}
      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Teaching Highlights
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900">
              {content.teaching_experience_years}+
            </div>
            <div className="text-gray-600">Years Teaching Experience</div>
          </div>
          <div>
            <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900">
              {content.students_taught_count}+
            </div>
            <div className="text-gray-600">Students Taught</div>
          </div>
          <div>
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900">100%</div>
            <div className="text-gray-600">Passion for Teaching</div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {content.about_mission_title}
        </h2>
        <blockquote className="text-xl italic text-gray-700 max-w-4xl mx-auto">
          "{content.about_mission_quote}"
        </blockquote>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {content.about_cta_title}
        </h2>
        <p className="text-gray-600 mb-6">{content.about_cta_description}</p>
        <Button asChild size="lg">
          <Link
            href="https://preply.com/en/tutor/6530776"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.about_cta_button_text}
          </Link>
        </Button>
      </div>
    </div>
  );
}
