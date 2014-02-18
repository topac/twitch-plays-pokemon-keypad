$(function(){
  // wow, much code

  var COMMANDS = {
    119: 'up',         /* w */
    97:  'left',       /* a */
    115: 'down',       /* s */
    100: 'right',      /* d */
    49:  'a',          /* 1 */
    50:  'b',          /* 2 */
    51:  'start',      /* 3 */
    52:  'select',     /* 4 */
    110:  'anarchy',   /* n */
    109:  'democracy', /* m */
  };

  var log = function(message){
    if (console && console.log) console.log(message);
  };

  var isChatLoaded = function(){
    return $('#chat_text_input').is(':enabled');
  };

  var waitForChatReady = function(callback){
    var interval = setInterval(function(){
      if (isChatLoaded()){
        clearInterval(interval);
        callback();
      }
    }, 20);
  };

  var addHint = function(){
    $('<p id="sent-feedback"></p>')
      .css({'color': 'purple', 'font-weight': 'bold'})
      .insertAfter('#chat_text_input');

    $('<p>Commands are:<br/>(w) up, (a) left, (s) down, (d) right<br/>(1) a, (2) b, (3) start, (4) select<br/>(n) anarchy, (m) democracy</p>')
      .css({'color': 'purple'})
      .insertAfter('#chat_text_input');

    $('<input type="checkbox" checked="checked" id="enable-wasd-keys" value="1"> Use Keypad Extension</input>')
      .insertAfter('#chat_text_input');
  };

  var listenKeyPress = function(){
    $(window).keypress(function(e){
      var cmd = COMMANDS[e.keyCode];
      if (!cmd) return;
      if (!canSendCommand()) return;
      sendCommandViaChat(cmd);
    });

    addHint();
  };

  var canSendCommand = function(){
    return $('#enable-wasd-keys').is(':checked');
  };

  var sendCommandViaChat = function(cmd){
    $('#chat_text_input').val(cmd).blur();
    $('#chat_speak').click();
    $('#sent-feedback').text("> Sent "+cmd);
  };

  waitForChatReady(listenKeyPress);
});
