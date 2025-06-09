import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, BookOpen, Users, Award } from "lucide-react";
import { PreplyStats } from "@/components/preply-stats";
import { getSiteSetting } from "@/lib/site-settings";

export const metadata = {
  title: "About Priscilla - Teach with Priscilla",
  description:
    "Learn about Priscilla, a passionate English teacher dedicated to helping non-native kids and beginners master the English language.",
};

export default async function AboutPage() {
  // Get dynamic values from database with fallbacks
  let teachingYears = "5";
  let studentsCount = "200";

  try {
    teachingYears = await getSiteSetting("teaching_experience_years", "5");
    studentsCount = await getSiteSetting("students_taught_count", "200");
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
          Hi, I'm Priscilla!
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A passionate English teacher dedicated to helping non-native kids and
          beginners (teens/adults) discover the joy of language learning through
          patience, creativity, and care.
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
            My Teaching Journey
          </h2>
          <div className="prose prose-lg text-gray-600">
            <p>
              My journey into teaching English began with a simple realization:
              language learning should be an adventure, not a chore. After years
              of working with children from diverse backgrounds, I've discovered
              that every student has a unique way of connecting with English.
            </p>
            <p>
              What drives me most is witnessing those magical "aha!" moments
              when a concept finally clicks. Whether it's a shy 6-year-old
              saying their first complete sentence or a teenager finally
              understanding a grammar rule they've been struggling with, these
              breakthroughs remind me why I love what I do.
            </p>
            <p>
              I believe that learning English should build confidence, not tear
              it down. That's why I focus on creating a safe, encouraging
              environment where mistakes are celebrated as stepping stones to
              success.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Heart className="h-8 w-8 text-red-500" />
                <h3 className="text-xl font-semibold">
                  My Teaching Philosophy
                </h3>
              </div>
              <p className="text-gray-600">
                Every child deserves to feel confident and excited about
                learning. I create personalized lessons that meet each student
                where they are and help them grow at their own pace.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <BookOpen className="h-8 w-8 text-blue-500" />
                <h3 className="text-xl font-semibold">My Approach</h3>
              </div>
              <p className="text-gray-600">
                I use interactive games, storytelling, and real-world
                conversations to make learning engaging and memorable. Grammar
                and vocabulary become natural parts of fun activities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Users className="h-8 w-8 text-green-500" />
                <h3 className="text-xl font-semibold">Who I Work With</h3>
              </div>
              <p className="text-gray-600">
                I specialize in teaching non-native English speakers, from young
                children taking their first steps in English to teenagers and
                adults preparing for exams or building conversational skills.
              </p>
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
              {teachingYears}+
            </div>
            <div className="text-gray-600">Years Teaching Experience</div>
          </div>
          <div>
            <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900">
              {studentsCount}+
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
        <h2 className="text-3xl font-bold text-gray-900 mb-6">My Mission</h2>
        <blockquote className="text-xl italic text-gray-700 max-w-4xl mx-auto">
          "To create a world where every child feels confident and excited about
          learning English. Through patience, creativity, and genuine care, I
          help young learners build not just language skills, but also the
          confidence to express themselves and connect with others."
        </blockquote>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Start Learning?
        </h2>
        <p className="text-gray-600 mb-6">
          I'd love to help your child discover the joy of English learning.
          Let's schedule a lesson and begin this exciting journey together!
        </p>
        <Button asChild size="lg">
          <Link
            href="https://preply.com/en/tutor/6530776"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Lesson with Me
          </Link>
        </Button>
      </div>
    </div>
  );
}
