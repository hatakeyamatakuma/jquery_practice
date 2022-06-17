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
      const contentTitle = content[index]["title"];
      const author = content[index]["dc:creator"];
      const publisher = content[index]["dc:publisher"][0]
      const link = content[index]["link"]["@id"];
      //以下指定の位置にデータを挿入する関数
      addElement($(".lists"));
      addContentTitle(contentTitle);
      addAuthor(author);
      addPublisher(publisher);
      addLink(link);
      });
  //検索結果がなかった場合以下の処理を行う
  }else{
    //検索結果なしのメッセージを表記させるためのdivを作成
    $(".inner").eq(0).prepend("<div>");
    //クラス名をmessageとする
    $(".inner div").addClass("message");
    //二行でテキストを表記する
    $(".message").append("検索結果が見つかりませんでした。","<br>","別のキーワードで検索してください。")
  };

};
//error時に時効される関数
function displayError(errContent){
  //,messageが既に表示されている場合処理を行う
  if($(".message").length){
    //.messageを消去する
    $(".message").remove();
  };
  //httpステータスをerrCodeとする
  const errCode = errContent.status
  //通信失敗時のメッセージを表記させるためのdivを作成
  $(".inner").eq(0).prepend("<div>");
  //クラス名をmessageとする
  $(".inner div").addClass("message");
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

//pageCountの初期値は１
let pageCount = 1;

//リセットボタンを押したときに処理を開始する
$(".reset-btn").on("click",function(){
  //検索結果を表示しているliを削除する
  $("li").remove();
  //pageCountを0にして次の検索時に1ページ目を表示できるようにする
  pageCount = 0;
  ///検索ワードをからの状態に戻す
  $("#search-input").val("");
});

//要素作成時の関数
function addElement(lists){
  //liを作成
  lists.prepend("<li>");
  //liにクラス名をつける
  lists.children().addClass("lists-item");
  //一番上のlists-itemの中にdivを作成
  $(".lists-item").eq(0).append("<div>");
  //divにクラス名をつける
  $(".lists-item div").addClass("list-inner");
  //一番上のlist-innerにp３つa1つ追加する
  $(".list-inner").eq(0).append("<p>","<p>","<p>","<a>");
};

//以下がデータ加工した変数を指定の位置に配置するメソッド
function addContentTitle(contentTitle){
  $(".list-inner p:nth-child(1)").eq(0).append("タイトル：",contentTitle);
};
function addAuthor(author){
  if(author){
    $(".list-inner p:nth-child(2)").eq(0).append("作者：",author);
  }else{
    //作者、出版社に関してはデータがない場合空欄になってしまうので、その場合"不明"と表記する。なおタイトルが空欄になることはないため省略している
    $(".list-inner p:nth-child(2)").eq(0).append("作者：","作者不明");
  };
};
function addPublisher(publisher){
  if(publisher){
    $(".list-inner p:nth-child(3)").eq(0).append("出版社：",publisher);
  }else{
    $(".list-inner p:nth-child(3)").eq(0).append("出版社：","出版社不明");
  };
};
function addLink(link){
    //lists-inner aに固定の文字列、適切なリンクを配置
    $(".list-inner a").eq(0).append("書籍情報").attr("href",link);
};