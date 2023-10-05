// Casi todas las variables - constantes

const header = document.querySelector('header');
const servicesModals = document.querySelectorAll('.service-modal');
const learnmoreBtns = document.querySelectorAll('.learn-more-btn');
const modalCloseBtns = document.querySelectorAll('.modal-close-btn');
const scrollTopBtn = document.querySelector('.scrollToTop-btn')
const sections = document.querySelectorAll('section');
const themeBtn = document.querySelector('.theme-btn');
const homeSection = document.querySelector('.home');
const aboutSection = document.querySelector('.about');
const skillsSection = document.querySelector('.skills');
const btn = document.querySelector('#button');
const form = document.querySelector('form');




// Barra de navegacion Sticky

window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 0)
})




// Boton para subir en Scroll

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('active', window.scrollY > 500)
})

scrollTopBtn.addEventListener('click', () =>{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});





// Elementos del menú de navegación activos al desplazarse por la página
window.addEventListener('scroll', () => {
    
    
    const scrollA = window.scrollY;

    sections.forEach(section => {
        let sectionHeight = section.offsetHeight;
        let sectionTop = section.offsetTop - 50;
        let id = section.getAttribute('id');

        if(scrollA > sectionTop && scrollA <= sectionTop + sectionHeight){
            document.querySelector('.nav-items a[href*=' + id + ']').classList.add('active');
        }
        else{
            document.querySelector('.nav-items a[href*=' + id + ']').classList.remove('active');
        }
    });
})

// Modal - Section Services

function modal (modalClick){
    servicesModals[modalClick].classList.add('active');
}

learnmoreBtns.forEach((e, i) => {
    e.addEventListener('click', () =>{
        modal(i)
    })
});

modalCloseBtns.forEach((event) => {
    event.addEventListener('click', () =>{
        servicesModals.forEach( e =>{
            e.classList.remove('active')
        })
    })
})


// Tema claro y obscuro 

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeBtn.classList.toggle('sun');

    localStorage.setItem('saved-theme', getToggleTheme());
    localStorage.setItem('saved-icon', getToggleIcon());
});

const getToggleTheme = () => document.body.classList.contains('dark-theme') ? 'dark' : 'light';
const getToggleIcon = () => document.body.classList.contains('sun') ? 'sun' : 'moon';

const savedTheme = localStorage.getItem('saved-theme');
const savedIcon = localStorage.getItem('saved-icon');

if(savedTheme){
    document.body.classList[savedTheme === 'dark' ? "add" : "remove"]('dark-theme');
    themeBtn.classList[savedIcon === 'sun' ? 'add' : 'remove']('sun');
}


// Menu de navegación Reponsive

const menuBtn = document.querySelector('.nav-menu-btn');
const closeBtn = document.querySelector('.nav-close-btn')
const navigation = document.querySelector('.navigation');
const navItems = document.querySelectorAll('.nav items a');


menuBtn.addEventListener('click', () =>{
    navigation.classList.add('active');
});
closeBtn.addEventListener('click', () =>{
    navigation.classList.remove('active');
});

navItems.forEach((navItem) => {
    navItem.addEventListener('click', () => {
        navigation.classList.remove('active');
    });
});



// Swiper Projects carousel project 

let swiperProjects = new Swiper(".projects__container", {
    loop: true,
    spaceBetween: 5,
    cssMode: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
  });


// Scroll Reveal Animation

// ScrollReveal({
//     reset: true,
//     distance: '60px',
//     duration: 2000,
//     delay: 100
// });

// ScrollReveal().reveal('.home .info h2, .section-title-01, .section-title-02', {delay: 500, origin: 'left'});
// ScrollReveal().reveal('.home .info h3, .home .info p, .about-info .btn, .swiper-button-next', {delay: 600, origin: 'left'});
// ScrollReveal().reveal('.home .info .btn, .scroll-down', {delay: 700, origin: 'bottom'});
// ScrollReveal().reveal('.media-icons i, .swiper-wrapper, .contact-left li', {delay: 500, origin: 'left', interval: 200});
// ScrollReveal().reveal('.media-icons2 i, footer .group, .swiper-pagination', {delay: 500, origin: 'top', interval: 200});
// ScrollReveal().reveal('.home-img, .about-img, .swiper-button-prev', {delay: 500, origin: 'left'});
// ScrollReveal().reveal('.about .description, .contact-right', {delay: 600, origin: 'left'});
// ScrollReveal().reveal('.about .professional-list li', {delay: 500, origin: 'left', interval: 200});
// ScrollReveal().reveal('.skills-description h3, .skills-description p, .service-description, .contact-left h2', {delay: 700, origin: 'left'});
// ScrollReveal().reveal('.service-card, .education, .portfolio', {delay: 800, origin: 'bottom', interval: 200});








// Validate form contact - JQUERY




$(document).ready( () => {
    $.validator.addMethod("verifyEmail", function (value, element) {
        return this.optional(element) ||  /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/i.test(value);
     }, "Email inválido");

     $.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[a-z ]+$/i.test(value);
    }, "Solo létras para el nombre");

    $(form).validate({
        rules: {
            name: {
                required: true,
                lettersonly: true,
                minlength: 3,
            },
            email: {
                required: true,
                verifyEmail: true
            },
            sucject:{
                required: true,
            },
            message: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Campo vacío",
                minlength: 'Un nombre válido'
            },
            email: {
                required: 'Campo vacío'
            },
            sucject: 'Campo vacío',
            message: 'Campo vacío'
        }
    });

    $(btn).click(() => {
        if ($(form).valid() == true) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                btn.value = 'Enviando...';
            
                const serviceID = 'default_service';
                const templateID = 'template_im19vtk';
            
                emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.value = 'Enviar Mensaje';
                    Swal.fire({
                        icon: 'success',
                        title: '¡Enviado!',
                        text: '¡Mensaje enviado exitosamente!',
                        timer: 5000,
                    },() => {
                        btn.value = 'Send Email';
                        Swal.fire({
                            icon: 'error',
                            title: '¡Error!',
                            text: '¡No se pudo enviar el mensaje, intenta nuevamente!',
                            timer: 5000,
                        });
                    });
                }).then(() => {
                    $(form).valid() == false;
                    $('#contact-form')[0].reset();
                })
            });
        }
        else{

            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: '¡Debes llenar los campos correctamente!',
                timer: 5000,
            });
        }
        $(form).valid() == false;
    });
    // $(form).valid() == true
});




//  form.addEventListener('submit', function(event) {
//    event.preventDefault();

//    btn.value = 'Sending...';

//    const serviceID = 'default_service';
//    const templateID = 'template_im19vtk';

//    emailjs.sendForm(serviceID, templateID, this)
//     .then(() => {
//       btn.value = 'Send Email';
//       alert('Sent!');
//     }, (err) => {
//       btn.value = 'Send Email';
//       alert(JSON.stringify(err));
//     });
// });