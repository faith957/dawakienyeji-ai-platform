import { Herb, BlogPost, TraditionalRemedy, KnowledgeBaseArticle, ChatMessage, ContactMessage } from "../types";

export async function fetchPlants(): Promise<Herb[]> {
  const res = await fetch("/api/plants");
  if (!res.ok) throw new Error("Failed to load herbs.");
  return res.json();
}

export async function addPlant(herb: Omit<Herb, 'id'>, adminPin: string): Promise<boolean> {
  const res = await fetch("/api/plants", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-pin": adminPin,
    },
    body: JSON.stringify({ herb }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to add herb.");
  }
  return true;
}

export async function editPlant(id: string, herb: Herb, adminPin: string): Promise<boolean> {
  const res = await fetch(`/api/plants/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-admin-pin": adminPin,
    },
    body: JSON.stringify({ herb }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to edit herb.");
  }
  return true;
}

export async function deletePlant(id: string, adminPin: string): Promise<boolean> {
  const res = await fetch(`/api/plants/${id}`, {
    method: "DELETE",
    headers: {
      "x-admin-pin": adminPin,
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete herb.");
  }
  return true;
}

export async function fetchRemedies(): Promise<TraditionalRemedy[]> {
  const res = await fetch("/api/remedies");
  if (!res.ok) throw new Error("Failed to load remedies.");
  return res.json();
}

export async function fetchBlogs(): Promise<BlogPost[]> {
  const res = await fetch("/api/blogs");
  if (!res.ok) throw new Error("Failed to load blog posts.");
  return res.json();
}

export async function addBlog(blog: Omit<BlogPost, 'id' | 'date'>, adminPin: string): Promise<boolean> {
  const res = await fetch("/api/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-pin": adminPin,
    },
    body: JSON.stringify({ blog }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to post blog.");
  }
  return true;
}

export async function fetchArticles(): Promise<KnowledgeBaseArticle[]> {
  const res = await fetch("/api/articles");
  if (!res.ok) throw new Error("Failed to load articles.");
  return res.json();
}

export async function addArticle(article: Omit<KnowledgeBaseArticle, 'id' | 'lastUpdated'>, adminPin: string): Promise<boolean> {
  const res = await fetch("/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-pin": adminPin,
    },
    body: JSON.stringify({ article }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to upload document.");
  }
  return true;
}

export async function postChat(messages: ChatMessage[], currentQuery: string, language?: string): Promise<{ reply: string; logId: string; offline?: boolean; citations?: string[] }> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages, currentQuery, language }),
  });
  if (!res.ok) throw new Error("Chat bot service experiencing high demand. Please try again.");
  return res.json();
}

export async function sendChatFeedback(logId: string, rating: 'good' | 'bad'): Promise<void> {
  await fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ logId, rating }),
  });
}

export async function fetchAnalytics(): Promise<any> {
  const res = await fetch("/api/analytics");
  if (!res.ok) throw new Error("Failed to retrieve analytics.");
  return res.json();
}

export async function loginAdmin(email: string, password: string): Promise<string> {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Invalid administrative credentials.");
  }
  const data = await res.json();
  return data.adminPin;
}

export async function fetchMessages(adminPin: string): Promise<ContactMessage[]> {
  const res = await fetch("/api/messages", {
    headers: {
      "x-admin-pin": adminPin,
    },
  });
  if (!res.ok) throw new Error("Failed to load user inquiries.");
  return res.json();
}

export async function postMessage(message: Omit<ContactMessage, 'id' | 'timestamp' | 'status'>): Promise<ContactMessage> {
  const res = await fetch("/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to submit consultative inquiry.");
  }
  const data = await res.json();
  return data.message;
}

export async function updateMessageStatus(id: string, status: 'unread' | 'read' | 'replied', adminPin: string): Promise<boolean> {
  const res = await fetch(`/api/messages/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-admin-pin": adminPin,
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update inquiry status.");
  return true;
}
