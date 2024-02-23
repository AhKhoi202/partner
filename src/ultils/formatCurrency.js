export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) {
    return "0"; // Or any default value you see fit
  }
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
