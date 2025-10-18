// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

/*// Form submission handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});*/

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Geolocation Easter Egg with REAL API (No API Key Needed!)
function getGreetingMessage(locationData) {
    const city = locationData.city;
    const region = locationData.region;
    const country = locationData.country_name;
    
    // Determine greeting based on location
    if (city === 'Johannesburg') {
        return "Hey Joburger! Hope you're not stuck in traffic again👀";
    } else if (city === 'Pretoria') {
        return "Hi there in the city of jacarandas and people who swear they don't live in Joburg😏";
    } else if (city === 'Cape Town') {
        return "Welcome.. Capetonian.. Don't worry.. my website works even when your internet doesn't😭";
    } else if (city === 'Stellenbosch') {
        return "You must be from Stellies.. tell me you code and wine taste without telling me😉";
    } else if (city === 'Durban') {
        return "Eish.. Durban.. chill vibes.. hot air.. legendary bunny chow👌🏾";
    } else if (region === 'Eastern Cape') {
        return "Eastern Cape connection detected.. shoutout to the land of legends😎";
    } else if (region === 'Free State') {
        return "Welkom to my site! (See what I did there??)";
    } else if (['Limpopo', 'North West', 'Mpumalanga'].includes(region)) {
        return "You're from the North huh?? Respect.. Those sunsets hit different💯";
    } else if (country === 'Lesotho') {
        return "Ha e lale Mo-apara-kobo";
    } else if (country !== 'South Africa') {
        return "Hey stranger from afar 👋 welcome to the digital South.. where we code in the light of loadshedding candles.";
    } else {
        // Default greeting for other South African locations
        return `Hello from ${city}🫡 Thanks for visiting my portfolio..`;
    }
}

function typeWriter(element, text, speed = 50) {
    return new Promise((resolve) => {
        let i = 0;
        element.classList.add('typing');
        
        function type() {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typing');
                resolve();
            }
        }
        
        type();
    });
}

// REAL API CALL - NO SIGNUP NEEDED!
async function getRealLocation() {
    const greetingElement = document.getElementById('location-greeting');
    
    try {
        // SUPER SIMPLE - Just call their API directly!
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        console.log('Location data:', data); // Optional: see what data you get
        
        const locationData = {
            city: data.city,
            region: data.region,
            country_name: data.country_name
        };
        
        const message = getGreetingMessage(locationData);
        showGreeting(message);
        
    } catch (error) {
        console.log('API error, using fallback location:', error);
        // Fallback to mock data if API fails
        useFallbackLocation();
    }
}

function useFallbackLocation() {
    // Fallback mock locations
    const mockLocations = [
        { city: 'Johannesburg', region: 'Gauteng', country_name: 'South Africa' },
        { city: 'Pretoria', region: 'Gauteng', country_name: 'South Africa' },
        { city: 'Cape Town', region: 'Western Cape', country_name: 'South Africa' },
        { city: 'Stellenbosch', region: 'Western Cape', country_name: 'South Africa' },
        { city: 'Durban', region: 'KwaZulu-Natal', country_name: 'South Africa' },
        { city: 'East London', region: 'Eastern Cape', country_name: 'South Africa' },
        { city: 'Bloemfontein', region: 'Free State', country_name: 'South Africa' },
        { city: 'Polokwane', region: 'Limpopo', country_name: 'South Africa' },
        { city: 'Maseru', region: 'Maseru', country_name: 'Lesotho' },
        { city: 'New York', region: 'New York', country_name: 'United States' }
    ];
    
    const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];
    const message = getGreetingMessage(randomLocation);
    showGreeting(message);
}

function showGreeting(message) {
    const greetingElement = document.getElementById('location-greeting');
    
    // Show the greeting container
    greetingElement.style.display = 'block';
    
    // Start typing effect after a brief delay
    setTimeout(() => {
        typeWriter(greetingElement, message, 40);
    }, 1000);
    
    // Add tooltip for hover
    greetingElement.title = message;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Use real API - IT JUST WORKS!
    getRealLocation();

});
