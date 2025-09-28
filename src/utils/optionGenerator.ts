export const optionGenerator = (
  arr: any[] = [],
  labelKey: string = "name",
  valueKey: string = "_id"
) => {
  return arr?.map((item) => ({
    label: item?.[labelKey],
    value: item?.[valueKey],
  }));
};
