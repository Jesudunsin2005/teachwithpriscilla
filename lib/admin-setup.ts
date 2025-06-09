// Admin setup utilities
export const DEFAULT_ADMIN_CREDENTIALS = {
  email: "admin@teachwithpriscilla.com",
  password: "TeachAdmin2024!",
}

// Function to create admin user programmatically (if needed)
export async function createAdminUser() {
  // This would typically be used in a setup script
  // For security, we'll create the user manually through Supabase dashboard
  console.log("Default admin credentials:")
  console.log("Email:", DEFAULT_ADMIN_CREDENTIALS.email)
  console.log("Password:", DEFAULT_ADMIN_CREDENTIALS.password)
  console.log("Please create this user in your Supabase Auth dashboard")
}
