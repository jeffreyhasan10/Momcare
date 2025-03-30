import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { extendedButtonVariants } from "@/components/ui/button-variants";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import WelcomeModal from "@/components/WelcomeModal";

const Index = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  // Animation variants for page elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  useEffect(() => {
    // Check if this is the user's first visit
    const hasVisitedBefore = localStorage.getItem("hasVisitedMomCare");

    if (!hasVisitedBefore) {
      setShowModal(true);
      localStorage.setItem("hasVisitedMomCare", "true");
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Using just showModal state for the dialog component, not explicit props */}
      <WelcomeModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Hero Section */}
      <motion.section
        className="relative h-[85vh] bg-gradient-to-b from-pink-50 to-slate-50 flex items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 space-y-6"
              variants={itemVariants}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-lora font-bold text-gray-800 leading-tight">
                Guiding Your <span className="text-pink-500">Motherhood</span>{" "}
                Journey
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
                A comprehensive support system for mothers through pregnancy,
                childbirth, and early parenthood with expert guidance and
                community support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to={user ? "/tracking" : "/signup"}>
                  <Button
                    className={extendedButtonVariants({
                      variant: "pink",
                      className: "text-lg py-6 px-8",
                    })}
                  >
                    {user ? "Go to Dashboard" : "Start Your Journey"}
                  </Button>
                </Link>
                <Link to="/resources">
                  <Button
                    className="text-lg py-6 px-8 bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-100"
                    variant="outline"
                  >
                    Explore Resources
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="w-full lg:w-1/2 relative"
              variants={itemVariants}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1530047625168-4b29bfbbe1fc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Mother and baby"
                className="rounded-3xl shadow-xl mx-auto max-w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Your Complete Motherhood Companion
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MomCare provides everything you need through your journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <motion.div
              className="bg-white rounded-xl shadow-md p-8 relative overflow-hidden border-t-4 border-pink-400"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mb-6">
                <div className="h-14 w-14 bg-pink-100 rounded-full flex items-center justify-center">
                  <svg
                    className="h-8 w-8 text-pink-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Health Tracking
              </h3>
              <p className="text-gray-600">
                Monitor your pregnancy progress, baby's development, and your
                health metrics in one place.
              </p>
              <div className="mt-6">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">
                    Feature Completeness
                  </span>
                  <span className="text-sm text-pink-500 font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2 bg-pink-100" />
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-white rounded-xl shadow-md p-8 relative overflow-hidden border-t-4 border-purple-400"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mb-6">
                <div className="h-14 w-14 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="h-8 w-8 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Community Support
              </h3>
              <p className="text-gray-600">
                Connect with other mothers, share experiences, and learn from a
                supportive community.
              </p>
              <div className="mt-6">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">
                    Feature Completeness
                  </span>
                  <span className="text-sm text-purple-500 font-medium">
                    90%
                  </span>
                </div>
                <Progress value={90} className="h-2 bg-purple-100" />
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-white rounded-xl shadow-md p-8 relative overflow-hidden border-t-4 border-blue-400"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mb-6">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="h-8 w-8 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Expert Resources
              </h3>
              <p className="text-gray-600">
                Access evidence-based information, articles, and advice from
                healthcare professionals.
              </p>
              <div className="mt-6">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">
                    Feature Completeness
                  </span>
                  <span className="text-sm text-blue-500 font-medium">95%</span>
                </div>
                <Progress value={95} className="h-2 bg-blue-100" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-20 bg-gradient-to-r from-pink-100 to-purple-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Start Your Motherhood Journey Today
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of mothers who rely on MomCare for guidance, support,
            and peace of mind.
          </p>
          <Link to={user ? "/tracking" : "/signup"}>
            <Button
              className={extendedButtonVariants({
                variant: "pink",
                className: "text-lg py-6 px-8",
              })}
            >
              {user ? "Go to Dashboard" : "Join MomCare"}
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
