$(function(){
  //html読み込み後に処理を実行する
  $("#q1").ready(function(){
    //q1の色を緑に変更する
    $("#q1").css("color","green");
  });
  //q2をクリックすると処理を実行する
  $("#q2").on("click",function(){
    //q2の背景色を白に変更する
    $("#q2").css("background","white");
  });
  //q3をクリックすると処理を行う
  $("#q3").on("click",function(){
    //q3をフェードアウトさせる
    $("#q3").fadeOut(3000);
  });
  //q4をクリックすると処理を行う
  $("#q4").on("click",function(){
    //q4の位置にクラス名largeを追加しサイズを変更する
    $("#q4").addClass("large");
  });
  //q5をクリックすると処理を行う
  $("#q5").on("click",function(){
    //q5の前後に要素を追加
    $("#q5").append("DOMの中の後").prepend("DOMの中の前");
    //q5の外の前後に要素を追加
    $("#q5").after("DOMの後").before("DOMの前");
  })
  //q6をクリックすると処理を行う
  $("#q6").on("click",function(){
    //q6を右下に１００px、2秒かけて移動させる
    $("#q6").animate({
      marginLeft: "100px",marginTop: "100px"
    },2000);
  });
  //q7をクリックすると処理を行う
  $("#q7").on("click",function(){
    //イベント発生中の要素のノードをコンソールに表示
    console.log(this);
  })
  $("#q8").on({
  //q8がホバー中に処理を行う
  "mouseenter":function(){
    //q8の位置にクラス名largeを追加しサイズを変更する
    $("#q8").addClass("large");
  },
  //q8がホバー後に処理を行う
  "mouseleave":function(){
    //q8の位置のクラス名largeを削除しサイズを変更する
    $("#q8").removeClass("large");
  }});
  //q9のliいずれかをクリックすると処理を行う
  $("#q9 li").on("click",function(){
    //イベント中の要素の配列番号をindexNumberとして定義
    const indexNumber = $(this).index();
    //indexNumberをアラートで表示
    alert(indexNumber);
  });
  //q10のliいずれかをクリックすると処理を行う
  $("#q10 li").on("click",function(){
    //イベント中の要素の配列番号をq11Numberと定義
    const q11Number = $(this).index();
    //q11Numberに追加された配列番号をq11のliに当て嵌め、その部分だけにlarge-textを追加する
    $("#q11 li").eq(q11Number).addClass("large-text");
  })
})