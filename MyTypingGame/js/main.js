"use strict";

{
  // CSVファイル読み込み
  function csvToArray(filename) {
    // CSVファイルを文字列として取得
    let srt = new XMLHttpRequest();
    srt.open("GET", filename, false);
    try {
      srt.send(null);
    } catch (err) {
      console.log(err);
    }

    // 改行ごとに配列化
    let lines = srt.responseText.split("\n");

    return lines;
  }

  function setWord(strArr) {
    word = strArr.splice(Math.floor(Math.random() * strArr.length), 1)[0];
    target.innerHTML = `<span>${word}</span>`;
    loc = 0;
  }

  let word;
  let words = [];
  let loc = 0;
  let startTime;
  let isPlaying = false;
  const target = document.getElementById("target");

  document.addEventListener("keydown", (e) => {
    if (isPlaying === true) {
      return;
    }

    if (e.key === " ") {
      isPlaying = true;
      words = csvToArray("/test.csv");
      startTime = Date.now();
      setWord(words);
    }
  });

  document.addEventListener("keydown", (e) => {
    // 打った文字が異なる場合はここで処理を抜ける
    //　メインとなる処理以外のケースを早めに除外し、メイン処理をわかりやすくすることを「早期リターン、アーリーリターン」という
    if (e.key !== word[loc]) {
      return;
    }

    // 処理を抜けない場合、つまり打った文字が正しい場合となるので分岐は書かなくてもOKとなる
    loc++;

    // 入力した文字はclass付きのspanに差し替え
    target.innerHTML = `<span class="typed">${word.substring(
      0,
      loc
    )}</span><span>${word.substring(loc)}</span>`;

    // locが入力文字数と一致した場合、つまり単語の最後まで入力し切った場合
    if (loc === word.length) {
      // lengthが0、つまり最後の単語まで入力し切った場合、ゲーム終了処理
      if (words.length === 0) {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        const result = document.getElementById("result");
        result.textContent = `Finished! ${elapsedTime} seconds!`;
        return;
      }
      setWord(words);
    }
  });
}
