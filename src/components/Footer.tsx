import React from "react";
import { Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const workLinks = [
    { name: "AlgoCode - BE", href: "https://github.com/LifeIsPranav/AC-Problem-Service" },
    { name: "Inventory MS", href: "https://github.com/LifeIsPranav/InventoryMS-BE" },
  ];

  const projectLinks = [
    // { name: "Flori: MVP App", href: "#" }
  ];

  return (
    <footer className="bg-black text-white py-16" id="contact">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Say hello section */}
          <div className="md:col-span-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Say hello!</h2>
            <a 
              href="mailto:lifeispranav@gmail.com" 
              className="text-gray-400 hover:text-white transition-colors duration-200 text-lg"
            >
              lifeispranav@gmail.com
            </a>
          </div>

          {/* Work section */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-6 text-gray-300">My Creations</h3>
            <div className="space-y-4">
              {workLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Projects section */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-6 text-gray-300">Thanks for visiting</h3>
            <div className="space-y-4">
              {projectLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
          {/* <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-6 text-gray-300">Create Your Own</h3>
            <div className="space-y-4">
              {projectLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div> */}

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm">
             A Creation by Pranav
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/lifeispranav"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/lifeispranav"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
