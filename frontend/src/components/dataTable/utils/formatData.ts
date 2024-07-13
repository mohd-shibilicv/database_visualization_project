export const formatData = (value: any, type: string): string => {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  switch (type) {
    case "date":
      return new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    case "number":
      return Number(value).toFixed(2);
    case "percentage":
      return `${(Number(value)).toFixed(2)}%`;
    default:
      return String(value);
  }
};
