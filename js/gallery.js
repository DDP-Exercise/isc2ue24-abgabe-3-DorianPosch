"use strict";

/**
 * Selects a random full image at the start and displays it.
 */
function showRandomImageAtStart() {
    // TODO: Select all 6 links (<a>) in the thumbnail section. They contain the URLs to the full images.
    const thumbnails = document.getElementsByClassName("card-link");
    // TODO: Select a random entry out of these 6.
    const randomInt = getRandomInt(0, thumbnails.length);
    const randomPic = thumbnails[randomInt];
    // TODO: Implement switchFullImage() below.
    // TODO: Call switchFullImage() with the URL of the random image and the alt attribute of the thumbnail (it contains the description).
    switchFullImage(randomPic.getAttribute("url"), randomPic.getAttribute("alt"));
    // TODO: Set a background color (classes .bg-dark and .text-white) to the card-body of your random image (hint: it's the sibling element of your link).
    const cradBodyRandomPic = randomPic.children;
    cardBodyRandomPic.classList.add(".bg-dark", ".text-white");
}

/**
 * Prepare the links on the full images so that they execute the following tasks:
 * - Switch the full image to the one that has been clicked on.
 * - Set the highlight under the current thumbnail.
 * - Load the notes for the current image.
 */
function prepareLinks() {
    // TODO: Select all the 6 links (<a>) in the thumbnail section.
    const thumbnails = document.getElementsByClassName("card-link");
    // TODO: Set an event listener for the click event on every <a> element.
    //  (or advanced: think of a way to do it with one single handler)
    for(let i = 0; i < thumbnails; i++ ){
        thumbnails[i].addEventListener("click", function (event){
    // TODO: The callback of the listener should do the following things:
    //  - Remove the .bg-dark and .text-white classes from the card where it's currently set.
    //  - Add both classes again to the card where the click happened (hint: "this" contains the very <a> element, where the click happened).
    //  - Call switchFullImage() with the URL clicked link and the alt attribute of the thumbnail.
    //  - Implement and then call loadNotes() with the key for the current image (hint: the full image's URL makes an easy and unique key).
    //  - Prevent the default action for the link (we don't want to follow it).
            thumbnail.addEventListener("click", function(event) {
                const currentCard = this.parentElement;
                const currentImageURL = this.getAttribute("href");
                const imageDescription = this.children[0].getAttribute("alt");
                switchFullImage(currentImageURL, imageDescription);
                const allCards = document.getElementsByClassName("card");
                for (const card of allCards) {
                    card.classList.remove("bg-dark", "text-white");
                }
                currentCard.classList.add("bg-dark", "text-white");
                const key = currentImageURL;
                loadNotes(key);
                event.preventDefault();
            });
        })
    }
}

/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
function storeNotes() {
    // TODO: Select the notes field and add a blur listener.
    const noteField = document.getElementById("notes");
    noteField.addEventListener("blur", function (){
        // TODO: When the notes field loses focus, store the notes for the current image in the local storage.
        const currentUrl = document.querySelector("#fullImage img").getAttribute("src");
        const key = currentUrl;
        // TODO: If the notes field is empty, remove the local storage entry.
        if(noteField.textContent === ""){
            localStorage.removeItem(key);
        }else {
            localStorage.setItem(key, currentUrl);
        }
        // TODO: Choose an appropriate key (hint: the full image's URL makes an easy and unique key).
    })


}

/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */
function switchFullImage(imageUrl, imageDescription) {
    // TODO: Get the <img> element for the full image. Select it by its class or tag name.
    const fullImage = document.getElementsByTagName("img");
    // TODO: Set its src and alt attributes with the values from the parameters (imageUrl, imageDescription).
    fullImage.setAttribute("scr", imageUrl);
    fullImage.setAttribute("alt", imageDescription);
    // TODO: Select the <figcaption> element.
    const figCap = document.getElementsByTagName("figcaption");
    // TODO: Set the description (the one you used for the alt attribute) as its text content.
    figCap.textContent = imageDescription;
}

/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
    // TODO: Select the notes field.
    const noteField = document.getElementById("notes");
    // TODO: Check the local storage at the provided key.
    //  - If there's an entry, set the notes field's HTML content to the local storage's content.
    //  - If there's no entry, set the default text "Enter your notes here!".
    const notes = localStorage.getItem(key);
    noteField.textContent = notes ? notes : "Enter your notes here!";
}

/**
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets the whole thing started.
 */
showRandomImageAtStart();
prepareLinks();
storeNotes();
