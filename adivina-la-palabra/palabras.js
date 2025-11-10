const baseDePalabras = [
  {
    palabra: "ABOGADO",
    pista1: "Category: Profession (Noun)",
    pista2: "This person defends clients in court.",
    pista3: "This word means 'Lawyer' in English."
  },
  {
    palabra: "ABRIGO",
    pista1: "Category: Piece of clothing (Noun)",
    pista2: "You wear this on top of your clothes to stay warm in winter.",
    pista3: "This word means 'Coat' in English."
  },
  {
    palabra: "ABRIL",
    pista1: "Category: Month (Noun)",
    pista2: "The fourth month of the year, after March.",
    pista3: "This word means 'April' in English."
  },
  {
    palabra: "ABUELA",
    pista1: "Category: Family member (Noun)",
    pista2: "The mother of your mother or father.",
    pista3: "This word means 'Grandmother' in English."
  },
  {
    palabra: "ABUELO",
    pista1: "Category: Family member (Noun)",
    pista2: "The father of your mother or father.",
    pista3: "This word means 'Grandfather' in English."
  },
  {
    palabra: "ACOSTAR",
    pista1: "Category: Verb",
    pista2: "The action of putting someone (like a child) to bed.",
    pista3: "This word means 'To put to bed' in English."
  },
  {
    palabra: "ACOSTARSE",
    pista1: "Category: Verb (Reflexive)",
    pista2: "The action of going to bed yourself.",
    pista3: "This word means 'To go to bed' in English."
  },
  {
    palabra: "ADIOS",
    pista1: "Category: Interjection / Farewell",
    pista2: "The most common word to say when you are leaving.",
    pista3: "This word means 'Goodbye' in English."
  },
  {
    palabra: "AGOSTO",
    pista1: "Category: Month (Noun)",
    pista2: "The eighth month of the year, often very hot in summer.",
    pista3: "This word means 'August' in English."
  },
  {
    palabra: "AGUA",
    pista1: "Category: Drink / Nature (Noun)",
    pista2: "A clear liquid that you drink to live; it has no color.",
    pista3: "This word means 'Water' in English."
  },
  {
    palabra: "ALEMAN",
    pista1: "Category: Nationality / Language (Noun/Adjective)",
    pista2: "A person or language from Germany (masculine).",
    pista3: "This word means 'German' in English."
  },
  {
    palabra: "ALEMANA",
    pista1: "Category: Nationality (Noun/Adjective)",
    pista2: "A person from Germany (feminine).",
    pista3: "This word means 'German' (feminine) in English."
  },
  {
    palabra: "ALEMANIA",
    pista1: "Category: Country (Noun)",
    pista2: "The European country where Berlin is the capital.",
    pista3: "This word means 'Germany' in English."
  },
  {
    palabra: "ALGO",
    pista1: "Category: Pronoun",
    pista2: "An indefinite thing; the opposite of 'nada' (nothing).",
    pista3: "This word means 'Something' or 'Anything' in English."
  },
  {
    palabra: "ALMORZAR",
    pista1: "Category: Verb",
    pista2: "The action of eating the meal in the middle of the day.",
    pista3: "This word means 'To have lunch' in English."
  },
  {
    palabra: "ALMUERZO",
    pista1: "Category: Meal (Noun)",
    pista2: "The meal you eat in the middle of the day.",
    pista3: "This word means 'Lunch' in English."
  },
  {
    palabra: "ALTA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "Describes a person who has a lot of height (feminine); opposite of 'baja'.",
    pista3: "This word means 'Tall' in English."
  },
  {
    palabra: "ALTO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "Describes a person who has a lot of height (masculine); opposite of 'bajo'.",
    pista3: "This word means 'Tall' in English."
  },
  {
    palabra: "AMARILLO",
    pista1: "Category: Color (Adjective/Noun)",
    pista2: "The color of the sun or a banana.",
    pista3: "This word means 'Yellow' in English."
  },
  {
    palabra: "AMIGOS",
    pista1: "Category: People (Noun, plural)",
    pista2: "People you like and spend time with (plural or masculine).",
    pista3: "This word means 'Friends' in English."
  },
  {
    palabra: "AÑOS",
    pista1: "Category: Time (Noun, plural)",
    pista2: "A period of 365 days; you use this to say your age.",
    pista3: "This word means 'Years' in English."
  },
  {
    palabra: "ANTIPATICA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "Describes a person who is not friendly (feminine).",
    pista3: "This word means 'Unfriendly' or 'Unpleasant' in English."
  },
  {
    palabra: "ANTIPATICO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "Describes a person who is not friendly (masculine).",
    pista3: "This word means 'Unfriendly' or 'Unpleasant' in English."
  },
  {
    palabra: "APELLIDO",
    pista1: "Category: Noun",
    pista2: "Your family name or surname (e.g., García, Smith).",
    pista3: "This word means 'Last name' in English."
  },
  {
    palabra: "ARGENTINA",
    pista1: "Category: Country (Noun)",
    pista2: "A large country in South America where they dance tango.",
    pista3: "This word means 'Argentina' in English."
  },
  {
    palabra: "ARGENTINO",
    pista1: "Category: Nationality (Noun/Adjective)",
    pista2: "A person or thing from Argentina (masculine).",
    pista3: "This word means 'Argentinian' in English."
  },
  {
    palabra: "ARROZ",
    pista1: "Category: Food (Noun)",
    pista2: "A small white or brown grain, the main ingredient in paella.",
    pista3: "This word means 'Rice' in English."
  },
  {
    palabra: "AZUL",
    pista1: "Category: Color (Adjective/Noun)",
    pista2: "The color of the sky on a clear day or the ocean.",
    pista3: "This word means 'Blue' in English."
  },
  {
    palabra: "BAILAR",
    pista1: "Category: Verb",
    pista2: "To move your body to music (e.g., salsa, tango).",
    pista3: "This word means 'To dance' in English."
  },
  {
    palabra: "BAJA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "The opposite of 'alta' (tall); describes a person with little height (feminine).",
    pista3: "This word means 'Short' (in height) in English."
  },
  {
    palabra: "BAJO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "The opposite of 'alto' (tall); describes a person with little height (masculine).",
    pista3: "This word means 'Short' (in height) in English."
  },
  {
    palabra: "BAILAR", // This was the duplicate in your list
    pista1: "Category: Verb",
    pista2: "To move your body to music (e.g., salsa, tango).",
    pista3: "This word means 'To dance' in English."
  },
  {
    palabra: "BANCO",
    pista1: "Category: Place (Noun)",
    pista2: "A place where you keep your money; or a seat in a park.",
    pista3: "This word means 'Bank' or 'Bench' in English."
  },
  {
    palabra: "BAÑARSE",
    pista1: "Category: Verb (Reflexive)",
    pista2: "The action of washing your whole body, usually in a tub.",
    pista3: "This word means 'To take a bath' in English."
  },
  {
    palabra: "BAR",
    pista1: "Category: Place (Noun)",
    pista2: "A place where you go to drink (e.g., beer, coffee) and eat tapas.",
    pista3: "This word means 'Bar' or 'Cafe' in English."
  },
  {
    palabra: "BARATA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "Describes something that does not cost a lot of money (feminine).",
    pista3: "This word means 'Cheap' in English."
  },
  {
    palabra: "BARATO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "Describes something that does not cost a lot of money (masculine).",
    pista3: "This word means 'Cheap' in English."
  },
  {
    palabra: "BEBER",
    pista1: "Category: Verb",
    pista2: "The action of consuming a liquid, like water or juice.",
    pista3: "This word means 'To drink' in English."
  },
  {
    palabra: "BEBIDA",
    pista1: "Category: Noun",
    pista2: "Any liquid that you can drink (e.g., soda, water, juice).",
    pista3: "This word means 'Drink' or 'Beverage' in English."
  },
  {
    palabra: "BIEN",
    pista1: "Category: Adverb",
    pista2: "The opposite of 'mal' (badly); how you answer '¿Cómo estás?'.",
    pista3: "This word means 'Well' or 'Good' in English."
  },
  {
    palabra: "BLANCO",
    pista1: "Category: Color (Adjective/Noun)",
    pista2: "The color of milk, snow, or paper.",
    pista3: "This word means 'White' in English."
  },
  {
    palabra: "BONITA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "Describes a person or thing that is beautiful (feminine).",
    pista3: "This word means 'Pretty' in English."
  },
  {
    palabra: "BONITO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "Describes a person or thing that is beautiful (masculine).",
    pista3: "This word means 'Pretty' or 'Handsome' in English."
  },
  {
    palabra: "BRITANICA",
    pista1: "Category: Nationality (Adjective/Noun, Feminine)",
    pista2: "A person or thing from the United Kingdom (feminine).",
    pista3: "This word means 'British' in English."
  },
  {
    palabra: "BRITANICO",
    pista1: "Category: Nationality (Adjective/Noun, Masculine)",
    pista2: "A person or thing from the United Kingdom (masculine).",
    pista3: "This word means 'British' in English."
  },
  {
    palabra: "BUEN",
    pista1: "Category: Adjective",
    pista2: "A short version of 'bueno', used before a masculine noun (e.g., ___ día).",
    pista3: "This word means 'Good' in English."
  },
  {
    palabra: "BUENAS",
    pista1: "Category: Greeting / Adjective (Feminine, Plural)",
    pista2: "Used in greetings like '____ tardes' (Good afternoon) or '____ noches' (Good night).",
    pista3: "This word means 'Good' in English."
  },
  {
    palabra: "BUENO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "The opposite of 'malo' (bad); describes something of high quality.",
    pista3: "This word means 'Good' in English."
  },
  {
    palabra: "BUENOS",
    pista1: "Category: Greeting / Adjective (Masculine, Plural)",
    pista2: "Used in the greeting '____ días' (Good morning).",
    pista3: "This word means 'Good' in English."
  },
  {
    palabra: "CAFE",
    pista1: "Category: Drink / Color (Noun)",
    pista2: "A hot, dark drink that wakes you up; or the color brown.",
    pista3: "This word means 'Coffee' or 'Brown' in English."
  },
  {
    palabra: "CALCETINES",
    pista1: "Category: Piece of clothing (Noun, plural)",
    pista2: "You wear these on your feet, inside your shoes.",
    pista3: "This word means 'Socks' in English."
  },
  {
    palabra: "CALIENTE",
    pista1: "Category: Adjective",
    pista2: "Describes something with a high temperature; the opposite of 'frío' (cold).",
    pista3: "This word means 'Hot' (temperature) in English."
  },
  {
    palabra: "CALLE",
    pista1: "Category: Place (Noun)",
    pista2: "A public road in a city or town, with buildings on the side.",
    pista3: "This word means 'Street' in English."
  },
  {
    palabra: "CALOR",
    pista1: "Category: Noun",
    pista2: "The feeling of high temperature; 'Tengo ____' means 'I am hot'.",
    pista3: "This word means 'Heat' in English."
  },
  {
    palabra: "CAMA",
    pista1: "Category: Furniture (Noun)",
    pista2: "A piece of furniture you sleep on in your bedroom.",
    pista3: "This word means 'Bed' in English."
  },
  {
    palabra: "CAMARERA",
    pista1: "Category: Profession (Noun, Feminine)",
    pista2: "A woman who serves food and drinks in a restaurant (feminine).",
    pista3: "This word means 'Waitress' in English."
  },
  {
    palabra: "CAMARERO",
    pista1: "Category: Profession (Noun, Masculine)",
    pista2: "A man who serves food and drinks in a restaurant (masculine).",
    pista3: "This word means 'Waiter' in English."
  },
  {
    palabra: "CAMISA",
    pista1: "Category: Piece of clothing (Noun)",
    pista2: "A piece of clothing for the upper body, usually with buttons and a collar.",
    pista3: "This word means 'Shirt' (dress shirt) in English."
  },
  {
    palabra: "CAMISETA",
    pista1: "Category: Piece of clothing (Noun)",
    pista2: "A casual shirt, often made of cotton, with no buttons.",
    pista3: "This word means 'T-shirt' in English."
  },
  {
    palabra: "CARA",
    pista1: "Category: Adjective (Feminine) / Noun",
    pista2: "Adjective: opposite of 'barata' (cheap); Noun: the front part of your head.",
    pista3: "This word means 'Expensive' or 'Face' in English."
  },
  {
    palabra: "CARNE",
    pista1: "Category: Food (Noun)",
    pista2: "Food that comes from an animal, like beef, pork, or chicken.",
    pista3: "This word means 'Meat' in English."
  },
  {
    palabra: "CARO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "Describes something that costs a lot of money (masculine); opposite of 'barato'.",
    pista3: "This word means 'Expensive' in English."
  },
  {
    palabra: "CASA",
    pista1: "Category: Place (Noun)",
    pista2: "A building where people live; a home.",
    pista3: "This word means 'House' or 'Home' in English."
  },
  {
    palabra: "CENAR",
    pista1: "Category: Verb",
    pista2: "The action of eating the last meal of the day, in the evening.",
    pista3: "This word means 'To have dinner' in English."
  },
  {
    palabra: "CERCA",
    pista1: "Category: Adverb (Place)",
    pista2: "The opposite of 'lejos' (far); means a short distance.",
    pista3: "This word means 'Near' or 'Close' in English."
  },
  {
    palabra: "CERO",
    pista1: "Category: Number (Noun)",
    pista2: "The number 0; the number before one.",
    pista3: "This word means 'Zero' in English."
  },
  {
    palabra: "CERVEZA",
    pista1: "Category: Drink (Noun)",
    pista2: "An alcoholic drink made from barley and hops.",
    pista3: "This word means 'Beer' in English."
  },
  {
    palabra: "CHAQUETA",
    pista1: "Category: Piece of clothing (Noun)",
    pista2: "A short coat; you wear it over a shirt but it's lighter than an 'abrigo'.",
    pista3: "This word means 'Jacket' in English."
  },
  {
    palabra: "CHICA",
    pista1: "Category: Person (Noun, Feminine)",
    pista2: "A young female person; a synonym for 'muchacha'.",
    pista3: "This word means 'Girl' in English."
  },
  {
    palabra: "CHICO",
    pista1: "Category: Person (Noun, Masculine)",
    pista2: "A young male person; a synonym for 'muchacho'.",
    pista3: "This word means 'Boy' in English."
  },
  {
    palabra: "CHINA",
    pista1: "Category: Country / Nationality (Feminine)",
    pista2: "A large country in Asia; or a person from that country (feminine).",
    pista3: "This word means 'China' or 'Chinese' (feminine) in English."
  },
  {
    palabra: "CHINO",
    pista1: "Category: Language / Nationality (Masculine)",
    pista2: "The language spoken in Beijing; or a person from that country (masculine).",
    pista3: "This word means 'Chinese' (language or masculine) in English."
  },
  {
    palabra: "CIEN",
    pista1: "Category: Number (Noun)",
    pista2: "The number 100.",
    pista3: "This word means 'One hundred' in English."
  },
  {
    palabra: "CIERTO",
    pista1: "Category: Adjective",
    pista2: "A synonym for 'verdad' (true); the opposite of 'falso' (false).",
    pista3: "This word means 'True' or 'Certain' in English."
  },
  {
    palabra: "CINCO",
    pista1: "Category: Number (Noun)",
    pista2: "The number 5; the number of fingers on one hand.",
    pista3: "This word means 'Five' in English."
  },
  {
    palabra: "CINE",
    pista1: "Category: Place (Noun)",
    pista2: "A place where you go to watch movies on a big screen.",
    pista3: "This word means 'Cinema' or 'Movies' in English."
  },
  {
    palabra: "CIUDAD",
    pista1: "Category: Place (Noun)",
    pista2: "A large town, like Madrid, London, or New York.",
    pista3: "This word means 'City' in English."
  },
  {
    palabra: "CLASE",
    pista1: "Category: Place / Event (Noun)",
    pista2: "A room in a school (classroom); or the lesson itself (e.g., Spanish ____).",
    pista3: "This word means 'Class' or 'Classroom' in English."
  },
  {
    palabra: "COCINA",
    pista1: "Category: Place (Noun)",
    pista2: "The room in the house where you prepare food.",
    pista3: "This word means 'Kitchen' in English."
  },
  {
    palabra: "COCINAR",
    pista1: "Category: Verb",
    pista2: "The action of preparing food,
 often using heat.",
    pista3: "This word means 'To cook' in English."
  },
  {
    palabra: "COCINERA",
    pista1: "Category: Profession (Noun, Feminine)",
    pista2: "A woman who cooks professionally (feminine).",
    pista3: "This word means 'Cook' or 'Chef' (feminine) in English."
  },
  {
    palabra: "COCINERO",
    pista1: "Category: Profession (Noun, Masculine)",
    pista2: "A man who cooks professionally (masculine).",
    pista3: "This word means 'Cook' or 'Chef' (masculine) in English."
  },
  {
    palabra: "COCHE",
    pista1: "Category: Transport (Noun)",
    pista2: "A vehicle with four wheels used for driving.",
    pista3: "This word means 'Car' in English."
  },
  {
    palabra: "COLEGIO",
    pista1: "Category: Place (Noun)",
    pista2: "A place where children go to learn; a school.",
    pista3: "This word means 'School' (primary/secondary) in English."
  },
  {
    palabra: "COLOR",
    pista1: "Category: Noun",
    pista2: "Examples are red, blue, green, and yellow.",
    pista3: "This word means 'Color' in English."
  },
  {
    palabra: "COMER",
    pista1: "Category: Verb",
    pista2: "The action of putting food in your mouth.",
    pista3: "This word means 'To eat' in English."
  },
  {
    palabra: "COMIDA",
    pista1: "Category: Noun",
    pista2: "What you eat (e.g., pizza, salad, fruit).",
    pista3: "This word means 'Food' or 'Meal' in English."
  },
  {
    palabra: "COMODA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "Describes something that feels good and relaxing (e.g., a sofa) (feminine).",
    pista3: "This word means 'Comfortable' in English."
  },
  {
    palabra: "COMODO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "Describes something that feels good and relaxing (e.g., a chair) (masculine).",
    pista3: "This word means 'Comfortable' in English."
  },
  {
    palabra: "COMO",
    pista1: "Category: Question word / Adverb",
    pista2: "Used to ask 'how' (¿____ estás?); or means 'like' or 'as'.",
    pista3: "This word means 'How' or 'Like/As' in English."
  },
  {
    palabra: "COMPRAR",
    pista1: "Category: Verb",
    pista2: "The action of giving money to get something in a store.",
    pista3: "This word means 'To buy' in English."
  },
  {
    palabra: "COMPRENDER",
    pista1: "Category: Verb",
    pista2: "A synonym for 'entender'; to know the meaning of something.",
    pista3: "This word means 'To comprehend' or 'To understand' in English."
  },
  {
    palabra: "CON",
    pista1: "Category: Preposition",
    pista2: "'Café ____ leche' (Coffee ____ milk). The opposite of 'sin' (without).",
    pista3: "This word means 'With' in English."
  },
  {
    palabra: "CORREO",
    pista1: "Category: Noun",
    pista2: "'_____ electrónico' (email); or the system for sending letters (post office).",
    pista3: "This word means 'Mail' or 'Post office' in English."
  },
  {
    palabra: "CORTA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "Opposite of 'larga' (long); describes something of little length (feminine).",
    pista3: "This word means 'Short' (in length) in English."
  },
  {
    palabra: "CORTO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "Opposite of 'largo' (long); describes something of little length (masculine).",
    pista3: "This word means 'Short' (in length) in English."
  },
  {
    palabra: "COSA",
    pista1: "Category: Noun",
    pista2: "A general word for an object, idea, or action; a 'thing'.",
    pista3: "This word means 'Thing' in English."
  },
  {
    palabra: "CUADERNO",
    pista1: "Category: Object (Noun)",
    pista2: "A book with empty pages for writing notes in class.",
    pista3: "This word means 'Notebook' in English."
  },
  {
    palabra: "CUAL",
    pista1: "Category: Question word",
    pista2: "Used to ask 'which' or 'what' when choosing from options (¿____ es tu favorito?).",
    pista3: "This word means 'Which' or 'What' in English."
  },
  {
    palabra: "CUANDO",
    pista1: "Category: Question word / Conjunction",
    pista2: "Used to ask about time (¿____ es la fiesta?); or means 'at the time that'.",
    pista3: "This word means 'When' in English."
  },
{
    palabra: "CUANTA",
    pista1: "Category: Question word (Feminine, Singular)",
    pista2: "Used to ask 'How much?' for a feminine noun (e.g., ____ agua).",
    pista3: "This word means 'How much' in English."
  },
  {
    palabra: "CUANTAS",
    pista1: "Category: Question word (Feminine, Plural)",
    pista2: "Used to ask 'How many?' for a feminine noun (e.g., ____ chicas).",
    pista3: "This word means 'How many' in English."
  },
  {
    palabra: "CUANTO",
    pista1: "Category: Question word (Masculine, Singular)",
    pista2: "Used to ask 'How much?' for a masculine noun (e.g., ____ tiempo).",
    pista3: "This word means 'How much' in English."
  },
  {
    palabra: "CUANTOS",
    pista1: "Category: Question word (Masculine, Plural)",
    pista2: "Used to ask 'How many?' for a masculine noun (e.g., ____ años).",
    pista3: "This word means 'How many' in English."
  },
  {
    palabra: "CUARENTA",
    pista1: "Category: Number (Noun)",
    pista2: "The number 40 (four times ten).",
    pista3: "This word means 'Forty' in English."
  },
  {
    palabra: "CUARTA",
    pista1: "Category: Ordinal Number (Feminine)",
    pista2: "The 4th position (feminine); 'la ____ planta' (the 4th floor).",
    pista3: "This word means 'Fourth' in English."
  },
  {
    palabra: "CUARTO",
    pista1: "Category: Ordinal / Noun",
    pista2: "The 4th position (masculine); or a synonym for 'habitación'.",
    pista3: "This word means 'Fourth' or 'Room' in English."
  },
  {
    palabra: "CUATRO",
    pista1: "Category: Number (Noun)",
    pista2: "The number 4; (dos + dos).",
    pista3: "This word means 'Four' in English."
  },
  {
    palabra: "CUATROCIENTAS",
    pista1: "Category: Number (Noun, Feminine)",
    pista2: "The number 400 (feminine form).",
    pista3: "This word means 'Four hundred' in English."
  },
  {
    palabra: "CUATROCIENTOS",
    pista1: "Category: Number (Noun, Masculine)",
    pista2: "The number 400 (masculine form).",
    pista3: "This word means 'Four hundred' in English."
  },
  {
    palabra: "CUESTA",
    pista1: "Category: Verb (from 'costar')",
    pista2: "You use this to ask for the price ('¿Cuánto ____?').",
    pista3: "This word means 'It costs' in English."
  },
  {
    palabra: "DECIMA",
    pista1: "Category: Ordinal Number (Feminine)",
    pista2: "The 10th position (feminine).",
    pista3: "This word means 'Tenth' in English."
  },
  {
    palabra: "DECIMO",
    pista1: "Category: Ordinal Number (Masculine)",
    pista2: "The 10th position (masculine).",
    pista3: "This word means 'Tenth' in English."
  },
  {
    palabra: "DELETREAR",
    pista1: "Category: Verb",
    pista2: "To say or write the letters of a word one by one.",
    pista3: "This word means 'To spell' in English."
  },
  {
    palabra: "DELGADA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "Opposite of 'gorda' (fat); describes a person who is thin (feminine).",
    pista3: "This word means 'Thin' or 'Slim' in English."
  },
  {
    palabra: "DELGADO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "Opposite of 'gordo' (fat); describes a person who is thin (masculine).",
    pista3: "This word means 'Thin' or 'Slim' in English."
  },
  {
    palabra: "DEPENDIENTA",
    pista1: "Category: Profession (Noun, Feminine)",
    pista2: "A woman who works in a store and helps customers (feminine).",
    pista3: "This word means 'Shop assistant' in English."
  },
  {
    palabra: "DEPENDIENTE",
    pista1: "Category: Profession (Noun, Masculine)",
    pista2: "A man who works in a store and helps customers (masculine).",
    pista3: "This word means 'Shop assistant' in English."
  },
  {
    palabra: "DEPORTE",
    pista1: "Category: Noun",
    pista2: "Physical activity or game, like football, tennis, or basketball.",
    pista3: "This word means 'Sport' in English."
  },
  {
    palabra: "DERECHA",
    pista1: "Category: Direction (Noun/Adjective)",
    pista2: "The opposite of 'izquierda' (left).",
    pista3: "This word means 'Right' (direction) in English."
  },
  {
    palabra: "DESAYUNAR",
    pista1: "Category: Verb",
    pista2: "The action of eating the first meal of the day (morning).",
    pista3: "This word means 'To have breakfast' in English."
  },
  {
    palabra: "DESAYUNO",
    pista1: "Category: Meal (Noun)",
    pista2: "The first meal of the day.",
    pista3: "This word means 'Breakfast' in English."
  },
  {
    palabra: "DESPERTARSE",
    pista1: "Category: Verb (Reflexive)",
    pista2: "The action of waking up in the morning.",
    pista3: "This word means 'To wake up' in English."
  },
  {
    palabra: "DIA",
    pista1: "Category: Time (Noun)",
    pista2: "A period of 24 hours; 'Buenos ____s' (Good morning).",
    pista3: "This word means 'Day' in English."
  },
  {
    palabra: "DIAS",
    pista1: "Category: Time (Noun, Plural)",
    pista2: "More than one 24-hour period; 'Buenos ____' (Good morning).",
    pista3: "This word means 'Days' in English."
  },
  {
    palabra: "DICIEMBRE",
    pista1: "Category: Month (Noun)",
    pista2: "The last (12th) month of the year; when Christmas is.",
    pista3: "This word means 'December' in English."
  },
  {
    palabra: "DIECINUEVE",
    pista1: "Category: Number (Noun)",
    pista2: "The number 19 (10 + 9).",
    pista3: "This word means 'Nineteen' in English."
  },
  {
    palabra: "DIECIOCHO",
    pista1: "Category: Number (Noun)",
    pista2: "The number 18 (10 + 8).",
    pista3: "This word means 'Eighteen' in English."
  },
  {
    palabra: "DIECISEIS",
    pista1: "Category: Number (Noun)",
    pista2: "The number 16 (10 + 6).",
    pista3: "This word means 'Sixteen' in English."
  },
  {
    palabra: "DIECISIETE",
    pista1: "Category: Number (Noun)",
    pista2: "The number 17 (10 + 7).",
    pista3: "This word means 'Seventeen' in English."
  },
  {
    palabra: "DIEZ",
    pista1: "Category: Number (Noun)",
    pista2: "The number 10; (5 + 5).",
    pista3: "This word means 'Ten' in English."
  },
  {
    palabra: "DIFICIL",
    pista1: "Category: Adjective",
    pista2: "The opposite of 'fácil' (easy).",
    pista3: "This word means 'Difficult' or 'Hard' in English."
  },
  {
    palabra: "DIRECCION",
    pista1: "Category: Noun",
    pista2: "Where you live (your street and number).",
    pista3: "This word means 'Address' in English."
  },
  {
    palabra: "DOCE",
    pista1: "Category: Number (Noun)",
    pista2: "The number 12 (10 + 2).",
    pista3: "This word means 'Twelve' in English."
  },
  {
    palabra: "DOMINGO",
    pista1: "Category: Day of the week (Noun)",
    pista2: "The day after Saturday; the last day of the week.",
    pista3: "This word means 'Sunday' in English."
  },
  {
    palabra: "DONDE",
    pista1: "Category: Question word",
    pista2: "Used to ask about location or place (¿____ está el baño?).",
    pista3: "This word means 'Where' in English."
  },
  {
    palabra: "DORMIR",
    pista1: "Category: Verb",
    pista2: "The action of sleeping (at night).",
    pista3: "This word means 'To sleep' in English."
  },
  {
    palabra: "DOS",
    pista1: "Category: Number (Noun)",
    pista2: "The number 2 (1 + 1).",
    pista3: "This word means 'Two' in English."
  },
  {
    palabra: "DOSCIENTAS",
    pista1: "Category: Number (Noun, Feminine)",
    pista2: "The number 200 (feminine form).",
    pista3: "This word means 'Two hundred' in English."
  },
  {
    palabra: "DOSCIENTOS",
    pista1: "Category: Number (Noun, Masculine)",
    pista2: "The number 200 (masculine form).",
    pista3: "This word means 'Two hundred' in English."
  },
  {
    palabra: "DUCHARSE",
    pista1: "Category: Verb (Reflexive)",
    pista2: "The action of washing your body under running water.",
    pista3: "This word means 'To take a shower' in English."
  },
  {
    palabra: "EDAD",
    pista1: "Category: Noun",
    pista2: "How many years you have lived (e.g., 20 years old).",
    pista3: "This word means 'Age' in English."
  },
  {
    palabra: "EJEMPLO",
    pista1: "Category: Noun",
    pista2: "An instance or model used to illustrate a point ('Por ____').",
    pista3: "This word means 'Example' in English."
  },
  {
    palabra: "ELECTRONICO",
    pista1: "Category: Adjective",
    pista2: "Describes technology ('Correo ____' = email).",
    pista3: "This word means 'Electronic' in English."
  },
  {
    palabra: "ELLA",
    pista1: "Category: Pronoun",
    pista2: "A female person; the subject pronoun for 'she'.",
    pista3: "This word means 'She' in English."
  },
  {
    palabra: "ELLAS",
    pista1: "Category: Pronoun (Plural, Feminine)",
    pista2: "A group of only female people; 'they' (feminine).",
    pista3: "This word means 'They' (feminine) in English."
  },
  {
    palabra: "ELLOS",
    pista1: "Category: Pronoun (Plural, Masculine)",
    pista2: "A group of males, or a mixed group; 'they' (masculine).",
    pista3: "This word means 'They' (masculine/mixed) in English."
  },
  {
    palabra: "EMPEZAR",
    pista1: "Category: Verb",
    pista2: "Synonym for 'comenzar'; the opposite of 'terminar' (to finish).",
    pista3: "This word means 'To begin' or 'To start' in English."
  },
  {
    palabra: "ENCANTADA",
    pista1: "Category: Adjective / Greeting (Feminine)",
    pista2: "What a woman says after being introduced: 'Nice to meet you'.",
    pista3: "This word means 'Delighted' or 'Pleased to meet you' in English."
  },
  {
    palabra: "ENCANTADO",
    pista1: "Category: Adjective / Greeting (Masculine)",
    pista2: "What a man says after being introduced: 'Nice to meet you'.",
    pista3: "This word means 'Delighted' or 'Pleased to meet you' in English."
  },
  {
    palabra: "ENERO",
    pista1: "Category: Month (Noun)",
    pista2: "The first (1st) month of the year.",
    pista3: "This word means 'January' in English."
  },
  {
    palabra: "ENTENDER",
    pista1: "Category: Verb",
    pista2: "Synonym for 'comprender'; to know the meaning of something.",
    pista3: "This word means 'To understand' in English."
  },
  {
    palabra: "ENTONCES",
    pista1: "Category: Adverb / Conjunction",
    pista2: "Means 'at that time' or 'so' (as a conclusion).",
    pista3: "This word means 'Then' or 'So' in English."
  },
  {
    palabra: "ERES",
    pista1: "Category: Verb (from 'Ser')",
    pista2: "The 'tú' (you, singular) form of the verb 'ser' ('Tú ____ de España').",
    pista3: "This word means 'You are' (permanent) in English."
  },
  {
    palabra: "ESCRIBIR",
    pista1: "Category: Verb",
    pista2: "The action of using a pen or keyboard to make words.",
    pista3: "This word means 'To write' in English."
  },
  {
    palabra: "ESCUCHAR",
    pista1: "Category: Verb",
    pista2: "The action of paying attention to sounds (e.g., music, a person).",
    pista3: "This word means 'To listen' in English."
  },
  {
    palabra: "ESCUELA",
    pista1: "Category: Place (Noun)",
    pista2: "A synonym for 'colegio'; a place of learning.",
    pista3: "This word means 'School' in English."
  },
  {
    palabra: "ESPAÑA",
    pista1: "Category: Country (Noun)",
    pista2: "The European country where Madrid and Barcelona are.",
    pista3: "This word means 'Spain' in English."
  },
  {
    palabra: "ESPAÑOL",
    pista1: "Category: Language / Nationality (Masculine)",
    pista2: "The language of Spain and Mexico; or a person from Spain (masculine).",
    pista3: "This word means 'Spanish' in English."
  },
  {
    palabra: "ESPAÑOLA",
    pista1: "Category: Nationality (Feminine)",
    pista2: "A person from Spain (feminine).",
    pista3: "This word means 'Spanish' (feminine) in English."
  },
  {
    palabra: "ESPOSA",
    pista1: "Category: Family (Noun, Feminine)",
    pista2: "Synonym for 'mujer'; the woman you are married to.",
    pista3: "This word means 'Wife' in English."
  },
  {
    palabra: "ESPOSO",
    pista1: "Category: Family (Noun, Masculine)",
    pista2: "Synonym for 'marido'; the man you are married to.",
    pista3: "This word means 'Husband' in English."
  },
  {
    palabra: "ESTA",
    pista1: "Category: Demonstrative (Feminine) / Verb",
    pista2: "'This' (feminine); or 'he/she/it is' (temporary, from 'estar').",
    pista3: "This word means 'This' or 'Is' in English."
  },
  {
    palabra: "ESTADOUNIDENSE",
    pista1: "Category: Nationality (Adjective/Noun)",
    pista2: "A person or thing from the USA (neutral gender).",
    pista3: "This word means 'American' (from USA) in English."
  },
  {
    palabra: "ESTAR",
    pista1: "Category: Verb",
    pista2: "One of the two 'to be' verbs; used for location and temporary feelings.",
    pista3: "This word means 'To be' (temporary/location) in English."
  },
  {
    palabra: "ESTAS",
    pista1: "Category: Demonstrative (Feminine, Plural) / Verb",
    pista2: "'These' (feminine); or 'you are' (temporary, from 'estar').",
    pista3: "This word means 'These' or 'You are' in English."
  },
  {
    palabra: "ESTE",
    pista1: "Category: Demonstrative (Masculine)",
    pista2: "'This' (masculine); ('____ libro' = this book).",
    pista3: "This word means 'This' in English."
  },
  {
    palabra: "ESTO",
    pista1: "Category: Demonstrative (Neutral)",
    pista2: "'This' (neutral pronoun); ('¿Qué es ____?' = What is this?).",
    pista3: "This word means 'This' in English."
  },
  {
    palabra: "ESTOY",
    pista1: "Category: Verb (from 'Estar')",
    pista2: "The 'Yo' (I) form of the verb 'estar' ('Yo ____ bien').",
    pista3: "This word means 'I am' (temporary/location) in English."
  },
  {
    palabra: "ESTUDIANTE",
    pista1: "Category: Profession (Noun, Neutral)",
    pista2: "A person who studies at a school or university.",
    pista3: "This word means 'Student' in English."
  },
  {
    palabra: "ESTUDIAR",
    pista1: "Category: Verb",
    pista2: "The action of learning a subject, often by reading or going to class.",
    pista3: "This word means 'To study' in English."
  },
  {
    palabra: "FABRICA",
    pista1: "Category: Place (Noun)",
    pista2: "A large building where machines make products.",
    pista3: "This word means 'Factory' in English."
  },
  {
    palabra: "FACIL",
    pista1: "Category: Adjective",
    pista2: "The opposite of 'difícil' (difficult).",
    pista3: "This word means 'Easy' in English."
  },
  {
    palabra: "FALDA",
    pista1: "Category: Piece of clothing (Noun)",
    pista2: "A piece of clothing worn by women, covering the legs from the waist down.",
    pista3: "This word means 'Skirt' in English."
  },
  {
    palabra: "FAMILIA",
    pista1: "Category: People (Noun)",
    pista2: "Your group of relatives (mother, father, siblings...).",
    pista3: "This word means 'Family' in English."
  },
  {
    palabra: "FAVOR",
    pista1: "Category: Noun",
    pista2: "Used in the phrase 'Por ____' (Please).",
    pista3: "This word means 'Favor' in English."
  },
  {
    palabra: "FEA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "The opposite of 'guapa' or 'bonita' (beautiful) (feminine).",
    pista3: "This word means 'Ugly' in English."
  },
  {
    palabra: "FEBRERO",
    pista1: "Category: Month (Noun)",
    pista2: "The second (2nd) month of the year; the shortest month.",
    pista3: "This word means 'February' in English."
  },
  {
    palabra: "FEO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "The opposite of 'guapo' or 'bonito' (handsome) (masculine).",
    pista3: "This word means 'Ugly' in English."
  },
  {
    palabra: "FOTO",
    pista1: "Category: Noun (feminine, short for 'fotografía')",
    pista2: "An image taken with a camera.",
    pista3: "This word means 'Photo' or 'Picture' in English."
  },
  {
    palabra: "FRANCES",
    pista1: "Category: Language / Nationality (Masculine)",
    pista2: "The language of France; or a person from France (masculine).",
    pista3: "This word means 'French' in English."
  },
  {
    palabra: "FRANCESA",
    pista1: "Category: Nationality (Feminine)",
    pista2: "A person from France (feminine).",
    pista3: "This word means 'French' (feminine) in English."
  },
  {
    palabra: "FRANCIA",
    pista1: "Category: Country (Noun)",
    pista2: "The European country where Paris is the capital.",
    pista3: "This word means 'France' in English."
  },
  {
    palabra: "FRIO",
    pista1: "Category: Adjective / Noun",
    pista2: "Opposite of 'caliente' (hot); 'Tengo ____' (I am cold).",
    pista3: "This word means 'Cold' or 'Coldness' in English."
  },
  {
    palabra: "FRUTA",
    pista1: "Category: Food (Noun)",
    pista2: "Sweet food that grows on trees (e.g., apples, bananas, oranges).",
    pista3: "This word means 'Fruit' in English."
  },
  {
    palabra: "FUTBOL",
    pista1: "Category: Sport (Noun)",
    pista2: "A sport played with 11 players per team, kicking a ball.",
    pista3: "This word means 'Football' (Soccer) in English."
  },
  {
    palabra: "GORDA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "The opposite of 'delgada' (thin) (feminine).",
    pista3: "This word means 'Fat' or 'Overweight' in English."
  },
  {
    palabra: "GORDO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "The opposite of 'delgado' (thin) (masculine).",
    pista3: "This word means 'Fat' or 'Overweight' in English."
  },
  {
    palabra: "GRACIAS",
    pista1: "Category: Interjection",
    pista2: "What you say when you want to thank someone.",
    pista3: "This word means 'Thank you' in English."
  },
  {
    palabra: "GRANDE",
    pista1: "Category: Adjective",
    pista2: "The opposite of 'pequeño' (small).",
    pista3: "This word means 'Big' or 'Large' in English."
  },
  {
    palabra: "GRIS",
    pista1: "Category: Color (Adjective/Noun)",
    pista2: "The color between black and white; the color of clouds when it rains.",
    pista3: "This word means 'Grey' in English."
  },
  {
    palabra: "GUAPA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "Synonym for 'bonita'; describes a good-looking woman.",
    pista3: "This word means 'Beautiful' or 'Good-looking' in English."
  },
  {
    palabra: "GUAPO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "Synonym for 'bonito'; describes a good-looking man.",
    pista3: "This word means 'Handsome' or 'Good-looking' in English."
  },
  {
    palabra: "GUSTAR",
    pista1: "Category: Verb",
    pista2: "Used to express preference ('Me ____ el chocolate' = I like chocolate).",
    pista3: "This word means 'To like' (or 'To be pleasing to') in English."
  },
  {
    palabra: "GUSTO",
    pista1: "Category: Noun",
    pista2: "Means 'pleasure' ('Mucho ____' = Nice to meet you).",
    pista3: "This word means 'Pleasure' or 'Taste' in English."
  },
  {
    palabra: "HABER",
    pista1: "Category: Verb (Auxiliary)",
    pista2: "Used as a helping verb ('He comido' = I have eaten); or in the form 'HAY'.",
    pista3: "This word means 'To have' (auxiliary) in English."
  },
  {
    palabra: "HABLAR",
    pista1: "Category: Verb",
    pista2: "The action of saying words; to speak.",
    pista3: "This word means 'To speak' or 'To talk' in English."
  },
  {
    palabra: "HACE",
    pista1: "Category: Verb (from 'Hacer')",
    pista2: "Used for weather ('____ frío' = It's cold) or time ('____ dos años' = 2 years ago).",
    pista3: "This word means 'It makes', 'It is' (weather), or 'Ago' in English."
  },
  {
    palabra: "HACER",
    pista1: "Category: Verb",
    pista2: "The action of making or doing something.",
    pista3: "This word means 'To do' or 'To make' in English."
  },
  {
    palabra: "HASTA",
    pista1: "Category: Preposition",
    pista2: "Used to indicate a limit ('____ luego' = See you later).",
    pista3: "This word means 'Until' or 'Up to' in English."
  },
  {
    palabra: "HAY",
    pista1: "Category: Verb (Impersonal, from 'Haber')",
    pista2: "Used to express existence ('____ un libro en la mesa').",
    pista3: "This word means 'There is' or 'There are' in English."
  },
{
    palabra: "HERMANA",
    pista1: "Category: Family (Noun, Feminine)",
    pista2: "Your female sibling; the daughter of your parents.",
    pista3: "This word means 'Sister' in English."
  },
  {
    palabra: "HERMANO",
    pista1: "Category: Family (Noun, Masculine)",
    pista2: "Your male sibling; the son of your parents.",
    pista3: "This word means 'Brother' in English."
  },
  {
    palabra: "HIJA",
    pista1: "Category: Family (Noun, Feminine)",
    pista2: "A person's female child.",
    pista3: "This word means 'Daughter' in English."
  },
  {
    palabra: "HIJO",
    pista1: "Category: Family (Noun, Masculine)",
    pista2: "A person's male child.",
    pista3: "This word means 'Son' in English."
  },
  {
    palabra: "HOLA",
    pista1: "Category: Greeting (Interjection)",
    pista2: "The most common and informal way to greet someone in Spanish.",
    pista3: "This word means 'Hello' or 'Hi' in English."
  },
  {
    palabra: "HOMBRE",
    pista1: "Category: Person (Noun, Masculine)",
    pista2: "An adult male person; the opposite of 'mujer' (woman).",
    pista3: "This word means 'Man' in English."
  },
  {
    palabra: "HORA",
    pista1: "Category: Time (Noun)",
    pista2: "A period of 60 minutes; used to ask '¿Qué ____ es?' (What time is it?).",
    pista3: "This word means 'Hour' or 'Time' (on a clock) in English."
  },
  {
    palabra: "HOSPITAL",
    pista1: "Category: Place (Noun)",
    pista2: "A place where you go when you are very sick or injured.",
    pista3: "This word means 'Hospital' in English."
  },
  {
    palabra: "HOTEL",
    pista1: "Category: Place (Noun)",
    pista2: "A place where you pay to sleep when you are traveling.",
    pista3: "This word means 'Hotel' in English."
  },
  {
    palabra: "HUEVO",
    pista1: "Category: Food (Noun)",
    pista2: "A food that comes from a chicken; it's oval and often white or brown.",
    pista3: "This word means 'Egg' in English."
  },
  {
    palabra: "IDIOMA",
    pista1: "Category: Noun (Masculine)",
    pista2: "Synonym for 'lengua' (e.g., Spanish, English, French).",
    pista3: "This word means 'Language' in English."
  },
  {
    palabra: "IGLESIA",
    pista1: "Category: Place (Noun)",
    pista2: "A building used for public Christian worship.",
    pista3: "This word means 'Church' in English."
  },
  {
    palabra: "INGLES",
    pista1: "Category: Language / Nationality (Masculine)",
    pista2: "The language of England; or a person from England (masculine).",
    pista3: "This word means 'English' in English."
  },
  {
    palabra: "INGLESA",
    pista1: "Category: Nationality (Feminine)",
    pista2: "A person from England (feminine).",
    pista3: "This word means 'English' (feminine) in English."
  },
  {
    palabra: "INTELIGENTE",
    pista1: "Category: Adjective",
    pista2: "Describes a person who learns quickly and understands well; 'smart'.",
    pista3: "This word means 'Intelligent' in English."
  },
  {
    palabra: "INTERESANTE",
    pista1: "Category: Adjective",
    pista2: "Describes something that holds your attention; opposite of 'aburrido' (boring).",
    pista3: "This word means 'Interesting' in English."
  },
  {
    palabra: "INVIERNO",
    pista1: "Category: Season (Noun)",
    pista2: "The coldest season of the year, after 'otoño' (autumn).",
    pista3: "This word means 'Winter' in English."
  },
  {
    palabra: "ITALIA",
    pista1: "Category: Country (Noun)",
    pista2: "The European country where Rome and Venice are.",
    pista3: "This word means 'Italy' in English."
  },
  {
    palabra: "ITALIANA",
    pista1: "Category: Nationality (Feminine)",
    pista2: "A person from Italy (feminine).",
    pista3: "This word means 'Italian' (feminine) in English."
  },
  {
    palabra: "ITALIANO",
    pista1: "Category: Language / Nationality (Masculine)",
    pista2: "The language of Italy; or a person from Italy (masculine).",
    pista3: "This word means 'Italian' in English."
  },
  {
    palabra: "IZQUIERDA",
    pista1: "Category: Direction (Noun/Adjective)",
    pista2: "The opposite of 'derecha' (right).",
    pista3: "This word means 'Left' (direction) in English."
  },
  {
    palabra: "JAPON",
    pista1: "Category: Country (Noun)",
    pista2: "The Asian island country where Tokyo is the capital.",
    pista3: "This word means 'Japan' in English."
  },
  {
    palabra: "JAPONES",
    pista1: "Category: Language / Nationality (Masculine)",
    pista2: "The language of Japan; or a person from Japan (masculine).",
    pista3: "This word means 'Japanese' in English."
  },
  {
    palabra: "JAPONESA",
    pista1: "Category: Nationality (Feminine)",
    pista2: "A person from Japan (feminine).",
    pista3: "This word means 'Japanese' (feminine) in English."
  },
  {
    palabra: "JERSEY",
    pista1: "Category: Piece of clothing (Noun)",
    pista2: "A warm piece of clothing (like a sweater) for your upper body.",
    pista3: "This word means 'Sweater' or 'Jumper' in English."
  },
  {
    palabra: "JOVEN",
    pista1: "Category: Adjective / Noun",
    pista2: "Describes a person who is not old (e.g., 15-25 years old).",
    pista3: "This word means 'Young' or 'Young person' in English."
  },
  {
    palabra: "JUEVES",
    pista1: "Category: Day of the week (Noun)",
    pista2: "The day after 'miércoles' (Wednesday) and before 'viernes' (Friday).",
    pista3: "This word means 'Thursday' in English."
  },
  {
    palabra: "JUGAR",
    pista1: "Category: Verb",
    pista2: "The action of playing a sport or a game (e.g., football, tennis, cards).",
    pista3: "This word means 'To play' (a game/sport) in English."
  },
  {
    palabra: "JUGO",
    pista1: "Category: Drink (Noun)",
    pista2: "A drink made from fruit (e.g., '____ de naranja'). Common in Latin America.",
    pista3: "This word means 'Juice' in English."
  },
  {
    palabra: "JULIO",
    pista1: "Category: Month (Noun)",
    pista2: "The seventh (7th) month of the year, after June.",
    pista3: "This word means 'July' in English."
  },
  {
    palabra: "JUNIO",
    pista1: "Category: Month (Noun)",
    pista2: "The sixth (6th) month of the year, before July.",
    pista3: "This word means 'June' in English."
  },
  {
    palabra: "LAPIZ",
    pista1: "Category: Object (Noun)",
    pista2: "A tool you use to write or draw (not a pen). You can erase it.",
    pista3: "This word means 'Pencil' in English."
  },
  {
    palabra: "LARGA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "Opposite of 'corta' (short); describes something of great length (feminine).",
    pista3: "This word means 'Long' in English."
  },
  {
    palabra: "LARGO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "Opposite of 'corto' (short); describes something of great length (masculine).",
    pista3: "This word means 'Long' in English."
  },
  {
    palabra: "LECHE",
    pista1: "Category: Drink / Food (Noun, Feminine)",
    pista2: "A white liquid that comes from cows; used in 'café con ____'.",
    pista3: "This word means 'Milk' in English."
  },
  {
    palabra: "LEER",
    pista1: "Category: Verb",
    pista2: "The action of looking at and understanding words (e.g., a book, a newspaper).",
    pista3: "This word means 'To read' in English."
  },
  {
    palabra: "LENGUA",
    pista1: "Category: Noun",
    pista2: "Synonym for 'idioma' (language); or the muscle inside your mouth.",
    pista3: "This word means 'Language' or 'Tongue' in English."
  },
  {
    palabra: "LEVANTARSE",
    pista1: "Category: Verb (Reflexive)",
    pista2: "The action of getting out of bed in the morning.",
    pista3: "This word means 'To get up' in English."
  },
  {
    palabra: "LIBRO",
    pista1: "Category: Object (Noun)",
    pista2: "An object with many pages that you read.",
    pista3: "This word means 'Book' in English."
  },
  {
    palabra: "LLAMARSE",
    pista1: "Category: Verb (Reflexive)",
    pista2: "The verb used to say your name (e.g., 'Me ____ Ignacio').",
    pista3: "This word means 'To be called' (name) in English."
  },
  {
    palabra: "LLAMAR",
    pista1: "Category: Verb",
    pista2: "The action of telephoning someone; or to call someone's name.",
    pista3: "This word means 'To call' in English."
  },
  {
    palabra: "LLAMAS",
    pista1: "Category: Verb (from 'Llamarse' or 'Llamar')",
    pista2: "The 'tú' (you) form of 'llamar' or 'llamar-se' ('¿Cómo te ____?').",
    pista3: "This word means 'You call' or 'You are called' in English."
  },
  {
    palabra: "LLAMO",
    pista1: "Category: Verb (from 'Llamarse' or 'Llamar')",
    pista2: "The 'yo' (I) form of 'llamar-se' ('Me ____ Ignacio').",
    pista3: "This word means 'I call' or 'I am called' in English."
  },
  {
    palabra: "LLEVAR",
    pista1: "Category: Verb",
    pista2: "The action of wearing clothes; or to carry/take something.",
    pista3: "This word means 'To wear' or 'To carry/take' in English."
  },
  {
    palabra: "LLUEVE",
    pista1: "Category: Verb (Weather, from 'llover')",
    pista2: "Describes the weather when water is falling from the sky.",
    pista3: "This word means 'It rains' or 'It's raining' in English."
  },
  {
    palabra: "LUEGO",
    pista1: "Category: Adverb (Time)",
    pista2: "Synonym for 'después' (after); 'Hasta ____' (See you later).",
    pista3: "This word means 'Later' or 'Then' in English."
  },
  {
    palabra: "LUNES",
    pista1: "Category: Day of the week (Noun)",
    pista2: "The first day of the working week, after Sunday.",
    pista3: "This word means 'Monday' in English."
  },
  {
    palabra: "MADRE",
    pista1: "Category: Family (Noun, Feminine)",
    pista2: "Synonym for 'mamá'; your female parent.",
    pista3: "This word means 'Mother' in English."
  },
  {
    palabra: "MAL",
    pista1: "Category: Adverb",
    pista2: "The opposite of 'bien' (well); ('Estoy ____' = I am unwell).",
    pista3: "This word means 'Badly' or 'Wrong' in English."
  },
  {
    palabra: "MAÑANA",
    pista1: "Category: Time (Noun, Feminine)",
    pista2: "The early part of the day ('por la ____'); or the day after today.",
    pista3: "This word means 'Morning' or 'Tomorrow' in English."
  },
  {
    palabra: "MARIDO",
    pista1: "Category: Family (Noun, Masculine)",
    pista2: "Synonym for 'esposo'; the man you are married to.",
    pista3: "This word means 'Husband' in English."
  },
  {
    palabra: "MARRON",
    pista1: "Category: Color (Adjective/Noun)",
    pista2: "Synonym for 'café'; the color of wood or chocolate.",
    pista3: "This word means 'Brown' in English."
  },
  {
    palabra: "MARTES",
    pista1: "Category: Day of the week (Noun)",
    pista2: "The day after 'lunes' (Monday) and before 'miércoles' (Wednesday).",
    pista3: "This word means 'Tuesday' in English."
  },
  {
    palabra: "MARZO",
    pista1: "Category: Month (Noun)",
    pista2: "The third (3rd) month of the year, after February.",
    pista3: "This word means 'March' in English."
  },
  {
    palabra: "MAS",
    pista1: "Category: Adverb (Quantity)",
    pista2: "The opposite of 'menos' (less); 'Quiero ____ agua' (I want ____ water).",
    pista3: "This word means 'More' in English."
  },
  {
    palabra: "MAYOR",
    pista1: "Category: Adjective",
    pista2: "Describes someone who is older; the opposite of 'menor' (younger).",
    pista3: "This word means 'Older' or 'Elder' in English."
  },
  {
    palabra: "MAYO",
    pista1: "Category: Month (Noun)",
    pista2: "The fifth (5th) month of the year, after April.",
    pista3: "This word means 'May' in English."
  },
  {
    palabra: "MEDICA",
    pista1: "Category: Profession (Noun, Feminine)",
    pista2: "A female 'doctor'; a woman who works in a hospital.",
    pista3: "This word means 'Doctor' (female) in English."
  },
  {
    palabra: "MEDICO",
    pista1: "Category: Profession (Noun, Masculine)",
    pista2: "A male 'doctor'; a man who works in a hospital.",
    pista3: "This word means 'Doctor' (male) in English."
  },
  {
    palabra: "MENOS",
    pista1: "Category: Adverb (Quantity)",
    pista2: "The opposite of 'más' (more); (5 - 2 = 3).",
    pista3: "This word means 'Less' or 'Minus' in English."
  },
  {
    palabra: "MESA",
    pista1: "Category: Furniture (Noun)",
    pista2: "A piece of furniture with a flat top and legs; you eat at it.",
    pista3: "This word means 'Table' in English."
  },
  {
    palabra: "MEXICANA",
    pista1: "Category: Nationality (Feminine)",
    pista2: "A person from Mexico (feminine).",
    pista3: "This word means 'Mexican' (feminine) in English."
  },
  {
    palabra: "MEXICANO",
    pista1: "Category: Nationality (Masculine)",
    pista2: "A person from Mexico (masculine).",
    pista3: "This word means 'Mexican' (masculine) in English."
  },
  {
    palabra: "MEXICO",
    pista1: "Category: Country (Noun)",
    pista2: "A large country in North America, south of the USA.",
    pista3: "This word means 'Mexico' in English."
  },
  {
    palabra: "MIERCOLES",
    pista1: "Category: Day of the week (Noun)",
    pista2: "The day after 'martes' (Tuesday); the middle of the work week.",
    pista3: "This word means 'Wednesday' in English."
  },
  {
    palabra: "MIL",
    pista1: "Category: Number (Noun)",
    pista2: "The number 1,000 (ten times one hundred).",
    pista3: "This word means 'One thousand' in English."
  },
  {
    palabra: "MILLON",
    pista1: "Category: Number (Noun)",
    pista2: "The number 1,000,000 (one thousand times one thousand).",
    pista3: "This word means 'Million' in English."
  },
  {
    palabra: "MIRAR",
    pista1: "Category: Verb",
    pista2: "The action of looking at something with your eyes (e.g., TV).",
    pista3: "This word means 'To look at' or 'To watch' in English."
  },
  {
    palabra: "MORENA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "Describes a person with dark hair or dark skin (feminine).",
    pista3: "This word means 'Brunette' or 'Dark-skinned' in English."
  },
  {
    palabra: "MORENO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "Describes a person with dark hair or dark skin (masculine).",
    pista3: "This word means 'Dark-haired' or 'Dark-skinned' in English."
  },
  {
    palabra: "MOCHILA",
    pista1: "Category: Object (Noun)",
    pista2: "A bag you carry on your back, often used for school.",
    pista3: "This word means 'Backpack' in English."
  },
  {
    palabra: "MUCHO",
    pista1: "Category: Adverb / Adjective",
    pista2: "Synonym for 'a lot of'; opposite of 'poco' (little).",
    pista3: "This word means 'Much' or 'A lot' in English."
  },
  {
    palabra: "MUJER",
    pista1: "Category: Person (Noun, Feminine)",
    pista2: "An adult female person; the opposite of 'hombre' (man).",
    pista3: "This word means 'Woman' in English."
  },
  {
    palabra: "MUSICA",
    pista1: "Category: Noun",
    pista2: "Sounds organized in time (e.g., pop, rock, classical).",
    pista3: "This word means 'Music' in English."
  },
  {
    palabra: "NACIONALIDAD",
    pista1: "Category: Noun",
    pista2: "Where you are from (e.g., Spanish, Mexican, American).",
    pista3: "This word means 'Nationality' in English."
  },
  {
    palabra: "NADA",
    pista1: "Category: Pronoun / Verb",
    pista2: "The opposite of 'algo' (something); OR (from 'nadar') 'he/she swims'.",
    pista3: "This word means 'Nothing' OR 'He/she swims' in English."
  },
  {
    palabra: "NARANJA",
    pista1: "Category: Fruit / Color (Noun/Adjective)",
    pista2: "A round, orange-colored fruit; or the color itself.",
    pista3: "This word means 'Orange' (fruit or color) in English."
  },
  {
    palabra: "NECESITAR",
    pista1: "Category: Verb",
    pista2: "The action of requiring something (e.g., '____ agua' = I need water).",
    pista3: "This word means 'To need' in English."
  },
  {
    palabra: "NEGRO",
    pista1: "Category: Color (Adjective/Noun)",
    pista2: "The darkest color; the color of the night sky.",
    pista3: "This word means 'Black' in English."
  },
  {
    palabra: "NIETA",
    pista1: "Category: Family (Noun, Feminine)",
    pista2: "The daughter of your son or daughter.",
    pista3: "This word means 'Granddaughter' in English."
  },
  {
    palabra: "NIETO",
    pista1: "Category: Family (Noun, Masculine)",
    pista2: "The son of your son or daughter.",
    pista3: "This word means 'Grandson' in English."
  },
  {
    palabra: "NIEVA",
    pista1: "Category: Verb (Weather, from 'nevar')",
    pista2: "Describes the weather when white, cold flakes fall in winter.",
    pista3: "This word means 'It snows' or 'It's snowing' in English."
  },
  {
    palabra: "NOCHE",
    pista1: "Category: Time (Noun, Feminine)",
    pista2: "The dark part of the day, when you sleep; 'Buenas ____s' (Good night).",
    pista3: "This word means 'Night' in English."
  },
  {
    palabra: "NOCHES",
    pista1: "Category: Time (Noun, Plural)",
    pista2: "Used in the greeting 'Buenas ____' (Good night / Good evening).",
    pista3: "This word means 'Nights' in English."
  },
  {
    palabra: "NOMBRE",
    pista1: "Category: Noun",
    pista2: "What you are called (e.g., Ignacio, Maria, John).",
    pista3: "This word means 'Name' (first name) in English."
  },
  {
    palabra: "NOSOTRAS",
    pista1: "Category: Pronoun (Feminine, Plural)",
    pista2: "The subject pronoun for a group of only females ('I' + 'she').",
    pista3: "This word means 'We' (feminine) in English."
  },
  {
    palabra: "NOSOTROS",
    pista1: "Category: Pronoun (Masculine, Plural)",
    pista2: "The subject pronoun for a group of males or a mixed group ('I' + 'he').",
    pista3: "This word means 'We' (masculine/mixed) in English."
  },
  {
    palabra: "NOVECIENTAS",
    pista1: "Category: Number (Noun, Feminine)",
    pista2: "The number 900 (feminine form).",
    pista3: "This word means 'Nine hundred' in English."
  },
  {
    palabra: "NOVECIENTOS",
    pista1: "Category: Number (Noun, Masculine)",
    pista2: "The number 900 (masculine form).",
    pista3: "This word means 'Nine hundred' in English."
  },
  {
    palabra: "NOVENA",
    pista1: "Category: Ordinal Number (Feminine)",
    pista2: "The 9th position (feminine).",
    pista3: "This word means 'Ninth' in English."
  },
  {
    palabra: "NOVENO",
    pista1: "Category: Ordinal Number (Masculine)",
    pista2: "The 9th position (masculine).",
    pista3: "This word means 'Ninth' in English."
  },
  {
    palabra: "NOVENTA",
    pista1: "Category: Number (Noun)",
    pista2: "The number 90 (nine times ten).",
    pista3: "This word means 'Ninety' in English."
  },
  {
    palabra: "NOVIA",
    pista1: "Category: Person (Noun, Feminine)",
    pista2: "A female romantic partner (girlfriend); or a woman on her wedding day (bride).",
    pista3: "This word means 'Girlfriend' or 'Bride' in English."
  },
  {
    palabra: "NOVIEMBRE",
    pista1: "Category: Month (Noun)",
    pista2: "The eleventh (11th) month of the year, before December.",
    pista3: "This word means 'November' in English."
  },
  {
    palabra: "NOVIO",
    pista1: "Category: Person (Noun, Masculine)",
    pista2: "A male romantic partner (boyfriend); or a man on his wedding day (groom).",
    pista3: "This word means 'Boyfriend' or 'Groom' in English."
  },
  {
    palabra: "NUBLADO",
    pista1: "Category: Weather (Adjective)",
    pista2: "Describes the weather when there are many clouds in the sky ('Está ____').",
    pista3: "This word means 'Cloudy' in English."
  },
  {
    palabra: "NUESTRA",
    pista1: "Category: Possessive (Feminine)",
    pista2: "'Our' (feminine); '____ casa' (Our house).",
    pista3: "This word means 'Our' in English."
  },
  {
    palabra: "NUESTRO",
    pista1: "Category: Possessive (Masculine)",
    pista2: "'Our' (masculine); '____ coche' (Our car).",
    pista3: "This word means 'Our' in English."
  },
  {
    palabra: "NUEVA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "Opposite of 'vieja' (old) (feminine).",
    pista3: "This word means 'New' in English."
  },
  {
    palabra: "NUEVE",
    pista1: "Category: Number (Noun)",
    pista2: "The number 9 (diez menos uno).",
    pista3: "This word means 'Nine' in English."
  },
  {
    palabra: "NUEVO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "Opposite of 'viejo' (old) (masculine).",
    pista3: "This word means 'New' in English."
  },
{
    palabra: "NUMERO",
    pista1: "Category: Noun",
    pista2: "A symbol used for counting (e.g., 1, 2, 3, 4, 5).",
    pista3: "This word contains one 'e', one 'm', one 'n', one 'o', one 'r', and one 'u'."
  },
  {
    palabra: "OCHENTA",
    pista1: "Category: Number (Noun)",
    pista2: "The number 80 (ocho por diez).",
    pista3: "This word contains one 'a', one 'c', one 'e', one 'h', one 'n', one 'o', and one 't'."
  },
  {
    palabra: "OCHO",
    pista1: "Category: Number (Noun)",
    pista2: "The number 8 (cuatro más cuatro).",
    pista3: "This word contains one 'c', one 'h', and two 'o's."
  },
  {
    palabra: "OCHOCIENTAS",
    pista1: "Category: Number (Noun, Feminine)",
    pista2: "The number 800 (feminine form).",
    pista3: "This word contains one 'a', one 'c', two 'e', one 'h', one 'i', one 'n', two 'o's, and one 's'."
  },
  {
    palabra: "OCHOCIENTOS",
    pista1: "Category: Number (Noun, Masculine)",
    pista2: "The number 800 (masculine form).",
    pista3: "This word contains one 'c', one 'e', one 'h', one 'i', one 'n', three 'o's, and one 's'."
  },
  {
    palabra: "OCTAVA",
    pista1: "Category: Ordinal Number (Feminine)",
    pista2: "The 8th position (feminine).",
    pista3: "This word contains two 'a's, one 'c', one 'o', one 't', and one 'v'."
  },
  {
    palabra: "OCTAVO",
    pista1: "Category: Ordinal Number (Masculine)",
    pista2: "The 8th position (masculine).",
    pista3: "This word contains one 'a', one 'c', two 'o's, one 't', and one 'v'."
  },
  {
    palabra: "OCTUBRE",
    pista1: "Category: Month (Noun)",
    pista2: "The tenth (10th) month of the year, after September.",
    pista3: "This word contains one 'b', one 'c', one 'e', one 'o', one 'r', one 't', and one 'u'."
  },
  {
    palabra: "OFICINA",
    pista1: "Category: Place (Noun)",
    pista2: "A place (a room or building) where people work, usually at desks.",
    pista3: "This word contains one 'a', one 'c', one 'f', two 'i's, one 'n', and one 'o'."
  },
  {
    palabra: "ONCE",
    pista1: "Category: Number (Noun)",
    pista2: "The number 11 (diez más uno).",
    pista3: "This word contains one 'c', one 'e', one 'n', and one 'o'."
  },
  {
    palabra: "OTOÑO",
    pista1: "Category: Season (Noun)",
    pista2: "The season after summer and before winter, when leaves fall.",
    pista3: "This word contains two 'o's, one 'ñ', and one 't'."
  },
  {
    palabra: "PADRE",
    pista1: "Category: Family (Noun, Masculine)",
    pista2: "Synonym for 'papá'; your male parent.",
    pista3: "This word contains one 'a', one 'd', one 'e', one 'p', and one 'r'."
  },
  {
    palabra: "PADRES",
    pista1: "Category: Family (Noun, Plural)",
    pista2: "Your 'mother and father' together; or the plural of 'father'.",
    pista3: "This word contains one 'a', one 'd', one 'e', one 'p', one 'r', and one 's'."
  },
  {
    palabra: "PAIS",
    pista1: "Category: Place (Noun, Masculine)",
    pista2: "A nation with its own government (e.g., Spain, Mexico, France).",
    pista3: "This word contains one 'a', one 'i', one 'p', and one 's'."
  },
  {
    palabra: "PALABRA",
    pista1: "Category: Noun",
    pista2: "A single unit of language ('hello', 'house', 'dog' are examples).",
    pista3: "This word contains three 'a's, one 'b', one 'l', one 'p', and one 'r'."
  },
  {
    palabra: "PAN",
    pista1: "Category: Food (Noun)",
    pista2: "A basic food made from flour, water, and yeast (e.g., a baguette).",
    pista3: "This word contains one 'a', one 'n', and one 'p'."
  },
  {
    palabra: "PANTALONES",
    pista1: "Category: Piece of clothing (Noun, plural)",
    pista2: "A piece of clothing you wear to cover your legs.",
    pista3: "This word contains two 'a's, one 'e', one 'l', one 'n', one 'o', two 'p's, one 's', and one 't'."
  },
  {
    palabra: "PAPEL",
    pista1: "Category: Object (Noun)",
    pista2: "A thin material you write on; it comes from trees.",
    pista3: "This word contains one 'a', one 'e', one 'l', and two 'p's."
  },
  {
    palabra: "PARA",
    pista1: "Category: Preposition",
    pista2: "Used to indicate purpose or destination ('in order to', 'for').",
    pista3: "This word contains two 'a's, one 'p', and one 'r'."
  },
  {
    palabra: "PASEAR",
    pista1: "Category: Verb",
    pista2: "The action of walking for pleasure, often in a park or on the street.",
    pista3: "This word contains two 'a's, one 'e', one 'p', one 'r', and one 's'."
  },
  {
    palabra: "PASTA",
    pista1: "Category: Food (Noun)",
    pista2: "An Italian food made from flour and water (e.g., spaghetti, macaroni).",
    pista3: "This word contains two 'a's, one 'p', one 's', and one 't'."
  },
  {
    palabra: "PELICULA",
    pista1: "Category: Noun",
    pista2: "A synonym for 'film'; what you watch at the cinema.",
    pista3: "This word contains one 'a', one 'c', one 'e', one 'i', one 'l', one 'p', and one 'u'."
  },
  {
    palabra: "PELO",
    pista1: "Category: Noun",
    pista2: "What grows on your head (it can be brown, blonde, red...).",
    pista3: "This word contains one 'e', one 'l', one 'o', and one 'p'."
  },
  {
    palabra: "PEQUEÑA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "Opposite of 'grande' (big) (feminine).",
    pista3: "This word contains one 'a', one 'e', one 'p', one 'q', one 'u', and one 'ñ'."
  },
  {
    palabra: "PEQUEÑO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "Opposite of 'grande' (big) (masculine).",
    pista3: "This word contains one 'e', one 'o', one 'p', one 'q', one 'u', and one 'ñ'."
  },
  {
    palabra: "PERDON",
    pista1: "Category: Interjection",
    pista2: "What you say when you make a mistake or need to apologize ('Excuse me', 'Sorry').",
    pista3: "This word contains one 'd', one 'e', one 'n', two 'o's, one 'p', and one 'r'."
  },
  {
    palabra: "PERO",
    pista1: "Category: Conjunction",
    pista2: "A word used to show contrast ('I like tea, ____ I prefer coffee').",
    pista3: "This word contains one 'e', one 'o', one 'p', and one 'r'."
  },
  {
    palabra: "PERRO",
    pista1: "Category: Animal (Noun)",
    pista2: "A domestic animal that barks ('woof!') and is man's best friend.",
    pista3: "This word contains one 'e', one 'o', one 'p', and two 'r's."
  },
  {
    palabra: "PESCADO",
    pista1: "Category: Food (Noun)",
    pista2: "An animal that swims, eaten as food.",
    pista3: "This word contains one 'a', one 'c', one 'd', one 'e', one 'o', one 'p', and one 's'."
  },
  {
    palabra: "PISO",
    pista1: "Category: Place (Noun)",
    pista2: "Synonym for 'apartamento'; or the 'floor' of a building.",
    pista3: "This word contains one 'i', one 'o', one 'p', and one 's'."
  },
  {
    palabra: "PLAZA",
    pista1: "Category: Place (Noun)",
    pista2: "An open, public square in a city or town.",
    pista3: "This word contains two 'a's, one 'l', one 'p', and one 'z'."
  },
  {
    palabra: "PODER",
    pista1: "Category: Verb",
    pista2: "Used to express ability ('can') (e.g., '____ hablar español').",
    pista3: "This word contains one 'd', one 'e', one 'o', one 'p', and one 'r'."
  },
  {
    palabra: "POLLO",
    pista1: "Category: Food (Noun)",
    pista2: "A bird (chicken) that is eaten as food.",
    pista3: "This word contains two 'l's, one 'o', and one 'p'."
  },
  {
    palabra: "POR",
    pista1: "Category: Preposition",
    pista2: "Used for many reasons ('by', 'for', 'through', 'because of').",
    pista3: "This word contains one 'o', one 'p', and one 'r'."
  },
  {
    palabra: "PORQUE",
    pista1: "Category: Conjunction",
    pista2: "The word you use to give a reason or an answer to 'why?'.",
    pista3: "This word contains one 'e', one 'o', one 'p', one 'q', one 'r', and one 'u'."
  },
  {
    palabra: "PORTUGAL",
    pista1: "Category: Country (Noun)",
    pista2: "The European country to the west of Spain; Lisbon is the capital.",
    pista3: "This word contains one 'a', one 'g', one 'l', one 'o', one 'p', one 'r', one 't', and one 'u'."
  },
  {
    palabra: "PORTUGUES",
    pista1: "Category: Language / Nationality (Masculine)",
    pista2: "The language of Portugal or Brazil; or a person from Portugal (masculine).",
    pista3: "This word contains one 'e', one 'g', one 'o', one 'p', one 'r', one 's', one 't', and one 'u'."
  },
  {
    palabra: "PORTUGUESA",
    pista1: "Category: Nationality (Feminine)",
    pista2: "A person from Portugal (feminine).",
    pista3: "This word contains one 'a', one 'e', one 'g', one 'o', one 'p', one 'r', one 's', one 't', and one 'u'."
  },
  {
    palabra: "PREGUNTAR",
    pista1: "Category: Verb",
    pista2: "The action of asking something (e.g., '¿Cómo estás?').",
    pista3: "This word contains one 'a', one 'e', one 'g', one 'n', one 'p', one 'r', one 't', and one 'u'."
  },
  {
    palabra: "PRIMAVERA",
    pista1: "Category: Season (Noun)",
    pista2: "The season after winter and before summer, when flowers grow.",
    pista3: "This word contains one 'a', one 'e', one 'i', one 'm', 'p', two 'r's, and one 'v'."
  },
  {
    palabra: "PRIMERA",
    pista1: "Category: Ordinal Number (Feminine)",
    pista2: "The 1st position (feminine).",
    pista3: "This word contains one 'a', one 'e', one 'i', 'm', 'p', and one 'r'."
  },
  {
    palabra: "PRIMERO",
    pista1: "Category: Ordinal Number (Masculine)",
    pista2: "The 1st position (masculine).",
    pista3: "This word contains one 'e', one 'i', 'm', 'o', 'p', and one 'r'."
  },
  {
    palabra: "PRIMA",
    pista1: "Category: Family (Noun, Feminine)",
    pista2: "The daughter of your 'tío' (uncle) or 'tía' (aunt).",
    pista3: "This word contains one 'a', one 'i', 'm', and 'p'."
  },
  {
    palabra: "PRIMO",
    pista1: "Category: Family (Noun, Masculine)",
    pista2: "The son of your 'tío' (uncle) or 'tía' (aunt).",
    pista3: "This word contains one 'i', one 'm', one 'o', and one 'p'."
  },
  {
    palabra: "PRONTO",
    pista1: "Category: Adverb (Time)",
    pista2: "Synonym for 'soon'; 'Hasta ____' (See you soon).",
    pista3: "This word contains two 'o's, one 'p', one 'r', one 't', and one 'n'."
  },
  {
    palabra: "PROFESION",
    pista1: "Category: Noun",
    pista2: "Synonym for 'job' or 'career' (e.g., doctor, lawyer, teacher).",
    pista3: "This word contains one 'e', one 'f', one 'i', two 'o's, one 'p', one 'r', and one 's'."
  },
  {
    palabra: "PROFESOR",
    pista1: "Category: Profession (Noun, Masculine)",
    pista2: "A male 'teacher'.",
    pista3: "This word contains one 'e', one 'f', two 'o's, one 'p', two 'r's, and one 's'."
  },
  {
    palabra: "PROFESORA",
    pista1: "Category: Profession (Noun, Feminine)",
    pista2: "A female 'teacher'.",
    pista3: "This word contains one 'a', one 'e', one 'f', two 'o's, one 'p', two 'r's, and one 's'."
  },
  {
    palabra: "PUEBLO",
    pista1: "Category: Place (Noun)",
    pista2: "A small 'town' or 'village'; smaller than a 'ciudad' (city).",
    pista3: "This word contains one 'b', one 'e', one 'l', one 'o', one 'p', and one 'u'."
  },
  {
    palabra: "PUERTA",
    pista1: "Category: Object (Noun)",
    pista2: "You open and close this to enter or leave a room or house.",
    pista3: "This word contains one 'a', one 'e', one 'p', one 'r', one 't', and one 'u'."
  },
  {
    palabra: "QUE",
    pista1: "Category: Question word / Conjunction",
    pista2: "Used to ask 'What?' (¿____ es esto?) or to mean 'that'.",
    pista3: "This word contains one 'e', one 'q', and one 'u'."
  },
  {
    palabra: "QUERER",
    pista1: "Category: Verb",
    pista2: "The action of 'to want' something; or 'to love' someone.",
    pista3: "This word contains two 'e's, one 'q', two 'r's, and one 'u'."
  },
  {
    palabra: "QUESO",
    pista1: "Category: Food (Noun)",
    pista2: "A food made from milk, often eaten with bread or in sandwiches.",
    pista3: "This word contains one 'e', one 'o', one 'q', one 's', and one 'u'."
  },
  {
    palabra: "QUIEN",
    pista1: "Category: Question word",
    pista2: "Used to ask 'Who?' (¿____ es esa persona?).",
    pista3: "This word contains one 'e', one 'i', one 'n', one 'q', and one 'u'."
  },
  {
    palabra: "QUINCE",
    pista1: "Category: Number (Noun)",
    pista2: "The number 15 (diez más cinco).",
    pista3: "This word contains one 'c', one 'e', one 'i', one 'n', one 'q', and one 'u'."
  },
  {
    palabra: "QUINIENTAS",
    pista1: "Category: Number (Noun, Feminine)",
    pista2: "The number 500 (feminine form).",
    pista3: "This word contains one 'a', 'e', two 'i's, one 'n', one 'q', 's', and one 't'."
  },
  {
    palabra: "QUINIENTOS",
    pista1: "Category: Number (Noun, Masculine)",
    pista2: "The number 500 (masculine form).",
    pista3: "This word contains one 'e', two 'i's, one 'n', one 'o', one 'q', 's', and one 't'."
  },
  {
    palabra: "QUINTA",
    pista1: "Category: Ordinal Number (Feminine)",
    pista2: "The 5th position (feminine).",
    pista3: "This word contains one 'a', 'i', 'n', 'q', 't', and one 'u'."
  },
  {
    palabra: "QUINTO",
    pista1: "Category: Ordinal Number (Masculine)",
    pista2: "The 5th position (masculine).",
    pista3: "This word contains one 'i', 'n', 'o', 'q', 't', and one 'u'."
  },
  {
    palabra: "REGULAR",
    pista1: "Category: Adjective",
    pista2: "A word for 'so-so' or 'okay', not good but not bad.",
    pista3: "This word contains one 'a', 'e', 'g', 'l', 'r', and one 'u'."
  },
  {
    palabra: "REINO",
    pista1: "Category: Place (Noun)",
    pista2: "A country ruled by a King or Queen ('____ Unido' = United Kingdom).",
    pista3: "This word contains one 'e', 'i', 'n', 'o', and 'r'."
  },
  {
    palabra: "RESTAURANTE",
    pista1: "Category: Place (Noun)",
    pista2: "A place where you go to buy and eat a meal.",
    pista3: "This word contains two 'a's, two 'e's, one 'n', two 'r's, 's', two 't's, and one 'u'."
  },
  {
    palabra: "ROJO",
    pista1: "Category: Color (Adjective/Noun)",
    pista2: "The color of an apple or a stop sign.",
    pista3: "This word contains one 'j', two 'o's, and one 'r'."
  },
  {
    palabra: "ROPA",
    pista1: "Category: Noun",
    pista2: "The general word for things you wear (e.g., shirts, pants, dresses).",
    pista3: "This word contains one 'a', 'o', 'p', and 'r'."
  },
  {
    palabra: "ROSA",
    pista1: "Category: Color / Flower (Noun/Adjective)",
    pista2: "The color 'pink'; or a type of flower with thorns.",
    pista3: "This word contains one 'a', 'o', 'r', and 's'."
  },
  {
    palabra: "RUBIA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "Describes a person with yellow or light-colored hair (feminine).",
    pista3: "This word contains one 'a', 'b', 'i', 'r', and 'u'."
  },
  {
    palabra: "RUBIO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "Describes a person with yellow or light-colored hair (masculine).",
    pista3: "This word contains one 'b', 'i', 'o', 'r', and 'u'."
  },
  {
    palabra: "RUSA",
    pista1: "Category: Nationality (Feminine)",
    pista2: "A person from Russia (feminine).",
    pista3: "This word contains one 'a', 'r', 's', and 'u'."
  },
  {
    palabra: "RUSIA",
    pista1: "Category: Country (Noun)",
    pista2: "A very large country in Eastern Europe and Asia; Moscow is the capital.",
    pista3: "This word contains one 'a', 'i', 'r', 's', and 'u'."
  },
  {
    palabra: "RUSO",
    pista1: "Category: Language / Nationality (Masculine)",
    pista2: "The language of Russia; or a person from Russia (masculine).",
    pista3: "This word contains one 'o', 'r', 's', and 'u'."
  },
  {
    palabra: "SABADO",
    pista1: "Category: Day of the week (Noun)",
    pista2: "The day after 'viernes' (Friday); the first day of the weekend.",
    pista3: "This word contains two 'a's, one 'b', one 'd', one 'o', and one 's'."
  },
  {
    palabra: "SABER",
    pista1: "Category: Verb",
    pista2: "To know a fact or to know how to do something ('Yo sé hablar español').",
    pista3: "This word contains one 'a', 'b', 'e', 'r', and 's'."
  },
  {
    palabra: "SALIR",
    pista1: "Category: Verb",
    pista2: "Opposite of 'entrar' (to enter); 'to go out' or 'to leave'.",
    pista3: "This word contains one 'a', 'i', 'l', 'r', and 's'."
  },
  {
    palabra: "SEGUNDA",
    pista1: "Category: Ordinal Number (Feminine)",
    pista2: "The 2nd position (feminine).",
    pista3: "This word contains one 'a', 'd', 'e', 'g', 'n', 's', and 'u'."
  },
  {
    palabra: "SEGUNDO",
    pista1: "Category: Ordinal Number (Masculine)",
    pista2: "The 2nd position (masculine); or a unit of time (60 in a minute).",
    pista3: "This word contains one 'd', 'e', 'g', 'n', 'o', 's', and 'u'."
  },
  {
    palabra: "SEIS",
    pista1: "Category: Number (Noun)",
    pista2: "The number 6 (tres más tres).",
    pista3: "This word contains one 'e', 'i', and two 's's."
  },
  {
    palabra: "SEISCIENTAS",
    pista1: "Category: Number (Noun, Feminine)",
    pista2: "The number 600 (feminine form).",
    pista3: "This word contains one 'a', 'c', 'e', 'i', 'n', 's', 's', and 't'."
  },
  {
    palabra: "SEISCIENTOS",
    pista1: "Category: Number (Noun, Masculine)",
    pista2: "The number 600 (masculine form).",
    pista3: "This word contains one 'c', 'e', 'i', 'n', 'o', 's', 's', and 't'."
  },
  {
    palabra: "SEMANA",
    pista1: "Category: Time (Noun)",
    pista2: "A period of seven days (Monday to Sunday).",
    pista3: "This word contains two 'a's, one 'e', 'm', 'n', and 's'."
  },
  {
    palabra: "SEPTIMA",
    pista1: "Category: Ordinal Number (Feminine)",
    pista2: "The 7th position (feminine).",
    pista3: "This word contains one 'a', 'e', 'i', 'm', 'p', 's', and 't'."
  },
  {
    palabra: "SEPTIMO",
    pista1: "Category: Ordinal Number (Masculine)",
    pista2: "The 7th position (masculine).",
    pista3: "This word contains one 'e', 'i', 'm', 'o', 'p', 's', and 't'."
  },
  {
    palabra: "SEPTIEMBRE",
    pista1: "Category: Month (Noun)",
    pista2: "The ninth (9th) month of the year, after August.",
    pista3: "This word contains three 'e's, 'b', 'i', 'm', 'p', 'r', 's', and 't'."
  },
  {
    palabra: "SER",
    pista1: "Category: Verb",
    pista2: "One of the two 'to be' verbs; used for permanent traits and identity.",
    pista3: "This word contains one 'e', 'r', and 's'."
  },
  {
    palabra: "SESENTA",
    pista1: "Category: Number (Noun)",
    pista2: "The number 60 (seis por diez).",
    pista3: "This word contains one 'a', 'e', 'n', 's', 's', and 't'."
  },
  {
    palabra: "SETENTA",
    pista1: "Category: Number (Noun)",
    pista2: "The number 70 (siete por diez).",
    pista3: "This word contains two 'e's, 'a', 'n', 's', and 't'."
  },
  {
    palabra: "SETECIENTAS",
    pista1: "Category: Number (Noun, Feminine)",
    pista2: "The number 700 (feminine form).",
    pista3: "This word contains one 'a', 'c', two 'e's, 'i', 'n', 's', and 't'."
  },
  {
    palabra: "SETECIENTOS",
    pista1: "Category: Number (Noun, Masculine)",
    pista2: "The number 700 (masculine form).",
    pista3: "This word contains one 'c', two 'e's, 'i', 'n', 'o', 's', and 't'."
  },
  {
    palabra: "SEXTA",
    pista1: "Category: Ordinal Number (Feminine)",
    pista2: "The 6th position (feminine).",
    pista3: "This word contains one 'a', 'e', 's', 't', and 'x'."
  },
  {
    palabra: "SEXTO",
    pista1: "Category: Ordinal Number (Masculine)",
    pista2: "The 6th position (masculine).",
    pista3: "This word contains one 'e', 'o', 's', 't', and 'x'."
  },
  {
    palabra: "SIENTO",
    pista1: "Category: Verb / Interjection",
    pista2: "'Lo ____' means 'I'm sorry'; or (from 'sentir') 'I feel'.",
    pista3: "This word contains one 'e', 'i', 'n', 'o', 's', and 't'."
  },
  {
    palabra: "SIETE",
    pista1: "Category: Number (Noun)",
    pista2: "The number 7 (ocho menos uno).",
    pista3: "This word contains two 'e's, 'i', 's', and 't'."
  },
  {
    palabra: "SILLA",
    pista1: "Category: Furniture (Noun)",
    pista2: "A piece of furniture for one person to sit on.",
    pista3: "This word contains one 'a', 'i', two 'l's, and 's'."
  },
  {
    palabra: "SIMPATICA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "Opposite of 'antipática'; describes a 'nice' or 'friendly' person (feminine).",
    pista3: "This word contains two 'a's, 'c', 'i', 'i', 'm', 'p', 's', and 't'."
  },
  {
    palabra: "SIMPATICO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "Opposite of 'antipático'; describes a 'nice' or 'friendly' person (masculine).",
    pista3: "This word contains 'a', 'c', 'i', 'i', 'm', 'o', 'p', 's', and 't'."
  },
  {
    palabra: "SOL",
    pista1: "Category: Nature (Noun)",
    pista2: "The yellow star that gives us heat and light during the day.",
    pista3: "This word contains one 'l', 'o', and 's'."
  },
  {
    palabra: "SOLO",
    pista1: "Category: Adjective / Adverb",
    pista2: "Means 'alone' or 'only'.",
    pista3: "This word contains one 'l', two 'o's, and 's'."
  },
  {
    palabra: "SOMBRERO",
    pista1: "Category: Piece of clothing (Noun)",
    pista2: "An accessory you wear on your head to protect you from the sun.",
    pista3: "This word contains 'b', 'e', 'm', 'o', 'o', 'r', 'r', 's'."
  },
  {
    palabra: "SOY",
    pista1: "Category: Verb (from 'Ser')",
    pista2: "The 'Yo' (I) form of the verb 'ser' ('Yo ____ de España').",
    pista3: "This word contains one 'o', 's', and 'y'."
  },
  {
    palabra: "SUPERMERCADO",
    pista1: "Category: Place (Noun)",
    pista2: "A large store where you buy food, drinks, and household items.",
    pista3: "This word contains 'a', 'c', 'd', 'e', 'e', 'm', 'o', 'p', 'r', 'r', 's', 'u'."
  },
  {
    palabra: "TAL",
    pista1: "Category: Adverb / Adjective",
    pista2: "Used in the greeting '¿Qué ____?' (How are you? / What's up?).",
    pista3: "This word contains one 'a', 'l', and 't'."
  },
  {
    palabra: "TAMBIEN",
    pista1: "Category: Adverb",
    pista2: "The opposite of 'tampoco'; means 'also' or 'too'.",
    pista3: "This word contains 'a', 'b', 'e', 'i', 'm', 'n', and 't'."
  },
  {
    palabra: "TAMPOCO",
    pista1: "Category: Adverb",
    pista2: "The opposite of 'también'; means 'neither' or 'not either'.",
    pista3: "This word contains 'a', 'c', 'm', 'o', 'o', 'p', and 't'."
  },
  {
    palabra: "TARDE",
    pista1: "Category: Time (Noun, Feminine) / Adverb",
    pista2: "The part of the day after 'mañana' (morning) and before 'noche' (night); or 'late'.",
    pista3: "This word contains 'a', 'd', 'e', 'r', and 't'."
  },
  {
    palabra: "TARDES",
    pista1: "Category: Time (Noun, Plural)",
    pista2: "Used in the greeting 'Buenas ____' (Good afternoon).",
    pista3: "This word contains 'a', 'd', 'e', 'r', 's', and 't'."
  },
  {
    palabra: "TELEFONO",
    pista1: "Category: Object (Noun)",
    pista2: "A device used to speak to someone in another place.",
    pista3: "This word contains two 'e's, 'f', 'l', 'n', two 'o's, and 't'."
  },
  {
    palabra: "TELEVISION",
    pista1: "Category: Object (Noun)",
    pista2: "A device in your house where you watch movies or shows ('la tele').",
    pista3: "This word contains 'e', 'e', 'i', 'i', 'l', 'n', 'o', 's', 't', 'v'."
  },
  {
    palabra: "TENER",
    pista1: "Category: Verb",
    pista2: "The verb 'to have' or 'to possess' (e.g., '____ un coche').",
    pista3: "This word contains two 'e's, 'n', 'r', and 't'."
  },
  {
    palabra: "TENGO",
    pista1: "Category: Verb (from 'Tener')",
    pista2: "The 'Yo' (I) form of the verb 'tener' ('Yo ____ 20 años').",
    pista3: "This word contains 'e', 'g', 'n', 'o', and 't'."
  },
  {
    palabra: "TENIS",
    pista1: "Category: Sport (Noun)",
    pista2: "A sport played with a racket and a yellow ball.",
    pista3: "This word contains 'e', 'i', 'n', 's', and 't'."
  },
  {
    palabra: "TERCERA",
    pista1: "Category: Ordinal Number (Feminine)",
    pista2: "The 3rd position (feminine).",
    pista3: "This word contains 'a', 'c', 'e', 'e', 'r', 'r', and 't'."
  },
  {
    palabra: "TERCERO",
    pista1: "Category: Ordinal Number (Masculine)",
    pista2: "The 3rd position (masculine).",
    pista3: "This word contains 'c', 'e', 'e', 'o', 'r', 'r', and 't'."
  },
  {
    palabra: "TIA",
    pista1: "Category: Family (Noun, Feminine)",
    pista2: "The sister of your mother or father.",
    pista3: "This word contains 'a', 'i', and 't'."
  },
  {
    palabra: "TIEMPO",
    pista1: "Category: Noun",
    pista2: "Means 'time' or 'weather' ('¿Qué ____ hace?').",
    pista3: "This word contains 'e', 'i', 'm', 'o', 'p', and 't'."
  },
  {
    palabra: "TIENDA",
    pista1: "Category: Place (Noun)",
    pista2: "A small 'shop' where you buy things.",
    pista3: "This word contains 'a', 'd', 'e', 'i', 'n', and 't'."
  },
  {
    palabra: "TIENES",
    pista1: "Category: Verb (from 'Tener')",
    pista2: "The 'Tú' (you) form of the verb 'tener' ('¿Cuántos años ____?').",
    pista3: "This word contains two 'e's, 'i', 'n', 's', and 't'."
  },
  {
    palabra: "TINTO",
    pista1: "Category: Adjective / Noun",
    pista2: "'Vino ____' (Red wine).",
    pista3: "This word contains 'i', 'n', 'o', and 't'."
  },
  {
    palabra: "TIO",
    pista1: "Category: Family (Noun, Masculine)",
    pista2: "The brother of your mother or father.",
    pista3: "This word contains 'i', 'o', and 't'."
  },
  {
    palabra: "TRABAJADOR",
    pista1: "Category: Adjective (Masculine)",
    pista2: "Describes a person who works a lot (masculine); 'hard-working'.",
    pista3: "This word contains two 'a's, 'b', 'd', 'j', 'o', 'r', 'r', 't'."
  },
  {
    palabra: "TRABAJADORA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "Describes a person who works a lot (feminine); 'hard-working'.",
    pista3: "This word contains three 'a's, 'b', 'd', 'j', 'o', 'r', 'r', 't'."
  },
  {
    palabra: "TRABAJAR",
    pista1: "Category: Verb",
    pista2: "The action of 'to work' at a job.",
    pista3: "This word contains three 'a's, 'b', 'j', 'r', 'r', 't'."
  },
  {
    palabra: "TRECE",
    pista1: "Category: Number (Noun)",
    pista2: "The number 13 (diez más tres).",
    pista3: "This word contains 'c', 'e', 'e', 'r', 't'."
  },
  {
    palabra: "TREINTA",
    pista1: "Category: Number (Noun)",
    pista2: "The number 30 (tres por diez).",
    pista3: "This word contains 'a', 'e', 'i', 'n', 'r', 't', 't'."
  },
  {
    palabra: "TRES",
    pista1: "Category: Number (Noun)",
    pista2: "The number 3 (uno más dos).",
    pista3: "This word contains 'e', 'r', 's', 't'."
  },
  {
    palabra: "TRESCIENTAS",
    pista1: "Category: Number (Noun, Feminine)",
    pista2: "The number 300 (feminine form).",
    pista3: "This word contains 'a', 'c', 'e', 'e', 'i', 'n', 'r', 's', 's', 't', 't'."
  },
  {
    palabra: "TRESCIENTOS",
    pista1: "Category: Number (Noun, Masculine)",
    pista2: "The number 300 (masculine form).",
    pista3: "This word contains 'c', 'e', 'e', 'i', 'n', 'o', 'r', 's', 's', 't', 't'."
  },
  {
    palabra: "UNIDO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "'Reino ____' (United Kingdom) or 'Estados ____s' (United States).",
    pista3: "This word contains 'd', 'i', 'n', 'o', 'u'."
  },
  {
    palabra: "UNIDOS",
    pista1: "Category: Adjective (Masculine, Plural)",
    pista2: "'Estados ____' (United States).",
    pista3: "This word contains 'd', 'i', 'n', 'o', 's', 'u'."
  },
  {
    palabra: "UNIVERSIDAD",
    pista1: "Category: Place (Noun)",
    pista2: "A place where you study *after* 'colegio' (school); (e.g., Harvard, Oxford).",
    pista3: "This word contains 'a', 'd', 'd', 'e', 'i', 'i', 'n', 'r', 's', 'u', 'v'."
  },
  {
    palabra: "UNO",
    pista1: "Category: Number (Noun)",
    pista2: "The number 1.",
    pista3: "This word contains 'n', 'o', 'u'."
  },
  {
    palabra: "USTED",
    pista1: "Category: Pronoun",
    pista2: "The formal, polite way to say 'you' (singular).",
    pista3: "This word contains 'd', 'e', 's', 't', 'u'."
  },
  {
    palabra: "USTEDES",
    pista1: "Category: Pronoun",
    pista2: "The polite way to say 'you' (plural); or the standard 'you' (plural) in Latin America.",
    pista3: "This word contains 'd', 'e', 'e', 's', 's', 't', 'u'."
  },
  {
    palabra: "VER",
    pista1: "Category: Verb",
    pista2: "The action of 'to see' with your eyes.",
    pista3: "This word contains 'e', 'r', 'v'."
  },
  {
    palabra: "VERANO",
    pista1: "Category: Season (Noun)",
    pista2: "The hottest season of the year, when people go to the beach.",
    pista3: "This word contains 'a', 'e', 'n', 'o', 'r', 'v'."
  },
  {
    palabra: "VERDE",
    pista1: "Category: Color (Adjective/Noun)",
    pista2: "The color of grass or trees.",
    pista3: "This word contains 'd', 'e', 'e', 'r', 'v'."
  },
  {
    palabra: "VERDURA",
    pista1: "Category: Food (Noun)",
    pista2: "Food that is a plant (e.g., carrots, broccoli, spinach).",
    pista3: "This word contains 'a', 'd', 'e', 'r', 'r', 'u', 'v'."
  },
  {
    palabra: "VESTIDO",
    pista1: "Category: Piece of clothing (Noun)",
    pista2: "A piece of clothing for women that covers the body and legs.",
    pista3: "This word contains 'd', 'e', 'i', 'o', 's', 't', 'v'."
  },
  {
    palabra: "VESTIRSE",
    pista1: "Category: Verb (Reflexive)",
    pista2: "The action of putting clothes on your body.",
    pista3: "This word contains 'e', 'e', 'i', 'r', 's', 's', 't', 'v'."
  },
  {
    palabra: "VIAJAR",
    pista1: "Category: Verb",
    pista2: "The action of 'to travel' to another city or country.",
    pista3: "This word contains 'a', 'a', 'i', 'j', 'r', 'v'."
  },
  {
    palabra: "VIERNES",
    pista1: "Category: Day of the week (Noun)",
    pista2: "The day after 'jueves' (Thursday); the last day of the work week.",
    pista3: "This word contains 'e', 'e', 'i', 'n', 'r', 's', 'v'."
  },
  {
    palabra: "VIEJA",
    pista1: "Category: Adjective (Feminine)",
    pista2: "Opposite of 'nueva' (new) or 'joven' (young) (feminine).",
    pista3: "This word contains 'a', 'e', 'i', 'j', 'v'."
  },
  {
    palabra: "VIEJO",
    pista1: "Category: Adjective (Masculine)",
    pista2: "Opposite of 'nuevo' (new) or 'joven' (young) (masculine).",
    pista3: "This word contains 'e', 'i', 'j', 'o', 'v'."
  },
  {
    palabra: "VIENTO",
    pista1: "Category: Weather (Noun)",
    pista2: "Moving air ('Hace ____' = It is windy).",
    pista3: "This word contains 'e', 'i', 'n', 'o', 't', 'v'."
  },
  {
    palabra: "VINO",
    pista1: "Category: Drink (Noun)",
    pista2: "An alcoholic drink made from grapes (it can be 'tinto' or 'blanco').",
    pista3: "This word contains 'i', 'n', 'o', 'v'."
  },
  {
    palabra: "VEINTE",
    pista1: "Category: Number (Noun)",
    pista2: "The number 20 (diez más diez).",
    pista3: "This word contains 'e', 'e', 'i', 'n', 't', 'v'."
  },
  {
    palabra: "VENTANA",
    pista1: "Category: Object (Noun)",
    pista2: "The glass part of a wall in a house or car that you look through.",
    pista3: "This word contains 'a', 'a', 'e', 'n', 'n', 't', 'v'."
  },
  {
    palabra: "VENIR",
    pista1: "Category: Verb",
    pista2: "The action of 'to come' to a place.",
    pista3: "This word contains 'e', 'i', 'n', 'r', 'v'."
  },
  {
    palabra: "VIVIR",
    pista1: "Category: Verb",
    pista2: "The action of 'to live' (e.g., 'Yo vivo en Madrid').",
    pista3: "This word contains 'i', 'i', 'r', 'v', 'v'."
  },
  {
    palabra: "VOLVER",
    pista1: "Category: Verb",
    pista2: "The action of 'to return' or 'to come back' to a place.",
    pista3: "This word contains 'e', 'l', 'o', 'r', 'v', 'v'."
  },
  {
    palabra: "VOSOTRAS",
    pista1: "Category: Pronoun (Feminine, Plural)",
    pista2: "The pronoun for 'you' (plural, feminine, used in Spain).",
    pista3: "This word contains 'a', 'o', 'o', 'r', 's', 's', 't', 'v'."
  },
  {
    palabra: "VOSOTROS",
    pista1: "Category: Pronoun (Masculine, Plural)",
    pista2: "The pronoun for 'you' (plural, masculine/mixed, used in Spain).",
    pista3: "This word contains 'o', 'o', 'o', 'r', 's', 's', 't', 'v'."
  },
  {
    palabra: "ZAPATOS",
    pista1: "Category: Piece of clothing (Noun, plural)",
    pista2: "You wear these on your feet (e.g., shoes, trainers).",
    pista3: "This word contains 'a', 'a', 'o', 'p', 's', 't', 'z'."
  },
  {
    palabra: "ZUMO",
    pista1: "Category: Drink (Noun)",
    pista2: "A drink made from fruit (common in Spain); '____ de naranja'.",
    pista3: "This word contains 'm', 'o', 'u', 'z'."
  }
];
