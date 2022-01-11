function speech_setup(){
  myRec.onEnd = endSpeech;
  // 随時音声入力をテキスト化する際に呼び出される関数を登録
  myRec.onResult = parseResult;
  // 連続した音声認識は行わない．プログラム内で適時音声認識のstopとstartを制御する
  myRec.continuous = false; // no continuous recognition
  // 読み上げ.ている最中の認識途中の文字列も利用する場合
  myRec.interimResults = true; // allow partial recognition (faster, less accurate)
  // プログラム制御用変数（true: 音声認識利用中を示す）
  is_recognition_activated = true;
  // 認識言語は日本語
  myRec.rec.lang = "ja";
}

function toggleSpeechRecognition() {
  
    // 認識ステータスを反転させる（trueならfalse，falseならtrue）
    is_recognition_activated = !is_recognition_activated;
  
    // 音声認識アクティベート
    if (is_recognition_activated == true) {
      myRec.rec.lang = "ja"; // 日本語認識
      myRec.start(); // 認識スタート
      //this.html("stop"); //ボタンの表示をstopにする
    }
    // 音声認識を停止させる
    else {
      // 音声認識をとめる
      myRec.stop();
    }
  }
  
  function parseResult() {
    // javascript native な記述
    // document.getElementById("label").innerHTML = "speaking...";
    //select('#label').html("speaking...");
    
    // javascritp native な記述
    // document.getElementById("text").value = myRec.resultString;
    //select('#text').value(myRec.resultString);
  }



  function build_function(string) {
    return function(err, tokenizer) {
      var tokens = tokenizer.tokenize(string);
      console.log('tokens', tokens);
    }
  }

  function endSpeech() {
    
    // 音声認識アクティベート中なら
    if (is_recognition_activated == true) {
      
      // 認識文字列に何も入っていなければ（タイムアウトでendSpeechになった場合）
      if (!myRec.resultValue) {
        myRec.start(); // start engine
        return;
      }

      
      
      // 認識文字列になんか入ってれば
      if (myRec.resultString.length > 0) {
        //console.log("End");
        //document.getElementById("label").innerHTML = "quiet";
        //document.getElementById("textarea").innerHTML += myRec.resultString + "。¥n";
        said += myRec.resultString + " ";
        saying += myRec.resultString + "  ";
        sent_count++;
        saying_count++;
        //document.getElementById("text").value = "";
        console.log(myRec.resultString);

        //話した回数を記録
        if(sent_count == 1){
          said = myRec.resultString;
          sent_count = 0;
        }

        if(saying_count == 1){
          saying = myRec.resultString;
          saying_count = 0;
          sbox = font.textBounds(saying, 0,0);
          builder.build(build_function(saying));
          i = width/2;
        }

        myRec.resultString = "";

      }

      myRec.start(); // start engine
      console.log("start");
    }
  }