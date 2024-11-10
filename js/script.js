let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () =>{
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
   enableDarkMode();
}

toggleBtn.onclick = (e) =>{
   darkMode = localStorage.getItem('dark-mode');
   if(darkMode === 'disabled'){
      enableDarkMode();
   }else{
      disableDarkMode();
   }
}

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () =>{
   profile.classList.toggle('active');
   search.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () =>{
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () =>{
   sideBar.classList.remove('active');
   body.classList.remove('active');
}

window.onscroll = () =>{
   profile.classList.remove('active');
   search.classList.remove('active');

   if(window.innerWidth < 1200){
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}

// Smooth scrolling with active link highlighting
document.querySelectorAll('.scroll-link').forEach(link => {
   link.addEventListener('click', function(e) {
       e.preventDefault();
       
       const targetId = this.getAttribute('href').substring(1); // Remove '#' from href
       const targetElement = document.getElementById(targetId);
       
       if (targetElement) {
           // Calculate exact position and smooth scroll
           const offsetTop = targetElement.offsetTop;
           window.scrollTo({
               top: offsetTop,
               behavior: "smooth"
           });

           // Highlight the active link
           document.querySelectorAll('.scroll-link').forEach(link => link.classList.remove('active'));
           this.classList.add('active');
       }
   });
});

// Highlight active section while scrolling
window.addEventListener('scroll', function() {
   let currentSection = '';
   document.querySelectorAll('section').forEach(section => {
       const sectionTop = section.offsetTop - 60; // Adjust for any header offset
       const sectionHeight = section.offsetHeight;
       if (window.scrollY >= sectionTop && window.scrollY <= sectionTop + sectionHeight) {
           currentSection = section.getAttribute('id');
       }
   });

   document.querySelectorAll('.scroll-link').forEach(link => {
       link.classList.remove('active');
       if (link.getAttribute('href').substring(1) === currentSection) {
           link.classList.add('active');
       }
   });
});

// Scroll to top button functionality
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show or hide the button based on scroll position
window.onscroll = function() {
    if (window.scrollY > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }

    // Scroll progress indicator
    const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
};

// Scroll to the top smoothly when button is clicked
scrollToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

document.addEventListener('DOMContentLoaded', () => {

   // Smooth Scroll on Link Click
   document.querySelectorAll('.scroll-link').forEach(link => {
     link.addEventListener('click', function(e) {
       e.preventDefault();
       
       const targetId = this.getAttribute('href').substring(1); // Remove '#' from href
       const targetElement = document.getElementById(targetId);
       
       if (targetElement) {
         const offsetTop = targetElement.offsetTop;
         
         window.scrollTo({
           top: offsetTop,
           behavior: "smooth"
         });
       }
     });
   });
 
   // Scroll to Top Button Logic
   const scrollToTopBtn = document.getElementById("scrollToTopBtn");
   
   window.onscroll = function() {
     if (window.scrollY > 100) {
       scrollToTopBtn.style.display = "block";
     } else {
       scrollToTopBtn.style.display = "none";
     }
   };
 
   // Scroll to Top Button Click
   scrollToTopBtn.addEventListener("click", function() {
     window.scrollTo({
       top: 0,
       behavior: "smooth"
     });
   });
 
   // Add Hover Animation for Core Topics
   const coreTopicsListItems = document.querySelectorAll('.core-topics ul li');
   
   coreTopicsListItems.forEach(item => {
     item.addEventListener('mouseenter', () => {
       item.classList.add('pulse-animation'); // Add pulse effect
     });
     item.addEventListener('mouseleave', () => {
       item.classList.remove('pulse-animation'); // Remove pulse effect
     });
   });
 
   // Add active class to current section in Core Topics on scroll
   const sections = document.querySelectorAll('.category-page section');
   const links = document.querySelectorAll('.core-topics ul li a');
   
   const handleScroll = () => {
     let scrollPosition = window.scrollY;
     
     sections.forEach((section, index) => {
       if (scrollPosition >= section.offsetTop - 150 && scrollPosition < section.offsetTop + section.offsetHeight - 150) {
         links[index].classList.add('active');
       } else {
         links[index].classList.remove('active');
       }
     });
   };
 
   window.addEventListener('scroll', handleScroll);
 
   // Adding a fade-in effect for new sections when they come into view
   const observer = new IntersectionObserver((entries, observer) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         entry.target.classList.add('fade-in');
       }
     });
   }, { threshold: 0.1 });
 
   document.querySelectorAll('.category-page section').forEach(section => {
     observer.observe(section);
   });
 
   // Adding active class to link when clicked
   links.forEach(link => {
     link.addEventListener('click', function() {
       links.forEach(l => l.classList.remove('active'));
       this.classList.add('active');
     });
   });
   
 });
 

