import axios from '~/axios'
// 获取商品列表
export function getGoodsList(page = 1){
    return axios.get(`/admin/goods/${page}`)
}
export function getGoodsDetail(id){
    return axios.get(`/admin/goods/${id}`)
}       
