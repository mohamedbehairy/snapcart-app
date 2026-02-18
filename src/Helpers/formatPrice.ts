//^ Function to format price
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(price);
};
