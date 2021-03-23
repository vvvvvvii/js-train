let personalTimeAverageTop5 = document.querySelector('#personalTimeAverageTop5');
let personalTimeAverageTop10 = document.querySelector('#personalTimeAverageTop10');

//axios
axios.get('https://raw.githubusercontent.com/hexschool/js-traninging-week6API/main/data.json')
  .then(function(response){
    if(response.status==200){
      personalAverageTimeDataOrganize(response.data);
    }
})

function personalAverageTimeDataOrganize(data){
    data.forEach(item=>item.totalTime = Number(item.practiceMinute)*60+Number(item.practiceSecond)) //新增totalTime（分鐘數*60+秒數）的屬性到每個人的資料中
    let personalTotalTimeArr = data.map(item=>item.totalTime); //把每個人的時間推進陣列中
    let minimum = [...personalTotalTimeArr].sort((x,y)=>x-y); //時間少到多
    minimum = Array.from(new Set(minimum)); //刪掉重複數字
    console.log(minimum)
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
