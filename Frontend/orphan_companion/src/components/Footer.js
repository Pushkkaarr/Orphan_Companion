"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-display font-bold text-family-deep-blue">
                Family<span className="text-family-accent">Connect</span>
              </span>
            </Link>
            <p className="text-family-text-light mb-6 max-w-md">
              Creating meaningful connections through AI family members, providing support and understanding whenever you need it.
            </p>
            <div className="flex items-center text-family-text-light">
              <span>Made with</span>
              <Heart className="w-4 h-4 mx-1 text-family-accent" />
              <span>for everyone seeking connection</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-medium text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-family-text-light hover:text-family-deep-blue transition-colors">Home</Link></li>
              <li><Link href="/About" className="text-family-text-light hover:text-family-deep-blue transition-colors">About</Link></li>
              <li><Link href="/Models" className="text-family-text-light hover:text-family-deep-blue transition-colors">Family Models</Link></li>
              <li><Link href="/ChatBot" className="text-family-text-light hover:text-family-deep-blue transition-colors">Chatbot</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-medium text-lg mb-4">Family Models</h3>
            <ul className="space-y-2">
              <li><Link href="/ChatBot?model=mom" className="text-family-text-light hover:text-family-deep-blue transition-colors">Mom</Link></li>
              <li><Link href="/ChatBot?model=dad" className="text-family-text-light hover:text-family-deep-blue transition-colors">Dad</Link></li>
              <li><Link href="/ChatBot?model=sibling" className="text-family-text-light hover:text-family-deep-blue transition-colors">Sibling</Link></li>
              <li><Link href="/ChatBot?model=grandparent" className="text-family-text-light hover:text-family-deep-blue transition-colors">Grandparent</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-medium text-lg mb-4">Start a Conversation</h3>
            <p className="text-family-text-light mb-4">
              Experience the support and connection you deserve.
            </p>
            <Link href="/Models" className="btn-primary inline-block">
              Start Chatting
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 text-center text-family-text-light text-sm">
          <p>© {new Date().getFullYear()} FamilyConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
