let groupSubmitNum = document.querySelector('#groupSubmitNum');
axios.get('https://raw.githubusercontent.com/hexschool/js-traninging-week6API/main/data.json')
  .then(function(response){
    if(response.status==200){
      groupSubmitDataOrganize(response.data);
    }
})
function groupSubmitDataOrganize(data){
  let groupAry = data.map(item=>item.jsGroup);
  //console.log(data);
  let groupSubmitNumObj = {};
  groupAry.forEach(item=>{ 
    if(item!="未分組"){ //扣掉未分組者
      groupSubmitNumObj[item]=(groupSubmitNumObj[item]||0)+1; 
    }
  })
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
