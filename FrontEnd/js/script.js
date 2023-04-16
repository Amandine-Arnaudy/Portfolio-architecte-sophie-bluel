// Url Api 
const urlApi = "http://localhost:5678/api/";

// Liste des travaux (initialisée à vide)
let works = [];


async function allWorks() {

    try {
        const response = await fetch(urlApi + 'works', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
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
        window.localStorage.setItem('works', JSON.stringify(works));

        generateGallery(works);

        // Retourne les travaux
        return works;

    } catch (error) {

        // Affiche une alerte avec le message d'erreur
        alert(error.message);
        throw error;
    }

}


// Catégories
async function categoriesButtons() {

    const response = await fetch(urlApi + 'categories',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

    const portfolio = document.querySelector('#portfolio');
    const myProject = document.createElement('h2');
    myProject.textContent = 'Mes Projets';

    if (window.sessionStorage.getItem('token') === null) {
        const categories = await response.json();

        const filtersButtons = document.createElement('div');
        filtersButtons.classList.add('categories');
        const categoriesButtons = document.createElement('button');
        categoriesButtons.textContent = 'Tous';
        categoriesButtons.classList.add('btn', 'all');
        filtersButtons.appendChild(categoriesButtons);
        portfolio.prepend(filtersButtons);
        portfolio.prepend(myProject);
        for (let categorie of categories) {
            console.log(categorie);
            const button = document.createElement('button');
            button.setAttribute('class', 'btn');
            button.setAttribute('data-category-id', `${categorie.id}`);
            button.textContent = `${categorie.name}`;
            console.log(button.dataset.categoryId);
            filtersButtons.appendChild(button);
        }

        let buttons = document.querySelectorAll('.btn');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', showCategories);
        }
    } else {
        //const works = JSON.parse(window.localStorage.getItem('works'));

    }
}


// Filtre à travers les catégories
function showCategories(event) {
    const works = JSON.parse(localStorage.getItem('works'));
    if (event.target.nodeName === 'BUTTON' && event.target.className === 'btn all') {
        allWorks();
    } else if (event.target.nodeName === 'BUTTON' && event.target.dataset.categoryId) {
        const workCategory = works.filter(i => i.categoryId == `${event.target.dataset.categoryId}`);
        generateGallery(workCategory);
    }
}

// Génère les catégories
function generateGallery(works) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    for (let projet of works) {
        gallery.innerHTML += `<figure>
		 				<img src="${projet.imageUrl}" alt="${projet.title}">
		 				<figcaption>${projet.title}</figcaption>`;
    }
}



allWorks();
categoriesButtons();

