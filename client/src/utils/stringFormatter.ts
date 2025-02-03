export const imageExtensionRemover = (fileName: string): string => {
    return fileName.replace(/\.(png|jpg|jpeg)$/, "");
};

export function extractFileName(path: string | null): string {
    if (path) {
        const match = path.match(/\/static\/media\/(.*?)(?=\.\w+)/);
        return match ? match[1] : '';
    }

    return ''
}

export function removeBase64Prefix(base64String: string): string {
    return base64String.split(',')[1] || base64String;
};