const productList = document.querySelector("#productList");
const shoppingCart = document.querySelector("#shoppingCart");
let cartQuantityArr=[];

const key = 'fm0fm0';
const productDataUrl=`https://hexschoollivejs.herokuapp.com/api/livejs/v1/customer/${key}/products`;
const cartDataUrl=`https://hexschoollivejs.herokuapp.com/api/livejs/v1/customer/${key}/carts`;

//addEventListener
productList.addEventListener("click",addCart);

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
          <tr class="d-flex align-items-center pb-4 mb-4">
            <td scope="row" class="table-title d-flex w-30 align-items-center">
              <img src="${item.product.images}" class="table-img" alt="${item.product.title}">
              <p class="ml-3">${item.product.title}</p>
            </td>
            <td class="table-title w-20 ml-7">
              NT$${item.product.price}
            </td>
            <td class="table-title w-20 ml-7">${item.quantity}</td>
            <td class="table-title w-30 ml-7 d-flex justify-content-between">
              ${item.quantity*item.product.price}
              <a href="#">
                <span class="material-icons cxl-btn">
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

init();

//swiper
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  slidesPerColumn: 2,
  spaceBetween: 30,
  slidesPerColumnFill: 'row',
});

