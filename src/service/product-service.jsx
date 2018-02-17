import MMUtil from 'util/mm.jsx'
const _mm = new MMUtil()

class Product{
    // 获取商品列表
    getProductList(listParam){
        let url     = '',
            data    = {};
        if(listParam.listType === 'list'){
            url                         = '/manage/product/list.do';
            data.pageNum                = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url = '/manage/product/search.do';
            data.pageNum                = listParam.pageNum;
            data[listParam.searchType]  = listParam.keyword;
        }
        return _mm.request({
            type    : 'post',
            url     : url,
            data    : data
        });
    }
    // 变更商品上下架操作
    setProductStatus(productInfo){
        return _mm.request({
            url     : '/manage/product/set_sale_status.do',
            type  : 'post',
            data    : productInfo
        });
    }

}
export default Product