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
ordersForm.addEventListener("click",amendOrderStatus);
cxlAllBtn.addEventListener("click",deleteAllOrder);

//functions
function init(){
    axios.get(orderDataUrl,config)
    .then(function(res){
        renderPie(res);
        renderOrderForm(res);
    })
}

function renderPie(res){
    let orders = res.data.orders;
    let productsArr = []; //等等要把整理好的商品放進來
    orders.forEach(order=>{ //讓所有訂單都跑這個流程
        let orderItem = order.products.map(item=>item.title); //每個訂單可能有不只一項商品，把商品名稱都放進orderItem這個陣列
        productsArr.push(orderItem); //把整好的陣列再放進products陣列，可得到全部訂單的全部商品陣列
    })
    productsArr = productsArr.flat(Infinity); //陣列扁平化方便等等處理
    let productsObj = {};
    productsArr.forEach(item=>productsObj[item] = (productsObj[item]||0)+1);
    productsArr = Object.entries(productsObj); //物件轉回陣列

    let nums = productsArr.map(item=>item[1]).sort((x,y)=>y-x); //把數量單獨抽出來變成一個大排到小的陣列
    nums = [...new Set(nums)];//nums應該刪掉重複數，等等推進陣列才不重複

    let rankArr = []; //最後用這個放到c3.js生成圓餅圖
    //目的：找到productsObj裡前三名數量的，各自顯示在圓餅圖三筆資料中，剩下的數量全部加起來，顯示為其他
    if(nums.length>3){ //若已刪掉重複的數，nums的length還多於三，代表有第四名或更後面的名次
        //rankArr前三名正常顯示
        for(let j=0;j<3;j++){
            for(let i=0;i<productsArr.length;i++){
                if(productsArr[i][1]==nums[j]){
                    rankArr.push(productsArr[i]);
                }
            }
        }
        //rankArr的第四名以後要全部加起來
        for(let j=3;j<nums.length;j++){
            let others = 0;
            for(let i=0;i<productsArr.length;i++){
                if(productsArr[i][1]==nums[j]){
                    others+=productsArr[i][1];
                }
            }
            rankArr.push(["其他",others]);
        }
    }else{ //不然代表只有前三名
        nums.forEach(function(num){
            for(let i=0;i<productsArr.length;i++){
                if(productsArr[i][1]==num){
                    rankArr.push(productsArr[i]);
                }
            }
        })
    }
    var chart = c3.generate({
        bindto: '#salePie',
        data: {
            columns: rankArr,
            type : 'pie',
        },
        color: {
            pattern: ['#301E5F','#5434A7','#9D7FEA',"#DACBFF"]
        }
    });
}

function renderOrderForm(res){
    let orders = res.data.orders;
    orders.forEach(order=>{
        let products = order.products;
        let str = "";
        products.forEach(product=>{
            str+=`${product.title}*${product.quantity}個<br>`
        })
        let timestamp = order.createdAt;
        let date = new Date(timestamp * 1000).toISOString().split('T').splice(0,1).toString(); //時間戳換算公式為new Date(timestamp * 1000)並用.toISOString()轉成ISO格式，再用Ｔ作為切割點取得日期和時間，最後用splice把時間部分切掉
        date = date.replace(/[-]/g,"/"); //把日期格式從2021-01-01改成2021/01/01
        let status = order.paid?'已處理': "未處理"; //true執行問號前、false執行問號後
        let str2 = `
            <tr data-id="${order.id}">
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
                <td class="backstage-table-status">
                    ${status}
                </td>
                <td class="pl-1 pr-1">
                    <a href="#" class="backstage-cxl-btn">刪除</a>
                </td>
            </tr>
        `
        ordersForm.innerHTML+=str2;
        /*let item = document.querySelector(`[data-id=${order.id}]`); //晚點修
        if(status=="已處理"){ //status=已處理 時加上active這個class
            item.children[6].classList.add('backstage-table-status-active');
        }else{ //否則移除active這個class
            item.children[6].classList.remove('backstage-table-status-active');
        }*/
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
    if(e.target.className=="backstage-cxl-btn"){
        const orderId = e.target.parentNode.parentNode.dataset.id;
        const orderNum = e.target.parentNode.parentNode.children[0].textContent.trim();
        if(confirm(`是否確認刪除訂單${orderNum}？`))
        axios.delete(`https://hexschoollivejs.herokuapp.com/api/livejs/v1/admin/${key}/orders/${orderId}`,config)
            .then(function(res){
                alert(`已刪除訂單${orderNum}`);
                history.go(0);
            })
    }
}

function amendOrderStatus(e){
    if(e.target.className.split(" ")[0]=="backstage-table-status"){
        const orderId = e.target.parentNode.dataset.id;
        const orderNum = e.target.parentNode.children[0].textContent.trim();
        const status = e.target.textContent.trim()=="已處理"?"未處理":"已處理"; //本來是已處理改為未處理、反之亦同
        const paid = e.target.textContent.trim()=="已處理"?false:true;

        if(confirm(`是否確認修改訂單${orderNum}狀態為${status}？`))
        axios.put(orderDataUrl,{
            "data": {
              "id": `${orderId}`,
              "paid": paid
            }
          },config)
            .then(function(res){
                history.go(0);
            })
    }
}

init();