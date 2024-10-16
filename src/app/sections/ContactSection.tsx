import { Copy, Check } from "lucide-react";
import { useCopyEmail } from "../hooks/useCopyEmail";

const Contact = () => {
    const email = "linards@example.com";
    const { copied, handleCopyEmail } = useCopyEmail(email);

    return (
        <section>
            <div className="flex items-center space-x-2 mb-4">
                <span className="border border-gray-800 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Contact
                </span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
                I'm actively seeking new opportunities to apply my front-end
                development skills. Let's connect and discuss how I can
                contribute to your team
            </p>
            <button
                className="px-4 py-2 bg-black text-white rounded-full flex items-center hover:bg-gray-800 transition-colors duration-300 ease-in-out"
                onClick={handleCopyEmail}
            >
                {copied ? (
                    <Check className="w-4 h-4 mr-2" />
                ) : (
                    <Copy className="w-4 h-4 mr-2" />
                )}
                {copied ? "Copied!" : "Copy email"}
            </button>
        </section>
    );
};

export default Contact;
