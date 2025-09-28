const cleanQuery = (query: Record<string, any>) => {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(query)) {
    if (v !== "" && v !== null && v !== undefined) {
      out[k] = v;
    }
  }
  return out;
};
export default cleanQuery;
