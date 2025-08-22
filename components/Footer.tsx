

import React from 'react';
import Link from 'next/link';

// A placeholder component for the new logo, as seen in the footer design
const FooterLogo: React.FC = () => (
    <div className="flex items-center space-x-3">
        {/* Placeholder for actual logo image. User requested to leave a space for it. */}
        <svg width="48" height="42" viewBox="0 0 48 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.8313 41.25C23.6338 41.25 23.4363 41.1712 23.2913 41.0263L6.15128 23.8863C-1.25872 16.4763 -0.34872 4.98628 7.91128 1.29628C12.5613 -0.27372 17.5113 0.81628 21.0513 4.35628C21.9513 5.25628 22.9413 5.97628 24.1113 6.51628C25.2813 5.97628 26.2713 5.25628 27.1713 4.35628C33.0213 -1.49372 42.1113 -0.27372 45.2913 6.81628C48.4713 13.9063 45.5313 22.4763 38.6913 28.2363L24.8313 41.0263C24.6863 41.1712 24.4888 41.25 24.2913 41.25H23.8313Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M31.4313 17.3463C29.3613 16.0863 27.5313 13.9863 25.7913 11.0763C24.0513 13.9863 22.2213 16.0863 20.1513 17.3463C18.0813 18.6063 15.5313 19.2363 13.2513 18.9663C10.9713 18.6963 9.26128 17.5263 8.15128 16.0863" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.1513 26.4963C22.2213 27.7563 24.0513 29.8563 25.7913 32.7663C27.5313 29.8563 29.3613 27.7563 31.4313 26.4963C33.5013 25.2363 36.0513 24.6063 38.3313 24.8763C40.6113 25.1463 42.3213 26.3163 43.4313 27.7563" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-3xl font-serif text-white">Soul Deeds</span>
    </div>
);

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} className="text-white hover:text-white/80 transition-colors" target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#87127C] text-white">
            <div className="container mx-auto px-6 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
                    {/* Column 1: Brand Info */}
                    <div className="space-y-6">
                        <FooterLogo />
                        <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                            Soul Deeds is a community-driven platform designed to bring people together through shared values, meaningful projects, and a purpose-led approach.
                        </p>
                        <div className="flex items-center">
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
                            </SocialIcon>
                            <span className="mx-4 text-white/50 select-none">|</span>
                             <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"></path></svg>
                            </SocialIcon>
                            <span className="mx-4 text-white/50 select-none">|</span>
                             <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085a4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg>
                            </SocialIcon>
                            <span className="mx-4 text-white/50 select-none">|</span>
                             <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.582 7.042c-.22-1.265-1.173-2.219-2.438-2.438C17.61 4 12 4 12 4s-5.61 0-7.144.604c-1.265.219-2.218 1.173-2.438 2.438C2 8.577 2 12 2 12s0 3.423.418 4.958c.22 1.265 1.173 2.219 2.438 2.438C6.39 20 12 20 12 20s5.61 0 7.144-.604c1.265-.219 2.218-1.173 2.438-2.438C22 15.423 22 12 22 12s0-3.423-.418-4.958zM10 15.464V8.536L16 12l-6 3.464z"></path></svg>
                            </SocialIcon>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="lg:justify-self-center">
                        <h3 className="font-bold text-white text-lg tracking-wider uppercase">Quick Links</h3>
                        <ul className="mt-6 space-y-4">
                            <li><a href="#" className="text-white/90 hover:text-white transition-colors text-sm">About Us</a></li>
                            <li><a href="#" className="text-white/90 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                            <li><a href="#" className="text-white/90 hover:text-white transition-colors text-sm">Community Guidelines</a></li>
                            <li><a href="#" className="text-white/90 hover:text-white transition-colors text-sm">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Newsletter */}
                    <div>
                        <h3 className="font-bold text-white text-lg tracking-wider uppercase">News Letter</h3>
                        <p className="mt-6 text-white/90 text-sm">Subscribe our newsletter to get our latest update & news</p>
                        <form className="mt-6 relative">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-white text-gray-900 rounded-lg py-3 pl-4 pr-20 focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder-gray-500"
                                aria-label="Email address"
                            />
                            <button
                                type="submit"
                                className="absolute inset-y-1.5 right-1.5 flex items-center justify-center w-14 bg-[#87127C] rounded-lg text-white hover:bg-[#6c0e63] transition-colors px-3"
                                aria-label="Subscribe"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-16 border-t border-white/20 pt-8 text-center text-sm text-white/70">
                    <p>
                        &copy; Copyright {new Date().getFullYear()}. Soul Deeds. All Rights Reserved.
                        <span className="mx-2 text-white/50 select-none hidden sm:inline">|</span>
                        <br className="sm:hidden" />
                        <Link href="/admin/waitlist" className="hover:text-white underline">
                            View Waitlist Data
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;