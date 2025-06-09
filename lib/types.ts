export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  published_at?: string
  created_at: string
  updated_at: string
}

export interface Resource {
  id: string
  title: string
  description?: string
  file_path: string
  created_at: string
}

export interface Subscriber {
  id: string
  email: string
  subscribed_at: string
  confirmed: boolean
}
