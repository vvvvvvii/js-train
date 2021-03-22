let data;
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
    .then(function(response){
        if(response.status==200){
            data = response.data.data;
            showTicket(data);
        }
    })
    .catch(function(err){ //順便練習 vue 班預習課程
        console.log(err.response);
    })
let addTicketForm = document.querySelector('#addTicketForm');
let addTicketName = document.querySelector('#addTicketName');
let addImageURL = document.querySelector('#addImageURL');
let addRegion = document.querySelector('#addRegion');
let addScore = document.querySelector('#addScore');
let addTicketInfo = document.querySelector('#addTicketInfo');
let addPrice = document.querySelector('#addPrice');
let ticketList = document.querySelector('#ticketList');
let regionSelect = document.querySelector('#regionSelect');
let searchResultLength = document.querySelector('#searchResultLength');

//event listener
regionSelect.addEventListener('change',regionFilter)
addTicketForm.addEventListener('submit',addTicket); 

//function
function addTicket(e){
    e.preventDefault();
    if(addTicketName.value==""){
        alert('請填寫套票名稱');
    }else if(addImageURL.value==""){
        alert('請填寫套票網址');
    }else if(addRegion.value==""){
        alert('請填寫景點地區');
    }else if(addScore.value==""){
        alert('請填寫套票星級');
    }else if(addTicketInfo.value==""){
        alert('請填寫套票描述');
    }else if(addLeftNum.value==""){
        alert('請填寫套票組數');
    }else if(addPrice.value==""){
        alert('請填寫套票金額');
    }else{
        data.push({
            ticketName: addTicketName.value,
            imageURL: addImageURL.value,
            region: addRegion.value,
            score: parseInt(addScore.value),
            ticketInfo: addTicketInfo.value,
            leftNum: parseInt(addLeftNum.value),
            price: parseInt(addPrice.value)
        });
        showTicket(data);
        addTicketForm.reset();
    }
}
function regionFilter(){
    if(regionSelect.value=="taipei"){
        let filter = data.filter(item=>item.region=="台北")
        showTicket(filter);
    }else if(regionSelect.value=="taichung"){
        let filter = data.filter(item=>item.region=="台中")
        showTicket(filter);
    }else if(regionSelect.value=="kaohsiung"){
        let filter = data.filter(item=>item.region=="高雄")
        showTicket(filter);
    }else{
        showTicket(data);
    }
}
function showTicket(i){
    let str = "";
    i.forEach(item=>{
        console.log(item)
        if(typeof(item.group)=="number"){
            item.group= `剩下最後 ${item.group}  組`;
        }
        str+=`<li class="col-4 mb-6">
        <a href="#" class="card position-relative shadow bg-white rounded" title="了解更多">
            <div class="info-tag-lg position-absolute">
                <h3 class="h5">${item.area}</h3>
            </div>
            <img src=${item.imgUrl} class="card-img-top" alt="">
            <div class="info-tag-sm position-absolute">
                <p>${item.rate}</p>
            </div>
            <div class="card-body">
                <h5 class="card-title card-title-border-bottom mb-4">${item.name}</h5>
                <p class="card-text mb-8">
                    ${item.description}    
                </p>
                <div class="d-flex justify-content-between align-items-center text-primary">
                    <p class="d-flex align-items-center">
                        <span class="material-icons mr-1">
                            error
                        </span>
                        ${item.group}
                    </p>
                    <p class="h2 d-flex align-items-center mr-1">
                        <span class="h6">TWD</span>
                        ${item.price} 
                    </p>
                </div>
            </div>
        </a>
    </li>`
    })
    ticketList.innerHTML = str;
    searchResultLength.innerHTML = `本次搜尋共${i.length}筆資料`
}
