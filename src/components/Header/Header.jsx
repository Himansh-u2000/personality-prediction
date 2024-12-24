import React, { useState } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  Search,
  Bell,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Tests", href: "/candidate-login" },
    { label: "Questions", href: "/questions" },
  ];

  return (
    <header className="relative bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span
              className="text-2xl font-bold"
              style={{ color: "#4A628A" }}
            >
              PersonalityTest
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="border-l pl-4 flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </button>
              <button
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                style={{ color: "#4A628A" }}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() =>
                setIsMenuOpen(!isMenuOpen)
              }
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div
            className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
            style={{ backgroundColor: "#DFF2EB" }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                {item.label}
              </a>
            ))}
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <User className="h-8 w-8 rounded-full" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    User Name
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    user@example.com
                  </div>
                </div>
                <button className="ml-auto flex-shrink-0 p-1 text-gray-400 hover:text-gray-500">
                  <Bell className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-3 space-y-1">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="/logout"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
