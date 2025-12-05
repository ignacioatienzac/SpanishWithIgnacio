const VOCABULARIO = [
    { "palabra": "yo", "traduccion_ingles": "I" },
    { "palabra": "tú", "traduccion_ingles": "you (singular informal)" },
    { "palabra": "él", "traduccion_ingles": "he" },
    { "palabra": "ella", "traduccion_ingles": "she" },
    { "palabra": "usted", "traduccion_ingles": "you (singular formal)" },
    { "palabra": "nosotros", "traduccion_ingles": "we (masc/mixed)" },
    { "palabra": "nosotras", "traduccion_ingles": "we (fem)" },
    { "palabra": "vosotros", "traduccion_ingles": "you all (informal Spain)" },
    { "palabra": "vosotras", "traduccion_ingles": "you all (fem informal Spain)" },
    { "palabra": "ellos", "traduccion_ingles": "they (masc/mixed)" },
    { "palabra": "ellas", "traduccion_ingles": "they (fem)" },
    { "palabra": "ustedes", "traduccion_ingles": "you all (formal/LatAm)" },
    { "palabra": "español", "traduccion_ingles": "Spanish (male)" },
    { "palabra": "española", "traduccion_ingles": "Spanish (female)" },
    { "palabra": "mexicano", "traduccion_ingles": "Mexican (male)" },
    { "palabra": "mexicana", "traduccion_ingles": "Mexican (female)" },
    { "palabra": "francés", "traduccion_ingles": "French (male)" },
    { "palabra": "francesa", "traduccion_ingles": "French (female)" },
    { "palabra": "estadounidense", "traduccion_ingles": "American" },
    { "palabra": "canadiense", "traduccion_ingles": "Canadian" },
    { "palabra": "inglés", "traduccion_ingles": "English (male)" },
    { "palabra": "inglesa", "traduccion_ingles": "English (female)" },
    { "palabra": "alemán", "traduccion_ingles": "German (male)" },
    { "palabra": "alemana", "traduccion_ingles": "German (female)" },
    { "palabra": "italiano", "traduccion_ingles": "Italian (male)" },
    { "palabra": "italiana", "traduccion_ingles": "Italian (female)" },
    { "palabra": "chino", "traduccion_ingles": "Chinese (male)" },
    { "palabra": "china", "traduccion_ingles": "Chinese (female)" },
    { "palabra": "japonés", "traduccion_ingles": "Japanese (male)" },
    { "palabra": "japonesa", "traduccion_ingles": "Japanese (female)" },
    { "palabra": "coreano", "traduccion_ingles": "Korean (male)" },
    { "palabra": "coreana", "traduccion_ingles": "Korean (female)" },
    { "palabra": "hola", "traduccion_ingles": "👋" },
    { "palabra": "adiós", "traduccion_ingles": "👋" },
    { "palabra": "gracias", "traduccion_ingles": "thank you" },
    { "palabra": "perdón", "traduccion_ingles": "sorry / excuse me" },
    { "palabra": "encantado", "traduccion_ingles": "nice to meet you (male)" },
    { "palabra": "encantada", "traduccion_ingles": "nice to meet you (female)" },
    { "palabra": "qué", "traduccion_ingles": "what" },
    { "palabra": "quién", "traduccion_ingles": "who" },
    { "palabra": "dónde", "traduccion_ingles": "where" },
    { "palabra": "cuándo", "traduccion_ingles": "when" },
    { "palabra": "cómo", "traduccion_ingles": "how" },
    { "palabra": "familia", "traduccion_ingles": "family" },
    { "palabra": "padre", "traduccion_ingles": "father" },
    { "palabra": "madre", "traduccion_ingles": "mother" },
    { "palabra": "padres", "traduccion_ingles": "parents" },
    { "palabra": "hijo", "traduccion_ingles": "son" },
    { "palabra": "hija", "traduccion_ingles": "daughter" },
    { "palabra": "hermano", "traduccion_ingles": "brother" },
    { "palabra": "hermana", "traduccion_ingles": "sister" },
    { "palabra": "abuelo", "traduccion_ingles": "grandfather" },
    { "palabra": "abuela", "traduccion_ingles": "grandmother" },
    { "palabra": "tío", "traduccion_ingles": "uncle" },
    { "palabra": "tía", "traduccion_ingles": "aunt" },
    { "palabra": "primo", "traduccion_ingles": "cousin (male)" },
    { "palabra": "prima", "traduccion_ingles": "cousin (female)" },
    { "palabra": "profesor", "traduccion_ingles": "teacher (male)" },
    { "palabra": "profesora", "traduccion_ingles": "teacher (female)" },
    { "palabra": "estudiante", "traduccion_ingles": "👨‍🎓" },
    { "palabra": "médico", "traduccion_ingles": "👨‍⚕️" },
    { "palabra": "médica", "traduccion_ingles": "👩‍⚕️" },
    { "palabra": "enfermero", "traduccion_ingles": "nurse (male)" },
    { "palabra": "enfermera", "traduccion_ingles": "nurse (female)" },
    { "palabra": "cocinero", "traduccion_ingles": "👨‍🍳" },
    { "palabra": "cocinera", "traduccion_ingles": "👩‍🍳" },
    { "palabra": "policía", "traduccion_ingles": "👮" },
    { "palabra": "camarero", "traduccion_ingles": "waiter" },
    { "palabra": "camarera", "traduccion_ingles": "waitress" },
    { "palabra": "secretario", "traduccion_ingles": "secretary (male)" },
    { "palabra": "secretaria", "traduccion_ingles": "secretary (female)" },
    { "palabra": "taxista", "traduccion_ingles": "🚕" },
    { "palabra": "cero", "traduccion_ingles": "0️⃣" },
    { "palabra": "uno", "traduccion_ingles": "1️⃣" },
    { "palabra": "dos", "traduccion_ingles": "2️⃣" },
    { "palabra": "tres", "traduccion_ingles": "3️⃣" },
    { "palabra": "cuatro", "traduccion_ingles": "4️⃣" },
    { "palabra": "cinco", "traduccion_ingles": "5️⃣" },
    { "palabra": "seis", "traduccion_ingles": "6️⃣" },
    { "palabra": "siete", "traduccion_ingles": "7️⃣" },
    { "palabra": "ocho", "traduccion_ingles": "8️⃣" },
    { "palabra": "nueve", "traduccion_ingles": "9️⃣" },
    { "palabra": "diez", "traduccion_ingles": "🔟" },
    { "palabra": "once", "traduccion_ingles": "11" },
    { "palabra": "doce", "traduccion_ingles": "12" },
    { "palabra": "trece", "traduccion_ingles": "13" },
    { "palabra": "catorce", "traduccion_ingles": "14" },
    { "palabra": "quince", "traduccion_ingles": "15" },
    { "palabra": "veinte", "traduccion_ingles": "20" },
    { "palabra": "treinta", "traduccion_ingles": "30" },
    { "palabra": "cuarenta", "traduccion_ingles": "40" },
    { "palabra": "cincuenta", "traduccion_ingles": "50" },
    { "palabra": "sesenta", "traduccion_ingles": "60" },
    { "palabra": "setenta", "traduccion_ingles": "70" },
    { "palabra": "ochenta", "traduccion_ingles": "80" },
    { "palabra": "noventa", "traduccion_ingles": "90" },
    { "palabra": "cien", "traduccion_ingles": "💯" },
    { "palabra": "lunes", "traduccion_ingles": "Monday" },
    { "palabra": "martes", "traduccion_ingles": "Tuesday" },
    { "palabra": "miércoles", "traduccion_ingles": "Wednesday" },
    { "palabra": "jueves", "traduccion_ingles": "Thursday" },
    { "palabra": "viernes", "traduccion_ingles": "Friday" },
    { "palabra": "sábado", "traduccion_ingles": "Saturday" },
    { "palabra": "domingo", "traduccion_ingles": "Sunday" },
    { "palabra": "enero", "traduccion_ingles": "January" },
    { "palabra": "febrero", "traduccion_ingles": "February" },
    { "palabra": "marzo", "traduccion_ingles": "March" },
    { "palabra": "abril", "traduccion_ingles": "April" },
    { "palabra": "mayo", "traduccion_ingles": "May" },
    { "palabra": "junio", "traduccion_ingles": "June" },
    { "palabra": "julio", "traduccion_ingles": "July" },
    { "palabra": "agosto", "traduccion_ingles": "August" },
    { "palabra": "septiembre", "traduccion_ingles": "September" },
    { "palabra": "octubre", "traduccion_ingles": "October" },
    { "palabra": "noviembre", "traduccion_ingles": "November" },
    { "palabra": "diciembre", "traduccion_ingles": "December" },
    { "palabra": "primavera", "traduccion_ingles": "spring" },
    { "palabra": "verano", "traduccion_ingles": "summer" },
    { "palabra": "otoño", "traduccion_ingles": "autumn" },
    { "palabra": "invierno", "traduccion_ingles": "winter" },
    { "palabra": "tiempo", "traduccion_ingles": "weather" },
    { "palabra": "sol", "traduccion_ingles": "☀️" },
    { "palabra": "calor", "traduccion_ingles": "heat / hot" },
    { "palabra": "frío", "traduccion_ingles": "cold" },
    { "palabra": "viento", "traduccion_ingles": "💨" },
    { "palabra": "lluvia", "traduccion_ingles": "🌧️" },
    { "palabra": "nieve", "traduccion_ingles": "🌨️" },
    { "palabra": "nube", "traduccion_ingles": "☁️" },
    { "palabra": "nublado", "traduccion_ingles": "cloudy" },
    { "palabra": "tormenta", "traduccion_ingles": "⛈️" },
    { "palabra": "casa", "traduccion_ingles": "🏠" },
    { "palabra": "piso", "traduccion_ingles": "apartment / flat" },
    { "palabra": "habitación", "traduccion_ingles": "room" },
    { "palabra": "dormitorio", "traduccion_ingles": "bedroom" },
    { "palabra": "salón", "traduccion_ingles": "living room" },
    { "palabra": "comedor", "traduccion_ingles": "dining room" },
    { "palabra": "cocina", "traduccion_ingles": "kitchen" },
    { "palabra": "baño", "traduccion_ingles": "🚽" },
    { "palabra": "jardín", "traduccion_ingles": "garden" },
    { "palabra": "pared", "traduccion_ingles": "wall" },
    { "palabra": "suelo", "traduccion_ingles": "floor" },
    { "palabra": "mesa", "traduccion_ingles": "table" },
    { "palabra": "silla", "traduccion_ingles": "🪑" },
    { "palabra": "cama", "traduccion_ingles": "🛏️" },
    { "palabra": "sofá", "traduccion_ingles": "🛋️" },
    { "palabra": "armario", "traduccion_ingles": "wardrobe / closet" },
    { "palabra": "estantería", "traduccion_ingles": "shelf" },
    { "palabra": "lámpara", "traduccion_ingles": "lamp" },
    { "palabra": "espejo", "traduccion_ingles": "mirror" },
    { "palabra": "televisión", "traduccion_ingles": "📺" },
    { "palabra": "nevera", "traduccion_ingles": "fridge" },
    { "palabra": "lavadora", "traduccion_ingles": "washing machine" },
    { "palabra": "móvil", "traduccion_ingles": "📱" },
    { "palabra": "llave", "traduccion_ingles": "🔑" },
    { "palabra": "reloj", "traduccion_ingles": "⌚" },
    { "palabra": "bolso", "traduccion_ingles": "handbag" },
    { "palabra": "cartera", "traduccion_ingles": "wallet" },
    { "palabra": "paraguas", "traduccion_ingles": "☂️" },
    { "palabra": "dinero", "traduccion_ingles": "💰" },
    { "palabra": "tarjeta", "traduccion_ingles": "💳" },
    { "palabra": "libro", "traduccion_ingles": "📖" },
    { "palabra": "cuaderno", "traduccion_ingles": "notebook" },
    { "palabra": "papel", "traduccion_ingles": "paper" },
    { "palabra": "bolígrafo", "traduccion_ingles": "pen" },
    { "palabra": "lápiz", "traduccion_ingles": "✏️" },
    { "palabra": "ordenador", "traduccion_ingles": "💻" },
    { "palabra": "mochila", "traduccion_ingles": "🎒" },
    { "palabra": "ciudad", "traduccion_ingles": "city" },
    { "palabra": "pueblo", "traduccion_ingles": "village / town" },
    { "palabra": "barrio", "traduccion_ingles": "neighborhood" },
    { "palabra": "calle", "traduccion_ingles": "street" },
    { "palabra": "plaza", "traduccion_ingles": "square" },
    { "palabra": "parque", "traduccion_ingles": "park" },
    { "palabra": "tienda", "traduccion_ingles": "shop / store" },
    { "palabra": "supermercado", "traduccion_ingles": "🛒" },
    { "palabra": "mercado", "traduccion_ingles": "market" },
    { "palabra": "escuela", "traduccion_ingles": "school" },
    { "palabra": "hospital", "traduccion_ingles": "🏥" },
    { "palabra": "farmacia", "traduccion_ingles": "pharmacy" },
    { "palabra": "banco", "traduccion_ingles": "🏦" },
    { "palabra": "restaurante", "traduccion_ingles": "restaurant" },
    { "palabra": "bar", "traduccion_ingles": "bar" },
    { "palabra": "cine", "traduccion_ingles": "cinema / movies" },
    { "palabra": "hotel", "traduccion_ingles": "🏨" },
    { "palabra": "museo", "traduccion_ingles": "museum" },
    { "palabra": "aeropuerto", "traduccion_ingles": "✈️" },
    { "palabra": "estación", "traduccion_ingles": "station" },
    { "palabra": "coche", "traduccion_ingles": "🚗" },
    { "palabra": "autobús", "traduccion_ingles": "🚌" },
    { "palabra": "metro", "traduccion_ingles": "subway / metro" },
    { "palabra": "tren", "traduccion_ingles": "🚆" },
    { "palabra": "bicicleta", "traduccion_ingles": "🚲" },
    { "palabra": "moto", "traduccion_ingles": "🏍️" },
    { "palabra": "avión", "traduccion_ingles": "plane" },
    { "palabra": "taxi", "traduccion_ingles": "🚖" },
    { "palabra": "barco", "traduccion_ingles": "🚢" },
    { "palabra": "alto", "traduccion_ingles": "tall (male)" },
    { "palabra": "alta", "traduccion_ingles": "tall (female)" },
    { "palabra": "bajo", "traduccion_ingles": "short (height - male)" },
    { "palabra": "baja", "traduccion_ingles": "short (height - female)" },
    { "palabra": "gordo", "traduccion_ingles": "fat (male)" },
    { "palabra": "gorda", "traduccion_ingles": "fat (female)" },
    { "palabra": "delgado", "traduccion_ingles": "thin (male)" },
    { "palabra": "delgada", "traduccion_ingles": "thin (female)" },
    { "palabra": "guapo", "traduccion_ingles": "handsome" },
    { "palabra": "guapa", "traduccion_ingles": "beautiful" },
    { "palabra": "feo", "traduccion_ingles": "ugly" },
    { "palabra": "joven", "traduccion_ingles": "young" },
    { "palabra": "mayor", "traduccion_ingles": "old / elderly" },
    { "palabra": "pelo", "traduccion_ingles": "hair" },
    { "palabra": "ojos", "traduccion_ingles": "👀" },
    { "palabra": "rubio", "traduccion_ingles": "blonde (male)" },
    { "palabra": "morena", "traduccion_ingles": "brunette (female)" },
    { "palabra": "largo", "traduccion_ingles": "long" },
    { "palabra": "corto", "traduccion_ingles": "short (length)" },
    { "palabra": "barba", "traduccion_ingles": "beard" },
    { "palabra": "simpático", "traduccion_ingles": "nice / friendly" },
    { "palabra": "antipático", "traduccion_ingles": "unpleasant" },
    { "palabra": "bueno", "traduccion_ingles": "good" },
    { "palabra": "malo", "traduccion_ingles": "bad" },
    { "palabra": "amable", "traduccion_ingles": "kind" },
    { "palabra": "divertido", "traduccion_ingles": "fun" },
    { "palabra": "aburrido", "traduccion_ingles": "boring" },
    { "palabra": "inteligente", "traduccion_ingles": "intelligent" },
    { "palabra": "trabajador", "traduccion_ingles": "hard-working" },
    { "palabra": "vago", "traduccion_ingles": "lazy" },
    { "palabra": "alegre", "traduccion_ingles": "cheerful" },
    { "palabra": "serio", "traduccion_ingles": "serious" },
    { "palabra": "tímido", "traduccion_ingles": "shy" },
    { "palabra": "feliz", "traduccion_ingles": "happy" },
    { "palabra": "triste", "traduccion_ingles": "sad" },
    { "palabra": "rojo", "traduccion_ingles": "🔴" },
    { "palabra": "azul", "traduccion_ingles": "🔵" },
    { "palabra": "verde", "traduccion_ingles": "🟢" },
    { "palabra": "amarillo", "traduccion_ingles": "🟡" },
    { "palabra": "blanco", "traduccion_ingles": "⚪" },
    { "palabra": "negro", "traduccion_ingles": "⚫" },
    { "palabra": "marrón", "traduccion_ingles": "🟤" },
    { "palabra": "gris", "traduccion_ingles": "gray" },
    { "palabra": "naranja", "traduccion_ingles": "🟠" },
    { "palabra": "rosa", "traduccion_ingles": "pink" },
    { "palabra": "violeta", "traduccion_ingles": "🟣" },
    { "palabra": "camiseta", "traduccion_ingles": "👕" },
    { "palabra": "camisa", "traduccion_ingles": "shirt" },
    { "palabra": "pantalón", "traduccion_ingles": "👖" },
    { "palabra": "vaqueros", "traduccion_ingles": "jeans" },
    { "palabra": "falda", "traduccion_ingles": "skirt" },
    { "palabra": "vestido", "traduccion_ingles": "👗" },
    { "palabra": "zapatos", "traduccion_ingles": "👞" },
    { "palabra": "zapatillas", "traduccion_ingles": "👟" },
    { "palabra": "abrigo", "traduccion_ingles": "coat" },
    { "palabra": "chaqueta", "traduccion_ingles": "jacket" },
    { "palabra": "jersey", "traduccion_ingles": "sweater" },
    { "palabra": "calcetines", "traduccion_ingles": "🧦" },
    { "palabra": "bufanda", "traduccion_ingles": "scarf" },
    { "palabra": "gorro", "traduccion_ingles": "beanie / hat" },
    { "palabra": "guantes", "traduccion_ingles": "🧤" },
    { "palabra": "agua", "traduccion_ingles": "💧" },
    { "palabra": "café", "traduccion_ingles": "☕" },
    { "palabra": "leche", "traduccion_ingles": "🥛" },
    { "palabra": "té", "traduccion_ingles": "tea" },
    { "palabra": "zumo", "traduccion_ingles": "🧃" },
    { "palabra": "vino", "traduccion_ingles": "🍷" },
    { "palabra": "cerveza", "traduccion_ingles": "🍺" },
    { "palabra": "pan", "traduccion_ingles": "🍞" },
    { "palabra": "huevo", "traduccion_ingles": "🥚" },
    { "palabra": "carne", "traduccion_ingles": "🥩" },
    { "palabra": "pollo", "traduccion_ingles": "🍗" },
    { "palabra": "pescado", "traduccion_ingles": "🐟" },
    { "palabra": "fruta", "traduccion_ingles": "fruit" },
    { "palabra": "manzana", "traduccion_ingles": "🍎" },
    { "palabra": "plátano", "traduccion_ingles": "🍌" },
    { "palabra": "limón", "traduccion_ingles": "🍋" },
    { "palabra": "verdura", "traduccion_ingles": "vegetables" },
    { "palabra": "ensalada", "traduccion_ingles": "🥗" },
    { "palabra": "tomate", "traduccion_ingles": "🍅" },
    { "palabra": "patata", "traduccion_ingles": "🥔" },
    { "palabra": "arroz", "traduccion_ingles": "🍚" },
    { "palabra": "pasta", "traduccion_ingles": "🍝" },
    { "palabra": "queso", "traduccion_ingles": "🧀" },
    { "palabra": "azúcar", "traduccion_ingles": "sugar" },
    { "palabra": "sal", "traduccion_ingles": "salt" },
    { "palabra": "aceite", "traduccion_ingles": "oil" },
    { "palabra": "chocolate", "traduccion_ingles": "🍫" },
    { "palabra": "menú", "traduccion_ingles": "menu" },
    { "palabra": "carta", "traduccion_ingles": "menu (card)" },
    { "palabra": "cuenta", "traduccion_ingles": "bill" },
    { "palabra": "desayuno", "traduccion_ingles": "breakfast" },
    { "palabra": "almuerzo", "traduccion_ingles": "lunch" },
    { "palabra": "cena", "traduccion_ingles": "dinner" },
    { "palabra": "postre", "traduccion_ingles": "dessert" },
    { "palabra": "plato", "traduccion_ingles": "plate" },
    { "palabra": "vaso", "traduccion_ingles": "glass" },
    { "palabra": "taza", "traduccion_ingles": "mug / cup" },
    { "palabra": "tenedor", "traduccion_ingles": "fork" },
    { "palabra": "cuchillo", "traduccion_ingles": "knife" },
    { "palabra": "cuchara", "traduccion_ingles": "spoon" },
    { "palabra": "servilleta", "traduccion_ingles": "napkin" },
    { "palabra": "rico", "traduccion_ingles": "tasty" },
    { "palabra": "delicioso", "traduccion_ingles": "delicious" },
    { "palabra": "ser", "traduccion_ingles": "to be (permanent)" },
    { "palabra": "estar", "traduccion_ingles": "to be (location/temp)" },
    { "palabra": "tener", "traduccion_ingles": "to have" },
    { "palabra": "haber", "traduccion_ingles": "there is / there are" },
    { "palabra": "querer", "traduccion_ingles": "to want / to love" },
    { "palabra": "poder", "traduccion_ingles": "can / to be able to" },
    { "palabra": "saber", "traduccion_ingles": "to know (info)" },
    { "palabra": "llamarse", "traduccion_ingles": "to be called" },
    { "palabra": "hablar", "traduccion_ingles": "to speak" },
    { "palabra": "comer", "traduccion_ingles": "to eat" },
    { "palabra": "beber", "traduccion_ingles": "to drink" },
    { "palabra": "vivir", "traduccion_ingles": "to live" },
    { "palabra": "ir", "traduccion_ingles": "to go" },
    { "palabra": "venir", "traduccion_ingles": "to come" },
    { "palabra": "hacer", "traduccion_ingles": "to do / to make" },
    { "palabra": "dormir", "traduccion_ingles": "to sleep" },
    { "palabra": "levantarse", "traduccion_ingles": "to get up" },
    { "palabra": "ducharse", "traduccion_ingles": "to shower" },
    { "palabra": "trabajar", "traduccion_ingles": "to work" },
    { "palabra": "gustar", "traduccion_ingles": "to like" },
    { "palabra": "leer", "traduccion_ingles": "to read" },
    { "palabra": "escribir", "traduccion_ingles": "to write" },
    { "palabra": "escuchar", "traduccion_ingles": "to listen" },
    { "palabra": "mirar", "traduccion_ingles": "to look at" },
    { "palabra": "ver", "traduccion_ingles": "to see / to watch" },
    { "palabra": "estudiar", "traduccion_ingles": "to study" },
    { "palabra": "aprender", "traduccion_ingles": "to learn" },
    { "palabra": "jugar", "traduccion_ingles": "to play" },
    { "palabra": "comprar", "traduccion_ingles": "to buy" },
    { "palabra": "viajar", "traduccion_ingles": "to travel" },
    { "palabra": "salir", "traduccion_ingles": "to go out / exit" },
    { "palabra": "llegar", "traduccion_ingles": "to arrive" },
    { "palabra": "entrar", "traduccion_ingles": "to enter" },
    { "palabra": "bien", "traduccion_ingles": "well" },
    { "palabra": "mal", "traduccion_ingles": "badly" },
    { "palabra": "regular", "traduccion_ingles": "so-so" },
    { "palabra": "contento", "traduccion_ingles": "content / happy" },
    { "palabra": "cansado", "traduccion_ingles": "tired" },
    { "palabra": "enfadado", "traduccion_ingles": "angry" },
    { "palabra": "nervioso", "traduccion_ingles": "nervous" },
    { "palabra": "tranquilo", "traduccion_ingles": "calm" },
    { "palabra": "ocupado", "traduccion_ingles": "busy" },
    { "palabra": "enfermo", "traduccion_ingles": "sick" },
    { "palabra": "hambre", "traduccion_ingles": "hungry" },
    { "palabra": "sed", "traduccion_ingles": "thirsty" },
    { "palabra": "sueño", "traduccion_ingles": "sleepy" },
    { "palabra": "miedo", "traduccion_ingles": "afraid" },
    { "palabra": "prisa", "traduccion_ingles": "in a hurry" },
    { "palabra": "aquí", "traduccion_ingles": "here" },
    { "palabra": "allí", "traduccion_ingles": "there" },
    { "palabra": "cerca", "traduccion_ingles": "near" },
    { "palabra": "lejos", "traduccion_ingles": "far" },
    { "palabra": "delante", "traduccion_ingles": "in front" },
    { "palabra": "detrás", "traduccion_ingles": "behind" },
    { "palabra": "enfrente", "traduccion_ingles": "opposite" },
    { "palabra": "encima", "traduccion_ingles": "on top" },
    { "palabra": "debajo", "traduccion_ingles": "under" },
    { "palabra": "dentro", "traduccion_ingles": "inside" },
    { "palabra": "fuera", "traduccion_ingles": "outside" },
    { "palabra": "entre", "traduccion_ingles": "between" },
    { "palabra": "en", "traduccion_ingles": "in / on / at" },
    { "palabra": "España", "traduccion_ingles": "🇪🇸 Spain" },
    { "palabra": "México", "traduccion_ingles": "🇲🇽 Mexico" },
    { "palabra": "Francia", "traduccion_ingles": "🇫🇷 France" },
    { "palabra": "Alemania", "traduccion_ingles": "🇩🇪 Germany" },
    { "palabra": "Italia", "traduccion_ingles": "🇮🇹 Italy" },
    { "palabra": "Reino Unido", "traduccion_ingles": "🇬🇧 United Kingdom" },
    { "palabra": "Estados Unidos", "traduccion_ingles": "🇺🇸 United States" },
    { "palabra": "China", "traduccion_ingles": "🇨🇳 China" },
    { "palabra": "Japón", "traduccion_ingles": "🇯🇵 Japan" },
    { "palabra": "Brasil", "traduccion_ingles": "🇧🇷 Brazil" },
    { "palabra": "Portugal", "traduccion_ingles": "🇵🇹 Portugal" },
    { "palabra": "oficina", "traduccion_ingles": "office" },
    { "palabra": "fábrica", "traduccion_ingles": "factory" },
    { "palabra": "universidad", "traduccion_ingles": "university" },
    { "palabra": "biblioteca", "traduccion_ingles": "library" },
    { "palabra": "correos", "traduccion_ingles": "post office" },
    { "palabra": "comisaría", "traduccion_ingles": "police station" },
    { "palabra": "gimnasio", "traduccion_ingles": "gym" },
    { "palabra": "teatro", "traduccion_ingles": "theater" },
    { "palabra": "panadería", "traduccion_ingles": "bakery" },
    { "palabra": "cafetería", "traduccion_ingles": "coffee shop" },
    { "palabra": "librería", "traduccion_ingles": "bookstore" }
];

