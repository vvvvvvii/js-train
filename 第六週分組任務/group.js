let groupSubmitNum = document.querySelector('#groupSubmitNum');
let groupTimeAverageTop5 = document.querySelector('#groupTimeAverageTop5');
let groupTimeAverageTop10 = document.querySelector('#groupTimeAverageTop10');

//axios
axios.get('https://raw.githubusercontent.com/hexschool/js-traninging-week6API/main/data.json')
  .then(function(response){
    if(response.status==200){
      groupSubmitDataOrganize(response.data);
      groupAverageTimeDataOrganize(response.data);
    }
})

//functions
function groupSubmitDataOrganize(data){
    let groupArr = data.map(item=>item.jsGroup);
    //console.log(data);
    let groupSubmitNumObj = {};
    groupArr.forEach(item=>{ 
      if(item!="未分組"){ //扣掉未分組者
        groupSubmitNumObj[item]=(groupSubmitNumObj[item]||0)+1; 
      }
    })
    //投稿數最佳組別渲染到畫面上
    let maximum = [...Object.values(groupSubmitNumObj)].sort((x,y)=>y-x); //只取數量轉回陣列由大排到小
    maximum = Array.from(new Set(maximum)); //刪掉重複數字
    for(let i=0;i<maximum.length;i++){ //maximum的長度代表名次共有幾名（一個名次可能不只一組），依序建立名次的字串
      let str=` 
        <li class="result-box-item mb-7">
            第${i+1}名
            <span class="ml-5" id=groupSubmit${i+1}>
            </span>
        </li>
      `
      groupSubmitNum.innerHTML+=str;
      Object.values(groupSubmitNumObj).forEach((item,index)=>{ //取出groupSubmitNumObj的值，index+1即會是組別
          if(item==maximum[i]){ //當值跟對應名次的值相同，代表該組為該對應名次
            let str=`
              <span class="result-box-number-ball">${index+1}</span>
            `
            document.querySelector(`#groupSubmit${i+1}`).innerHTML+=str;
            return;
          }
      })
    }
  }
  function groupAverageTimeDataOrganize(data){
    data.forEach(item=>{ //新增totalTime（分鐘數*60+秒數）的屬性到每個人的資料中
      item.totalTime = Number(item.practiceMinute)*60+Number(item.practiceSecond);  
    })
    let groupTotalTimeArr = [];
    for(let i=1;i<=27;i++){
      let groupArr = data.filter(item=>item.jsGroup==i); //每個組別單獨抽成一個陣列
      let arrTotal = 0;
      groupArr.forEach(item=>arrTotal+=item.totalTime)//加總陣列的總秒數
      groupTotalTimeArr.push(arrTotal/groupArr.length); //總秒數除以陣列長度（＝組別人數）得到該組平均時間，得到的結果放進groupTotalTimeArr陣列，讓他紀錄全部組別的平均數
    }
    //平均秒數最佳組別渲染到畫面上
    let maximum = [...groupTotalTimeArr].sort((x,y)=>y-x); //只取數量轉回陣列由大排到小
    maximum = Array.from(new Set(maximum)); //刪掉重複數字
    for(let i=0;i<5;i++){ //取前五名，依序建立名次的字串
      let str=` 
        <li class="result-box-item mb-7">
            第${i+1}名
            <span class="result-box-paragraph" id=groupTimeAverage${i+1}>
            </span>
        </li>
      `
      groupTimeAverageTop5.innerHTML+=str;
      groupTotalTimeArr.forEach((item,index)=>{ //取出groupTotalTimeArr的值，index+1即會是組別
        if(item==maximum[i]){ //當值跟對應名次的值相同，代表該組為該對應名次
          let str=`第${index+1}組`
          document.querySelector(`#groupTimeAverage${i+1}`).innerHTML+=str;
          return;
        }
      })
    }
    for(let i=5;i<10;i++){ //取六到十名，依序建立名次的字串
      let str=` 
        <li class="result-box-item mb-7">
            第${i+1}名
            <span class="result-box-paragraph" id=groupTimeAverage${i+1}>
            </span>
        </li>
      `
      groupTimeAverageTop10.innerHTML+=str;
      groupTotalTimeArr.forEach((item,index)=>{ //取出groupTotalTimeArr的值，index+1即會是組別
        if(item==maximum[i]){ //當值跟對應名次的值相同，代表該組為該對應名次
          let str=`第${index+1}組`
          document.querySelector(`#groupTimeAverage${i+1}`).innerHTML+=str;
          return;
        }
      })
    }
  }
  