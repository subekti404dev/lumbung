export const validateRequiredFields = (fields: any = {}) => {
  const emptyFields: string[] = [];
  for (const key of Object.keys(fields)) {
    if (!fields[key]) emptyFields.push(key);
  }
  if (emptyFields.length > 0)
    throw Error(
      `Field ${emptyFields.join(", ")} ${
        emptyFields.length === 1 ? "is" : "are"
      } required`
    );
};
