// Environment variable validation utility
export function validateEnvironment() {
  const requiredEnvVars = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]

  const missingVars = requiredEnvVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    const errorMessage = `
❌ Missing required environment variables:
${missingVars.map((varName) => `   - ${varName}`).join("\n")}

📋 Setup Instructions:
1. Create a .env.local file in your project root
2. Add the following variables:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000

🔍 Where to find these values:
- Go to your Supabase dashboard
- Navigate to Settings > API
- Copy the values from there

🚀 For production deployment:
- Add these same variables to your Vercel environment variables
- Go to your Vercel project > Settings > Environment Variables
    `

    throw new Error(errorMessage)
  }

  return true
}
