$(function () {
    //select-boxで表示されているデータが違うものになった時処理を行う
  $(".select-box").on("change", function () {
    //セレクトボックスで選択された部分のvalueをselectValとして設定
    const selectVal = $(this).val(),
    //food-listのliをfoodLiと設定
    foodLi = $(".food-list li");
    //三項演算子、value値がallだった場合foodlistを全て表示する
    "all" === selectVal ? foodLi.show() :
    //allでなかった場合、eachを使って繰り返し処理、foodLiのvalueをfoodValとする。
    $.each(foodLi, function (index, foodVal) {
    //この二行は繰り返しの処理。foodValのcategory-typeの中身を取得、categoryTypeとする
    const categoryType = $(foodVal).data("category-type");
    //三項演算子、selectValとcategoryTypeが同一であればそのfoodValの表示、違えばfoodValを非表示
    selectVal === categoryType ? $(foodVal).show() : $(foodVal).hide()
    }) }) });