'use strict';

{
    function setWord() {
        word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
        target.innerHTML = `<span>${word}</span>`;
        loc = 0;
    }
    
    const words = [
        'red',
        'blue',
        'pink',
    ];
    
    let word = 'red';
    let loc = 0;
    let startTime;
    let isPlaying = false;
    const target = document.getElementById('target');
    
    document.addEventListener('keydown', e => {
        if(isPlaying === true){
            return;
        }
        
        if(e.key === ' ') {
            isPlaying = true;
            startTime = Date.now();
            setWord();
        }  
    })
    
    document.addEventListener('keydown', e => {
        
        // 打った文字が異なる場合はここで処理を抜ける
        //　メインとなる処理以外のケースを早めに除外し、メイン処理をわかりやすくすることを「早期リターン、アーリーリターン」という
        if(e.key !== word[loc]){
            return;
        }
        
        // 処理を抜けない場合、つまり打った文字が正しい場合となるので分岐は書かなくてもOKとなる
        loc++;
        
        // 入力したものはclass付きのspanに差し替え
        target.innerHTML = `<span class="typed">${word.substring(0, loc)}</span><span>${word.substring(loc)}</span>`;

        // locが入力文字数と一致した場合、つまり単語の最後まで入力し切った場合
        if(loc === word.length) {
            // lengthが0、つまり最後の単語まで入力し切った場合
            if(words.length === 0) {
                const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
                const result = document.getElementById('result');
                result.textContent = `Finished! ${elapsedTime} seconds!` ;
                return;   
            }
            setWord();
        }
    })
}