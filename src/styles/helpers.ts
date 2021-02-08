export const camelCaseToSentenceCase = (camelCaseString: string): string => {
  if (camelCaseString === '' || camelCaseString == null) return '';
  const result = camelCaseString.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};
