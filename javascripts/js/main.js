(function($){
	"use strict";

	$(window).load(function() {
		var $container = $('#fh5co-projects-feed'),
		containerWidth = $container.outerWidth();

		$container.masonry({
			itemSelector : '.fh5co-project',
			columnWidth: function( containerWidth ) {
				if( containerWidth <= 330 ) {
					return 310;
				} else {
					return 330;
				}
			},

			isAnimated: !Modernizr.csstransitions
		});
	});

})(window.jQuery);

function validate_alphaNom() 
{ 
var alphaNom = document.getElementById('alphaNom').value;

    if (!/^[a-zA-Z\-]+$/.test(alphaNom)) 
    {
        document.getElementById('wrong_nom_alert').style.color = 'red';
        document.getElementById('wrong_nom_alert').style["font-weight"] = "bold";
        document.getElementById('wrong_nom_alert').style["font-size"] = "15px";
        document.getElementById('wrong_nom_alert').innerHTML = '☒ Vous devez entrer que des caractères alphabétiques dans ce champ';
        document.getElementById('create').disabled = true;
        document.getElementById('create').style.opacity = (0.4);
    } 
    else 
    {
        document.getElementById('wrong_nom_alert').style.color = 'green';
        document.getElementById('wrong_nom_alert').style["font-weight"] = "bold";
        document.getElementById('wrong_nom_alert').style["font-size"] = "15px";
        document.getElementById('wrong_nom_alert').innerHTML = '';
        document.getElementById('create').disabled = false;
        document.getElementById('create').style.opacity = (1);
    }    
}

function validate_alphaPrenom() 
{ 
var alphaPrenom = document.getElementById('alphaPrenom').value;

    if (!/^[a-zA-Z\-]+$/.test(alphaPrenom)) 
    {
        document.getElementById('wrong_alphaPrenom_alert').style.color = 'red';
        document.getElementById('wrong_alphaPrenom_alert').style["font-weight"] = "bold";
        document.getElementById('wrong_alphaPrenom_alert').style["font-size"] = "15px";
        document.getElementById('wrong_alphaPrenom_alert').innerHTML = '☒ Vous devez entrer que des caractères alphabétiques dans ce champ';
        document.getElementById('create').disabled = true;
        document.getElementById('create').style.opacity = (0.4);

    } 
    else 
    {
        document.getElementById('wrong_alphaPrenom_alert').style.color = 'green';
        document.getElementById('wrong_alphaPrenom_alert').style["font-weight"] = "bold";
        document.getElementById('wrong_alphaPrenom_alert').style["font-size"] = "18px";
        document.getElementById('wrong_alphaPrenom_alert').innerHTML = '';
        document.getElementById('create').disabled = false;
        document.getElementById('create').style.opacity = (1);
    }    
} 

function validate_password()   { 
    var pass = document.getElementById('pass').value;
    var confirm_pass = document.getElementById('confirm_pass').value;

        if (pass.match( /[0-9]/g) && pass.match( /[A-Z]/g) && pass.match(/[a-z]/g) && pass.length >= 8) 
        {
            if (pass != confirm_pass ) {
                document.getElementById('wrong_pass_alert').style.color = 'red';
                document.getElementById('wrong_pass_alert').style["font-weight"] = "bold";
                document.getElementById('wrong_pass_alert').style["font-size"] = "18px";

                document.getElementById('wrong_pass_alert').innerHTML
                = '☒ Il faut entrer une confirmation identique au mot de passe';

                document.getElementById('create').disabled = true;
                document.getElementById('create').style.opacity = (0.4);} 
            else {
                document.getElementById('wrong_pass_alert').style.color = 'green';
                document.getElementById('wrong_pass_alert').style["font-weight"] = "bold";

                document.getElementById('wrong_pass_alert').innerHTML =
                    '🗹 Votre mot de passe est fort et la confirmation est bonne';

                document.getElementById('create').disabled = false;
                document.getElementById('create').style.opacity = (1);}
            }
        else {document.getElementById('wrong_pass_alert').style.color = 'red';
            document.getElementById('wrong_pass_alert').style["font-weight"] = "bold";
            document.getElementById('wrong_pass_alert').style["font-size"] = "15px";

            document.getElementById('wrong_pass_alert').innerHTML
            = "☒ Un mot de passe fort doit contenir : 8 caractères minimum \n | des lettres majuscules | des lettres minuscules  | des chiffres. " ;
        
        document.getElementById('create').disabled = true;
        document.getElementById('create').style.opacity = (0.4);}      
    }
 
    { 
    var pass = document.getElementById('pass').value;
    var confirm_pass = document.getElementById('confirm_pass').value;

        if (pass.match( /[0-9]/g) && pass.match( /[A-Z]/g) && pass.match(/[a-z]/g) && pass.length >= 8) 
        {
            if (pass != confirm_pass ) {
                document.getElementById('wrong_pass_alert').style.color = 'red';
                document.getElementById('wrong_pass_alert').style["font-weight"] = "bold";
                document.getElementById('wrong_pass_alert').style["font-size"] = "18px";

                document.getElementById('wrong_pass_alert').innerHTML
                = '☒ Il faut entrer une confirmation identique au mot de passe';

                document.getElementById('create').disabled = true;
                document.getElementById('create').style.opacity = (0.4);} 
            else {
                document.getElementById('wrong_pass_alert').style.color = 'green';
                document.getElementById('wrong_pass_alert').style["font-weight"] = "bold";

                document.getElementById('wrong_pass_alert').innerHTML =
                    '🗹 Votre mot de passe est fort et la confirmation est bonne';

                document.getElementById('create').disabled = false;
                document.getElementById('create').style.opacity = (1);}
            }
        else {document.getElementById('wrong_pass_alert').style.color = 'red';
            document.getElementById('wrong_pass_alert').style["font-weight"] = "bold";
            document.getElementById('wrong_pass_alert').style["font-size"] = "15px";

            document.getElementById('wrong_pass_alert').innerHTML
            = "☒ Un mot de passe fort doit contenir : 8 caractères minimum \n | des lettres majuscules | des lettres minuscules  | des chiffres. " ;
        
        document.getElementById('create').disabled = true;
        document.getElementById('create').style.opacity = (0.4);}      
    }


