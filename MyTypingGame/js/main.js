'use strict';

{
    function setWord() {
        
        word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
        target.textContent = word;
        loc = 0;
    }
    
    const words = [
        'red',
        'blue',
        'pink',
    ];
    
    let word = 'red';
    let loc = 0;
    
    const target = document.getElementById('target');
    
    setWord();
    
    
    document.addEventListener('keydown', e => {
        
        // 打った文字が異なる場合はここで処理を抜ける
        //　メインとなる処理以外のケースを早めに除外し、メイン処理をわかりやすくすることを「早期リターン、アーリーリターン」という
        if(e.key !== word[loc]){
            return;
        }
        
        // 処理を抜けない場合、つまり打った文字が正しい場合となるので分岐は書かなくてもOKとなる
        loc++;
        
        // 1: _ed
        // 2: __d
        target.textContent = '_'.repeat(loc) + word.substring(loc);
        
        if(loc === word.length) {
            setWord();
        }
    })
}