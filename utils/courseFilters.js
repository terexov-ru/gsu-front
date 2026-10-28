export function normalizeQueryId(value) {
  if (Array.isArray(value)) value = value[0];
  if (value === undefined || value === null || value === "") return undefined;

  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export function findCategoryById(categories, categoryId) {
  return (
    categories.find((item) => Number(item.id) === Number(categoryId)) ||
    {}
  );
}
