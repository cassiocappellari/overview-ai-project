export const imageExtensionRemover = (fileName: string): string => {
    return fileName.replace(/\.(png|jpg|jpeg)$/, "");
};