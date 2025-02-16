// src/pages/LandingPage.js
import React from 'react';
import { Heart, Shield, Brain, Smile, MessageCircle, Activity } from 'lucide-react';

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-center w-12 h-12 mb-4 bg-indigo-100 rounded-full">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            A Caring AI Companion for Every Child
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Providing emotional support and understanding through innovative AI technology
          </p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors">
            Start Your Journey
          </button>
        </div>
      </header>

      {/* Main Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={Heart}
            title="Emotional Support"
            description="Real-time emotion recognition to provide personalized care and understanding"
          />
          <FeatureCard
            icon={Brain}
            title="Adaptive AI"
            description="Advanced technology that learns and grows with each child's unique needs"
          />
          <FeatureCard
            icon={Shield}
            title="Safe Space"
            description="A secure environment where children can express themselves freely"
          />
          <FeatureCard
            icon={Smile}
            title="Companionship"
            description="Always there to listen, support, and share in both joy and challenges"
          />
          <FeatureCard
            icon={MessageCircle}
            title="Interactive Dialog"
            description="Natural conversations that foster trust and emotional growth"
          />
          <FeatureCard
            icon={Activity}
            title="Progress Tracking"
            description="Monitor emotional well-being and development over time"
          />
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-indigo-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Making a Difference</h2>
            <p className="text-lg text-indigo-100 mb-8">
              Every child deserves to feel heard, understood, and supported. Through our AI companion, 
              we're creating meaningful connections that help children thrive.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-indigo-300">1000+</div>
                <div className="text-indigo-100">Children Supported</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-indigo-300">24/7</div>
                <div className="text-indigo-100">Availability</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-indigo-300">95%</div>
                <div className="text-indigo-100">Positive Feedback</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join us in supporting children with the power of AI companionship
          </p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 Orphan Companion. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
