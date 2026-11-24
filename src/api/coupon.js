import axios from '~/axios'
// 获取优惠券列表
export function getCouponList(page = 1){
    return axios.get(`/admin/coupon/${page}`)
}