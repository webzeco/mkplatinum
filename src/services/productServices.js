import http from './httpservice';
const url =`${process.env.REACT_APP_URL}/api/v1/product`;
export function getAllProducts() {
    return http.get(`${url}/allProducts`);
}

export function deleteProduct(id) {
    return http.delete(`${url}/delete/${id}`);
}
export function editProduct(id,data) {
    return http.patch(`${url}/${id}`,{data});
}
export function getUserStats(id) {
    return http.get(`${url}/stats/${id}`);
}

export function addNewProduct(product) {
    return http.post(`${url}/addProduct`,product);
}
const AllServices = {
    getAllProducts,
    addNewProduct,
    getUserStats,
}
export default AllServices;