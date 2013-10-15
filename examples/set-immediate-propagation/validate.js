$.fn.addValidator = function(validate) {
  this.each(function() {
    var control = $(this), form = $(this.form);
    form.submit(function(e) {
      var label = control.closest('label');
      label.removeAttr('error');
      var error = validate(control.val());
      if (error) {
        label.attr('error', error);
        control.focus();
        e.stopPropagation(); // (!!!)
        e.preventDefault();
      }
    });
  });
};

// Добавить валидацию ко всем полям в документе
$('[validate~="username"]').addValidator(function(value) {
  if (!value) return;
  return value.length > 50 ? "Слишком длинное имя пользователя email" : '';
});

$('[validate~="email"]').addValidator(function(value) {
  if (!value) return;
  return !value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,8}$/) ?
    "Некорректный email" : '';
});

$('[validate~="required"]').addValidator(function(value) {
  if (!value) return "Введите значение";
});
