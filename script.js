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
class Event {
    constructor(start, end, description, location, skills) {
        this.start = start;
        this.end = end;
        this.description = description;
        this.location = location;
        this.skills = skills;
    }

    calculateMonths() {
        const startDate = new Date(this.start);
        const endDate = new Date(this.end);
        const diffInMs = endDate - startDate;
        return Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 30.5));
    }
}

class EventManager {
    constructor() {
        this.events = [];
    }

    addEvent(start, end, description, location, skills) {
        this.events.push(new Event(start, end, description, location, skills));
    }

    getTotalMonths() {
        if (this.events.length === 0) return 0;
        const startDate = new Date(this.events[0].start);
        const endDate = new Date(this.events[this.events.length - 1].end);
        const diffInMs = endDate - startDate;
        return Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 30.5));
    }

    generateRandomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    }

    renderEvents() {
        const timeline = document.querySelector('.timeline');
        const totalMonths = this.getTotalMonths();
        this.events.forEach(event => {
            const eventMonths = event.calculateMonths();
            const widthPercentage = (eventMonths / totalMonths) * 100;
            const color = this.generateRandomColor();
            const eventContainer = document.createElement('div');
            eventContainer.classList.add('event-container');
            eventContainer.style.width = `${widthPercentage}%`;
            eventContainer.style.backgroundColor = color;
            eventContainer.dataset.description = event.description;
            eventContainer.dataset.start = event.start;
            eventContainer.dataset.end = event.end;
            eventContainer.dataset.location = event.location;
            eventContainer.dataset.skills = event.skills.join(', ');

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

            timeline.appendChild(eventContainer);
        });
    }
}

const eventManager = new EventManager();

eventManager.addEvent("1997-01", "2000-09", "Naissance à Chieti en Italie. Mes parents ont choisi de s'installer en Belgique pour bénéficier d'opportunités professionnelles plus nombreuses.", "Italie et Belgique", ["Psycho-motricité", "Communication", "Polymathie", "Empathie", "Italien"]);
eventManager.addEvent("2000-09", "2009-06", "Éducation primaire à l'Athénée Royal Orsini Dewerpe. Développement des bases fondamentales en mathématiques, sciences et langues.", "Jumet", ["Pensée analytique", "Calcul", "Communication", "Travail en équipe", "Créativité", "Français"]);
eventManager.addEvent("2009-09", "2015-06", "Éducation secondaire à l'Athénée Royal Orsini Dewerpe. Parcours académique diversifié : option latin pour renforcer les bases linguistiques et analytiques, puis spécialisation en mécanique automobile pour développer des compétences techniques.", "Jumet", ["Raisonnement logique", "Compétences techniques", "Discipline", "CESI", "Certicat de connaissances de gestion de base", "Anglais", "Néerlandais"]);
eventManager.addEvent("2015-09", "2016-06", "Année dédiée à l'étude approfondie de la musique : apprentissage de plusieurs instruments (guitare, piano, violoncelle) et perfectionnement du bases en solfège. (Le but était de préparer l'entrée au conservatoire Royal)", "Jumet, Lodelinsart, Charleroi", ["Créativité", "Discipline", "Écoute active", "Précision", "Gestion de l'effort"]);
eventManager.addEvent("2016-07", "2017-01", "Formation en mixologie et service client à la Rhumerie de Charleroi, acquérant des compétences clés en gestion de bar, communication et satisfaction client.", "Charleroi", ["Service client", "Gestion de bar", "Communication", "Travail sous pression", "Sens de l'organisation", "Gestion de caisse"]);
eventManager.addEvent("2017-01", "2018-06", "Missions intérimaires chez Cora Châtelineau, principalement dans la logistique et la gestion des stocks, où l'accent a été mis sur l'organisation et le respect des délais serrés.", "Châtelineau", ["Organisation", "Gestion des stocks", "Rigueur", "Efficacité", "Respect des délais"]);
eventManager.addEvent("2018-07", "2018-10", "Formation en menuiserie avec l'IFAPME chez Mordant et Fils, développant des compétences pratiques en fabrication et assemblage de structures en bois.", "Jumet", ["Compétences techniques", "Précision", "Travail manuel", "Autonomie", "Sécurité"]);
eventManager.addEvent("2019-01", "2021-10", "Expérience polyvalente en restauration à La Rustica : gestion de salle, préparation culinaire et mixologie. Compétences clés : travail d'équipe, gestion de la clientèle et gestion des priorités en période de forte affluence.", "Thuillies", ["Travail d'équipe", "Gestion de la clientèle", "Polyvalence", "Gestion des priorités", "Réactivité"]);
eventManager.addEvent("2021-10", "2022-05", "Période de recherche active d'un emploi correspondant à mes compétences et aspirations professionnelles, explorant différentes industries et opportunités dans les régions de Charleroi et Thuin.", "Charleroi, Thuin et alentours", ["Stratégie de recherche", "Adaptabilité", "Persévérance", "Autonomie", "Développement web", "Perfectionnement Anglais"]);
eventManager.addEvent("2022-05", "2023-04", "Poste d'oxycoupeur chez Industeel ArcelorMittal. Responsabilités : découpe précise de métaux, respect des normes de sécurité, et optimisation des processus de production.", "Marchiennes-au-Pont", ["Précision", "Sécurité", "Optimisation", "Travail d'équipe", "Rigueur", "Permis B"]);
eventManager.addEvent("2023-09", "2024-03", "Opérateur de production chez The Juicy Group. Rôle : supervision des machines de production, contrôle qualité des produits et suivi des normes d’hygiène alimentaire.", "Leval-Trahegnies", ["Contrôle qualité", "Suivi des normes", "Polyvalence", "Organisation", "Efficacité"]);
eventManager.addEvent("2024-03", "2024-08", "Missions intérimaires chez Easy Fence. Participation à l'installation et à la maintenance de structures de clôtures. Démonstration de polyvalence et d'efficacité sur le terrain.", "Gosselies", ["Polyvalence", "Maintenance", "Efficacité", "Travail d'équipe", "Gestion du temps"]);
eventManager.addEvent("2024-09", "2025-03", "Formation intensive chez BeCode, avec une immersion dans le développement web full-stack : apprentissage approfondi de JavaScript, Node.js, React, et des bases solides en HTML, CSS et SQL.", "Charleroi", ["Développement web", "JavaScript", "Node.js", "React", "HTML", "CSS", "SQL"]);

eventManager.renderEvents();
