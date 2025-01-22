document.addEventListener('DOMContentLoaded', () => {
    const eventContainers = document.querySelectorAll('.event-container');
    const eventDetails = document.getElementById('event-details');
    const eventStart = document.getElementById('event-start');
    const eventDescription = document.getElementById('event-description');
    const eventSkills = document.getElementById('event-skills-list');
    const eventLocation = document.getElementById('event-location');
    const frbutton = document.getElementById('btn-fr');
    const enbutton = document.getElementById('btn-en');
    const itbutton = document.getElementById('btn-it');

    // Charger le fichier JSON avec fetch
    fetch('events.json')
        .then(response => response.json()) // Parse le fichier JSON
        .then(eventsData => {
            let currentLanguage = 'fr';  // Langue par défaut

            // Fonction pour afficher les événements selon la langue
            function renderEventsByLanguage(lang) {
                const timeline = document.querySelector('.timeline');
                timeline.innerHTML = ''; // Vider la timeline avant de la redessiner
                const events = eventsData[lang];

                events.forEach(event => {
                    const eventMonths = calculateMonths(event.start_date, event.end_date);
                    const widthPercentage = (eventMonths / getTotalMonths(events)) * 100;
                    const color = generateRandomColor();
                    const eventContainer = document.createElement('div');
                    eventContainer.classList.add('event-container');
                    eventContainer.style.width = `${widthPercentage}%`;
                    eventContainer.style.backgroundColor = color;
                    eventContainer.dataset.description = event.description;
                    eventContainer.dataset.start = event.start_date;
                    eventContainer.dataset.end = event.end_date;
                    eventContainer.dataset.location = event.location;
                    eventContainer.dataset.skills = event.skills.join(', ');

                    eventContainer.addEventListener('click', () => {
                        eventStart.textContent = `${event.start_date} - ${event.end_date}`;
                        eventDescription.textContent = event.description;
                        eventLocation.textContent = event.location;
                        eventSkills.innerHTML = '';
                        event.skills.forEach(skill => {
                            const li = document.createElement('li');
                            li.textContent = skill;
                            eventSkills.appendChild(li);
                        });
                        eventDetails.style.display = 'block';
                    });

                    eventContainer.addEventListener('mouseenter', () => {
                        eventStart.textContent = `${event.start_date} -> ${event.end_date}`;
                        eventDescription.textContent = event.description;
                        eventLocation.textContent = event.location;

                        eventSkills.innerHTML = '';
                        event.skills.forEach(skill => {
                            const li = document.createElement('li');
                            li.textContent = skill.trim();
                            eventSkills.appendChild(li);
                        });

                        eventDetails.style.display = 'block';
                    });

                    eventContainer.addEventListener('mouseleave', () => {
                        eventDetails.style.display = 'none';
                    });

                    timeline.appendChild(eventContainer);
                });
            }

            // Fonction pour calculer la différence en mois
            function calculateMonths(startDate, endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);
                const diffInMs = end - start;
                return Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 30.5));
            }

            // Fonction pour calculer le total de mois
            function getTotalMonths(events) {
                if (events.length === 0) return 0;
                const startDate = new Date(events[0].start_date);
                const endDate = new Date(events[events.length - 1].end_date);
                const diffInMs = endDate - startDate;
                return Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 30.5));
            }

            // Fonction pour générer une couleur aléatoire
            function generateRandomColor() {
                return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
            }

            // Écouteur d'événements pour les boutons de langue
            frbutton.addEventListener('click', () => {
                currentLanguage = 'fr';
                renderEventsByLanguage(currentLanguage);
            });

            enbutton.addEventListener('click', () => {
                currentLanguage = 'en';
                renderEventsByLanguage(currentLanguage);
            });

            itbutton.addEventListener('click', () => {
                currentLanguage = 'it';
                renderEventsByLanguage(currentLanguage);
            });

            // Rendu initial des événements en français
            renderEventsByLanguage(currentLanguage);
        })
        .catch(error => {
            console.error('Erreur lors du chargement du fichier JSON:', error);
        });
});
