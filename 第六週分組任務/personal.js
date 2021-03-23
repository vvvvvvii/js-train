let personalTimeAverageTop5 = document.querySelector('#personalTimeAverageTop5');
let personalTimeAverageTop10 = document.querySelector('#personalTimeAverageTop10');

//axios
axios.get('https://raw.githubusercontent.com/hexschool/js-traninging-week6API/main/data.json')
  .then(function(response){
    if(response.status==200){
      personalAverageTimeDataOrganize(response.data);
    }
})

function personalAverageTimeDataOrganize(data){}
  