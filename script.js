document.addEventListener('DOMContentLoaded', () => {
    // Sélection des éléments de la page
    const eventContainers = document.querySelectorAll('.event-container');
    const eventDetails = document.getElementById('event-details');
    const eventStart = document.getElementById('event-start');
    const eventDescription = document.getElementById('event-description');
    const eventSkills = document.getElementById('event-skills-list');
    const eventLocation = document.getElementById('event-location');
    const frbutton = document.getElementById('btn-fr');
    const enbutton = document.getElementById('btn-en');
    const itbutton = document.getElementById('btn-it');

    // Fonction pour afficher les détails de l'événement lorsqu'on survole un événement
    eventContainers.forEach(eventContainer => {
        eventContainer.addEventListener('mouseenter', () => {
            // Récupérer les dates de début et de fin
            const startDate = eventContainer.getAttribute('data-start');
            const endDate = eventContainer.getAttribute('data-end');
            eventStart.textContent = `${startDate} -> ${endDate}`;

            // Récupérer la description, la localisation et les compétences
            eventDescription.textContent = eventContainer.getAttribute('data-description');
            eventLocation.textContent = eventContainer.getAttribute('data-location');

            // Récupérer les compétences sous forme de chaîne séparée par des virgules
            const skills = eventContainer.getAttribute('data-skills').split(',');

            // Vider la liste des compétences avant d'ajouter les nouvelles
            eventSkills.innerHTML = '';

            // Ajouter chaque compétence comme un élément de liste (<li>)
            skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill.trim();
                eventSkills.appendChild(li);
            });

            eventDetails.style.display = 'block'; // Afficher les détails
        });

        // Masquer les détails lorsque la souris quitte l'événement
        eventContainer.addEventListener('mouseleave', () => {
            eventDetails.style.display = 'none';
        });
    });

    // Classe pour gérer les événements
    class Event {
        constructor(start, end, description, location, skills) {
            this.start = start;
            this.end = end;
            this.description = description;
            this.location = location;
            this.skills = skills;
        }

        // Calcul du nombre de mois entre la date de début et la date de fin
        calculateMonths() {
            const startDate = new Date(this.start);
            const endDate = new Date(this.end);
            const diffInMs = endDate - startDate;
            return Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 30.5));
        }
    }

    // Classe pour gérer tous les événements
    class EventManager {
        constructor() {
            this.events = [];
        }

        // Ajouter un événement à la liste
        addEvent(start, end, description, location, skills) {
            this.events.push(new Event(start, end, description, location, skills));
        }

        // Calculer le nombre total de mois entre le premier et le dernier événement
        getTotalMonths() {
            if (this.events.length === 0) return 0;
            const startDate = new Date(this.events[0].start);
            const endDate = new Date(this.events[this.events.length - 1].end);
            const diffInMs = endDate - startDate;
            return Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 30.5));
        }

        // Générer une couleur aléatoire pour chaque événement
        generateRandomColor() {
            return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        }

        // Rendre tous les événements sur la timeline
        renderEvents() {
            const timeline = document.querySelector('.timeline');
            const totalMonths = this.getTotalMonths();
            
            // Récupérer les événements et les afficher
            this.events.forEach(event => {
                const eventMonths = event.calculateMonths();
                const widthPercentage = (eventMonths / totalMonths) * 100; // Calcul de la largeur en pourcentage
                const color = this.generateRandomColor(); // Couleur aléatoire pour chaque événement
                
                // Créer le conteneur de l'événement
                const eventContainer = document.createElement('div');
                eventContainer.classList.add('event-container');
                eventContainer.style.width = `${widthPercentage}%`;
                eventContainer.style.backgroundColor = color;

                // Ajouter les données de l'événement dans les attributs
                eventContainer.dataset.description = event.description;
                eventContainer.dataset.start = event.start;
                eventContainer.dataset.end = event.end;
                eventContainer.dataset.location = event.location;
                eventContainer.dataset.skills = event.skills.join(', ');

                // Afficher les détails de l'événement au clic
                eventContainer.addEventListener('click', () => {
                    document.getElementById('event-start').textContent = `${event.start} - ${event.end}`;
                    document.getElementById('event-description').textContent = event.description;
                    const skillsList = document.getElementById('event-skills-list');
                    skillsList.innerHTML = '';
                    event.skills.forEach(skill => {
                        const li = document.createElement('li');
                        li.textContent = skill;
                        skillsList.appendChild(li);
                    });
                    document.getElementById('event-location').textContent = event.location;
                });

                // Ajouter l'événement à la timeline
                timeline.appendChild(eventContainer);
            });
        }
    }

    // Initialiser le gestionnaire d'événements
    const eventManager = new EventManager();

    // Charger les données JSON et afficher les événements
    fetch('https://votre-site.netlify.app/events.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(eventData => {
                eventManager.addEvent(
                    eventData.start,
                    eventData.end,
                    eventData.description,
                    eventData.location,
                    eventData.skills
                );
            });
            eventManager.renderEvents();
        })
        .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));
});
