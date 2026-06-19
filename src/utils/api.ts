import { Herb, BlogPost, TraditionalRemedy, KnowledgeBaseArticle, ChatMessage, ContactMessage, BlogComment } from "../types";

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

export async function postChat(messages: ChatMessage[], currentQuery: string, language?: string): Promise<{ reply: string; logId: string; offline?: boolean; citations?: string[]; source?: 'ai' | 'local' }> {
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

export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; adminPin: string; isAdmin: boolean; email?: string; name?: string }> {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Invalid credentials.");
  }
  return res.json();
}

export async function signupUser(email: string, password: string, name: string): Promise<{ success: boolean; adminPin: string; isAdmin: boolean; email: string; name: string }> {
  const res = await fetch("/api/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to sign up.");
  }
  return res.json();
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

export async function updateMessageStatus(id: string, status: 'unread' | 'read' | 'replied', adminPin: string, resolved?: boolean): Promise<boolean> {
  const res = await fetch(`/api/messages/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-admin-pin": adminPin,
    },
    body: JSON.stringify({ status, resolved }),
  });
  if (!res.ok) throw new Error("Failed to update inquiry status.");
  return true;
}

export async function replyToMessage(id: string, replyText: string, adminPin: string): Promise<{ success: boolean; message: any; delivery: any }> {
  const res = await fetch(`/api/messages/${id}/reply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-pin": adminPin,
    },
    body: JSON.stringify({ replyText }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to dispatch email reply.");
  }
  return res.json();
}

// --- COMMENTS frontend API handlers ---

export async function fetchBlogComments(blogId: string): Promise<BlogComment[]> {
  const res = await fetch(`/api/blogs/${blogId}/comments`);
  if (!res.ok) throw new Error("Failed to fetch blog discussions.");
  return res.json();
}

export async function addBlogComment(blogId: string, author: string, text: string): Promise<BlogComment> {
  const res = await fetch(`/api/blogs/${blogId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ author, text }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Failed to post comment.");
  }
  const data = await res.json();
  return data.comment;
}

export async function fetchAllComments(adminPin: string): Promise<BlogComment[]> {
  const res = await fetch("/api/comments", {
    headers: {
      "x-admin-pin": adminPin,
    },
  });
  if (!res.ok) throw new Error("Failed to retrieve blog comments roster.");
  return res.json();
}

export async function moderateComment(
  id: string, 
  params: { approved?: boolean; replyText?: string; text?: string }, 
  adminPin: string
): Promise<boolean> {
  const res = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-admin-pin": adminPin,
    },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error("Failed to moderate comment.");
  return true;
}

export async function deleteComment(id: string, adminPin: string): Promise<boolean> {
  const res = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
    headers: {
      "x-admin-pin": adminPin,
    },
  });
  if (!res.ok) throw new Error("Failed to delete comment.");
  return true;
}
