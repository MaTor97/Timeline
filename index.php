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
        $events = [
            ["start" => "1997-01", "end" => "2000-09", "description" => "Arrivée au monde en Italie et départ en Belgique"],
            ["start" => "2000-09", "end" => "2009-06", "description" => "École primaire à l'Athénée Royal Orsini Dewerpe Jumet"],
            ["start" => "2009-09", "end" => "2015-06", "description" => "École secondaire à l'Athénée Royal Orsini Dewerpe Jumet (options : d'abord latin puis mécanique automobile)"],
            ["start" => "2015-05-30", "end" => "2015-06-30", "description" => "CESI + Connaissance de gestion de base"],
            ["start" => "2015-09", "end" => "2016-06", "description" => "Année consacrée à l'étude de la musique (Guitare, Piano, Violoncelle, Solfège,...)"],
            ["start" => "2016-07", "end" => "2017-01", "description" => "Formation barman à la Rhumerie Charleroi"],
            ["start" => "2017-01", "end" => "2018-06", "description" => "Missions intérim avec Accent Jobs chez Cora Châtelineau"],
            ["start" => "2018-07", "end" => "2018-10", "description" => "Menuiserie avec l'IFAPME chez Mordant et fils"],
            ["start" => "2019-01", "end" => "2021-10", "description" => "Barman, Garçon de salle, pizzaiolo à la Rustica à Thuillies"],
            ["start" => "2021-10", "end" => "2022-05", "description" => "Recherche d'un emploi adapté"],
            ["start" => "2022-05", "end" => "2023-04", "description" => "Oxycoupeur chez Industeel ArcelorMittal à Marchiennes-au-Pont"],
            ["start" => "2023-09", "end" => "2024-03", "description" => "Opérateur de production chez The Juicy Group à Leval-Trahegnies"],
            ["start" => "2024-03", "end" => "2024-08", "description" => "Missions intérim avec Accent Jobs chez Easy Fence à Gosselies"],
            ["start" => "2024-09", "end" => date("Y-m"), "description" => "Formation développeur web junior avec BeCode.org à Charleroi"]
        ];

        function calculateMonths($start, $end) {
            $startDate = new DateTime($start);
            $endDate = new DateTime($end);
            $interval = $startDate->diff($endDate);
            return $interval->y * 12 + $interval->m + ($interval->d > 0 ? 1 : 0); 
        }

        $totalMonths = calculateMonths($events[0]['start'], end($events)['end']);

        $colors = ["#FF0000", "#FF4500", "#FFA500", "#FFD700", "#ADFF2F", "#32CD32", "#00FA9A", "#00CED1", "#1E90FF", "#8A2BE2"];

        foreach ($events as $index => $event) {
            $eventMonths = calculateMonths($event['start'], $event['end']);
            $widthPercentage = ($eventMonths / $totalMonths) * 100;
            $color = $colors[$index % count($colors)];
            echo "<div class='event-container' style='width: {$widthPercentage}%; background-color: {$color};' 
                    data-description='" . htmlspecialchars($event['description'], ENT_QUOTES, 'UTF-8') . "' 
                    data-start='" . htmlspecialchars($event['start'], ENT_QUOTES, 'UTF-8') . "'>
                  </div>";
        }       
    ?>
    </div>
    <div id="event-details">
        <span id="event-start"></span> - <span id="event-description"></span>
    </div>
    <script src="script.js"></script>
</body>
</html>
