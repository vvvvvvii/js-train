const ordersForm = document.querySelector('#ordersForm');
const cxlAllBtn = document.querySelector('.cxl-all-btn')
const key = 'fm0fm0';
const token = '8RXdpGVbm2OvT97psX6xJ97THIK2';
const config = {
    headers: {
        'Authorization': `${token}`
    }
};
const orderDataUrl = `https://hexschoollivejs.herokuapp.com/api/livejs/v1/admin/${key}/orders`;

//eventListener
ordersForm.addEventListener("click",deleteOrder);
cxlAllBtn.addEventListener("click",deleteAllOrder);

//functions
function init(){
    axios.get(orderDataUrl,config)
    .then(function(res){
        render(res)
    })
}

function render(res){
    let orders = res.data.orders;
    orders.forEach(order=>{
        let products = order.products;
        let str = "";
        products.forEach(product=>{
            str+=`${product.title}`
        })
        let timestamp = order.createdAt;
        let date = new Date(timestamp * 1000).toISOString().split('T').splice(0,1).toString(); //時間戳換算公式為new Date(timestamp * 1000)並用.toISOString()轉成ISO格式，再用Ｔ作為切割點取得日期和時間，最後用splice把時間部分切掉
        date = date.replace(/[-]/g,"/"); //把日期格式從2021-01-01改成2021/01/01
        let str2 = `
            <tr>
                <td scope="row">
                    10088377474
                </td>
                <td>
                    ${order.user.name}<br>${order.user.tel}
                </td>
                <td>
                    ${order.user.address}
                </td>
                <td>
                    ${order.user.email}
                </td>
                <td>
                    ${str}
                </td>
                <td>
                    ${date}
                </td>
                <td class="backstage-table-status-undo">
                    未處理
                </td>
                <td class="pl-1 pr-1">
                    <a href="#" class="backstage-cxl-btn">刪除</a>
                </td>
            </tr>
        `
        ordersForm.innerHTML+=str2;
    })
}

function deleteAllOrder(e){
    e.preventDefault();
    if(confirm(`是否確認刪除全部訂單？`))
    axios.delete(orderDataUrl,config)
        .then(function(res){
            alert("已清空全數訂單");
            history.go(0); //自動重整畫面
        })
}

function deleteOrder(e){
    e.preventDefault();
    //點擊單項刪除鈕時
    if(e.target.className=="backstage-cxl-btn"){

    }
}

init();