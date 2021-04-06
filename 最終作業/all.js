const productList = document.querySelector("#productList");

const key = 'fm0fm0';
const productDataUrl=`https://hexschoollivejs.herokuapp.com/api/livejs/v1/customer/${key}/products`;
const cartDataUrl=`https://hexschoollivejs.herokuapp.com/api/livejs/v1/customer/${key}/carts`;

//addEventListener
//productList.addEventListener("click",addCart);

//function
function init(){
  axios.all([
    axios.get(productDataUrl)
  ])
  .then(axios.spread(function(product){
    let productData = product.data.products;
    if(product.data.status==true){
      productData.forEach(item=>{
        let str = `
          <li class="col-3 product-item" data-category="${item.category}">
            <img src="${item.images}" class="product-img" alt="${item.title}">
            <div class="product-tag">新品</div>
            <a href="#" class="product-btn">加入購物車</a>
            <p class="mb-2">${item.title}</p>
            <p class="product-discount">NT${item.origin_price}</p>
            <p class="h2">NT${item.price}</p>
          </li>
        `
        productList.innerHTML +=str;
      });
    }
  }))
}

init();


//swiper
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  slidesPerColumn: 2,
  spaceBetween: 30,
  slidesPerColumnFill: 'row',
});

