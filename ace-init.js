function initAceEmbedded() {

  $('.ace-embedded').each(function() {
    if (this.tagName != "SCRIPT") {
      var editorElem = $(this);
    } else {
      editorElem = $('<div/>', {
        text: $(this).html(),
        class: this.className
      });

      $(this).replaceWith(editorElem);
    }

    editorElem.html($.trim(editorElem.html()));
    var editor = ace.edit(editorElem[0]);
    editor.setTheme("ace/theme/chrome");

    console.log("OK");

    var session = editor.getSession();
    session.setMode("ace/mode/javascript");
    session.setTabSize(2);
    editor.commands.addCommand({
      name: 'eval',
      bindKey: {win: 'Ctrl-Enter', mac: 'Command-Enter'},
      exec: function(editor) {
        $(".ace_content", editorElem).effect("highlight", {color: "#FFC0CB"}, 100).promise().done(
            function() {
              $.globalEval(editor.getValue());
            }
        );
      },
      readOnly: true // false if this command should not apply in readOnly mode
    });

    if (editorElem.data('eval')) eval(editorElem.data('eval'));

  });
}