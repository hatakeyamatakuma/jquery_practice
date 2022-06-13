$(function () {
    //select-boxで表示されているデータが違うものになった時処理を行う
  $(".select-box").on("change", function () {
    //セレクトボックスで選択された部分のvalueをselectValとして設定
    const selectVal = $(this).val();
    //food-listのliをfoodLiと設定
    const foodList = $(".food-list li");
    //三項演算子、value値がallだった場合foodlistを全て表示する
    if(selectVal === "all"){
      foodList.show();
    }else{
      //繰り返しの処理
      $.each(foodList, function (index, foodVal) {
        //foodValのcategory-typeの中身を取得、categoryTypeとする
        const categoryType = $(foodVal).data("category-type");
        //selectValとcategoryTypeが同一であればそのfoodValの表示、違えばfoodValを非表示
        if(selectVal === categoryType){
          $(foodVal).show();
        }else{
          $(foodVal).hide()
        };
      });
    };
  });
});

