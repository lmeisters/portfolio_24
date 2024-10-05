import React from "react";
import { Linkedin, Github } from "lucide-react";

const Footer = () => {
    return (
        <footer className="mt-12 text-sm text-gray-600">
            <hr className="mb-4" />
            <div className="flex flex-row justify-between items-center">
                <div className="flex space-x-2 sm:space-x-3">
                    <a
                        href="https://www.linkedin.com/in/lmeisters"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-700 p-2 sm:p-1"
                    >
                        <Linkedin className="w-6 h-6 sm:w-5 sm:h-5" />
                    </a>
                    <a
                        href="https://github.com/lmeisters"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-700 p-2 sm:p-1"
                    >
                        <Github className="w-6 h-6 sm:w-5 sm:h-5" />
                    </a>
                </div>

                <p>&copy; Linards M. {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
};

export default Footer;
