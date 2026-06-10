'use client';

import HeaderBar from '@/components/HeaderBar';
import SignInEmailSheet from './signIn-signUp/signInEmail';

export default function Landing() {

  return (
    <div>
      {/* Header */}
      <HeaderBar showBusiness={true}/>

      {/* Hero */}
      <section>
        <div className="flex flex-col md:flex-row items-stretch">

          {/* Left Image (full image visible, no cropping) */}
          <div
            className="w-full md:w-1/2 bg-white bg-cover bg-left-center min-h-[500px]"
            style={{
              backgroundImage: "url('/landingImage.jpeg')",
            }}
          ></div>

          {/* Right Login Panel */}
          <div className="w-full md:w-1/2 bg-black flex items-center justify-center p-10">
            <SignInEmailSheet />
          </div>

        </div>
      </section>




      {/* Stats */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">2M+</p>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">500K+</p>
              <p className="text-gray-600">Properties Listed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">195</p>
              <p className="text-gray-600">Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
          <p className="text-lg mb-8 opacity-90">Join millions of travelers and start booking today</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition text-lg font-semibold">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}


