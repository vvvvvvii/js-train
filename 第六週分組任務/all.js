axios.get('https://raw.githubusercontent.com/hexschool/js-traninging-week6API/main/data.json')
  .then(function(response){
    if(response.status==200){
      checkTime(response.data);
      checkGroup(response.data);
      let timeArr = response.data.map(item=>(60*item.practiceMinute)+Number(item.practiceSecond))
      console.log(timeArr)
    }
})
function checkTime(data){
  let practiceTime=[];
  data.forEach(item=>{
    practiceTime.push((60*item.practiceMinute)+Number(item.practiceSecond));
  })
  //console.log(practiceTime);
}
function checkGroup(data){
  data.map(item=>console.log(item))
}
/*
請用 BMI kata API用 Code 寫出以下需求
可以看到最佳組別投稿數排名、總平均秒數排名
可以看到個人排名列表，
我能在每個參賽者中看到每個人的留言、YT 連結、分鐘數
篩選排序方式：可依投遞時間、秒數(由高到低)
*/