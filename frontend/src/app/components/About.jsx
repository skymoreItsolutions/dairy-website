'use client'
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaLeaf, FaHandHoldingHeart, FaBullseye } from "react-icons/fa";
import CountUp from "react-countup";

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30"
          alt="Dairy Farm Landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#000000a1] bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Nature's Finest Dairy</h1>
            <p className="text-xl">Nurturing tradition, delivering excellence since 1950</p>
          </div>
        </div>
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <p className="text-lg text-gray-600">For over seven decades, we've been committed to producing the finest dairy products while maintaining sustainable farming practices and supporting local communities.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-lg shadow-lg text-center"
          >
            <FaLeaf className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
            <p className="text-gray-600">Implementing eco-friendly practices to protect our environment for future generations.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-lg shadow-lg text-center"
          >
            <FaHandHoldingHeart className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Ethical Farming</h3>
            <p className="text-gray-600">Treating our animals with respect and ensuring their wellbeing is our top priority.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-lg shadow-lg text-center"
          >
            <FaBullseye className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
            <p className="text-gray-600">Delivering fresh, high-quality dairy products from our farm to your table.</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              <CountUp end={70} duration={2.5} />+
            </div>
            <p className="text-gray-600">Years of Excellence</p>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              <CountUp end={500} duration={2.5} />+
            </div>
            <p className="text-gray-600">Local Farmers</p>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              <CountUp end={5000} duration={2.5} />
            </div>
            <p className="text-gray-600">Hectares of Farmland</p>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              <CountUp end={20} duration={2.5} />
            </div>
            <p className="text-gray-600">Sustainable Practices</p>
          </div>
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Learn More About Our Process
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default About;