function validate_phone() 
{ 
    var phone = document.getElementById('phone').value;

    if (!/^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/.test(phone)) 
    {
        document.getElementById('wrong_phone_alert').style.color = 'red';
        document.getElementById('wrong_phone_alert').style["font-weight"] = "bold";
        document.getElementById('wrong_phone_alert').style["font-size"] = "15px";
        document.getElementById('wrong_phone_alert').innerHTML = 'Vous devez entrer un numéro de téléphone valide';
        document.getElementById('create').disabled = true;
        document.getElementById('create').style.opacity = (0.4);
    } 
    else 
    {
        document.getElementById('wrong_phone_alert').style.color = 'green';
        document.getElementById('wrong_phone_alert').style["font-weight"] = "bold";
        document.getElementById('wrong_phone_alert').innerHTML = '';
        document.getElementById('create').disabled = false;
        document.getElementById('create').style.opacity = (1);
    }    
}
function validate_description() 
{ 
    var description = document.getElementById('description').value;

    if (!description.length >= 5) 
    {
        document.getElementById('wrong_description_alert').style.color = 'red';
        document.getElementById('wrong_description_alert').style["font-weight"] = "bold";
        document.getElementById('wrong_description_alert').style["font-size"] = "15px";
        document.getElementById('wrong_description_alert').innerHTML = 'Vous devez entrer description valide au moin 15 mot';
        document.getElementById('create').disabled = true;
        document.getElementById('create').style.opacity = (0.4);
    } 
    else 
    {
        document.getElementById('wrong_description_alert').style.color = 'green';
        document.getElementById('wrong_description_alert').style["font-weight"] = "bold";
        document.getElementById('wrong_description_alert').innerHTML = '';
        document.getElementById('create').disabled = false;
        document.getElementById('create').style.opacity = (1);
    }    
}
function validate_mail() 
{ 
    var mail = document.getElementById('mail').value;

    if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail)) 
    {
        document.getElementById('wrong_mail_alert').style.color = 'red';
        document.getElementById('wrong_mail_alert').style["font-weight"] = "bold";
        document.getElementById('wrong_mail_alert').style["font-size"] = "15px";
        document.getElementById('wrong_mail_alert').innerHTML = 'Vous devez entrer un mail au bon format';
        document.getElementById('create').disabled = true;
        document.getElementById('create').style.opacity = (0.4);
    } 
    else 
    {
        document.getElementById('wrong_mail_alert').style.color = 'green';
        document.getElementById('wrong_mail_alert').style["font-weight"] = "bold";
        document.getElementById('wrong_mail_alert').innerHTML = '';
        document.getElementById('create').disabled = false;
        document.getElementById('create').style.opacity = (1);
    }    
} 

function myFunction() {
		  // Declare variables
		  var input, filter, table, tr, td, i, txtValue;
		  input = document.getElementById("myInput");
		  filter = input.value.toUpperCase();
		  table = document.getElementById("myTable");
		  tr = table.getElementsByTagName("tr");
		
		  // Loop through all table rows, and hide those who don't match the search query
		  for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[0];
			if (td) {
			  txtValue = td.textContent || td.innerText;
			  if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			  } else {
				tr[i].style.display = "none";
			  }
			}
		  }
		}
		
		