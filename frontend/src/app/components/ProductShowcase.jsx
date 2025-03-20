'use client'
import React, { useState, useEffect } from "react";
import { FaHeart, FaStar, FaSearch, FaTimes, FaShoppingCart } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";

const dummyProducts = [
  {
    id: 1,
    name: "Organic Whole Milk",
    description: "Fresh organic whole milk from",
    price: 4.99,
    originalPrice: 5.99,
    rating: 4.5,
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
    inStock: true
  },
  {
    id: 2,
    name: "Artisan Cheese Selection",
    description: "Premium aged cheese assortment",
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.8,
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862",
    inStock: true
  },
  {
    id: 3,
    name: "Greek Yogurt Pack",
    description: "High-protein natural Greek yogurt",
    price: 6.99,
    originalPrice: 8.99,
    rating: 4.3,
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
    inStock: false
  },
  {
    id: 4,
    name: "Farm Fresh Butter",
    description: "Creamy butter from local dairy farms",
    price: 5.99,
    originalPrice: 7.99,
    rating: 4.6,
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d",
    inStock: true
  }
];

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [category, setCategory] = useState("all");
  const [wishlist, setWishlist] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(dummyProducts);
      setLoading(false);
    }, 1500);
  }, []);

  const handleSort = (value) => {
    setSortBy(value);
    let sortedProducts = [...products];
    switch (value) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const RatingStars = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`${index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"} w-4 h-4`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  const ProductCard = ({ product }) => {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    return (
      <div className="relative group bg-white  rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="relative pt-[50%] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
            }}
          />
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
              {discount}%
            </div>
          )}
          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
          >
            <FaHeart
              className={`w-5 h-5 ${wishlist.includes(product.id) ? "text-red-500" : "text-gray-400"}`}
            />
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800  mb-2">{product.name}</h3>
          <p className="text-sm text-gray-600  mb-2">{product.description}</p>
          <RatingStars rating={product.rating} />
          
          <div className="mt-3 flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-gray-900 ">${product.price}</span>
              {discount > 0 && (
                <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
            <button
              onClick={() => {
                setSelectedProduct(product);
                setShowModal(true);
              }}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <IoEyeSharp className="w-5 h-5" />
            </button>
          </div>

          <button
            disabled={!product.inStock}
            className={`mt-4 w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${product.inStock
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          >
            {product.inStock ? (
              <>
                <FaShoppingCart className="inline-block mr-2" />
                Add to Cart
              </>
            ) : (
              "Out of Stock"
            )}
          </button>
        </div>
      </div>
    );
  };

  const QuickViewModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000bf] bg-opacity-50">
        <div className="relative bg-white  rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 "
          >
            <FaTimes className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div className="relative pt-[100%] bg-gray-100  rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900  mb-4">{product.name}</h2>
              <p className="text-gray-600  mb-4">{product.description}</p>
              <RatingStars rating={product.rating} />

              <div className="mt-6">
                <span className="text-3xl font-bold text-gray-900 ">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="ml-3 text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>

              <button
                disabled={!product.inStock}
                className={`mt-8 w-full py-3 px-6 rounded-md font-medium transition-colors duration-200 ${product.inStock
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div >
      <div className="h-auto bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 ">Product Showcase</h1>
           
          </div>

         
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-white  rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="bg-gray-300  h-64" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-300  rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-300  rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter(product => category === "all" || product.category.toLowerCase() === category)
                .map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          )}
        </div>

        <QuickViewModal
          product={selectedProduct}
          onClose={() => {
            setShowModal(false);
            setSelectedProduct(null);
          }}
        />
      </div>
    </div>
  );
};

export default ProductShowcase;