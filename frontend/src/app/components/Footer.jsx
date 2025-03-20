'use client'
import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaMoon, FaSun, FaCopy } from "react-icons/fa";

const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [showTooltip, setShowTooltip] = useState("");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setDarkMode(theme === "dark");
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    setEmail("");
    alert("Thank you for subscribing!");
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(`${type} copied!`);
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (err) {
      setCopySuccess("Failed to copy");
    }
  };

  return (
    <footer className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Identity */}
          <div className="space-y-4">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <img
                src='/logo.png'
                alt="Dairy Logo"
                className="h-16 w-auto"
              />
            </div>
            <p className="text-lg font-semibold">Fresh & Pure Dairy</p>
            <p className="text-sm opacity-80">Bringing nature's goodness to your table</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Products", "Contact"].map((link) => (
                <li key={link}>
                  <button className="hover:underline focus:outline-none focus:text-blue-500 transition-colors duration-300">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FaPhone className="text-blue-500" />
                <a href="tel:+1234567890" className="hover:text-blue-500 transition-colors duration-300">+1 (234) 567-890</a>
                <button
                  onClick={() => copyToClipboard("+1234567890", "Phone")}
                  className="ml-2 hover:text-blue-500 transition-colors duration-300"
                >
                  <FaCopy />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-blue-500" />
                <a href="mailto:info@dairyfresh.com" className="hover:text-blue-500 transition-colors duration-300">info@dairyfresh.com</a>
                <button
                  onClick={() => copyToClipboard("info@dairyfresh.com", "Email")}
                  className="ml-2 hover:text-blue-500 transition-colors duration-300"
                >
                  <FaCopy />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-blue-500" />
                <span>123 Dairy Lane, Milk City, MC 12345</span>
              </div>
              {copySuccess && (
                <div className="text-sm text-green-500 mt-2">{copySuccess}</div>
              )}
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 flex flex-wrap justify-center space-x-6">
          {[
            { icon: FaFacebook, name: "Facebook" },
            { icon: FaTwitter, name: "Twitter" },
            { icon: FaInstagram, name: "Instagram" },
            { icon: FaLinkedin, name: "LinkedIn" },
          ].map((social) => (
            <div key={social.name} className="relative">
              <button
                className="text-2xl hover:scale-110 hover:text-blue-500 transition-all duration-300"
                onMouseEnter={() => setShowTooltip(social.name)}
                onMouseLeave={() => setShowTooltip("")}
                aria-label={social.name}
              >
                <social.icon />
              </button>
              {showTooltip === social.name && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm">
                  {social.name}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Copyright and Theme Toggle */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm opacity-80">
            © {new Date().getFullYear()} Fresh & Pure Dairy. All rights reserved.
          </div>
          <div className="flex space-x-4 text-sm">
            <button className="hover:text-blue-500 transition-colors duration-300">Terms of Service</button>
            <button className="hover:text-blue-500 transition-colors duration-300">Privacy Policy</button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;