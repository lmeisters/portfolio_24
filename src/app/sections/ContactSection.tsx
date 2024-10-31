import { Copy, Check } from "lucide-react";
import { useCopyEmail } from "../hooks/useCopyEmail";
import { CopyEmailButton } from "../components/CopyEmailButton";

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
            <CopyEmailButton email={email} variant="default" />
        </section>
    );
};

export default Contact;
