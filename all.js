let data = [
    {
        ticketName: "綠島自由行套裝行程",
        imageURL: "img/photo-1477894387642-00a731c511b3.png",
        region: "台北",
        score: 8.6,
        ticketInfo: "嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合，提供台東綠島來回船票、綠島環島機車、綠島民宿住宿，行程加贈『綠島浮潛體驗』以及『綠島生態導覽』，讓你用輕鬆的綠島套裝自由行，也能深度認識綠島在地文化。",
        leftNum: 8,
        price: 1280
    },{
        ticketName: "清境高空觀景步道二日遊",
        imageURL: "img/photo-1526772662000-3f88f10405ff.png",
        region: "台北",
        score: 8.2,
        ticketInfo: "清境農場青青草原數十公頃碧草，餵食著數以百計的綿羊和牛群，中央山脈最高的北三段群峰形成一堵如帶的高牆，攔住清晨的薄霧山嵐，成就了從花蓮翻山而來的雲瀑在濁水溪谷積成雲海，這些景觀豐沛了清境觀景步道的風格，也涵養它無可取代的特色。",
        leftNum: 12,
        price: 2580
    },{
        ticketName: "南庄度假村露營車二日遊",
        imageURL: "img/photo-1598954467835-3b0b6fe3be70.png",
        region: "台中",
        score: 9.2,
        ticketInfo: "南庄雲水豪華露營車，快來擁有最愜意的露營體驗吧！ 一泊一食，輕鬆享受露營車樂趣。 獨立衛浴與私人戶外露臺。 入住豪華露營車還能使用戶外SPA大眾湯，感受美人湯魅力。",
        leftNum: 2,
        price: 2480
    },{
        ticketName: "山林悠遊雙人套票",
        imageURL: "img/photo-1517760444937-f6397edcbbcd.png",
        region: "台中",
        score: 9.3,
        ticketInfo: "山林悠遊套票，結合南投清境高空步道、雙龍瀑布七彩吊橋、瑞龍瀑布園區之熱門景點，帶您飽覽南投瑰麗的自然環境，體驗變化無窮的地形景觀，喜歡挑戰高空的您一定不可錯過。<br>（含雙龍瀑布入場券 x2）",
        leftNum: '限時搶購', //不確定這裡的資料該怎麼處理？
        price: 880
    },{
        ticketName: "漁樂碼頭釣魚體驗套票",
        imageURL: "img/photo-1490556505947-f833c3a09659.png",
        region: "台中",
        score: 8.2,
        ticketInfo: "台中全新親子景點寶熊漁樂碼頭，為知名釣具公司「OKUMA」所創立的觀光工廠。一樓藍白希臘漁村風商店街免費參觀。二樓釣魚故事館則設立全台唯一虛擬釣場，透過導覽讓你知道如何釣魚、魚餌怎麼區分，寓教於樂的台中景點！",
        leftNum: 5,
        price: 1280
    },{
        ticketName: "熊森公園親子二日遊套票",
        imageURL: "img/photo-1535726858289-9ffe2dff6f52.png",
        region: "高雄",
        score: 8.6,
        ticketInfo: "來自日本最受歡迎的兒童遊樂園《 BearSon Park 熊森公園》於全世界有800多家據點，在全世界、日本及台灣，很多小孩的童年都在遊戲愛樂園裡一同成長，提供兒童一個最富教育性及娛樂性的休憩遊樂天地！",
        leftNum: 3,
        price: 2480
    }
]
let addTicketSubmit = document.querySelector('#addTicketSubmit');
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
document.addEventListener('DOMContentLoaded',showTicket(data));
regionSelect.addEventListener('change',regionFilter)
addTicketSubmit.addEventListener('click',addTicket); //本來想用submit事件，但沒辦法執行成功（我有加e.preventDefault呀？）還請助教解惑！

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
    }
}
function regionFilter(){
    if(regionSelect.value=="taipei"){
        let filter = data.filter(item=>{
            if(item.region=="台北"){
                return item;
            }
        })
        showTicket(filter);
    }else if(regionSelect.value=="taichung"){
        let filter = data.filter(item=>{
            if(item.region=="台中"){
                return item;
            }
        })
        showTicket(filter);
    }else if(regionSelect.value=="kaohsiung"){
        let filter = data.filter(item=>{
            if(item.region=="高雄"){
                return item;
            }
        })
        showTicket(filter);
    }else{
        showTicket(data);
    }
}
function showTicket(i){
    let str = "";
    i.forEach(item=>{
        if(typeof(item.leftNum)=="number"){
            item.leftNum = `剩下最後 ${item.leftNum}  組`;
        }
        str+=`<li class="col-4 mb-6">
        <a href="#" class="card position-relative shadow bg-white rounded" title="了解更多">
            <div class="info-tag-lg position-absolute">
                <h3 class="h5">${item.region}</h3>
            </div>
            <img src=${item.imageURL} class="card-img-top" alt="">
            <div class="info-tag-sm position-absolute">
                <p>${item.score}</p>
            </div>
            <div class="card-body">
                <h5 class="card-title card-title-border-bottom mb-4">${item.ticketName}</h5>
                <p class="card-text mb-8">
                    ${item.ticketInfo}    
                </p>
                <div class="d-flex justify-content-between align-items-center text-primary">
                    <p class="d-flex align-items-center">
                        <span class="material-icons mr-1">
                            error
                        </span>
                        ${item.leftNum}
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
