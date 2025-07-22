'use client'

import React from 'react';

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-fba-gray py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-md w-full bg-gray-200 rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Contact Us</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-fba-gold focus:border-fba-gold sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-fba-gold focus:border-fba-gold sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Your Message
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                className="shadow-sm focus:ring-fba-gold focus:border-fba-gold mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-3 resize-y"
                placeholder="Type your message here..."
              ></textarea>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-fba-black bg-fba-gold hover:bg-fba-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fba-gold transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}