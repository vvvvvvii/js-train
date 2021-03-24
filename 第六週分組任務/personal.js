let personalTimeAverageTop5 = document.querySelector('#personalTimeAverageTop5');
let personalTimeAverageTop10 = document.querySelector('#personalTimeAverageTop10');
let sortSelect = document.querySelector('#sortSelect');
let messageBoard = document.querySelector('#messageBoard');
const sendTimeSortArr=[]; //宣告一個新陣列等等存放以送出時間排序的全部資料
const finishTimeSortArr=[]; //宣告一個新陣列等等存放以完成秒數排序的全部資料

//axios
axios.get('https://raw.githubusercontent.com/hexschool/js-traninging-week6API/main/data.json')
  .then(function(response){
    if(response.status==200){
        sortDataOrganize(response.data);
        personalAverageTimeDataOrganize(response.data);
        render(sendTimeSortArr);
    }
})

//addEventListener
sortSelect.addEventListener('change',changeSort);

//function
function sortDataOrganize(data){ //先在這裡整資料，才不會被addEventListener污染參數
    //sendTimeSortArr的資料整理
    let timestampArr = data.map(item=>item.timestamp.split(' '));
    timestampArr.forEach((item,index)=>{
        let dateArr = item[0];
        let timeArr = item[2];
        let timestamp = Date.parse(`${dateArr} ${timeArr}`); //轉成時間戳
        if (item[1]=="下午"){
            timestamp+=43200; //1小時等於3600秒 12小時43200秒
        }
        data[index].timestampUNIX = timestamp;
        timestampArr[index]=timestamp;
    })
    timestampArr.sort((x,y)=>x-y) //小排到大
    timestampArr.forEach(item=>{ //當timestampArr的數等於response.data[i].timestampUNIX時，當下的timestampArr的index等於response.data[i]的新index位置
        data.forEach(i=>{
            if(i.timestampUNIX==item){
                sendTimeSortArr.push(i)
            }
        })
    })
    //finishTimeSortArr的資料整理
    data.forEach(item=>item.totalTime = Number(item.practiceMinute)*60+Number(item.practiceSecond)) //新增totalTime（分鐘數*60+秒數）的屬性到每個人的資料中
    let personalTotalTimeArr = data.map(item=>item.totalTime); //把每個人的時間推進陣列中
    personalTotalTimeArr.sort((x,y)=>x-y); //時間少到多
    personalTotalTimeArr = Array.from(new Set(personalTotalTimeArr)); //刪掉重複數字
    personalTotalTimeArr.forEach(item=>{
        data.forEach(i=>{
            if(i.totalTime==item){
                finishTimeSortArr.push(i)
            }
        })
    })
}
function personalAverageTimeDataOrganize(data){ //個人成績排名
    for(let i=0;i<5;i++){ //一到五名
        let str=` 
          <li class="result-box-item d-flex justify-content-between mb-7">
              第${i+1}名
              <span class="result-box-paragraph text-info" id=personalTimeAverage${i+1}>
              ${finishTimeSortArr[i].slackName} (${finishTimeSortArr[i].practiceMinute}分${finishTimeSortArr[i].practiceSecond}秒)
              </span>
          </li>
        `
        personalTimeAverageTop5.innerHTML+=str;
    }
    for(let i=5;i<10;i++){ //取六到十名，依序建立名次的字串
        let str=` 
          <li class="result-box-item d-flex justify-content-between mb-7">
              第${i+1}名
              <span class="result-box-paragraph text-info" id=personalTimeAverage${i+1}>
              ${finishTimeSortArr[i].slackName} (${finishTimeSortArr[i].practiceMinute}分${finishTimeSortArr[i].practiceSecond}秒)
              </span>
          </li>
        `
        personalTimeAverageTop10.innerHTML+=str;
    }
}
function render(data){ //渲染畫面
    messageBoard.innerHTML= ""; //先清空畫面
    data.forEach((item,index)=>{
        if(item.message==undefined){
            item.message="沒有特別想說的話～"
        };
        let str= `
        <li class="message-board-item">
            <div class="message-board-content">
                <div class="d-flex">
                    <p>${item.slackName}</p>
                    <p class="ml-5">${item.timestamp}</p>
                </div>
                <p>
                    ${item.message}
                </p>
            </div>
            <div class="message-board-toolbox">
                <p>${item.practiceMinute} 分 ${item.practiceSecond} 秒</p>
                <div class="d-flex" id="messageBoardToolbox${index+1}">
                </div>
            </div>
        </li>
        `
        messageBoard.innerHTML+= str;
        if(item.codepenUrl!=''){
            let str = `<a href="${item.codepenUrl}" title="前往 codepen">
                <span class="message-board-link material-icons">
                    code
                </span>
            </a>`
            document.querySelector(`#messageBoardToolbox${index+1}`).innerHTML+=str;
        }
        if(item.youtubeUrl!=''){
            let str = `<a href="${item.youtubeUrl}" title="前往 youtube">
                <span class="message-board-link material-icons ml-1">
                    movie_creation
                </span>
            </a>`
            document.querySelector(`#messageBoardToolbox${index+1}`).innerHTML+=str;
        }
    })
}
function changeSort(data){ 
    if(sortSelect.value=="sendTime"){ //以時間排序
        render(sendTimeSortArr); 
    }else{
        render(finishTimeSortArr); 
    }
}