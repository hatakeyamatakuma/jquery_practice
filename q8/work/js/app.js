//pageCountの初期値は１
let pageCount = 1;
//ページの読み込みが終わったら処理を実行する
$(function() {
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
      //取得した情報をresultという変数に変換
      const result = response['@graph'];
      //関数を呼び出して要素を表示する処理を行う
      displayResult(result)
    })
    //AJAXのやりとりでエラーが発生した場合以下の処理が実行される
    .fail(function (err) {
      //AJAX通信が失敗したかの確認
      displayError(err)
    });
  })
});

//呼び出される関数
function displayResult(getResult){
  //この処理に入る前にfail処理に入り、メッセージ文が表示されている場合、消去する
  if($(".message").length){
    $(".message").remove();
  };
  //pageCountが1だった場合、liを消去する。別の検索結果が残っている可能性がある為
  if(pageCount === 1){
    $(".lists li").remove();
  };
  //検索結果の数だけ繰り返し処理を行う
  const content = getResult[0]["items"];
  //検索結果のcontentの中身があれば以下の処理を行う
  if(content){
    //最大20回の繰り返し処理
    $(content).each(function(index, title){
      //検索結果の中のタイトルや作者名等を変数として定義
      let contentTitle = content[index].title;
      let author = content[index]["dc:creator"];
      let publisher = content[index]["dc:publisher"][0];
      const link = content[index].link["@id"];
      //生成されるhtml要素を想定し代入。目的が同じデータ元は分けて書くと帰って冗長の為。検索結果がなかった場合不明と返すための三項演算子も代入時に組み込んであります
      const htmlData = `<li class=lists-item><div class=list-inner><p>タイトル：${contentTitle ? contentTitle : contentTitle = "タイトル不明"}</p><p>作者：${author ? author : author = "作者不明"}</p><p>出版社：${publisher ? publisher : publisher = "出版社不明"}</p><a></a></div></li>`
      $(".lists").prepend(htmlData);
      //文字列の中に関数は組み込めない為aのみ別で作成
      $(".list-inner a").eq(0).append("書籍情報").attr("href",link).attr("target","_blank")
      });
  }else{
    //検索結果なしのメッセージを表記させるためのdivを作成
    $(".inner").prepend("<div class= message>検索結果が見つかりませんでした。<br>別のキーワードで検索してください。</div>");
  };

};
//error時に時効される関数
function displayError(errContent){
  // .messageが既に表示されている場合処理を行う
  if($(".message").length){
    //.messageを消去する
    $(".message").remove();
  };
  //httpステータスをerrCodeとする
  const errCode = errContent.status
  //通信失敗時のメッセージを表記させるためのdivを作成
  $(".inner").prepend("<div class=message></div>");
  //errCodeが0だった場合以下の処理を行う
  if(errCode === 0){
    $(".message").append("正常に通信できませんでした。","<br>","インターネットの接続の確認をしてください。");
  }//errCodeが400だった場合以下の処理を行う
  else if(errCode === 400){
    //二行でテキストを表記する
    $(".message").append("検索キーワードが有効ではありません。","<br>","１文字以上で検索してください。")
  }else{
    $(".message").append("予期しないエラーが発生しました","<br>","管理者へ報告してください");
  };
};

//リセットボタンを押したときに処理を開始する
$(".reset-btn").on("click",function(){
  //検索結果を表示しているliを削除する
  $("li").remove();
  //pageCountを0にして次の検索時に1ページ目を表示できるようにする
  pageCount = 0;
  ///検索ワードをからの状態に戻す
  $("#search-input").val("");
});