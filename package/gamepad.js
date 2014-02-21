$(function(){
  // wow, much code

  var COMMANDS = {
    87:  ['w', 'up'],
    119: ['w', 'up'],
    65:  ['a', 'left'],
    97:  ['a', 'left'],
    83:  ['s', 'down'],
    115: ['s', 'down'],
    68:  ['d', 'right'],
    100: ['d', 'right'],
    78:  ['n', 'anarchy', 'anarc.'],
    110: ['n', 'anarchy', 'anarc.'],
    77:  ['m', 'democracy', 'democ.'],
    109: ['m', 'democracy', 'democ.'],
    49:  ['1', 'a'],
    50:  ['2', 'b'],
    51:  ['3', 'start'],
    52:  ['4', 'select'],
    79:  ['o', 'on/off'],
  };

  var HTML = [
    '<div id="gamepad" align="center">',
    '  <table>',
    '    <tr>',
    '    </tr>',
    '      <td></td>',
    '      <td></td>',
    '      <td></td>',
    '      <td><div class="gamepad-key" data-key="1"></div></td>',
    '      <td><div class="gamepad-key" data-key="2"></div></td>',
    '      <td></td>',
    '    <tr>',
    '      <td></td>',
    '      <td><div class="gamepad-key" data-key="w"></div></td>',
    '      <td></td>',
    '      <td><div class="gamepad-key" data-key="3"></div></td>',
    '      <td><div class="gamepad-key" data-key="4"></div></td>',
    '      <td></td>',
    '    </tr>',
    '      <tr>',
    '      <td><div class="gamepad-key" data-key="a"></div></td>',
    '      <td><div class="gamepad-key" data-key="s"></div></td>',
    '      <td><div class="gamepad-key" data-key="d"></div></td>',
    '      <td><div class="gamepad-key" data-key="n"></div></td>',
    '      <td><div class="gamepad-key" data-key="m"></div></td>',
    '      <td><div class="gamepad-key gamepad-key-toggle" data-key="o"></div></td>',
    '    </tr>',
    '  </table>',
    '  <div class="gamepad-clear"></div>',
    '</div>',
  ].join("");

  var enabled = true;

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

  var toggleGamepad = function() {
    enabled = !enabled;

    if (enabled) {
      $('.gamepad-key').removeClass('gamepad-key-disabled');
    } else {
      $('.gamepad-key').addClass('gamepad-key-disabled');
    }

    $('.gamepad-key-toggle').removeClass('gamepad-key-disabled');
  };

  var sendCommandViaChat = function(cmd){
    $('#chat_text_input').val(cmd).blur();
    $('#chat_speak').click();
  };

  var elemFromKeyCode = function(keycode){
    var info = COMMANDS[keycode];
    return (info) ? $('.gamepad-key[data-key="'+info[0]+'"') : null;
  };

  var renderGamepad = function(){
    $(HTML).insertAfter('#chat_text_input');

    for(var c in COMMANDS){
      var key = COMMANDS[c][0];
      var label = COMMANDS[c][2] || COMMANDS[c][1];
      var html = '<span class="gamepad-key-title">'+key+'</span><span class="gamepad-key-shortcut">'+label+'</span>';
      $('.gamepad-key[data-key="'+key+'"').data('cmd', COMMANDS[c][1]).html(html);
    }
  };

  var onGamepadKeyDown = function(keyElem){
    if (!keyElem) return;
    keyElem.addClass('gamepad-key-active');
  };

  var onGamepadKeyUp = function(keyElem){
    if (!keyElem) return;
    keyElem.removeClass('gamepad-key-active');
    var cmd = keyElem.data('cmd');
    if (cmd == 'on/off') {
      toggleGamepad();
    } else if (enabled) {
      sendCommandViaChat(cmd);
    }
  };

  waitForChatReady(function(){
    renderGamepad();

    $(window).keydown(function(e){ onGamepadKeyDown(elemFromKeyCode(e.keyCode)) });
    $(window).keyup(function(e){ onGamepadKeyUp(elemFromKeyCode(e.keyCode)) });
    $('.gamepad-key').click(function(e){ onGamepadKeyUp($(this)) });
  });
});
