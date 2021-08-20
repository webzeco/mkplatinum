import _ from "lodash";
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  let data = _(items).slice(startIndex).take(pageSize).value();
  return data;
}

// _.find(data,product=>{
//     return product.price<40
// });
