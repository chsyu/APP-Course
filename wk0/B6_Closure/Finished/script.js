// callback bind
$(document).ready(function(){
  let second = 0;
  setInterval(function(){
    second++;
    $('.timer').html(`Second is ${second}`);
  }, 1000);
});
