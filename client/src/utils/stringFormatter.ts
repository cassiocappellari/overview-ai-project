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