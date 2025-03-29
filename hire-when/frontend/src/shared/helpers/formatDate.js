const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${date.getFullYear()}`;
};
export default formatDate;

const formatDateToISO8601 = (dateString) => {
  if (!dateString) return ""; // Handle undefined or null dates
  const date = new Date(dateString);
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};
export { formatDateToISO8601 };
