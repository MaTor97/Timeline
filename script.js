document.querySelectorAll('.event-container').forEach(event => {
    event.addEventListener('mouseover', () => {
        const description = event.getAttribute('data-description');
        const startDate = event.getAttribute('data-start');

        const eventDetails = document.getElementById('event-details');
        const title = document.createElement('h1');
        const paragraph = document.createElement('p');

        title.textContent = startDate;
        paragraph.textContent = description;

        // Nettoyage de l'encadré avant d'insérer du nouveau contenu
        eventDetails.innerHTML = '';  
        eventDetails.appendChild(title);
        eventDetails.appendChild(paragraph);

        eventDetails.style.display = 'block';
    });

    event.addEventListener('mouseout', () => {
        document.getElementById('event-details').style.display = 'none';
    });
});
