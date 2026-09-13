import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import BlogCard from '../components/common/BlogCard';
import { blogPosts } from '../data/mockData';
import { Search } from 'lucide-react';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Fluency Tips', 'Exam Prep', 'Business English'];

  const filteredBlogs = blogPosts.filter((blog) => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <PageHeader
        title="English Study Guides & Articles"
        subtitle="Discover proven tips, grammar hacks, IELTS strategies, and vocabulary insights from our native tutors."
        breadcrumbs={[{ label: 'English Blog' }]}
      />

      <section className="py-16 lg:py-20 bg-[#f8f9fc]">
        <div className="container mx-auto">
          {/* Filter and Search Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-card border border-slate-100 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search English guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-11 pr-4 text-sm text-theme-navy placeholder-slate-400 focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold font-jost transition-colors ${
                    selectedCategory === cat
                      ? 'bg-theme-primary text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm max-w-md mx-auto">
              <p className="text-lg font-bold font-jost text-theme-navy mb-2">No articles found</p>
              <p className="text-sm text-slate-500 mb-4">Try searching with a different keyword or category.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="btn-primary text-xs px-5 py-2 rounded"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
