export async function GET() {
  const index = Math.floor(Math.random() * phrases.length);

  const phrase = phrases[index];

  return new Response(JSON.stringify(phrase));
}

const phrases = [
  {
    phrase: "Fallé una y otra vez en mi vida. Por eso conseguí el éxito",
    author: "Michael Jordan",
  },
  {
    phrase: "No importa qué tan lento vayas, siempre y cuando no te detengas.",
    author: "Confucio",
  },
  {
    phrase:
      "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    author: "Vidal Sassoon",
  },
  {
    phrase:
      "El fracaso es la oportunidad de comenzar de nuevo con más inteligencia.",
    author: "Henry Ford",
  },
  {
    phrase:
      "El éxito es la suma de pequeños esfuerzos, repetidos día tras día.",
    author: "Robert Collier",
  },
  {
    phrase: "La única manera de hacer un gran trabajo es amar lo que haces.",
    author: "Steve Jobs",
  },
  {
    phrase: "No cuentes los días, haz que los días cuenten.",
    author: "Muhammad Ali",
  },
  {
    phrase:
      "Cree en ti mismo y en todo lo que eres. Sé consciente de que hay algo dentro de ti que es más grande que cualquier obstáculo.",
    author: "Christian D. Larson",
  },
  {
    phrase: "La clave del éxito es comenzar antes de estar listo.",
    author: "Marie Forleo",
  },
  {
    phrase: "El 80% del éxito se basa simplemente en insistir.",
    author: "Woody Allen",
  },
  {
    phrase:
      "No tienes que ser grande para empezar, pero tienes que empezar para ser grande.",
    author: "Zig Ziglar",
  },
  {
    phrase: "El secreto para salir adelante es comenzar.",
    author: "Mark Twain",
  },
  {
    phrase: "La acción es la clave fundamental para todo éxito.",
    author: "Pablo Picasso",
  },
  {
    phrase: "La disciplina es el puente entre metas y logros.",
    author: "Jim Rohn",
  },
  {
    phrase:
      "El éxito no es definitivo, el fracaso no es fatal: lo que realmente cuenta es el valor para continuar",
    author: "Winston Churchill",
  },
  {
    phrase:
      "La diferencia entre lo ordinario y lo extraordinario es ese pequeño extra.",
    author: "Jimmy Johnson",
  },
  {
    phrase:
      "La motivación es lo que te pone en marcha, el hábito es lo que hace que sigas.",
    author: "Jim Ryun",
  },
  {
    phrase: "No hay ascensor al éxito, tienes que tomar las escaleras.",
    author: "Zig Ziglar",
  },
  {
    phrase: "No dejes que el miedo a perder sea mayor que la emoción de ganar.",
    author: "Robert Kiyosaki",
  },
  {
    phrase: "Si puedes soñarlo, puedes hacerlo.",
    author: "Walt Disney",
  },
  {
    phrase: "La mejor manera de predecir el futuro es crearlo.",
    author: "Peter Drucker",
  },
  {
    phrase:
      "El éxito no se mide por lo que logras, sino por los obstáculos que superas.",
    author: "Booker T. Washington",
  },
  {
    phrase: "La vida es 10% lo que nos ocurre y 90% cómo reaccionamos a ello.",
    author: "Charles R. Swindoll",
  },
  {
    phrase: "El fracaso es el condimento que da al éxito su sabor.",
    author: "Truman Capote",
  },
  {
    phrase: "Si crees que puedes, ya estás a medio camino.",
    author: "Theodore Roosevelt",
  },
  {
    phrase:
      "El mayor placer de la vida es hacer lo que la gente dice que no puedes hacer.",
    author: "Walter Bagehot",
  },
  {
    phrase:
      "El único límite a nuestros logros de mañana es nuestra duda de hoy.",
    author: "Franklin D. Roosevelt",
  },
  {
    phrase: "Nunca es demasiado tarde para ser lo que podrías haber sido.",
    author: "George Eliot",
  },
  {
    phrase:
      "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que estás haciendo, tendrás éxito.",
    author: "Albert Schweitzer",
  },
  {
    phrase:
      "La vida es como andar en bicicleta: para mantener el equilibrio, debes seguir avanzando.",
    author: "Albert Einstein",
  },
  {
    phrase:
      "Cuanto más difícil es la victoria, mayor es la felicidad de ganar.",
    author: "Pelé",
  },
  {
    phrase: "El miedo solo sirve para perderlo todo.",
    author: "Manuel Belgrano",
  },
  {
    phrase: "Una derrota peleada vale más que una victoria casual.",
    author: "José de San Martín",
  },
  {
    phrase: "Siempre es temprano para rendirse.",
    author: "Norman Vincent Peale",
  },
  {
    phrase: "Lo que haces hoy puede mejorar todos tus mañanas.",
    author: "Ralph Marston",
  },
  {
    phrase: "No es que tengamos poco tiempo, es que perdemos mucho.",
    author: "Séneca",
  },
  {
    phrase:
      "Cualquiera que no esté cometiendo errores es que no está intentándolo lo suficiente.",
    author: "Wess Roberts",
  },
  {
    phrase:
      "Confiar en ti mismo no garantiza el éxito, pero no hacerlo garantiza el fracaso.",
    author: "Albert Bandura",
  },
  {
    phrase:
      "Lo único que podemos decidir es qué hacer con el tiempo que se nos ha dado.",
    author: "J.R.R. Tolkien",
  },
];
