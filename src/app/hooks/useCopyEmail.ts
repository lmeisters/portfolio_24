import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Copies `email` to the clipboard and reports "copied" for two seconds.
 * The clipboard API rejects on insecure origins or denied permission; in
 * that case `copied` simply stays false.
 */
export function useCopyEmail(email: string) {
    const [copied, setCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => () => clearTimeout(timer.current), []);

    const copyEmail = useCallback(() => {
        if (!navigator.clipboard) return Promise.resolve(false);
        return navigator.clipboard
            .writeText(email)
            .then(() => {
                setCopied(true);
                clearTimeout(timer.current);
                timer.current = setTimeout(() => setCopied(false), 2000);
                return true;
            })
            .catch(() => false);
    }, [email]);

    return { copied, copyEmail };
}
