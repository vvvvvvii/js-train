let personalTimeAverageTop5 = document.querySelector('#personalTimeAverageTop5');
let personalTimeAverageTop10 = document.querySelector('#personalTimeAverageTop10');
let sortSelect = document.querySelector('#sortSelect');
let messageBoard = document.querySelector('#messageBoard');

//axios
axios.get('https://raw.githubusercontent.com/hexschool/js-traninging-week6API/main/data.json')
  .then(function(response){
    if(response.status==200){
        let timestampArr = response.data.map(item=>item.timestamp.split(' '));
        timestampArr.forEach((item,index)=>{
            let dateArr = item[0];
            let timeArr = item[2];
            let timestamp = Date.parse(`${dateArr} ${timeArr}`); //轉成時間戳
            if (item[1]=="下午"){
                timestamp+=43200; //1小時等於3600秒 12小時43200秒
            }
            response.data[index].timestampUNIX = timestamp;
            timestampArr[index]=timestamp;
        })
        timestampArr.sort((x,y)=>x-y) //小排到大
        let newArr=[];
        //  這邊可能寫錯所以只推了五個進陣列
        timestampArr.forEach((item,index)=>{
            if(response.data[index].timestampUNIX==item){
                newArr.push(response.data[index])
            }
        })
        console.log(newArr)
        //全部推完後要讓html畫面照這個陣列重排
        
        personalAverageTimeDataOrganize(response.data);
        messageDataOrganize(response.data);
    }
})

//addEventListener
sortSelect.addEventListener('change',changeSort);

//function
function personalAverageTimeDataOrganize(data){
    data.forEach(item=>item.totalTime = Number(item.practiceMinute)*60+Number(item.practiceSecond)) //新增totalTime（分鐘數*60+秒數）的屬性到每個人的資料中
    let personalTotalTimeArr = data.map(item=>item.totalTime); //把每個人的時間推進陣列中
    let minimum = [...personalTotalTimeArr].sort((x,y)=>x-y); //時間少到多
    minimum = Array.from(new Set(minimum)); //刪掉重複數字
    for(let i=0;i<5;i++){ //取前五名，依序建立名次的字串
        let str=` 
          <li class="result-box-item d-flex justify-content-between mb-7">
              第${i+1}名
              <span class="result-box-paragraph text-info" id=personalTimeAverage${i+1}>
              </span>
          </li>
        `
        personalTimeAverageTop5.innerHTML+=str;
        personalTotalTimeArr.forEach((item,index)=>{ //取出personalTotalTimeArr的值
          if(item==minimum[i]){ //當值跟對應名次的值相同，代表該index為該對應名次
                let str=`${data[index].slackName}：${data[index].practiceMinute}分${data[index].practiceSecond}秒`
                document.querySelector(`#personalTimeAverage${i+1}`).innerHTML+=str;
                return;
            }
        })
      }
      for(let i=5;i<10;i++){ //取六到十名，依序建立名次的字串
        let str=` 
          <li class="result-box-item d-flex justify-content-between mb-7">
              第${i+1}名
              <span class="result-box-paragraph text-info" id=personalTimeAverage${i+1}>
              </span>
          </li>
        `
        personalTimeAverageTop10.innerHTML+=str;
        personalTotalTimeArr.forEach((item,index)=>{ 
            if(item==minimum[i]){ //當值跟對應名次的值相同，代表該index為該對應名次
                let str=`${data[index].slackName}：${data[index].practiceMinute}分${data[index].practiceSecond}秒`
                document.querySelector(`#personalTimeAverage${i+1}`).innerHTML+=str;
                return;
            }
        })
    }  
}
function messageDataOrganize(data){
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
function changeSort(e){
    if(e.target.value=="sendTime"){
        //console.log(e.target.value);
        
    }else{
        //console.log(e.target.value)
    }
}