const VOCABULARIO = [
    { "palabra": "yo", "traduccion_ingles": "I" },
    { "palabra": "tú", "traduccion_ingles": "you (singular informal)" },
    { "palabra": "él", "traduccion_ingles": "he" },
    { "palabra": "ella", "traduccion_ingles": "she" },
    { "palabra": "usted", "traduccion_ingles": "you (singular formal)" },
    { "palabra": "nosotros", "traduccion_ingles": "👥" },
    { "palabra": "nosotras", "traduccion_ingles": "👯‍♀️" },
    { "palabra": "vosotros", "traduccion_ingles": "you (plural informal masculine/mixed)" },
    { "palabra": "vosotras", "traduccion_ingles": "you (plural informal feminine)" },
    { "palabra": "ellos", "traduccion_ingles": "👥" },
    { "palabra": "ellas", "traduccion_ingles": "👯‍♀️" },
    { "palabra": "ustedes", "traduccion_ingles": "you (plural formal/informal Latin America)" },
    { "palabra": "español", "traduccion_ingles": "🇪🇸" },
    { "palabra": "española", "traduccion_ingles": "🇪🇸" },
    { "palabra": "mexicano", "traduccion_ingles": "🇲🇽" },
    { "palabra": "mexicana", "traduccion_ingles": "🇲🇽" },
    { "palabra": "francés", "traduccion_ingles": "🇫🇷" },
    { "palabra": "francesa", "traduccion_ingles": "🇫🇷" },
    { "palabra": "estadounidense", "traduccion_ingles": "🇺🇸" },
    { "palabra": "canadiense", "traduccion_ingles": "🇨🇦" },
    { "palabra": "inglés", "traduccion_ingles": "🇬🇧" },
    { "palabra": "inglesa", "traduccion_ingles": "🇬🇧" },
    { "palabra": "alemán", "traduccion_ingles": "🇩🇪" },
    { "palabra": "alemana", "traduccion_ingles": "🇩🇪" },
    { "palabra": "italiano", "traduccion_ingles": "🇮🇹" },
    { "palabra": "italiana", "traduccion_ingles": "🇮🇹" },
    { "palabra": "chino", "traduccion_ingles": "🇨🇳" },
    { "palabra": "china", "traduccion_ingles": "🇨🇳" },
    { "palabra": "japonés", "traduccion_ingles": "🇯🇵" },
    { "palabra": "japonesa", "traduccion_ingles": "🇯🇵" },
    { "palabra": "coreano", "traduccion_ingles": "🇰🇷" },
    { "palabra": "coreana", "traduccion_ingles": "🇰🇷" },
    { "palabra": "hola", "traduccion_ingles": "👋" },
    { "palabra": "adiós", "traduccion_ingles": "👋" },
    { "palabra": "gracias", "traduccion_ingles": "🙏" },
    { "palabra": "perdón", "traduccion_ingles": "sorry / excuse me" },
    { "palabra": "encantado", "traduccion_ingles": "🤝" },
    { "palabra": "encantada", "traduccion_ingles": "🤝" },
    { "palabra": "qué", "traduccion_ingles": "❓" },
    { "palabra": "quién", "traduccion_ingles": "❓" },
    { "palabra": "dónde", "traduccion_ingles": "📍" },
    { "palabra": "cuándo", "traduccion_ingles": "📅" },
    { "palabra": "cómo", "traduccion_ingles": "❓" },
    { "palabra": "familia", "traduccion_ingles": "👪" },
    { "palabra": "padre", "traduccion_ingles": "👨" },
    { "palabra": "madre", "traduccion_ingles": "👩" },
    { "palabra": "padres", "traduccion_ingles": "👫" },
    { "palabra": "hijo", "traduccion_ingles": "👦" },
    { "palabra": "hija", "traduccion_ingles": "👧" },
    { "palabra": "hermano", "traduccion_ingles": "👦" },
    { "palabra": "hermana", "traduccion_ingles": "👧" },
    { "palabra": "abuelo", "traduccion_ingles": "👴" },
    { "palabra": "abuela", "traduccion_ingles": "👵" },
    { "palabra": "tío", "traduccion_ingles": "👨" },
    { "palabra": "tía", "traduccion_ingles": "👩" },
    { "palabra": "primo", "traduccion_ingles": "👦" },
    { "palabra": "prima", "traduccion_ingles": "👧" },
    { "palabra": "profesor", "traduccion_ingles": "👨‍🏫" },
    { "palabra": "profesora", "traduccion_ingles": "👩‍🏫" },
    { "palabra": "estudiante", "traduccion_ingles": "👨‍🎓" },
    { "palabra": "médico", "traduccion_ingles": "👨‍⚕️" },
    { "palabra": "médica", "traduccion_ingles": "👩‍⚕️" },
    { "palabra": "enfermero", "traduccion_ingles": "👨‍⚕️" },
    { "palabra": "enfermera", "traduccion_ingles": "👩‍⚕️" },
    { "palabra": "cocinero", "traduccion_ingles": "👨‍🍳" },
    { "palabra": "cocinera", "traduccion_ingles": "👩‍🍳" },
    { "palabra": "policía", "traduccion_ingles": "👮" },
    { "palabra": "camarero", "traduccion_ingles": "💁‍♂️" },
    { "palabra": "camarera", "traduccion_ingles": "💁‍♀️" },
    { "palabra": "secretario", "traduccion_ingles": "👨‍💼" },
    { "palabra": "secretaria", "traduccion_ingles": "👩‍💼" },
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
    { "palabra": "once", "traduccion_ingles": "eleven" },
    { "palabra": "doce", "traduccion_ingles": "twelve" },
    { "palabra": "trece", "traduccion_ingles": "thirteen" },
    { "palabra": "catorce", "traduccion_ingles": "fourteen" },
    { "palabra": "quince", "traduccion_ingles": "fifteen" },
    { "palabra": "veinte", "traduccion_ingles": "twenty" },
    { "palabra": "treinta", "traduccion_ingles": "thirty" },
    { "palabra": "cuarenta", "traduccion_ingles": "forty" },
    { "palabra": "cincuenta", "traduccion_ingles": "fifty" },
    { "palabra": "sesenta", "traduccion_ingles": "sixty" },
    { "palabra": "setenta", "traduccion_ingles": "seventy" },
    { "palabra": "ochenta", "traduccion_ingles": "eighty" },
    { "palabra": "noventa", "traduccion_ingles": "ninety" },
    { "palabra": "cien", "traduccion_ingles": "💯" },
    { "palabra": "lunes", "traduccion_ingles": "Monday" },
    { "palabra": "martes", "traduccion_ingles": "Tuesday" },
    { "palabra": "miércoles", "traduccion_ingles": "Wednesday" },
    { "palabra": "jueves", "traduccion_ingles": "Thursday" },
    { "palabra": "viernes", "traduccion_ingles": "Friday" },
    { "palabra": "sábado", "traduccion_ingles": "Saturday" },
    { "palabra": "domingo", "traduccion_ingles": "Sunday" },
    { "palabra": "enero", "traduccion_ingles": "❄️" },
    { "palabra": "febrero", "traduccion_ingles": "💘" },
    { "palabra": "marzo", "traduccion_ingles": "March" },
    { "palabra": "abril", "traduccion_ingles": "🌧️" },
    { "palabra": "mayo", "traduccion_ingles": "🌸" },
    { "palabra": "junio", "traduccion_ingles": "☀️" },
    { "palabra": "julio", "traduccion_ingles": "🍦" },
    { "palabra": "agosto", "traduccion_ingles": "🏖️" },
    { "palabra": "septiembre", "traduccion_ingles": "🍂" },
    { "palabra": "octubre", "traduccion_ingles": "🎃" },
    { "palabra": "noviembre", "traduccion_ingles": "🦃" },
    { "palabra": "diciembre", "traduccion_ingles": "🎄" },
    { "palabra": "primavera", "traduccion_ingles": "🌸" },
    { "palabra": "verano", "traduccion_ingles": "☀️" },
    { "palabra": "otoño", "traduccion_ingles": "🍂" },
    { "palabra": "invierno", "traduccion_ingles": "❄️" },
    { "palabra": "tiempo", "traduccion_ingles": "🌦️" },
    { "palabra": "sol", "traduccion_ingles": "☀️" },
    { "palabra": "calor", "traduccion_ingles": "🥵" },
    { "palabra": "frío", "traduccion_ingles": "🥶" },
    { "palabra": "viento", "traduccion_ingles": "💨" },
    { "palabra": "lluvia", "traduccion_ingles": "🌧️" },
    { "palabra": "nieve", "traduccion_ingles": "🌨️" },
    { "palabra": "nube", "traduccion_ingles": "☁️" },
    { "palabra": "nublado", "traduccion_ingles": "☁️" },
    { "palabra": "tormenta", "traduccion_ingles": "⛈️" },
    { "palabra": "casa", "traduccion_ingles": "🏠" },
    { "palabra": "piso", "traduccion_ingles": "🏢" },
    { "palabra": "habitación", "traduccion_ingles": "🚪" },
    { "palabra": "dormitorio", "traduccion_ingles": "🛏️" },
    { "palabra": "salón", "traduccion_ingles": "🛋️" },
    { "palabra": "comedor", "traduccion_ingles": "🍽️" },
    { "palabra": "cocina", "traduccion_ingles": "🍳" },
    { "palabra": "baño", "traduccion_ingles": "🚽" },
    { "palabra": "jardín", "traduccion_ingles": "🏡" },
    { "palabra": "pared", "traduccion_ingles": "🧱" },
    { "palabra": "suelo", "traduccion_ingles": "floor" },
    { "palabra": "mesa", "traduccion_ingles": "🪑" },
    { "palabra": "silla", "traduccion_ingles": "🪑" },
    { "palabra": "cama", "traduccion_ingles": "🛏️" },
    { "palabra": "sofá", "traduccion_ingles": "🛋️" },
    { "palabra": "armario", "traduccion_ingles": "🚪" },
    { "palabra": "estantería", "traduccion_ingles": "📚" },
    { "palabra": "lámpara", "traduccion_ingles": "💡" },
    { "palabra": "espejo", "traduccion_ingles": "🪞" },
    { "palabra": "televisión", "traduccion_ingles": "📺" },
    { "palabra": "nevera", "traduccion_ingles": "🧊" },
    { "palabra": "lavadora", "traduccion_ingles": "🧺" },
    { "palabra": "móvil", "traduccion_ingles": "📱" },
    { "palabra": "llave", "traduccion_ingles": "🔑" },
    { "palabra": "reloj", "traduccion_ingles": "⌚" },
    { "palabra": "bolso", "traduccion_ingles": "👜" },
    { "palabra": "cartera", "traduccion_ingles": "👛" },
    { "palabra": "paraguas", "traduccion_ingles": "☂️" },
    { "palabra": "dinero", "traduccion_ingles": "💰" },
    { "palabra": "tarjeta", "traduccion_ingles": "💳" },
    { "palabra": "libro", "traduccion_ingles": "📖" },
    { "palabra": "cuaderno", "traduccion_ingles": "📓" },
    { "palabra": "papel", "traduccion_ingles": "📄" },
    { "palabra": "bolígrafo", "traduccion_ingles": "🖊️" },
    { "palabra": "lápiz", "traduccion_ingles": "✏️" },
    { "palabra": "ordenador", "traduccion_ingles": "💻" },
    { "palabra": "mochila", "traduccion_ingles": "🎒" },
    { "palabra": "ciudad", "traduccion_ingles": "🏙️" },
    { "palabra": "pueblo", "traduccion_ingles": "🏘️" },
    { "palabra": "barrio", "traduccion_ingles": "🏡" },
    { "palabra": "calle", "traduccion_ingles": "🛣️" },
    { "palabra": "plaza", "traduccion_ingles": "⛲" },
    { "palabra": "parque", "traduccion_ingles": "🌳" },
    { "palabra": "tienda", "traduccion_ingles": "🏪" },
    { "palabra": "supermercado", "traduccion_ingles": "🛒" },
    { "palabra": "mercado", "traduccion_ingles": "🍎" },
    { "palabra": "escuela", "traduccion_ingles": "🏫" },
    { "palabra": "hospital", "traduccion_ingles": "🏥" },
    { "palabra": "farmacia", "traduccion_ingles": "💊" },
    { "palabra": "banco", "traduccion_ingles": "🏦" },
    { "palabra": "restaurante", "traduccion_ingles": "🍽️" },
    { "palabra": "bar", "traduccion_ingles": "☕" },
    { "palabra": "cine", "traduccion_ingles": "🎬" },
    { "palabra": "hotel", "traduccion_ingles": "🏨" },
    { "palabra": "museo", "traduccion_ingles": "🏛️" },
    { "palabra": "aeropuerto", "traduccion_ingles": "✈️" },
    { "palabra": "estación", "traduccion_ingles": "🚉" },
    { "palabra": "coche", "traduccion_ingles": "🚗" },
    { "palabra": "autobús", "traduccion_ingles": "🚌" },
    { "palabra": "metro", "traduccion_ingles": "🚇" },
    { "palabra": "tren", "traduccion_ingles": "🚆" },
    { "palabra": "bicicleta", "traduccion_ingles": "🚲" },
    { "palabra": "moto", "traduccion_ingles": "🏍️" },
    { "palabra": "avión", "traduccion_ingles": "✈️" },
    { "palabra": "taxi", "traduccion_ingles": "🚖" },
    { "palabra": "barco", "traduccion_ingles": "🚢" },
    { "palabra": "alto", "traduccion_ingles": "🦒" },
    { "palabra": "alta", "traduccion_ingles": "🦒" },
    { "palabra": "bajo", "traduccion_ingles": "short (height - male)" },
    { "palabra": "baja", "traduccion_ingles": "short (height - female)" },
    { "palabra": "gordo", "traduccion_ingles": "fat (male)" },
    { "palabra": "gorda", "traduccion_ingles": "fat (female)" },
    { "palabra": "delgado", "traduccion_ingles": "thin (male)" },
    { "palabra": "delgada", "traduccion_ingles": "thin (female)" },
    { "palabra": "guapo", "traduccion_ingles": "😎" },
    { "palabra": "guapa", "traduccion_ingles": "💅" },
    { "palabra": "feo", "traduccion_ingles": "ugly (male)" },
    { "palabra": "joven", "traduccion_ingles": "👶" },
    { "palabra": "mayor", "traduccion_ingles": "👴" },
    { "palabra": "pelo", "traduccion_ingles": "💇" },
    { "palabra": "ojos", "traduccion_ingles": "👀" },
    { "palabra": "rubio", "traduccion_ingles": "👱" },
    { "palabra": "morena", "traduccion_ingles": "👩" },
    { "palabra": "largo", "traduccion_ingles": "📏" },
    { "palabra": "corto", "traduccion_ingles": "📐" },
    { "palabra": "barba", "traduccion_ingles": "🧔" },
    { "palabra": "simpático", "traduccion_ingles": "😊" },
    { "palabra": "antipático", "traduccion_ingles": "😠" },
    { "palabra": "bueno", "traduccion_ingles": "👍" },
    { "palabra": "malo", "traduccion_ingles": "👎" },
    { "palabra": "amable", "traduccion_ingles": "😊" },
    { "palabra": "divertido", "traduccion_ingles": "😂" },
    { "palabra": "aburrido", "traduccion_ingles": "🥱" },
    { "palabra": "inteligente", "traduccion_ingles": "🧠" },
    { "palabra": "trabajador", "traduccion_ingles": "👷" },
    { "palabra": "vago", "traduccion_ingles": "🛋️" },
    { "palabra": "alegre", "traduccion_ingles": "😃" },
    { "palabra": "serio", "traduccion_ingles": "😐" },
    { "palabra": "tímido", "traduccion_ingles": "😳" },
    { "palabra": "feliz", "traduccion_ingles": "😊" },
    { "palabra": "triste", "traduccion_ingles": "😢" },
    { "palabra": "rojo", "traduccion_ingles": "🔴" },
    { "palabra": "azul", "traduccion_ingles": "🔵" },
    { "palabra": "verde", "traduccion_ingles": "🟢" },
    { "palabra": "amarillo", "traduccion_ingles": "🟡" },
    { "palabra": "blanco", "traduccion_ingles": "⚪" },
    { "palabra": "negro", "traduccion_ingles": "⚫" },
    { "palabra": "marrón", "traduccion_ingles": "🟤" },
    { "palabra": "gris", "traduccion_ingles": "🔘" },
    { "palabra": "naranja", "traduccion_ingles": "🟠" },
    { "palabra": "rosa", "traduccion_ingles": "🌸" },
    { "palabra": "violeta", "traduccion_ingles": "🟣" },
    { "palabra": "camiseta", "traduccion_ingles": "👕" },
    { "palabra": "camisa", "traduccion_ingles": "👔" },
    { "palabra": "pantalón", "traduccion_ingles": "👖" },
    { "palabra": "vaqueros", "traduccion_ingles": "👖" },
    { "palabra": "falda", "traduccion_ingles": "👗" },
    { "palabra": "vestido", "traduccion_ingles": "👗" },
    { "palabra": "zapatos", "traduccion_ingles": "👞" },
    { "palabra": "zapatillas", "traduccion_ingles": "👟" },
    { "palabra": "abrigo", "traduccion_ingles": "🧥" },
    { "palabra": "chaqueta", "traduccion_ingles": "🧥" },
    { "palabra": "jersey", "traduccion_ingles": "🧶" },
    { "palabra": "calcetines", "traduccion_ingles": "🧦" },
    { "palabra": "bufanda", "traduccion_ingles": "🧣" },
    { "palabra": "gorro", "traduccion_ingles": "🧢" },
    { "palabra": "guantes", "traduccion_ingles": "🧤" },
    { "palabra": "agua", "traduccion_ingles": "💧" },
    { "palabra": "café", "traduccion_ingles": "☕" },
    { "palabra": "leche", "traduccion_ingles": "🥛" },
    { "palabra": "té", "traduccion_ingles": "🍵" },
    { "palabra": "zumo", "traduccion_ingles": "🧃" },
    { "palabra": "vino", "traduccion_ingles": "🍷" },
    { "palabra": "cerveza", "traduccion_ingles": "🍺" },
    { "palabra": "pan", "traduccion_ingles": "🍞" },
    { "palabra": "huevo", "traduccion_ingles": "🥚" },
    { "palabra": "carne", "traduccion_ingles": "🥩" },
    { "palabra": "pollo", "traduccion_ingles": "🍗" },
    { "palabra": "pescado", "traduccion_ingles": "🐟" },
    { "palabra": "fruta", "traduccion_ingles": "🍎" },
    { "palabra": "manzana", "traduccion_ingles": "🍎" },
    { "palabra": "plátano", "traduccion_ingles": "🍌" },
    { "palabra": "limón", "traduccion_ingles": "🍋" },
    { "palabra": "verdura", "traduccion_ingles": "🥦" },
    { "palabra": "ensalada", "traduccion_ingles": "🥗" },
    { "palabra": "tomate", "traduccion_ingles": "🍅" },
    { "palabra": "patata", "traduccion_ingles": "🥔" },
    { "palabra": "arroz", "traduccion_ingles": "🍚" },
    { "palabra": "pasta", "traduccion_ingles": "🍝" },
    { "palabra": "queso", "traduccion_ingles": "🧀" },
    { "palabra": "azúcar", "traduccion_ingles": "🍬" },
    { "palabra": "sal", "traduccion_ingles": "🧂" },
    { "palabra": "aceite", "traduccion_ingles": "🫒" },
    { "palabra": "chocolate", "traduccion_ingles": "🍫" },
    { "palabra": "menú", "traduccion_ingles": "📜" },
    { "palabra": "carta", "traduccion_ingles": "📜" },
    { "palabra": "cuenta", "traduccion_ingles": "🧾" },
    { "palabra": "desayuno", "traduccion_ingles": "🥐" },
    { "palabra": "almuerzo", "traduccion_ingles": "🥪" },
    { "palabra": "cena", "traduccion_ingles": "🍲" },
    { "palabra": "postre", "traduccion_ingles": "🍰" },
    { "palabra": "plato", "traduccion_ingles": "🍽️" },
    { "palabra": "vaso", "traduccion_ingles": "🥃" },
    { "palabra": "taza", "traduccion_ingles": "☕" },
    { "palabra": "tenedor", "traduccion_ingles": "🍴" },
    { "palabra": "cuchillo", "traduccion_ingles": "🔪" },
    { "palabra": "cuchara", "traduccion_ingles": "🥄" },
    { "palabra": "servilleta", "traduccion_ingles": "napkin" },
    { "palabra": "rico", "traduccion_ingles": "😋" },
    { "palabra": "delicioso", "traduccion_ingles": "🤤" },
    { "palabra": "ser", "traduccion_ingles": "to be (permanent)" },
    { "palabra": "estar", "traduccion_ingles": "📍" },
    { "palabra": "tener", "traduccion_ingles": "to have" },
    { "palabra": "haber", "traduccion_ingles": "there is / there are" },
    { "palabra": "querer", "traduccion_ingles": "❤️" },
    { "palabra": "poder", "traduccion_ingles": "💪" },
    { "palabra": "saber", "traduccion_ingles": "🧠" },
    { "palabra": "llamarse", "traduccion_ingles": "🏷️" },
    { "palabra": "hablar", "traduccion_ingles": "🗣️" },
    { "palabra": "comer", "traduccion_ingles": "🍽️" },
    { "palabra": "beber", "traduccion_ingles": "🥤" },
    { "palabra": "vivir", "traduccion_ingles": "🏠" },
    { "palabra": "ir", "traduccion_ingles": "🚶" },
    { "palabra": "venir", "traduccion_ingles": "🏃" },
    { "palabra": "hacer", "traduccion_ingles": "🔨" },
    { "palabra": "dormir", "traduccion_ingles": "😴" },
    { "palabra": "levantarse", "traduccion_ingles": "🛌" },
    { "palabra": "ducharse", "traduccion_ingles": "🚿" },
    { "palabra": "trabajar", "traduccion_ingles": "💼" },
    { "palabra": "gustar", "traduccion_ingles": "👍" },
    { "palabra": "leer", "traduccion_ingles": "📖" },
    { "palabra": "escribir", "traduccion_ingles": "✍️" },
    { "palabra": "escuchar", "traduccion_ingles": "👂" },
    { "palabra": "mirar", "traduccion_ingles": "👀" },
    { "palabra": "ver", "traduccion_ingles": "👁️" },
    { "palabra": "estudiar", "traduccion_ingles": "📚" },
    { "palabra": "aprender", "traduccion_ingles": "🧠" },
    { "palabra": "jugar", "traduccion_ingles": "🎮" },
    { "palabra": "comprar", "traduccion_ingles": "🛍️" },
    { "palabra": "viajar", "traduccion_ingles": "✈️" },
    { "palabra": "salir", "traduccion_ingles": "🚪" },
    { "palabra": "llegar", "traduccion_ingles": "🏁" },
    { "palabra": "entrar", "traduccion_ingles": "🚪" },
    { "palabra": "bien", "traduccion_ingles": "👍" },
    { "palabra": "mal", "traduccion_ingles": "👎" },
    { "palabra": "regular", "traduccion_ingles": "😐" },
    { "palabra": "contento", "traduccion_ingles": "😌" },
    { "palabra": "cansado", "traduccion_ingles": "😫" },
    { "palabra": "enfadado", "traduccion_ingles": "😡" },
    { "palabra": "nervioso", "traduccion_ingles": "😬" },
    { "palabra": "tranquilo", "traduccion_ingles": "😌" },
    { "palabra": "ocupado", "traduccion_ingles": "🕒" },
    { "palabra": "enfermo", "traduccion_ingles": "🤒" },
    { "palabra": "hambre", "traduccion_ingles": "😋" },
    { "palabra": "sed", "traduccion_ingles": "🥤" },
    { "palabra": "sueño", "traduccion_ingles": "😴" },
    { "palabra": "miedo", "traduccion_ingles": "😱" },
    { "palabra": "prisa", "traduccion_ingles": "🏃" },
    { "palabra": "aquí", "traduccion_ingles": "👇" },
    { "palabra": "allí", "traduccion_ingles": "👉" },
    { "palabra": "cerca", "traduccion_ingles": "📏" },
    { "palabra": "lejos", "traduccion_ingles": "🔭" },
    { "palabra": "delante", "traduccion_ingles": "in front" },
    { "palabra": "detrás", "traduccion_ingles": "behind" },
    { "palabra": "enfrente", "traduccion_ingles": "opposite / facing" },
    { "palabra": "encima", "traduccion_ingles": "⬆️" },
    { "palabra": "debajo", "traduccion_ingles": "⬇️" },
    { "palabra": "dentro", "traduccion_ingles": "📦" },
    { "palabra": "fuera", "traduccion_ingles": "🏞️" },
    { "palabra": "entre", "traduccion_ingles": "↔️" },
    { "palabra": "en", "traduccion_ingles": "in / on / at" },
    { "palabra": "España", "traduccion_ingles": "🇪🇸" },
    { "palabra": "México", "traduccion_ingles": "🇲🇽" },
    { "palabra": "Francia", "traduccion_ingles": "🇫🇷" },
    { "palabra": "Alemania", "traduccion_ingles": "🇩🇪" },
    { "palabra": "Italia", "traduccion_ingles": "🇮🇹" },
    { "palabra": "Reino Unido", "traduccion_ingles": "🇬🇧" },
    { "palabra": "Estados Unidos", "traduccion_ingles": "🇺🇸" },
    { "palabra": "China", "traduccion_ingles": "🇨🇳" },
    { "palabra": "Japón", "traduccion_ingles": "🇯🇵" },
    { "palabra": "Brasil", "traduccion_ingles": "🇧🇷" },
    { "palabra": "Portugal", "traduccion_ingles": "🇵🇹" },
    { "palabra": "oficina", "traduccion_ingles": "🏢" },
    { "palabra": "fábrica", "traduccion_ingles": "🏭" },
    { "palabra": "universidad", "traduccion_ingles": "🎓" },
    { "palabra": "biblioteca", "traduccion_ingles": "📚" },
    { "palabra": "correos", "traduccion_ingles": "📮" },
    { "palabra": "comisaría", "traduccion_ingles": "🚓" },
    { "palabra": "gimnasio", "traduccion_ingles": "🏋️" },
    { "palabra": "teatro", "traduccion_ingles": "🎭" },
    { "palabra": "panadería", "traduccion_ingles": "🥖" },
    { "palabra": "cafetería", "traduccion_ingles": "☕" },
    { "palabra": "librería", "traduccion_ingles": "📖" }
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

const WHEEL_CENTER = 120;
const WHEEL_RADIUS = 80;
const LETTER_SIZE = 48;

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
            if (map.has(key)) {
                const info = map.get(key);
                const solved = info.words.some(id => solvedWords.has(id));
                cell.classList.add('used');
                if (solved) cell.classList.add('solved');
                cell.textContent = solved ? info.char : '';
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

function addLetterToGuess(index) {
    if (!gameState) return false;
    const letter = gameState.baseWordNormalized[index];
    const maxAllowed = gameState.baseWordNormalized.split('').filter(l => l === letter).length;
    if (countUsage(index) >= 1) return false; // each instance once
    if (guessStack.filter(item => item.char === letter).length >= maxAllowed) return false;
    guessStack.push({ index, char: letter });
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
    feedbackEl.textContent = '';
    if (dragState.active) {
        updateLetterHighlights();
        drawConnectionLine();
    } else {
        renderWheel();
    }
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

    gameState.words.forEach(w => {
        if (w.normalized === attempt) {
            newSolved.add(wordId(w));
            found = true;
        }
    });

    if (found) {
        solvedWords = newSolved;
        feedbackEl.textContent = '¡Bien hecho! Palabra encontrada.';
        feedbackEl.style.color = 'var(--success)';
    } else {
        feedbackEl.textContent = 'Esa palabra no está en el crucigrama.';
        feedbackEl.style.color = 'var(--primary)';
    }
    resetGuess();
    renderAll();
}

function renderClues() {
    if (!gameState) return;
    const list = clueListEl;
    if (!list) return;
    list.innerHTML = '';
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
    list.appendChild(fragment);
    clueWrapperEl.classList.toggle('visible', cluesVisible);
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
    clueWrapperEl.classList.toggle('visible', cluesVisible);
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
