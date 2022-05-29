<html>
    <head>
        <link rel="stylesheet" href="style.css">
        <meta charset="utf-8">
        <title>PHP Innlogging</title>
    </head>
    <body>
        <p>Vennligst logg inn:</p>
        <form method="post">
            <label for="brukernavn">Brukernavn:</label>
            <input type="text" name="brukernavn" /><br />
            <label for="passord">Passord:</label>
            <input type="password" name="passord" /><br />
            
            <input type="submit" value="Logg inn" name="submit" />
        </form>
        <p>Eller klikk <a href="registration.php">her</a> for å registrere ny bruker</p>
            
    </body>
    <?php
        if(isset($_POST['submit'])){
            //Gjøre om POST-data til variabler
            $brukernavn = $_POST['brukernavn'];
            $passord = $_POST['passord'];

            $param_brukernavn = filter_var($brukernavn, FILTER_SANITIZE_EMAIL);
            $param_passord = md5($passord);
            
            //Koble til databasen
            $dbc = mysqli_connect('localhost', 'root', 'Bennevis2004', 'mydb')
              or die('Error connecting to MySQL server.');
            
            //Gjøre klar SQL-strengen
            $query = "SELECT brukernavn, passord from users where brukernavn='$param_brukernavn' and passord='$param_passord'";
            
            //Utføre spørringen
            $result = mysqli_query($dbc, $query)
              or die('Error querying database.');
            
            //Koble fra databasen
            mysqli_close($dbc);


            //Sjekke om spørringen gir resultater
            if($result->num_rows > 0){
                //Gyldig login
                header('location: game.html');
                
            }else{
                //Ugyldig login
                header('location: index.php');
                
            }




        }
    ?>
</html>