//ボックスを変数「elm」として格納
let elem = document.getElementById("element");
//書き出しコード部分を変数「code」として格納
let code = document.getElementById("code");
//input(range)タグの全てを変数「inputs」に格納
let inputs = document.querySelectorAll(".sliders input");

//取得したカラー情報と透明度の情報を16進数から10進数に変更する
const hexToRgba = (shadowColor, shadowColorOpacity) => {
  //num.substr(開始位置, 文字数)で数字の切り出し
  let r = parseInt(shadowColor.substr(1, 2), 16);
  let g = parseInt(shadowColor.substr(3, 2), 16);
  let b = parseInt(shadowColor.substr(5, 2), 16);
  return `rgba(${r},${g},${b},${shadowColorOpacity})`;
};

const generateShadow = () => {
  //inputタグの要素それぞれを変数に格納
  let hShadow = document.getElementById("h-shadow").value;
  let vShadow = document.getElementById("v-shadow").value;
  let blurRadius = document.getElementById("blur-radius").value;
  let spreadRadius = document.getElementById("spread-radius").value;
  let shadowColor = document.getElementById("shadow-color").value;
  let shadowColorOpacity = document.getElementById(
    "shadow-color-opacity"
  ).value;
  let shadowInset = document.getElementById("shadow-inset").checked;

  //insetにチェックが押されているかで条件を変え,変数「boxShadow」に格納
  let boxShadow = shadowInset
    ? `inset ${hShadow}px ${vShadow}px ${blurRadius}px ${spreadRadius}px ${hexToRgba(
        shadowColor,
        shadowColorOpacity
      )}`
    : `${hShadow}px ${vShadow}px ${blurRadius}px ${spreadRadius}px ${hexToRgba(
        shadowColor,
        shadowColorOpacity
      )}`;
  //boxShadowをボックスのスタイルに適用する
  elem.style.boxShadow = boxShadow;
  //box-shadowプロバティがコピーできるようにcode内に記述
  code.textContent = `box-shadow: ${boxShadow};`;
};

//inputs全てに、クリックイベントを付与
inputs.forEach((input) => input.addEventListener("input", generateShadow));

//クリップコードにコピーする関数
const copyCode = () => {
  navigator.clipboard
    .writeText(code.value)
    .then((text) => {
      alert("コピーされました！");
    })
    .catch((err) => {
      console.error("error!", err);
    });
};

//ページのロード時にgenerateShadow()を走らせる
window.onload = generateShadow();
