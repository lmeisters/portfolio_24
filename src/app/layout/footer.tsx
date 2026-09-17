import { LuLinkedin, LuGithub } from "react-icons/lu";
import Tooltip from "../components/Tooltip";
import { GITHUB_URL, LINKEDIN_URL } from "../data/site";

const linkClasses =
    "inline-flex rounded-md p-2 text-gray-600 transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:text-neutral-400 dark:hover:text-white sm:p-1";

export default function Footer() {
    return (
        <footer className="mt-12 text-sm text-gray-600 dark:text-neutral-400">
            <hr className="mb-4 border-gray-200 dark:border-neutral-800" />
            <div className="flex items-center justify-between">
                <ul className="flex" aria-label="Social profiles">
                    <li>
                        <Tooltip content="LinkedIn">
                            <a
                                href={LINKEDIN_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClasses}
                                aria-label="LinkedIn profile (opens in a new tab)"
                            >
                                <LuLinkedin
                                    aria-hidden="true"
                                    className="h-6 w-6 sm:h-5 sm:w-5"
                                />
                            </a>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="GitHub">
                            <a
                                href={GITHUB_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClasses}
                                aria-label="GitHub profile (opens in a new tab)"
                            >
                                <LuGithub
                                    aria-hidden="true"
                                    className="h-6 w-6 sm:h-5 sm:w-5"
                                />
                            </a>
                        </Tooltip>
                    </li>
                </ul>
                <p>&copy; Linards M. {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
}
