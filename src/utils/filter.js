export function filterByPrice(items, price) {
  if (price !== "Price") {
    if (price === "Less than $50") {
      return items.filter((pr) => {
        if (pr.price < 50)  return pr;
      });
    } else {
      return items.filter((pr) => {
        if (pr.price >= 50 && pr.price < 100) return pr;
      });
    }
  } else return items;
}