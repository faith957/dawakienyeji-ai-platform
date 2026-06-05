import React, { useState, useEffect } from "react";
import { User, Calendar, Clock, ArrowRight, MessageSquare, Heart, Bookmark, Eye, CornerDownRight, X, Sparkles } from "lucide-react";
import { BlogPost } from "../types";
import { fetchBlogs } from "../utils/api";
import Markdown from "react-markdown";
import { useLanguage } from "../utils/LanguageContext";

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export default function BlogFeed() {
  const { t, translateBlog, language } = useLanguage();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Likes & Bookmarks State
  const [likes, setLikes] = useState<{ [id: string]: number }>({});
  const [hasLiked, setHasLiked] = useState<{ [id: string]: boolean }>({});
  const [bookmarks, setBookmarks] = useState<{ [id: string]: boolean }>({});

  // Comments State (associated with blog IDs)
  const [commentsMap, setCommentsMap] = useState<{ [blogId: string]: Comment[] }>({
    'b1': [
      { id: '1', author: 'Dr. Joseph Ndingi', text: 'Preserving this knowledge was long overdue. Combining AI RAG with verified oral lore is spectacular.', timestamp: '3 days ago' },
      { id: '2', author: 'Kamau wa Kuria', text: 'Grandmother used Muthiga for our colds. This is highly accurate!', timestamp: '2 days ago' }
    ],
    'b2': [
      { id: '1', author: 'Grace Wanjiku', text: 'Mugumo holds incredible cultural reverence. The ecological side benefit of sacred trees is a beautiful lesson.', timestamp: '1 day ago' }
    ]
  });
  
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
        // Seed default likes
        const defaultLikes: { [id: string]: number } = {};
        data.forEach((b) => {
          defaultLikes[b.id] = b.id === 'b1' ? 24 : b.id === 'b2' ? 18 : 12;
        });
        setLikes(defaultLikes);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked[id]) {
      setLikes(prev => ({ ...prev, [id]: prev[id] - 1 }));
      setHasLiked(prev => ({ ...prev, [id]: false }));
    } else {
      setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));
      setHasLiked(prev => ({ ...prev, [id]: true }));
    }
  };

  const handleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentText.trim() || !activeBlog) return;

    const newComment: Comment = {
      id: String(Date.now()),
      author: commentAuthor.trim(),
      text: commentText.trim(),
      timestamp: "Just now"
    };

    setCommentsMap(prev => {
      const existing = prev[activeBlog.id] || [];
      return {
        ...prev,
        [activeBlog.id]: [...existing, newComment]
      };
    });

    setCommentAuthor("");
    setCommentText("");
  };

  return (
    <div id="blogs-viewport" className="space-y-8 font-sans max-w-7xl mx-auto px-4 relative">
      
      {/* Title Header Banner Deck */}
      <div className="bg-stone-50 p-6 md:p-8 rounded-3xl border border-stone-250/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Editorial Columns</span>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight font-sans">The DawaKienyeji Chronicles</h1>
          <p className="text-sm text-stone-500 leading-relaxed font-normal">
            Weekly research essays, indigenous botanical lore, and ecological forestry updates of central Kenya. Explore real stories behind ancestral wisdom.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-xs text-stone-400">Loading blog archives...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((rawBlog) => {
            const blog = translateBlog(rawBlog);
            return (
              <div 
                key={blog.id}
                onClick={() => setActiveBlog(rawBlog)}
                id={`blog-card-${blog.id}`}
                className="bg-white border border-stone-250 hover:border-emerald-700/40 rounded-3xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-700/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
              <div className="space-y-4">
                {/* Botanical Gradient Hero Cover */}
                <div className={`h-44 bg-gradient-to-br ${blog.imageColor} p-5 flex flex-col justify-between text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-2 opacity-10 pointer-events-none group-hover:scale-105 transition duration-500">
                    <Sparkles className="w-40 h-40" />
                  </div>
                  
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-white/20 backdrop-blur rounded-full self-start">
                    {blog.category}
                  </span>

                  <div className="space-y-1">
                    <p className="text-[9px] text-emerald-200 uppercase tracking-widest font-mono">Published Essay</p>
                    <h3 className="text-md font-extrabold leading-snug line-clamp-2 tracking-tight">
                      {blog.title}
                    </h3>
                  </div>
                </div>

                {/* Excerpt Body */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-3 font-normal">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-[10px] text-stone-400 font-bold border-t border-stone-100 pt-3">
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-stone-500" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-500" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-500" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interaction Bar */}
              <div className="px-5 pb-5 pt-1.5 flex items-center justify-between border-t border-stone-50 text-[11px] text-stone-500 font-bold">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={(e) => handleLike(blog.id, e)}
                    className={`flex items-center gap-1 transition ${hasLiked[blog.id] ? 'text-red-500 font-extrabold' : 'hover:text-red-500'}`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasLiked[blog.id] ? 'fill-red-500' : ''}`} />
                    <span>{likes[blog.id] || 0}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-emerald-700">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{(commentsMap[blog.id] || []).length}</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={(e) => handleBookmark(blog.id, e)}
                    className={`hover:text-emerald-700 transition ${bookmarks[blog.id] ? 'text-emerald-800' : ''}`}
                    title="Bookmark article"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarks[blog.id] ? 'fill-emerald-800' : ''}`} />
                  </button>
                  <span className="text-emerald-850 hover:text-emerald-700 inline-flex items-center gap-0.5 group-hover:translate-x-1 duration-255 font-extrabold">
                    Read Essay
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </div>
          );
          })}
        </div>
      )}

      {/* Blog Article Reader view modal overlay */}
      {activeBlog && (() => {
        const ab = translateBlog(activeBlog);
        return (
          <div id="blog-reader-modal" className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6 font-sans">
            <div 
              className="w-full max-w-4xl h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-stone-200"
              role="dialog"
              aria-modal="true"
            >
              {/* Left side: Editorial Full-text columns */}
              <div className="flex-1 flex flex-col overflow-y-auto">
                
                {/* Cover banner */}
                <div className={`p-6 md:p-10 bg-gradient-to-br ${ab.imageColor} text-white relative`}>
                  <button
                    onClick={() => setActiveBlog(null)}
                    className="absolute right-4 top-4 p-1.5 hover:bg-white/25 rounded-full border border-white/20 hover:border-white transition text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="max-w-2xl space-y-4 pt-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 bg-white/20 backdrop-blur rounded-full">
                      {ab.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-sans">
                      {ab.title}
                    </h2>
                    <div className="flex items-center gap-4 text-xs text-emerald-200 font-bold">
                      <span>By: {ab.author}</span>
                      <span>•</span>
                      <span>{ab.date}</span>
                      <span>•</span>
                      <span>{ab.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Text Body Article */}
                <div className="p-6 md:p-8 space-y-6">
                  
                  {/* Full editorial parsed with markdown helper */}
                  <div className="prose prose-emerald max-w-none break-all text-stone-750 text-sm font-semibold leading-relaxed space-y-4">
                    <Markdown>{ab.content}</Markdown>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400 font-bold">
                    <span>DawaKienyeji Educational Registry</span>
                    <span>License: CC Creative Commons Attribution</span>
                  </div>
                </div>

              </div>

              {/* Right side: Commenting system panel block */}
              <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-stone-200 bg-stone-50 flex flex-col justify-between shrink-0 h-1/3 md:h-full">
                
                {/* Header Comment Count */}
                <div className="p-4 border-b border-stone-200">
                  <h4 className="text-xs font-extrabold uppercase text-emerald-850 tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-emerald-700 animate-pulse" />
                    Discussions ({(commentsMap[ab.id] || []).length})
                  </h4>
                </div>

                {/* Comment logs scroll */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                  {(commentsMap[ab.id] || []).map((com) => (
                    <div key={com.id} className="bg-white border border-stone-200 p-3 rounded-2xl space-y-1 z-10 block">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-stone-900 text-xs flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-stone-500" />
                          {com.author}
                        </span>
                        <span className="text-[9px] text-stone-400">{com.timestamp}</span>
                      </div>
                      <p className="text-stone-700 text-xs font-semibold leading-relaxed">
                        {com.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Post commentator Form */}
                <form onSubmit={submitComment} className="p-4 border-t border-stone-200 space-y-2 bg-stone-100">
                  <input
                    type="text"
                    required
                    placeholder="Your Name (e.g. Kiprop Waithera)"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-white text-stone-900 font-semibold focus:outline-none"
                  />
                  <div className="relative flex items-center">
                    <textarea
                      rows={2}
                      required
                      placeholder="Ask a question or add a recipe reflection..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full p-2.5 pr-10 border border-stone-300 rounded-lg text-xs bg-white text-stone-900 font-normal leading-relaxed focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 px-2.5 py-1 bg-emerald-950 text-white hover:bg-emerald-800 rounded font-bold text-[10px]"
                    >
                      Post
                    </button>
                  </div>
                </form>

              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
}
