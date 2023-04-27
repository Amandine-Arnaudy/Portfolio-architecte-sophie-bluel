// Modale 

const aLink = document.querySelector("#portfolio a");
const modal1 = document.querySelector("#modal_1");
const closeModal = document.querySelector("#modal_close");
const addPhoto = document.querySelector(".submit_button");
const modal2 = document.querySelector("#modal_2");
const closeModal2 = document.querySelector("#modal_close2");
const arrowModal = document.querySelector("#modal_arrow");

// Ouverture modale 
aLink.addEventListener('click', function () {
    modal1.style.display = "flex";
});

// Fermeture Modale sur la croix
closeModal.addEventListener('click', function () {
    modal1.style.display = "none";

});

// Fermeture Modale en dehors de la fenêtre
window.addEventListener("click", (event) => {
    // Vérifie si le clic a été effectué en dehors de la fenêtre modale
    if (event.target === modal1) {
        // Ferme la fenêtre modale
        modal1.style.display = "none";
    }
});

window.addEventListener("click", (event) => {
    // Vérifie si le clic a été effectué en dehors de la fenêtre modale
    if (event.target === modal2) {
        // Ferme la fenêtre modale
        modal2.style.display = "none";
    }
});

// Ouverture modale 2
addPhoto.addEventListener('click', function () {
    modal1.style.display = "none";
    modal2.style.display = "flex";
});

// Fermeture Modale sur la croix
closeModal2.addEventListener('click', function () {
    modal2.style.display = "none";
});

arrowModal.addEventListener('click', function () {
    modal1.style.display = "flex";
    modal2.style.display = "none";
});

// Modale 1 - Supression travaux 

// URL de l'API qui fournit les projets
const urlWorks = "http://localhost:5678/api/works";
const token = sessionStorage.getItem("token");

// Fonction pour afficher les projets dans la modal
async function displayProjects() {
    try {
        const response = await fetch(urlWorks);
        if (!response.ok) {
            if (response.status === 500) {
                throw new Error('Unexpected Error');
            } else if (response.status === 401) {
                throw new Error('Unauthorized');
            }
        }
        const works = await response.json();
        const figuresContainer = document.querySelector("#modal_figures");
        figuresContainer.innerHTML = ""; // vide le conteneur avant d'afficher les projets
        if (works.length === 0) {
            document.querySelector("#empty-gallery-msg").style.display = "block"; // affiche le message "galerie vide"
            return;
        } else {
            document.querySelector("#empty-gallery-msg").style.display = "none";
        }
        for (let project of works) {
            const figureModal = document.createElement("figure");
            figureModal.setAttribute("class", "modal_figure");
            const imageModal = document.createElement("img");
            imageModal.setAttribute("class", "modal_works");
            imageModal.setAttribute("src", project.imageUrl);
            imageModal.setAttribute("alt", project.title);
            const deleteBtn = document.createElement("div");
            deleteBtn.classList.add("delete-btn");
            const iconDeleteModal = document.createElement("i");
            iconDeleteModal.classList.add("fa-solid", "fa-trash-can");
            const iconMoveModal = document.createElement("i");
            iconMoveModal.setAttribute(
                "class",
                "move-btn fa-solid fa-arrows-up-down-left-right"
            );
            iconMoveModal.style.display = "none";
            figureModal.addEventListener("mouseover", () => {
                iconMoveModal.style.display = "block";
            });
            figureModal.addEventListener("mouseout", () => {
                iconMoveModal.style.display = "none";
            });
            const captionModal = document.createElement("figcaption");
            const linkCaptionModal = document.createElement("a");
            linkCaptionModal.setAttribute("href", "#");
            linkCaptionModal.textContent = "éditer";
            figureModal.appendChild(imageModal);
            figureModal.appendChild(deleteBtn);
            deleteBtn.appendChild(iconDeleteModal);
            figureModal.appendChild(iconMoveModal);
            captionModal.appendChild(linkCaptionModal);
            figureModal.appendChild(captionModal);
            figuresContainer.appendChild(figureModal);
            // Ajoute un événement de clic sur l'icône de suppression pour chaque projet
            deleteBtn.addEventListener("click", async () => {
                try {
                    const response = await fetch(`${urlWorks}/${project.id}`, {
                        method: "DELETE",
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (response.ok) {
                        alert("Projet supprimé avec succès.");
                        // supprime la figure correspondant au projet de la modal
                        figureModal.style.display = "none";
                        // supprime la figure correspondant au projet sur la page d'accueil
                        const figure = document.querySelector(`#figure_${project.id}`);
                        if (figure) {
                            figure.remove();
                        }
                    } else {
                        alert("La suppression du projet a échoué.");
                    }
                } catch (error) {
                    console.error(error);
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
}

displayProjects();

// Modale 2 - Ajout tarvaux
const imagePreview = document.getElementById("imagePreview");
imagePreview.style.display = "none";

function previewImage(event) {
    const file = event.target.files[0]; // Vérifie si un fichier a été sélectionné
    if (file) {
        if (file.type.match("image.*")) {
            if (file.size <= 4194304) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    imagePreview.src = event.target.result;
                    document.getElementById("imagePreview").style.display = "block";
                    document.getElementsByClassName("image_container")[0].style.display = "none";
                    document.getElementById("input_image_container").style.display = "none";
                    imagePreview.style.display = "block";
                };
                reader.readAsDataURL(file);
            } else {
                alert("Le fichier dépasse la taille maximale autorisée de 4 Mo.");
                imagePreview.style.display = "none";
            }
        } else {
            alert("Le fichier sélectionné n'est pas une image.");
            imagePreview.innerHTML = "";
            imagePreview.style.display = "none";
        }
    } else {
        imagePreview.style.display = "none";
    }
}

