// In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:
// Recuperare la ricetta da https://dummyjson.com/recipes/{id}
// Estrarre la proprietà userId dalla ricetta
// Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
// Restituire la data di nascita dello chef
// Note del docente
// Scrivi la funzione getChefBirthday(id), che deve:
// Essere asincrona (async).
// Utilizzare await per chiamare le API.
// Restituire una Promise con la data di nascita dello chef.
// Gestire gli errori con try/catch

async function fetchJson(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
}

const getChefBirthday = async (id) => {
  let ricetta;
  let chef;
  try {
    ricetta = await fetchJson(`https://dummyjson.com/recipes/${id}`);
  } catch (error) {
    throw new Error(`non è stato possibile recuperare ricetta con id ${id}`);
  }

  if (ricetta.message) {
    throw new Error(ricetta.message);
  }

  try {
    const chef = await fetchJson(
      `https://dummyjson.com/users/${ricetta.userId}`
    );
  } catch (error) {
    throw new Error(
      `non è stato possibile trovare lo chef con userID ${ricetta.userId}`
    );
  }

  if (chef.message) {
    throw new Error(chef.message);
  }

  return { ...ricetta, chef };
};

(async () => {
  try {
    const ricetta = await getChefBirthday(1);
    console.log(`ricetta competa: `, ricetta);
  } catch (error) {
    console.error(error);
  } finally {
    console.log(`fine!`);
  }
})();
