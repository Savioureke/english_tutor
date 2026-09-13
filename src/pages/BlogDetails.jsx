import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import { blogPosts } from '../data/mockData';
import { Calendar, MessageSquare, User, Tag, ArrowRight, Send, CheckCircle2 } from 'lucide-react';

export default function BlogDetails() {
  const { id } = useParams();
  const blog = blogPosts.find((b) => b.id === parseInt(id || '1')) || blogPosts[0];

  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentName && commentText) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setCommentName('');
      setCommentEmail('');
      setCommentText('');
    }
  };

  return (
    <div>
      <PageHeader
        title={blog.title}
        breadcrumbs={[
          { label: 'Blog', path: '/blog' },
          { label: 'Blog Details' }
        ]}
      />

      <section className="py-16 bg-[#f8f9fc]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Main Article Content (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              <article className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-slate-100">
                {/* Article Header Image */}
                <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-8 bg-slate-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 mb-6 pb-6 border-b border-slate-100">
                  <span className="flex items-center space-x-1.5">
                    <User className="w-4 h-4 text-theme-primary" />
                    <span>By {blog.author}</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-theme-primary" />
                    <span>{blog.date}</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <MessageSquare className="w-4 h-4 text-theme-coral" />
                    <span>{blog.comments} Comments</span>
                  </span>
                  <span className="bg-theme-primary/10 text-theme-primary font-semibold px-2.5 py-0.5 rounded-full text-xs">
                    {blog.category}
                  </span>
                </div>

                {/* Article Text Content */}
                <div className="space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">
                  <p>
                    Mastering a new language or digital skill in 2026 is no longer about rote memorization or tedious grammatical drilling. With modern interactive learning platforms, learners can achieve conversational confidence in record time by immersing themselves in practical contexts.
                  </p>

                  <h3 className="text-2xl font-bold font-jost text-theme-navy mt-8 mb-4">
                    1. Focus on High-Frequency Speaking Scenarios
                  </h3>
                  <p>
                    Studies demonstrate that the top 1,000 conversational words account for nearly 85% of daily professional speech. By prioritizing active verbal practice with certified native tutors, students bypass cognitive fatigue and develop instinctual fluency.
                  </p>

                  <blockquote className="p-6 rounded-2xl bg-[#f8f9fc] border-l-4 border-theme-primary my-6 font-jost italic text-theme-navy text-lg">
                    "Fluency is not the perfection of grammar; it is the confidence to connect, listen, and articulate your ideas without hesitation."
                  </blockquote>

                  <h3 className="text-2xl font-bold font-jost text-theme-navy mt-8 mb-4">
                    2. Consistency Trumps Long Study Cramming
                  </h3>
                  <p>
                    Committing to 20 minutes of daily deliberate practice produces substantially higher neural retention than a single 3-hour marathon session per week. Micro-learning modules and conversational quizzes keep your brain stimulated and engaged.
                  </p>
                </div>
              </article>

              {/* Leave a Comment Section */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-slate-100">
                <h3 className="text-2xl font-bold font-jost text-theme-navy mb-6">
                  Leave a Reply
                </h3>

                {submitted && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-700 flex items-center space-x-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>Your comment has been submitted and is awaiting approval.</span>
                  </div>
                )}

                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      required
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-theme-primary"
                    />
                    <input
                      type="email"
                      placeholder="Your Email *"
                      required
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-theme-primary"
                    />
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Write your comment here..."
                    required
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-theme-primary"
                  ></textarea>
                  <button type="submit" className="btn-primary rounded-md text-sm px-6 py-3">
                    <span>Post Comment</span>
                    <Send className="w-4 h-4 ml-2" />
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar (4 Cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Recent Articles Widget */}
              <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100">
                <h4 className="text-lg font-bold font-jost text-theme-navy mb-5 pb-3 border-b border-slate-100">
                  Recent Articles
                </h4>
                <div className="space-y-4">
                  {blogPosts.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 group">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-slate-100"
                      />
                      <div>
                        <span className="text-xs text-slate-400 block">{item.date}</span>
                        <Link
                          to={`/blog/${item.id}`}
                          className="text-sm font-bold font-jost text-theme-navy group-hover:text-theme-primary transition-colors line-clamp-2 leading-snug"
                        >
                          {item.title}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo Banner Widget */}
              <div className="bg-theme-navy text-white rounded-2xl p-6 text-center space-y-4 shadow-xl">
                <h4 className="text-xl font-bold font-jost text-white">
                  Join Our Free English Webinar
                </h4>
                <p className="text-xs text-slate-300">
                  Reserve your live virtual seat and receive our 2026 English Career Vocabulary Guide.
                </p>
                <Link to="/contact" className="btn-primary w-full text-center text-sm py-2.5 rounded block">
                  Register for Free
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
