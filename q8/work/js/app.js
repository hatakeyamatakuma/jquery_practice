//ページの読み込みが終わったら処理を実行する
$(function() {
  //pageCountの初期値は１
  let pageCount = 1;
  //ひとつ前の検索履歴の保管用
  let searchResult = "";
  //.search-btnをクリックすると処理を開始する
  $(".search-btn").on("click",function(){
    //入力した文字をsearchWordに置き換える
    let searchWord = $("#search-input").val();
    //同じ検索ワードなら＋１。違う場合は１に戻す
    if(searchWord === searchResult){
      pageCount = ++pageCount;
    }else{
      pageCount = 1
    };
    ///検索ワードを次回検索で比較するために保管する
    searchResult = searchWord;
    const settings = {
        //titleは部分一致検索、formatはフォーマット指定。ここではjson。pはページ番号。countは１ページあたりの表示数。
        "url": `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
        "method": "GET",
    };
    $.ajax(settings)
    //検索した情報がここに入る
    .done(function (response) {
      console.log("AJAX通信は成功")
      //取得した情報をresultという変数に変換
      const result = response['@graph'];
      //関数を呼び出して要素を表示する処理を行う
      displayResult(result)
    })
    //AJAXのやりとりでエラーが発生した場合以下の処理が実行される
    .fail(function (err) {
      console.log("AJAX通信失敗");
      //AJAX通信が失敗したかの確認
      displayError(err)
    });
  })
});


//呼び出される関数
function displayResult(fn){
  //検索結果の操作したい部分に合わせている
  const content = fn["0"]["items"];
  //20回の繰り返し処理
  $(content).each(function(index, title){
    //検索結果の中のタイトルや作者名等を変数として定義
    const contentTitle = content[index]["title"];
    const author = content[index]["dc:creator"];
    const publisher = content[index]["dc:publisher"][0]
    const link = content[index]["link"]["@id"];
    //liを作成
    $("ul").prepend("<li>");
    //liにクラス名をつける
    $(".lists li").addClass("lists-item");
    //一番上のlists-itemの中にdivを作成
    $(".lists-item").eq(0).append("<div>");
    //divにクラス名をつける
    $(".lists-item div").addClass("list-inner");
    //一番上のlist-innerにp３つa1つ追加する
    $(".list-inner").eq(0).append("<p>","<p>","<p>","<a>");
    //list-inner pのそれぞれに固定の文字列、適切なデータを配置
    $(".list-inner p:nth-child(1)").eq(0).append("タイトル：",contentTitle);
    $(".list-inner p:nth-child(2)").eq(0).append("作者：",author);
    $(".list-inner p:nth-child(3)").eq(0).append("出版社：",publisher);
    //lists-inner aに固定の文字列、適切なリンクを配置
    $(".list-inner a").eq(0).append("書籍情報").attr("href",link);
    });
}
/*
$(function(){
  $("ul").append("<li>");
    $(".lists li").addClass("lists-item");///////////////////////////ここまでは動作問題なし！！！！！！！！！
    $(".lists-item").eq(index).append("<div>");
    $(".lists-item div").addClass("list-inner");//固定！！！！
    $(".list-inner").eq(index).append("<p>","<p>","<p>","<a>");//html要素を必要な数展開。
    $(".list-inner p:nth-child(1)").eq(index).append("タイトル:",contentTitle);//pのそれぞれに固定の文字列を追加する。
    $(".list-inner p:nth-child(2)").eq(index).append("作者:",author);
    $(".list-inner p:nth-child(3)").eq(index).append("出版社:",publisher);
    $(".list-inner a").eq(index).append("書籍情報").attr("href",link);
})*/


    /*
    console.log(pageCount);
    console.log(searchWord);
    $(".search-btn").on(click,function(){
      let test = $("#search-input").val();
      console.log(test);
    })
        $("#search-input").change(function() {
      let val1 = $(this).val();// valueを取得
      console.log(val1);
    });*/
//セレクタがオブジェクトだからattrはエラーになる？セレクタがオブジェクトだとエラーになるメソッドも存在する。appendは平気なやつ？
//$(".lists-inner a")ここは問題ない、他のコードを当てはめたら動く
//("href",link)引数も問題ない
//問題があるのは[].attr()の部分。attrの前に数字がつくとなぜかエラー。.appendは動く。エラーの原因を調べる必要有り。




/*　　『動きの言語化』
serchinputに入力された文字をserchWordという変数に置き換える。
そのserchWordを検索機能のある図書館のURLのsearch?titleに送る。
その検索結果を取得して元データに反映。
その時のデータはjson形式、Pタグ？で取得。
その取得データは20件まで表示する様にpageCountで指定。
取得データはlist-itemとして表示。

　　　『調べるべき事柄』

*/