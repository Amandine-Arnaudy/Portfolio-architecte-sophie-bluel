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

// Modale 1
// Galerie Photo 
const urlWorks = "http://localhost:5678/api/works";

fetch(urlWorks)
    .then((response) => {
        if (!response.ok) {
            if (response.status === 500) {
                throw new Error(`	
                Unexpected Error`);
            } else if (response.status === 401) {
                throw new Error(`	
                Unauthorized`);
            }
        }
        return response.json();
    })
    .then((works) => {
        const figuresContainer = document.querySelector("#modal_figures");

        for (let projets in works) {

            // Figures
            const figureModal = document.createElement("figure");
            figureModal.setAttribute("class", "modal_figure");
            //figureModal.setAttribute("data-id-work-modal", works[projets].id); 

            // Images
            const imageModal = document.createElement("img");
            imageModal.setAttribute("class", "modal_works");
            imageModal.setAttribute("src", works[projets].imageUrl);
            imageModal.setAttribute("alt", works[projets].title);

            // Icons 
            const iconDeleteModal = document.createElement("i");
            const iconMoveModal = document.createElement("i");
            iconDeleteModal.setAttribute("class", "delete-btn fa-solid fa-trash-can");
            iconMoveModal.setAttribute("class", "move-btn fa-solid fa-arrows-up-down-left-right");

            // marche pas ? 
            iconMoveModal.style.display = "none";
            figureModal.addEventListener("mouseover", () => {
                iconMoveModal.style.display = "block";
            });
            figureModal.addEventListener("mouseout", () => {
                iconMoveModal.style.display = "none";
            });

            // Figcaption
            const captionModal = document.createElement("figcaption");
            const linkCaptionModal = document.createElement("a");
            linkCaptionModal.setAttribute("href", "#");
            linkCaptionModal.textContent = "éditer";
            document.querySelector("#empty-gallery-msg").style.display = "none";

            // AppendChilds
            figureModal.appendChild(imageModal);
            figureModal.appendChild(iconDeleteModal);
            figureModal.appendChild(iconMoveModal);
            captionModal.appendChild(linkCaptionModal);
            figureModal.appendChild(captionModal);

            figuresContainer.appendChild(figureModal);
        }
    })



// Modale 2
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

