document.addEventListener("DOMContentLoaded", function() {

  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'JSON'
  }).done(function(response){

    var ul = document.getElementById('candidates');

    response.candidates.forEach(function(candidate){

        var source   = document.getElementById("candidates-template").innerHTML;
        var template = Handlebars.compile(source);
        var liHtml = template(candidate);

        ul.insertAdjacentHTML('afterbegin', liHtml);


    });

    // SUBMIT FORM
    var forms = document.querySelectorAll('form');

    forms.forEach(function(form){

      form.addEventListener('submit', function(e){
        e.preventDefault();

        $.ajax({
          url: this.getAttribute('action'),
          method: this.getAttribute('method'),
          data: {
            "id": this.querySelector('input[type="hidden"]').value
          }
        }).done(function(){
          var votes = form.previousElementSibling;
          votes.innerText ++;
          form.querySelector('input[type=submit]').setAttribute('disabled', 'true');
          console.log(form);
        }).fail(function(){
          window.alert('Vote failed miserably')
        });
      });

    });

  });


});