function normalize(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function dateStringToSeed(dateStr) {
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        const char = dateStr.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return Math.abs(hash);
}

function shuffleArray(array, rng) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const randomVal = rng ? rng() : Math.random();
        const j = Math.floor(randomVal * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function dateToSeededRng(dateStr) {
    const seed = dateStringToSeed(dateStr);
    let current = seed;
    return function () {
        current = (current * 9301 + 49297) % 233280;
        return current / 233280;
    };
}

function normalizeDate(dateObj) {
    if (!(dateObj instanceof Date) || Number.isNaN(dateObj)) return '';
    const dateCopy = new Date(dateObj);
    dateCopy.setHours(0, 0, 0, 0);
    const year = dateCopy.getFullYear();
    const month = String(dateCopy.getMonth() + 1).padStart(2, '0');
    const day = String(dateCopy.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function parseDateFromStr(dateStr) {
    if (!dateStr) return null;
    const parsed = new Date(`${dateStr}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function subtractDays(dateObj, days) {
    const copy = new Date(dateObj);
    copy.setDate(copy.getDate() - days);
    return copy;
}

function getCharFrequency(str) {
    const freq = {};
    for (const char of str) {
        freq[char] = (freq[char] || 0) + 1;
    }
    return freq;
}

function isStrictSubset(candidateStr, baseFreq) {
    const candFreq = getCharFrequency(candidateStr);
    for (const char in candFreq) {
        if (!baseFreq[char]) return false;
        if (candFreq[char] > baseFreq[char]) return false;
    }
    return true;
}

function getRandomElement(arr, rng) {
    const r = rng ? rng() : Math.random();
    return arr[Math.floor(r * arr.length)];
}

function canPlaceWord(candidateWord, x, y, dir, placedWords) {
    const len = candidateWord.length;

    for (let i = 0; i < len; i++) {
        const cx = dir === 'H' ? x + i : x;
        const cy = dir === 'V' ? y + i : y;
        const char = candidateWord[i];

        for (const pw of placedWords) {
            const pLen = pw.normalized.length;
            let isIntersecting = false;
            let pChar = '';

            if (pw.dir === 'H') {
                if (cy === pw.y && cx >= pw.x && cx < pw.x + pLen) {
                    isIntersecting = true;
                    pChar = pw.normalized[cx - pw.x];
                }
            } else {
                if (cx === pw.x && cy >= pw.y && cy < pw.y + pLen) {
                    isIntersecting = true;
                    pChar = pw.normalized[cy - pw.y];
                }
            }

            if (isIntersecting) {
                if (pChar !== char) return false;
            }

            if (pw.dir === dir) {
                if (dir === 'H') {
                    if (Math.abs(pw.y - cy) <= 1) {
                        const start1 = x, end1 = x + len;
                        const start2 = pw.x, end2 = pw.x + pLen;
                        if (Math.max(start1, start2) < Math.min(end1, end2)) {
                            return false;
                        }
                    }
                } else {
                    if (Math.abs(pw.x - cx) <= 1) {
                        const start1 = y, end1 = y + len;
                        const start2 = pw.y, end2 = pw.y + pLen;
                        if (Math.max(start1, start2) < Math.min(end1, end2)) {
                            return false;
                        }
                    }
                }
            }
        }
    }

    for (const pw of placedWords) {
        if (pw.dir === dir) {
            if (dir === 'H' && pw.y === y) {
                if (x === pw.x + pw.normalized.length || x + len === pw.x) return false;
            }
            if (dir === 'V' && pw.x === x) {
                if (y === pw.y + pw.normalized.length || y + len === pw.y) return false;
            }
        }
    }

    return true;
}

function generateCrosswordLogic(dateSeedStr) {
    const rng = dateSeedStr ? dateToSeededRng(dateSeedStr) : () => Math.random();
    const singleWords = VOCABULARIO.filter(v => !v.palabra.includes(' ') && !v.palabra.includes('?'));
    const longWords = singleWords.filter(v => v.palabra.length >= 7 && v.palabra.length <= 10);
    if (longWords.length === 0) return null;

    const MAX_ATTEMPTS = 500;
    let attempt = 0;

    while (attempt < MAX_ATTEMPTS) {
        attempt++;
        const baseWordObj = getRandomElement(longWords, rng);
        const baseWord = normalize(baseWordObj.palabra);
        const baseFreq = getCharFrequency(baseWord);

        const validPool = singleWords.filter(v => {
            const normV = normalize(v.palabra);
            if (normV.length >= baseWord.length) return false;
            if (normV.length < 3) return false;
            return isStrictSubset(normV, baseFreq);
        });

        if (validPool.length < 5) continue;

        const placedWords = [];
        const usedWords = new Set();

        placedWords.push({ wordObj: baseWordObj, x: 0, y: 0, dir: 'H', normalized: baseWord });
        usedWords.add(baseWordObj.palabra);

        let intersectCount = 0;
        let retries = 0;

        while (intersectCount < 4 && retries < 100) {
            retries++;
            const candidateObj = getRandomElement(validPool, rng);
            if (usedWords.has(candidateObj.palabra)) continue;
            const candNorm = normalize(candidateObj.palabra);
            const validPlacements = [];

            for (let i = 0; i < candNorm.length; i++) {
                const charCand = candNorm[i];
                for (let j = 0; j < baseWord.length; j++) {
                    if (baseWord[j] === charCand) {
                        validPlacements.push({ x: j, y: -i });
                    }
                }
            }

            if (validPlacements.length > 0) {
                const pos = getRandomElement(validPlacements, rng);
                if (canPlaceWord(candNorm, pos.x, pos.y, 'V', placedWords)) {
                    placedWords.push({ wordObj: candidateObj, x: pos.x, y: pos.y, dir: 'V', normalized: candNorm });
                    usedWords.add(candidateObj.palabra);
                    intersectCount++;
                }
            }
        }

        if (intersectCount < 2) continue;

        const verticalWords = placedWords.filter(w => w.dir === 'V');
        let secondaryCount = 0;
        let secRetries = 0;

        while (secondaryCount < 3 && secRetries < 200) {
            secRetries++;
            if (verticalWords.length === 0) break;
            const anchorWord = getRandomElement(verticalWords, rng);
            const anchorLen = anchorWord.normalized.length;

            const candidateObj = getRandomElement(validPool, rng);
            if (usedWords.has(candidateObj.palabra)) continue;
            const candNorm = normalize(candidateObj.palabra);

            const validSecPlacements = [];
            for (let i = 0; i < candNorm.length; i++) {
                const charCand = candNorm[i];
                for (let j = 0; j < anchorLen; j++) {
                    const anchorAbsY = anchorWord.y + j;
                    if (anchorAbsY === 0) continue;
                    if (anchorWord.normalized[j] === charCand) {
                        validSecPlacements.push({ x: anchorWord.x - i, y: anchorAbsY });
                    }
                }
            }

            if (validSecPlacements.length > 0) {
                const pos = getRandomElement(validSecPlacements, rng);
                if (canPlaceWord(candNorm, pos.x, pos.y, 'H', placedWords)) {
                    placedWords.push({ wordObj: candidateObj, x: pos.x, y: pos.y, dir: 'H', normalized: candNorm });
                    usedWords.add(candidateObj.palabra);
                    secondaryCount++;
                }
            }
        }

        if (placedWords.length >= 3) {
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            placedWords.forEach(w => {
                const len = w.normalized.length;
                const xEnd = w.dir === 'H' ? w.x + len - 1 : w.x;
                const yEnd = w.dir === 'V' ? w.y + len - 1 : w.y;
                minX = Math.min(minX, w.x);
                maxX = Math.max(maxX, xEnd);
                minY = Math.min(minY, w.y);
                maxY = Math.max(maxY, yEnd);
            });

            minX -= 1; maxX += 1;
            minY -= 1; maxY += 1;

            return {
                words: placedWords,
                baseWordNormalized: baseWord,
                gridWidth: maxX - minX + 1,
                gridHeight: maxY - minY + 1,
                gridOffsetX: minX,
                gridOffsetY: minY,
            };
        }
    }
    return null;
}

// ---- UI Logic ----
const gridEl = document.getElementById('grid');
const wheelEl = document.getElementById('wheel');
const guessEl = document.getElementById('currentGuess');
const feedbackEl = document.getElementById('feedback');
const clueListEl = document.getElementById('clueList');
const clueWrapperEl = document.getElementById('cluesWrapper');
const victoryEl = document.getElementById('victory');
const progressEl = document.getElementById('progressBadge');
const puzzleTitleEl = document.getElementById('puzzleTitle');
const calendarButton = document.getElementById('calendar-button');
const revealBtn = document.getElementById('revealBase');
const toggleCluesBtn = document.getElementById('toggleClues');
const shuffleBtn = document.getElementById('shuffle');
const backspaceBtn = document.getElementById('backspace');
const submitBtn = document.getElementById('submit');

let gameState = null;
let solvedWords = new Set();
let guessStack = [];
let wheelOrder = [];
let cluesVisible = false;
let linePath = null;
let dragState = { active: false };
let currentDateStr = '';
let fallbackDateInput = null;
let shakeTimeout = null;
let successTimeout = null;

let audioCtx = null;
let confettiLoaded = false;

const WHEEL_CENTER = 120;
const WHEEL_RADIUS = 80;
const LETTER_SIZE = 48;

function getAudioContext() {
    if (audioCtx) return audioCtx;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (typeof Ctx === 'function') {
        audioCtx = new Ctx();
    }
    return audioCtx;
}

function playTone({ frequency, duration, type = 'sine', volume = 0.2 }) {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + duration);
}

function playErrorSound() {
    playTone({ frequency: 220, duration: 0.12, type: 'sawtooth', volume: 0.25 });
    setTimeout(() => playTone({ frequency: 180, duration: 0.12, type: 'square', volume: 0.2 }), 50);
}

function playSuccessSound() {
    playTone({ frequency: 520, duration: 0.15, type: 'triangle', volume: 0.22 });
    setTimeout(() => playTone({ frequency: 660, duration: 0.18, type: 'sine', volume: 0.18 }), 80);
}

function playPopSound() {
    playTone({ frequency: 420, duration: 0.08, type: 'sine', volume: 0.15 });
}

async function triggerConfetti() {
    const fireConfetti = () => {
        if (typeof confetti === 'function') {
            confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        }
    };

    if (typeof confetti === 'function') {
        fireConfetti();
        playSuccessSound();
        return;
    }

    if (!confettiLoaded) {
        try {
            const module = await import('https://cdn.skypack.dev/canvas-confetti');
            const confettiFn = module.default || module;
            if (typeof confettiFn === 'function') {
                window.confetti = confettiFn;
                confettiLoaded = true;
                fireConfetti();
                playSuccessSound();
                return;
            }
        } catch (err) {
            console.warn('No se pudo cargar canvas-confetti', err);
        }
    }

    playSuccessSound();
}

function animateElement(el, className, duration) {
    if (!el) return;
    el.classList.remove(className);
    // Force reflow so the animation can restart
    void el.offsetWidth;
    el.classList.add(className);
    if (duration) {
        setTimeout(() => el.classList.remove(className), duration);
    }
}

function wordId(w) {
    return `${w.dir}-${w.x}-${w.y}-${w.wordObj.palabra}`;
}

function buildGridMap(state) {
    const map = new Map();
    state.words.forEach((w, idx) => {
        const len = w.normalized.length;
        for (let i = 0; i < len; i++) {
            const x = w.dir === 'H' ? w.x + i : w.x;
            const y = w.dir === 'V' ? w.y + i : w.y;
            const key = `${x},${y}`;
            if (!map.has(key)) {
                map.set(key, { char: w.normalized[i].toUpperCase(), words: [], numbers: new Set() });
            }
            map.get(key).words.push(wordId(w));
            if (i === 0) map.get(key).numbers.add(idx + 1);
        }
    });
    return map;
}

function renderGrid() {
    if (!gameState) return;
    const map = buildGridMap(gameState);
    gridEl.innerHTML = '';
    gridEl.style.gridTemplateColumns = `repeat(${gameState.gridWidth}, 42px)`;

    for (let y = 0; y < gameState.gridHeight; y++) {
        for (let x = 0; x < gameState.gridWidth; x++) {
            const absX = x + gameState.gridOffsetX;
            const absY = y + gameState.gridOffsetY;
            const key = `${absX},${absY}`;
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.x = absX;
            cell.dataset.y = absY;
            if (map.has(key)) {
                const info = map.get(key);
                const solved = info.words.some(id => solvedWords.has(id));
                cell.classList.add('used');
                if (solved) cell.classList.add('solved');
                const letter = document.createElement('span');
                letter.className = 'cell-letter';
                letter.textContent = solved ? info.char : '';
                cell.appendChild(letter);
                const numbers = Array.from(info.numbers).sort((a, b) => a - b);
                if (numbers.length) {
                    const badge = document.createElement('span');
                    badge.className = 'number';
                    badge.textContent = numbers[0];
                    cell.appendChild(badge);
                }
            } else {
                cell.classList.add('inactive');
            }
            gridEl.appendChild(cell);
        }
    }
}

function renderWheel() {
    if (!gameState) return;
    wheelEl.innerHTML = '';
    const letters = gameState.baseWordNormalized.split('');
    if (wheelOrder.length !== letters.length) {
        const indices = letters.map((_, i) => i);
        wheelOrder = shuffleArray(indices);
    }

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 240 240');
    svg.classList.add('wheel-lines');
    linePath = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    linePath.setAttribute('fill', 'none');
    linePath.setAttribute('stroke', 'var(--primary)');
    linePath.setAttribute('stroke-width', '6');
    linePath.setAttribute('stroke-linecap', 'round');
    linePath.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(linePath);
    wheelEl.appendChild(svg);

    wheelOrder.forEach((originalIndex, idx) => {
        const angle = (idx / letters.length) * Math.PI * 2;
        const x = WHEEL_CENTER + WHEEL_RADIUS * Math.cos(angle) - LETTER_SIZE / 2;
        const y = WHEEL_CENTER + WHEEL_RADIUS * Math.sin(angle) - LETTER_SIZE / 2;
        const btn = document.createElement('div');
        btn.className = 'letter';
        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
        btn.dataset.index = originalIndex;
        btn.textContent = letters[originalIndex].toUpperCase();
        const isSelected = guessStack.some(item => item.index === originalIndex);
        if (countUsage(originalIndex) >= 1 && !isSelected) btn.style.opacity = 0.45;
        if (isSelected) {
            btn.classList.add('selected');
        }
        btn.addEventListener('pointerdown', (event) => startDrag(event, originalIndex));
        btn.addEventListener('pointerenter', () => continueDrag(originalIndex));
        btn.addEventListener('click', () => handleLetterClick(originalIndex));
        wheelEl.appendChild(btn);
    });

    drawConnectionLine();
}

function countUsage(index) {
    return guessStack.filter(item => item.index === index).length;
}

function getCellElement(x, y) {
    return gridEl.querySelector(`.cell[data-x="${x}"][data-y="${y}"] .cell-letter`);
}

function animateWordReveal(words) {
    if (!words || !words.length) return;
    const baseDelay = 140;
    const wordDelay = 200;

    words.forEach((word, wordIdx) => {
        const letters = word.normalized.toUpperCase().split('');
        letters.forEach((char, i) => {
            const x = word.dir === 'H' ? word.x + i : word.x;
            const y = word.dir === 'V' ? word.y + i : word.y;
            const letterEl = getCellElement(x, y);
            if (!letterEl) return;
            letterEl.textContent = char;
            letterEl.style.opacity = '0';
            letterEl.style.transform = 'translateY(6px) scale(0.95)';
            letterEl.classList.remove('revealing');
            void letterEl.offsetWidth;
            const delay = wordIdx * wordDelay + i * baseDelay;
            setTimeout(() => {
                letterEl.classList.add('revealing');
                setTimeout(() => {
                    letterEl.classList.remove('revealing');
                    letterEl.style.opacity = '';
                    letterEl.style.transform = '';
                }, 400);
            }, delay);
        });
    });
}

function animateLetterSelection(index) {
    const letterEl = wheelEl.querySelector(`.letter[data-index="${index}"]`);
    animateElement(letterEl, 'pop', 200);
    playPopSound();
}

function addLetterToGuess(index) {
    if (!gameState) return false;
    const letter = gameState.baseWordNormalized[index];
    const maxAllowed = gameState.baseWordNormalized.split('').filter(l => l === letter).length;
    if (countUsage(index) >= 1) return false; // each instance once
    if (guessStack.filter(item => item.char === letter).length >= maxAllowed) return false;
    guessStack.push({ index, char: letter });
    animateLetterSelection(index);
    updateGuess();
    return true;
}

function handleLetterClick(index) {
    if (dragState.active) return;
    addLetterToGuess(index);
}

function startDrag(event, index) {
    if (!gameState) return;
    dragState = { active: true };
    guessStack = [];
    addLetterToGuess(index);
    event.preventDefault();
}

function continueDrag(index) {
    if (!dragState.active) return;
    addLetterToGuess(index);
}

function updateGuess() {
    guessEl.textContent = guessStack.map(l => l.char.toUpperCase()).join('') || '\u00a0';
    if (dragState.active) {
        updateLetterHighlights();
        drawConnectionLine();
    } else {
        renderWheel();
    }
}

function handleErrorFeedback() {
    if (shakeTimeout) clearTimeout(shakeTimeout);
    guessEl.classList.add('is-error');
    animateElement(guessEl, 'shake', 400);
    playErrorSound();

    shakeTimeout = setTimeout(() => {
        guessEl.classList.remove('is-error');
        resetGuess();
        renderWheel();
    }, 400);
}

function handleSuccessFeedback(newSolved, newlyFoundWords = []) {
    if (successTimeout) clearTimeout(successTimeout);
    animateElement(guessEl, 'success-pulse', 600);
    triggerConfetti();

    successTimeout = setTimeout(() => {
        guessEl.classList.remove('success-pulse');
        const previouslySolved = new Set(solvedWords);
        solvedWords = newSolved;
        resetGuess();
        renderAll();
        const wordsToAnimate = newlyFoundWords.filter(w => !previouslySolved.has(wordId(w)));
        animateWordReveal(wordsToAnimate);
    }, 600);
}

function getLetterCenter(index) {
    const el = wheelEl.querySelector(`.letter[data-index="${index}"]`);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const wheelRect = wheelEl.getBoundingClientRect();
    return {
        x: rect.left - wheelRect.left + rect.width / 2,
        y: rect.top - wheelRect.top + rect.height / 2,
    };
}

function drawConnectionLine() {
    if (!linePath) return;
    const points = guessStack.map(item => getLetterCenter(item.index)).filter(Boolean);
    if (!points.length) {
        linePath.setAttribute('points', '');
        return;
    }
    const str = points.map(p => `${p.x},${p.y}`).join(' ');
    linePath.setAttribute('points', str);
}

function updateLetterHighlights() {
    const selected = new Set(guessStack.map(item => item.index));
    wheelEl.querySelectorAll('.letter').forEach(letterEl => {
        const idx = Number(letterEl.dataset.index);
        letterEl.classList.toggle('selected', selected.has(idx));
        const dimmed = countUsage(idx) >= 1;
        letterEl.style.opacity = dimmed && !selected.has(idx) ? 0.45 : 1;
    });
}

function resetGuess() {
    guessStack = [];
    updateGuess();
}

function finishDrag() {
    if (!dragState.active) return;
    dragState.active = false;
    submitGuess();
}

function findAvailableIndex(letter) {
    const letters = gameState.baseWordNormalized;
    for (let i = 0; i < letters.length; i++) {
        if (letters[i] === letter && !guessStack.some(g => g.index === i)) {
            return i;
        }
    }
    return -1;
}

function submitGuess() {
    if (!gameState) return;
    const attempt = normalize(guessStack.map(l => l.char).join(''));
    if (!attempt) return;
    let found = false;
    const newSolved = new Set(solvedWords);
    const newlyFoundWords = [];

    gameState.words.forEach(w => {
        if (w.normalized === attempt) {
            const id = wordId(w);
            if (!newSolved.has(id)) {
                newlyFoundWords.push(w);
            }
            newSolved.add(id);
            found = true;
        }
    });

    if (found) {
        feedbackEl.textContent = '¡Bien hecho! Palabra encontrada.';
        feedbackEl.style.color = 'var(--success)';
        handleSuccessFeedback(newSolved, newlyFoundWords);
    } else {
        feedbackEl.textContent = 'Esa palabra no está en el crucigrama.';
        feedbackEl.style.color = 'var(--primary)';
        handleErrorFeedback();
    }
}

function renderClues() {
    if (!gameState) return;
    clueListEl.innerHTML = '';
    const fragment = document.createDocumentFragment();
    gameState.words.forEach((w, idx) => {
        const item = document.createElement('div');
        item.className = 'clue';
        if (solvedWords.has(wordId(w))) item.classList.add('solved');
        const left = document.createElement('div');
        left.innerHTML = `<span class="index">${idx + 1}</span> ${w.wordObj.traduccion_ingles}`;
        const right = document.createElement('div');
        right.textContent = `${w.normalized.length} letras`;
        item.appendChild(left);
        item.appendChild(right);
        fragment.appendChild(item);
    });
    clueListEl.appendChild(fragment);
    clueWrapperEl.classList.toggle('expanded', cluesVisible);
    toggleCluesBtn.textContent = cluesVisible ? 'Ocultar pistas 🙈' : 'Mostrar pistas 👀';
}

function updateProgress() {
    if (!gameState) return;
    progressEl.textContent = `${solvedWords.size} / ${gameState.words.length}`;
    const allSolved = solvedWords.size === gameState.words.length;
    victoryEl.classList.toggle('hidden', !allSolved);
}

function renderAll() {
    renderGrid();
    renderWheel();
    renderClues();
    updateProgress();
}

function setupCalendar() {
    if (!calendarButton) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sixtyDaysAgo = subtractDays(today, 60);

    const handleDateSelection = (selectedDate, revertSelection) => {
        if (!selectedDate) return;
        const normalized = normalizeDate(selectedDate);
        if (!normalized) return;
        if (normalized === currentDateStr) {
            if (revertSelection) revertSelection();
            return;
        }

        loadPuzzle(normalized);
    };

    if (typeof flatpickr === 'function') {
        flatpickr(calendarButton, {
            maxDate: today,
            minDate: sixtyDaysAgo,
            defaultDate: parseDateFromStr(currentDateStr) || today,
            disableMobile: "true",
            dateFormat: "Y-m-d",
            onChange(selectedDates, _dateStr, instance) {
                const selectedDate = selectedDates[0];
                handleDateSelection(selectedDate, () => instance.setDate(currentDateStr));
            },
        });
        return;
    }

    console.warn('flatpickr is not available. Using the native date picker.');
    fallbackDateInput = document.createElement('input');
    fallbackDateInput.type = 'date';
    fallbackDateInput.min = normalizeDate(sixtyDaysAgo);
    fallbackDateInput.max = normalizeDate(today);
    fallbackDateInput.value = currentDateStr;
    fallbackDateInput.setAttribute('aria-label', calendarButton.getAttribute('title') || 'Elige otro día');

    fallbackDateInput.style.position = 'absolute';
    fallbackDateInput.style.opacity = '0';
    fallbackDateInput.style.pointerEvents = 'none';
    fallbackDateInput.style.width = '0';
    fallbackDateInput.style.height = '0';

    calendarButton.parentNode.insertBefore(fallbackDateInput, calendarButton.nextSibling);

    calendarButton.addEventListener('click', () => {
        if (typeof fallbackDateInput.showPicker === 'function') {
            fallbackDateInput.showPicker();
        } else {
            fallbackDateInput.focus();
        }
    });

    fallbackDateInput.addEventListener('change', (event) => {
        const dateStr = event.target.value;
        if (!dateStr) return;
        const parsed = parseDateFromStr(dateStr);
        handleDateSelection(parsed, () => {
            event.target.value = currentDateStr;
        });
    });
}

function loadPuzzle(dateStr) {
    currentDateStr = dateStr;
    if (fallbackDateInput) {
        fallbackDateInput.value = dateStr;
    }
    const state = generateCrosswordLogic(dateStr);
    gameState = state;
    solvedWords = new Set();
    guessStack = [];
    wheelOrder = [];
    if (!state) {
        gridEl.innerHTML = '<p>No se pudo generar el crucigrama.</p>';
        return;
    }
    puzzleTitleEl.textContent = `Juego del ${new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}`;
    renderAll();
}

function revealBaseWord() {
    if (!gameState) return;
    const base = gameState.words[0];
    solvedWords.add(wordId(base));
    renderAll();
}

function shuffleWheel() {
    if (!gameState) return;
    const indices = gameState.baseWordNormalized.split('').map((_, i) => i);
    wheelOrder = shuffleArray(indices);
    renderWheel();
}

revealBtn.addEventListener('click', revealBaseWord);

toggleCluesBtn.addEventListener('click', () => {
    cluesVisible = !cluesVisible;
    clueWrapperEl.classList.toggle('expanded', cluesVisible);
    toggleCluesBtn.textContent = cluesVisible ? 'Ocultar pistas 🙈' : 'Mostrar pistas 👀';
});

shuffleBtn.addEventListener('click', shuffleWheel);

backspaceBtn.addEventListener('click', () => {
    guessStack.pop();
    updateGuess();
});

submitBtn.addEventListener('click', submitGuess);

document.addEventListener('pointerup', finishDrag);
document.addEventListener('pointercancel', finishDrag);

document.addEventListener('keydown', (e) => {
    if (!gameState) return;
    if (e.key === 'Backspace') {
        e.preventDefault();
        guessStack.pop();
        updateGuess();
    } else if (e.key === 'Enter') {
        submitGuess();
    } else if (/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]$/.test(e.key)) {
        const letter = normalize(e.key);
        const idx = findAvailableIndex(letter);
        if (idx !== -1) handleLetterClick(idx);
    }
});

currentDateStr = normalizeDate(new Date());
setupCalendar();
loadPuzzle(currentDateStr);
