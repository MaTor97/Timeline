document.addEventListener('DOMContentLoaded', () => {
    const eventContainers = document.querySelectorAll('.event-container');
    const eventDetails = document.getElementById('event-details');
    const eventStart = document.getElementById('event-start');
    const eventDescription = document.getElementById('event-description');
    const eventSkills = document.getElementById('event-skills-list');
    const eventLocation = document.getElementById('event-location');

    eventContainers.forEach(eventContainer => {
        eventContainer.addEventListener('mouseenter', () => {
            // Crée le titre avec les dates de début et de fin
            const startDate = eventContainer.getAttribute('data-start');
            const endDate = eventContainer.getAttribute('data-end');
            eventStart.textContent = `${startDate} -> ${endDate}`; 
            
            // Remplir la description, les compétences et la localisation
            eventDescription.textContent = eventContainer.getAttribute('data-description');
            eventLocation.textContent = eventContainer.getAttribute('data-location');
            
            // Récupère les compétences sous forme de chaîne séparée par des virgules
            const skills = eventContainer.getAttribute('data-skills').split(',');

            // Vider la liste des compétences avant d'ajouter les nouvelles
            eventSkills.innerHTML = '';

            // Ajouter chaque compétence comme un élément de liste (<li>)
            skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill.trim(); // Retirer les espaces excédentaires et ajouter la compétence
                eventSkills.appendChild(li); // Ajouter l'élément <li> à la liste <ul>
            });

            eventDetails.style.display = 'block'; // Assurez-vous que le conteneur est visible
        });

        eventContainer.addEventListener('mouseleave', () => {
            eventDetails.style.display = 'none'; // Masquer les détails lorsque la souris quitte
        });
    });
});
