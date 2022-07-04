export const required = (value) => {
    if (value) return undefined;

    return "Field is required";
}

export const maxLength = (max) => (value) => {
    if (value && value.length > max) { return "Reached maximum length characters" } else { return undefined }
}
