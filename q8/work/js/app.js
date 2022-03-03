$(function() {
  //.search-btnをクリックすると処理を開始する
  $(".search-btn").on("click",function(){
    //入力した文字をsearchWordに置き換える
    const searchWord = $("#search-input").val();
    console.log(searchWord);
    //pageCountは初期値が１。同じ検索ワードなら＋１。違う場合は１に戻す。
    const pageCount = 1;
    const settings = {
        //titleは部分一致検索、formatはフォーマット指定。ここではjson。pはページ番号。countは１ページあたりの表示数。
        "url": `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
        "method": "GET",
    };
    $.ajax(settings)
    　.done(function (response) {
      console.log("AJAX通信は成功")//ここの処理が実行された時点でajax通信自体は成功している
      const result = response['@graph'];
      displayResult(result)//ここで関数を呼び出して要素を表示する処理を行う
    })
    　.fail(function (err) {
      console.log("AJAX通信失敗！");
      displayError(err)
    });
  })
});




function displayResult(fn){//一度に２０個表示
  const content = fn["0"]["items"]["0"]
  console.log(content);
  const title = content["title"];
  const author = content["dc:creator"];
  const publisher = content["dc:publisher"]["0"];
  const link = content["link"]["@id"];

  
  //fn 0 items 要素２０　の指定を省略する方法を探す。


  $("ul").append("<li>");
  $(".lists li").addClass("lists-item");
  $(".lists-item").append("<div>");
  $(".lists-item div").addClass("lists-inner");
  $(".lists-inner").append("<p>");
  $(".lists-inner p").eq(0).text("タイトル:");
  $(".lists-inner p").eq(0).append(title);
  $(".lists-inner").append("<p>");
  $(".lists-inner p").eq(1).text("作者:");
  $(".lists-inner p").eq(1).append(author);
  $(".lists-inner p").eq(1).append()
  $(".lists-inner").append("<p>");
  $(".lists-inner p").eq(2).text("出版社:");
  $(".lists-inner p").eq(2).append(publisher);
  $(".lists-inner").append("<a>");
  $(".lists-inner a").text("書籍情報");
  $(".lists-inner a").attr("href",link);
}





//lists ulの子要素にlist-itemを追加する。その内容は検索結果の内容が入る


/*　　『動きの言語化』
serchinputに入力された文字をserchWordという変数に置き換える。
そのserchWordを検索機能のある図書館のURLのsearch?titleに送る。
その検索結果を取得して元データに反映。
その時のデータはjson形式、Pタグ？で取得。
その取得データは20件まで表示する様にpageCountで指定。
取得データはlist-itemとして表示。

　　　『調べるべき事柄』

*/