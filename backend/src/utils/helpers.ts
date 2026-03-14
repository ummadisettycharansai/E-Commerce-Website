export const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const paginate = (page = 1, limit = 12) => ({
  skip: (page - 1) * limit,
  take: limit,
});

// SQL Server stores arrays as JSON strings
export const toJsonArray = (arr: string[]) => JSON.stringify(arr);
export const fromJsonArray = (str: string): string[] => {
  try { return JSON.parse(str); } catch { return []; }
};

// Parse product arrays from DB for API response
export const parseProduct = (p: any) => {
  if (!p) return p;
  return {
    ...p,
    images: fromJsonArray(p.images),
    sizes: fromJsonArray(p.sizes),
    colors: fromJsonArray(p.colors),
    tags: fromJsonArray(p.tags),
  };
};
