function validate_id() 
{ 
var id = document.getElementById('username').value;

    if (!/^[0-9]+$/.test(id)) 
    {
            document.getElementById('wrong_id_alert').style.color = 'red';
            document.getElementById('wrong_id_alert').style["font-weight"] = "bold";
            document.getElementById('wrong_id_alert').innerHTML = '☒ Votre identifiant doit être composé que de chiffres';
            document.getElementById('create').disabled = true;
            document.getElementById('create').style.opacity = (0.4);

    } 
    else 
    {
            document.getElementById('wrong_id_alert').style.color = 'green';
            document.getElementById('wrong_id_alert').style["font-weight"] = "bold";
            document.getElementById('wrong_id_alert').style["font-size"] = "16px";
            document.getElementById('wrong_id_alert').innerHTML = '';
            document.getElementById('create').disabled = false;
            document.getElementById('create').style.opacity = (1);
    }    
}


function validate_alphaNom() 
{ 
var alphaNom = document.getElementById('alphaNom').value;

    if (!/^[a-zA-Z\- ]+$/.test(alphaNom)) 
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

    if (!/^[a-zA-Z\- ]+$/.test(alphaPrenom)) 
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

function validate_password() 
{ 
var pass = document.getElementById('password').value;
var confirm_pass = document.getElementById('confirm_pass').value;

if (pass.match( /[0-9]/g) && pass.match( /[A-Z]/g) && pass.match(/[a-z]/g) && pass.length >= 8) 
{
    if (pass != confirm_pass ) {
        document.getElementById('wrong_pass_alert').style.color = 'red';
        document.getElementById('wrong_pass_alert').style["font-weight"] = "bold";
        document.getElementById('wrong_pass_alert').style["font-size"] = "16px";

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

function validate_alphaQ1() 
{ 
    var alphaQ1 = document.getElementById('alphaQ1').value;

    if (!/^[a-zA-Z\- ]+$/.test(alphaQ1)) 
    {
        document.getElementById('wrong_alphaQ1_alert').style.color = 'red';
        document.getElementById('wrong_alphaQ1_alert').style["font-weight"] = "bold";
        document.getElementById('wrong_alphaQ1_alert').style["font-size"] = "15px";
        document.getElementById('wrong_alphaQ1_alert').innerHTML = 'Vous devez entrer que des caractères alphabétiques dans ce champ';
        document.getElementById('create').disabled = true;
        document.getElementById('create').style.opacity = (0.4);
    } 
    else 
    {
        document.getElementById('wrong_alphaQ1_alert').style.color = 'green';
        document.getElementById('wrong_alphaQ1_alert').style["font-weight"] = "bold";
        document.getElementById('wrong_alphaQ1_alert').style["font-size"] = "15px";
        document.getElementById('wrong_alphaQ1_alert').innerHTML = '';
        document.getElementById('create').disabled = false;
        document.getElementById('create').style.opacity = (1);
    }    
}

function validate_alphaQ2() 
{ 
    var alphaQ2 = document.getElementById('alphaQ2').value;

    if (!/^[a-zA-Z\- ]+$/.test(alphaQ2)) 
    {
        document.getElementById('wrong_alphaQ2_alert').style.color = 'red';
        document.getElementById('wrong_alphaQ2_alert').style["font-weight"] = "bold";
        document.getElementById('wrong_alphaQ2_alert').style["font-size"] = "15px";
        document.getElementById('wrong_alphaQ2_alert').innerHTML = 'Vous devez entrer que des caractères alphabétiques dans ce champ';
        document.getElementById('create').disabled = true;
        document.getElementById('create').style.opacity = (0.4);
    } 
    else 
    {
        document.getElementById('wrong_alphaQ2_alert').style.color = 'green';
        document.getElementById('wrong_alphaQ2_alert').style["font-weight"] = "bold";
        
        document.getElementById('wrong_alphaQ2_alert').innerHTML = '';
        document.getElementById('create').disabled = false;
        document.getElementById('create').style.opacity = (1);
    }    
}

function showTypeRole(){
	
	var userRole = document.getElementById('userRole').value;
	
	if (userRole === '2')
	{
		formDivOptions.style.display = 'block';
		document.getElementById('numeroEmployee').style.display = 'block';
		document.getElementById('divName').style.display = 'block';
		document.getElementById('divSurname').style.display = 'block';
		document.getElementById('profSelectionProgramme').style.display = 'block';
		document.getElementById('divTelefone').style.display = 'block';
		document.getElementById('divEmail').style.display = 'block';
		document.getElementById('divPassword').style.display = 'block';
		document.getElementById('divSecreteQuestion').style.display = 'block';
		document.getElementById('divButtonValider').style.display = 'block';
	}
	if (userRole ==='3')
	{
		formDivOptions.style.display = 'block';
		document.getElementById('numeroEmployee').style.display = 'block';
		document.getElementById('divName').style.display = 'block';
		document.getElementById('divSurname').style.display = 'block';
		document.getElementById('profSelectionProgramme').style.display = 'none';
		document.getElementById('divTelefone').style.display = 'block';
		document.getElementById('divEmail').style.display = 'block';
		document.getElementById('divPassword').style.display = 'block';
		document.getElementById('divSecreteQuestion').style.display = 'block';
		document.getElementById('divButtonValider').style.display = 'block';
	}
}
function validate_phone() 
{ 
    var phone = document.getElementById('phone').value;

    if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/.test(phone)) 
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

function validate_mail() 
{ 
    var mail = document.getElementById('mail').value;

    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail)) 
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