document.addEventListener("DOMContentLoaded", function() {
    (function() {
        emailjs.init("E9ilGKyNQz6AbI6TY");
    })();

    function sendEmail() {
        var name = document.getElementById("contactName").value.trim();
        var email = document.getElementById("contactEmail").value.trim();
        var subject = document.getElementById("contactSubject").value.trim();
        var message = document.getElementById("contactMessage").value.trim();
        var errorMessageDiv = document.querySelector('.contact-form #error-message'); // Assicurati di avere un div per i messaggi di errore

        let isValid = true; // Flag di validità

        // Controllo se i campi sono vuoti
        if (!name || !email || !subject || !message) {
            errorMessageDiv.style.display = "block"; 
            setTimeout(()=>{
                errorMessageDiv.style.display = "none";
            },3000)
            isValid = false;
        }

        // Verifica che l'email sia valida
        const emailPattern = /^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.[a-z]{2,}$/i;
        if (!emailPattern.test(email)) {
            document.querySelector('#contact form .form-field label.email.false').classList.remove('false');
            setTimeout(()=>{
                document.querySelector('#contact form .form-field label.email').classList.add('false');
            },3000)
            isValid = false;
        }

        // Controllo della lunghezza del messaggio
        if (message.length < 20) {
            document.querySelector('#contact form .form-field label.message.false').classList.remove('false');
            setTimeout(()=>{
                document.querySelector('#contact form .form-field label.message').classList.add('false');
            },3000)
            isValid = false;
        }

        // Se il modulo è valido, invia l'email
        if (isValid) {
            document.querySelector('.contact-form form #submit-loader').style.display = "block"; // Mostra il caricamento

            var tempParams = {
                nome: name,
                email: email,
                oggetto: subject,
                messaggio: message,
            }

            emailjs.send('gmail', 'template_5ps38v4', tempParams)
            .then((res) => {
                console.log("success", res.status);
                console.log(tempParams);
                errorMessageDiv.style.display = "none";
                document.querySelector('.contact-form #message-success').style.display = "block";
                document.querySelector('.contact-form form').reset();
                setTimeout(()=>{
                    document.querySelector('.contact-form #message-success').style.display = "none";
                },3000)
            }, (error) => {
                console.log('error', error);
                document.querySelector('.contact-form #message-warning').style.display = "block";
                setTimeout(()=>{
                    document.querySelector('.contact-form #message-warning').style.display = "none";
                },5000)
            })
            .finally(() => {
                document.querySelector('.contact-form form #submit-loader').style.display = "none"; // Nascondi il caricamento
            });
        } else {
            // Mostra i messaggi di errore se il modulo non è valido
            errorMessageDiv.style.display = "block"; 
        }
    }

    // evento con il click del bottone
    let sendForm = document.querySelector(".contact-form form .submitform");
    if (sendForm) {
        sendForm.addEventListener("click", function(e) {
            e.preventDefault();
            sendEmail();
        });
    }

    // Evento per il tasto Invio (Enter)
    let formElements = document.querySelectorAll(".contact-form form input, .contact-form form textarea");
    formElements.forEach(function(element) {
        element.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                sendEmail();
            }
        });
    });
});
