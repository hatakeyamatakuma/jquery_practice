//nav_itemをクリックすると処理を行う
$(".nav li").on("click",function(){
  //イベント中の要素の配列番号をpageNumberと定義
  const pageNumber = $(this).index();
  //description li全てにis-hiddenというdisplay: noneを持つクラスを追加
  $(".description li").addClass("is-hidden");
  //description liのイベント中の要素のis-hiddenと言うクラスを削除し、そのクラスだけdisplay: noneを解除し表示する
  $(".description li").eq(pageNumber).removeClass("is-hidden");
})