import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BlogCard from '../common/BlogCard';
import { blogPosts } from '../../data/mockData';

export default function BlogSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#f8f9fc]">
      <div className="container mx-auto">
        {/* Section Title */}
        <div className="section-title">
          <span className="section-title-tag">
            English Study Guides
          </span>
          <h2 className="section-title-heading">
            Latest Tips, Idioms & Fluency Articles
          </h2>
          <p className="section-title-desc">
            Stay updated with proven speaking techniques, IELTS test strategies, and professional vocabulary guides.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.slice(0, 3).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link to="/blog" className="btn-outline">
            <span>Read All English Guides</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
