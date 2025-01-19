<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Timeline</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <h1>Timeline Tortora Matteo</h1>
    <div class="timeline">
    <?php
        class Event {
            public $start;
            public $end;
            public $description;
            public $location;
            public $skills;
        
            public function __construct($start, $end, $description, $location, $skills) {
                $this->start = $start;
                $this->end = $end;
                $this->description = $description;
                $this->location = $location;
                $this->skills = $skills;
            }
        
            public function calculateMonths() {
                $startDate = new DateTime($this->start);
                $endDate = new DateTime($this->end);
                $interval = $startDate->diff($endDate);
                return $interval->y * 12 + $interval->m + ($interval->d > 0 ? 1 : 0);
            }
        }
        
        class EventManager {
            private $events = [];
        
            public function addEvent($start, $end, $description, $location, $skills) {
                $this->events[] = new Event($start, $end, $description, $location, $skills); 
            }
        
            public function getTotalMonths() {
                if (empty($this->events)) {
                    return 0;
                }
                $firstEvent = $this->events[0];
                $lastEvent = end($this->events);
                $startDate = new DateTime($firstEvent->start);
                $endDate = new DateTime($lastEvent->end);
                $interval = $startDate->diff($endDate);
                return $interval->y * 12 + $interval->m + ($interval->d > 0 ? 1 : 0);
            }
        
            private function generateRandomColor() {
                // Génère une couleur hexadécimale aléatoire
                return sprintf('#%06X', mt_rand(0, 0xFFFFFF));
            }
        
            public function renderEvents() {
                $totalMonths = $this->getTotalMonths();
                foreach ($this->events as $event) {
                    $eventMonths = $event->calculateMonths();
                    $widthPercentage = ($eventMonths / $totalMonths) * 100;
                    $color = $this->generateRandomColor();
                    // Ajoute l'attribut data-end ici
                    echo "<div class='event-container' style='width: {$widthPercentage}%; background-color: {$color};' 
                            data-description='" . htmlspecialchars($event->description, ENT_QUOTES, 'UTF-8') . "' 
                            data-start='" . htmlspecialchars($event->start, ENT_QUOTES, 'UTF-8') . "'
                            data-end='" . htmlspecialchars($event->end, ENT_QUOTES, 'UTF-8') . "' 
                            data-location='" . htmlspecialchars($event->location, ENT_QUOTES, 'UTF-8') . "'
                            data-skills='" . htmlspecialchars(implode(', ', $event->skills), ENT_QUOTES, 'UTF-8') . "'>
                          </div>";
                }
            }            
                   
        }

        $eventManager = new EventManager();

        $eventManager->addEvent(
            "1997-01", 
            "2000-09", 
            "Naissance à Chieti en Italie. Mes parents ont choisi de s'installer en Belgique pour bénéficier d'opportunités professionnelles plus nombreuses.", 
            "Italie et Belgique",
            ["Déplacements", "Communication", "Découverte culturelle", "Persévérance", "Italien"]
        );

        $eventManager->addEvent(
            "2000-09", 
            "2009-06", 
            "Éducation primaire à l'Athénée Royal Orsini Dewerpe. Développement des bases fondamentales en mathématiques, sciences et langues.", 
            "Jumet",
            ["Pensée analytique", "Calcul", "Communication", "Travail en équipe", "Créativité", "Français"]
        );
        
        $eventManager->addEvent(
            "2009-09", 
            "2015-06", 
            "Éducation secondaire à l'Athénée Royal Orsini Dewerpe. Parcours académique diversifié : option latin pour renforcer les bases linguistiques et analytiques, puis spécialisation en mécanique automobile pour développer des compétences techniques.", 
            "Jumet",
            ["Raisonnement logique", "Compétences techniques", "Discipline", "Adaptabilité", "Gestion du temps", "Anglais", "Néerlandais"]
        );
        
        $eventManager->addEvent(
            "2015-05-30", 
            "2015-06-30", 
            "Obtention du Certificat d'Études Secondaires Inférieures (CESI) et certificat de gestion de base, validant les compétences fondamentales nécessaires pour évoluer dans un cadre professionnel.", 
            "Jumet",
            ["Gestion de projet", "Communication professionnelle", "Leadership", "Organisation", "Prise de décision"]
        );
        
        $eventManager->addEvent(
            "2015-09", 
            "2016-06", 
            "Année dédiée à l'étude approfondie de la musique : apprentissage de plusieurs instruments (guitare, piano, violoncelle) et acquisition des bases en solfège, démontrant un esprit créatif et discipliné.", 
            "Jumet, Lodelinsart, Charleroi",
            ["Créativité", "Discipline", "Écoute active", "Précision", "Gestion de l'effort"]
        );
        
        $eventManager->addEvent(
            "2016-07", 
            "2017-01", 
            "Formation en mixologie et service client à la Rhumerie de Charleroi, acquérant des compétences clés en gestion de bar, communication et satisfaction client.", 
            "Charleroi",
            ["Service client", "Gestion de bar", "Communication", "Travail sous pression", "Sens de l'organisation"]
        );
        
        $eventManager->addEvent(
            "2017-01", 
            "2018-06", 
            "Missions intérimaires chez Cora Châtelineau, principalement dans la logistique et la gestion des stocks, où l'accent a été mis sur l'organisation et le respect des délais serrés.", 
            "Châtelineau",
            ["Organisation", "Gestion des stocks", "Rigueur", "Efficacité", "Respect des délais"]
        );
        
        $eventManager->addEvent(
            "2018-07", 
            "2018-10", 
            "Formation en menuiserie avec l'IFAPME chez Mordant et Fils, développant des compétences pratiques en fabrication et assemblage de structures en bois.", 
            "Jumet",
            ["Compétences techniques", "Précision", "Travail manuel", "Autonomie", "Sécurité"]
        );
        
        $eventManager->addEvent(
            "2019-01", 
            "2021-10", 
            "Expérience polyvalente en restauration à La Rustica : gestion de salle, préparation culinaire et mixologie. Compétences clés : travail d'équipe, gestion de la clientèle et gestion des priorités en période de forte affluence.", 
            "Thuillies",
            ["Travail d'équipe", "Gestion de la clientèle", "Polyvalence", "Gestion des priorités", "Réactivité"]
        );
        
        $eventManager->addEvent(
            "2021-10", 
            "2022-05", 
            "Période de recherche active d'un emploi correspondant à mes compétences et aspirations professionnelles, explorant différentes industries et opportunités dans les régions de Charleroi et Thuin.", 
            "Charleroi, Thuin et alentours",
            ["Stratégie de recherche", "Adaptabilité", "Persévérance", "Autonomie", "Développement web", "Perfectionnement Anglais"]
        );
        
        $eventManager->addEvent(
            "2022-05", 
            "2023-04", 
            "Poste d'oxycoupeur chez Industeel ArcelorMittal. Responsabilités : découpe précise de métaux, respect des normes de sécurité, et optimisation des processus de production.", 
            "Marchiennes-au-Pont",
            ["Précision", "Sécurité", "Optimisation", "Travail d'équipe", "Rigueur", "Permis B"]
        );
        
        $eventManager->addEvent(
            "2023-09", 
            "2024-03", 
            "Opérateur de production chez The Juicy Group. Rôle : supervision des machines de production, contrôle qualité des produits et suivi des normes d’hygiène alimentaire.", 
            "Leval-Trahegnies",
            ["Contrôle qualité", "Suivi des normes", "Polyvalence", "Organisation", "Efficacité"]
        );
        
        $eventManager->addEvent(
            "2024-03", 
            "2024-08", 
            "Missions intérimaires chez Easy Fence. Participation à l'installation et à la maintenance de structures de clôtures. Démonstration de polyvalence et d'efficacité sur le terrain.", 
            "Gosselies",
            ["Polyvalence", "Maintenance", "Efficacité", "Travail d'équipe", "Gestion du temps"]
        );
        
        $eventManager->addEvent(
            "2024-09", 
            "2024-12", 
            "Formation intensive chez BeCode, avec une immersion dans le développement web full-stack : apprentissage approfondi de JavaScript, Node.js, React, et des bases solides en HTML, CSS et SQL.", 
            "Charleroi",
            ["Développement web", "JavaScript", "Node.js", "React", "HTML", "CSS", "SQL"]
        );
        
        $eventManager->addEvent(
            "2025-01", 
            "2025-01", 
            "Formation en alternance en développement web chez BeCode. Rôle : appliquer les connaissances en développement web à des projets concrets.", 
            "Charleroi",
            ["Formation continue", "Projets concrets", "Développement web", "Collaboration", "Innovation"]
        );
        

        $eventManager->renderEvents();
    ?>
    </div>
    <div id="event-details">
        <header id="event-start"></header> <br>
        <main id="event-description"></main> <br>
        <ul id="event-skills-list"></ul> <br>
        <footer id="event-location"></foote>
    </div>


    <script src="script.js"></script>
</body>
</html>
