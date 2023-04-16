// Url Api 
const urlApi = "http://localhost:5678/api/";

// Liste des travaux (initialisée à vide)
let works = [];

async function allWorks() {
  try {
    const response = await fetch(urlApi + 'works', {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Unexpected Error');
    }

    // Extrait les données JSON de la réponse
    const data = await response.json();

    // Stocke les travaux dans la variable "works"
    works = data;

    // Retourne les travaux
    return works;

  } catch (error) {
    // Affiche une alerte avec le message d'erreur
    alert(error.message);
    throw error;
  }
}
//console.log(allWorks())

// Catgéories 

async function allCategories() {
    try {
      const response = await fetch(urlApi + 'categories', {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Unexpected Error');
      }
  
      // Extrait les données JSON de la réponse
      const categories = await response.json();
  
      // Retourne les catégories
      return categories;
  
    } catch (error) {
      // Affiche une alerte avec le message d'erreur
      alert(error.message);
      throw error;
    }
  }
  
  console.log(allCategories());

