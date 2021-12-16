$(".dropdwn li").on({
  //dropdwn liにマウスを置いた時処理を行う
  "mouseenter": function(){
  //隠していた要素を表示する
    $("ul:not(:animated)",this).slideDown();
  //dropdwn liからマウスが離れた時に処理を行う
},"mouseleave": function(){
  //表示していた要素を非表示する処理を行う
  $("ul:not(:animated)",this).slideUp();
}
});