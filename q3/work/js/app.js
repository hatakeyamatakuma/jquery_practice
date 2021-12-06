//.drawer_buttonをクリックすると処理を行う
$(".drawer_button").on("click",function(){
  //activeと言うクラスがなければを追加、あれば削除をする
  $(".drawer_button").toggleClass("active");
  //openと言うクラスなければ追加、あれば削除する
  $(".drawer_nav_wrapper").toggleClass("open");
  //display: noneになっているdrawer_bgをゆっくりと表示する
  $(".drawer_bg").fadeToggle();
});
//drawer_bgをクリックすると処理を行う
$(".drawer_bg").on("click",function(){
  //activeと言うクラスを削除する
  $(".drawer_button").removeClass("active");
  //openと言うクラスを削除する
  $(".drawer_nav_wrapper").removeClass("open");
  //drawer_bgを削除する
  $(".drawer_bg").hide();
});