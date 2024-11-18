interface Window {
    gtag: (
        command: string,
        action: string,
        params: {
            page_path?: string;
            page_title?: string;
            [key: string]: string | number | boolean | null | undefined;
        }
    ) => void;
    dataLayer: Record<string, string | number | boolean | null | undefined>[];
}