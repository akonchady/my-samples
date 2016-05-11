var g = G$('John', 'Doe');

$('#login').click(function() {
    var language = $('#lang').val();
    $('#logindiv').hide();
    g.setLanguage(language).HTMLGreeting('#greeting', true).log();
});