$(function () {
   $(".select-box").on("change", function () {//select-boxで表示されているデータが違うものになった時処理を行う
   const selectVal = $(this).val(),//セレクトボックスで選択された部分のvalueをselectValとして設定
       foodLi = $(".food-list li");//food-listのliをfoodLiと設定
       "all" === selectVal ? foodLi.show() ://三項演算子、value値がallだった場合foodlistを全て表示する
       　$.each(foodLi, function (index, foodVal) {//allでなかった場合、eachを使って繰り返し処理、foodLiのvalueをfoodValとする。
       const categoryType = $(foodVal).data("category-type");//この二行は繰り返しの処理。foodValのcategory-typeの中身を取得、categoryTypeとする
       selectVal === categoryType ? $(foodVal).show() : $(foodVal).hide()//三項演算子、selectValとcategoryTypeが同一であればそのfoodValの表示、違えばfoodValを非表示
      }) }) });