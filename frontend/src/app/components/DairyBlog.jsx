'use client'
import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaShare } from "react-icons/fa";
import { format } from "date-fns";

const DairyBlog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    "all",
    "Farming Techniques",
    "Nutrition",
    "Dairy Recipes",
    "Industry News"
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Modern Dairy Farming: A Sustainable Approach",
      excerpt: "Discover how modern dairy farms are implementing sustainable practices while maintaining high-quality production standards.",
      imageUrl: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71",
      author: "John Smith",
      publishDate: new Date(2024, 0, 15),
      category: "Farming Techniques"
    },
    {
      id: 2,
      title: "The Benefits of Organic Dairy Products",
      excerpt: "Learn about the nutritional advantages of choosing organic dairy products and their impact on health.",
      imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
      author: "Emma Wilson",
      publishDate: new Date(2024, 0, 10),
      category: "Nutrition"
    },
    {
      id: 3,
      title: "Artisanal Cheese Making Guide",
      excerpt: "Step-by-step instructions for creating delicious artisanal cheese at home using traditional methods.",
      imageUrl: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d",
      author: "Michael Brown",
      publishDate: new Date(2024, 0, 5),
      category: "Dairy Recipes"
    },
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const BlogCard = ({ post }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-[1.02]">
      <div className="relative overflow-hidden h-48">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white rounded-full shadow-md">
            <FaShare className="text-blue-600" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm italic text-gray-500">{post.author}</span>
          <span className="text-sm text-gray-400">
            {format(post.publishDate, "MMM dd, yyyy")}
          </span>
        </div>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
          Read More
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
            Dairy Insights & Stories
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Explore the latest trends, innovations, and stories from the dairy industry. From farm to table, discover the passion behind every drop of milk.
          </p>
        </div>
      </div> */}

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full py-3 px-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>

          <div className="flex overflow-x-auto pb-4 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"}
                transition-colors duration-300`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DairyBlog;