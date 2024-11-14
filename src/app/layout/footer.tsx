import React from "react";
import { Linkedin, Github } from "lucide-react";
import Tooltip from "../components/ToolTip";

const Footer = () => {
    return (
        <footer className="mt-12 text-sm text-gray-600">
            <hr className="mb-4" />
            <div className="flex flex-row justify-between items-center">
                <div className="flex">
                    <Tooltip content="Connect on LinkedIn">
                        <a
                            href="https://www.linkedin.com/in/lmeisters"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-700 p-2 sm:p-1 inline-flex"
                            aria-label="Connect with me on LinkedIn"
                        >
                            <Linkedin className="w-6 h-6 sm:w-5 sm:h-5" />
                        </a>
                    </Tooltip>
                    <Tooltip content="View GitHub profile">
                        <a
                            href="https://github.com/lmeisters"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-700 p-2 sm:p-1 inline-flex"
                            aria-label="View my GitHub profile"
                        >
                            <Github className="w-6 h-6 sm:w-5 sm:h-5" />
                        </a>
                    </Tooltip>
                </div>

                <p>&copy; Linards M. {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
};

export default Footer;
