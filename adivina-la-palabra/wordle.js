// Adivina la Palabra - Main JavaScript File

// Mensaje para confirmar que el script se ha cargado correctamente en la consola del navegador.
console.log("Adivina la Palabra - Script cargado.");

// Esperamos a que todo el contenido del HTML se cargue antes de ejecutar el script.
// Esto es una buena práctica para evitar errores si el script intenta acceder a elementos que aún no existen.
document.addEventListener('DOMContentLoaded', () => {

    // Seleccionamos todos los botones que tienen la clase 'level-button'.
    const levelButtons = document.querySelectorAll('.level-button');

    // Recorremos cada uno de los botones que hemos encontrado.
    levelButtons.forEach(button => {
        // A cada botón, le añadimos un "detector de clics" (event listener).
        button.addEventListener('click', () => {
            // Cuando un usuario hace clic en un botón, ejecutamos este código.

            // 1. Obtenemos el texto del botón para saber el nivel (ej: "A1", "B2").
            const selectedLevel = button.textContent;

            // 2. Mostramos un mensaje en la consola para desarrollo y depuración.
            console.log(`Nivel seleccionado: ${selectedLevel}`);

            // 3. Mostramos una alerta al usuario para confirmar la acción.
            //    (Esto es temporal, en el futuro lo cambiaremos para que inicie el juego).
            alert(`Has seleccionado el nivel ${selectedLevel}. ¡Próximamente podrás jugar!`);

            // PRÓXIMOS PASOS:
            // Aquí es donde, en el futuro, llamaremos a una función para
            // iniciar el tablero del juego con una palabra del nivel correspondiente.
            // Por ejemplo: startGame(selectedLevel);
        });
    });

});