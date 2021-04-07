const productList = document.querySelector("#productList");
const shoppingCart = document.querySelector("#shoppingCart");
let cartQuantityArr=[];

const key = 'fm0fm0';
const productDataUrl=`https://hexschoollivejs.herokuapp.com/api/livejs/v1/customer/${key}/products`;
const cartDataUrl=`https://hexschoollivejs.herokuapp.com/api/livejs/v1/customer/${key}/carts`;

//addEventListener
productList.addEventListener("click",addCart);
shoppingCart.addEventListener("click",deleteCart);
shoppingCart.addEventListener("click",amendCartNum);

//function
function init(){
  axios.all([
    axios.get(productDataUrl),
    axios.get(cartDataUrl)
  ])
  .then(axios.spread(function(product,cart){
    //商品畫面
    if(product.data.status==true){
      let productData = product.data.products;
      productData.forEach(item=>{
        let str = `
          <li class="col-3 product-item" data-category="${item.category}" data-title="${item.title}">
            <img src="${item.images}" class="product-img" alt="${item.title}">
            <div class="product-tag">新品</div>
            <a href="#" class="product-btn" data-id="${item.id}">加入購物車</a>
            <p class="mb-2">${item.title}</p>
            <p class="product-discount">NT$${item.origin_price}</p>
            <p class="h2">NT$${item.price}</p>
          </li>
        `
        productList.innerHTML +=str;
      });
    }
    //購物車畫面
    if(cart.data.status==true){
      let cartData = cart.data.carts;
      cartData.forEach(item=>{
        let str = `
          <tr class="d-flex align-items-center pb-4 mb-4" data-id="${item.id}">
            <td scope="row" class="table-title d-flex w-30 align-items-center">
              <img src="${item.product.images}" class="table-img" alt="${item.product.title}">
              <p class="ml-3">${item.product.title}</p>
            </td>
            <td class="table-title w-20 ml-7">
              NT$${item.product.price}
            </td>
            <td class="table-title w-20 ml-7">
              <input type="number" value="${item.quantity}" min="1" max="999" class="table-num-input">
            </td>
            <td class="table-title w-30 ml-7 d-flex justify-content-between">
              ${item.quantity*item.product.price}
              <a href="#" class="cxl-btn" data-id="${item.id}">
                <span class="material-icons">
                  clear
                </span>
              </a>
            </td>
          </tr>
        `
        shoppingCart.innerHTML+=str;
        //把購物車裡的資料單獨抽產品名跟數量出來，方便等等判斷購物車裡的產品數量
        cartQuantityArr.push({title:`${item.product.title}`,quantity:item.quantity});
      });
      //放總金額等資訊到畫面上
      let str2 = `
        <tr class="d-flex justify-content-between border-0">
          <td>
            <a href="#" class="cxl-all-btn">刪除所有品項</a>
          </td>
          <td>
            <p class="h4">
              總金額
              <span class="ml-10 h2">NT$${cart.data.finalTotal}</span>
            </p>
          </td>
        </tr>
      `
      shoppingCart.innerHTML+=str2;
    }
  }))
}

function addCart(e){
  e.preventDefault();
  if(e.target.className!="product-btn"){
    return;
  }
  //判斷購物車裡是否已有此產品，有的話先取出購物車裡此產品的數量，沒有的話指定數量一開始為0
  let targetTitle = e.target.parentElement.dataset.title;
  let quantity;
  let cartTitleArr = cartQuantityArr.map(item=>item.title);
  if(cartTitleArr.includes(targetTitle)){
    quantity = cartQuantityArr[cartTitleArr.indexOf(targetTitle)].quantity;
  }else{
    quantity = 0;
  }
  //post 資料，讓數量在這次加入購物車行為加一
  axios.post(cartDataUrl,{
    "data": {
      "productId": `${e.target.dataset.id}`,
      "quantity": quantity+1
    }
  })
  .then(function(res){
    alert("已加入購物車");
    history.go(0); //自動重整畫面
  })
}

function deleteCart(e){
  e.preventDefault();
  //清空全部
  if(e.target.className=="cxl-all-btn"){
    if(confirm("是否確認清空購物車")==false){
      return;
    }
    axios.delete(cartDataUrl)
      .then(function(res){
        alert("已清空購物車");
        history.go(0); 
      })
      //不確定下方程式碼如何改進？本來想到用textContent搭配trim()，即可同時判斷點到<a><span>，但因為他們父元素不同不確定怎麼傳id/title資料，最後還是分兩次判斷
  }else if(e.target.className=="cxl-btn"){ //點到<a>清空一項
    let id = e.target.dataset.id;
    let title = e.target.parentNode.parentNode.children[0].textContent.trim();
    if(confirm(`是否確認刪除${title}？`))
    axios.delete(`https://hexschoollivejs.herokuapp.com/api/livejs/v1/customer/${key}/carts/${id}`)
      .then(function(res){
        alert("已刪除");
        history.go(0); 
      })
  }else if(e.target.parentElement.className=="cxl-btn"){ //點到<span>清空一項
    let id = e.target.parentElement.dataset.id;
    let title = e.target.parentNode.parentNode.parentNode.children[0].textContent.trim();
    if(confirm(`是否確認刪除${title}？`))
    axios.delete(`https://hexschoollivejs.herokuapp.com/api/livejs/v1/customer/${key}/carts/${id}`)
      .then(function(res){
        alert("已刪除");
        history.go(0); 
      })
  }
}

function amendCartNum(e){
  if(e.target.className!="table-num-input"){
    return;
  }
  let id = e.target.parentElement.parentElement.dataset.id;
  let newNum = Number(e.target.value);
  axios.patch(cartDataUrl,{
    "data": {
      "id": `${id}`,
      "quantity": newNum
    }
  })
    .then(function(res){
      history.go(0); 
    })
}

init();

//swiper
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  slidesPerColumn: 2,
  spaceBetween: 30,
  slidesPerColumnFill: 'row',
});

