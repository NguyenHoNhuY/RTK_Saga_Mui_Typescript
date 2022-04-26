export const getMarkColor = (mark: number): string => {
    if (mark >= 8) return 'green';
    if (mark >= 4) return 'goldenrod';
    return 'red';
};
