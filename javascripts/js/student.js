async function disableStudent() {
  var retVal = confirm("Do you want to disable your account?");
  if( retVal === false ) {
    return;
  }

  await fetch(`/Etud-Mprofil/disable`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(async function (response) {
    console.log("Disabling student response", response);
    if (response.status === 200) {
      console.log("Logout");
      await fetch(`/logout`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      window.location.href = "/login";
    } else {
      alert(`Une erreur s'est produite lors de la désactivation de l'étudiant ${username} ${usersurname}. Veuillez contacter l'administrateur système.`);
    }
  }).catch(function (error) { 
    alert(`Une erreur s'est produite lors de la désactivation de l'étudiant ${username} ${usersurname}. Veuillez contacter l'administrateur système.`);
  });
}
