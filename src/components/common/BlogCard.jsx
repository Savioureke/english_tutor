import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageSquare, ArrowRight } from 'lucide-react';

export default function BlogCard({ blog }) {
  return (
    <article className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group">
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-[16/10] bg-slate-100">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80';
          }}
        />
        {blog.category && (
          <span className="absolute top-3.5 left-3.5 bg-theme-coral text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {blog.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center space-x-4 text-xs text-slate-500 mb-3">
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-theme-primary" />
              <span>{blog.date}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-theme-coral" />
              <span>{blog.comments} Comments</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold font-jost text-theme-navy group-hover:text-theme-primary transition-colors line-clamp-2 mb-3 leading-snug">
            <Link to={`/blog/${blog.id}`}>
              {blog.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
            {blog.excerpt}
          </p>
        </div>

        {/* Read More link */}
        <div className="pt-4 border-t border-slate-100">
          <Link
            to={`/blog/${blog.id}`}
            className="inline-flex items-center space-x-2 text-sm font-semibold font-jost text-theme-primary group-hover:text-theme-coral transition-colors"
          >
            <span>Read Full Article</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
