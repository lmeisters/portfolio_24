interface Window {
    gtag: (
        command: string,
        action: string,
        params: {
            page_path?: string;
            page_title?: string;
            [key: string]: any;
        }
    ) => void;
    dataLayer: any[];
}