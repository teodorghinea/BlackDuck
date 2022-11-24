const Http = new XMLHttpRequest();
const randomFoxUrl = 'https://randomfox.ca/floof/';

function getFoxPicture(resultId) {

    var result;
    var element = document.getElementById(resultId);
    element.innerHTML = "Asteapta putin ..."


    fetch(randomFoxUrl, {
            method: "GET",
        })
        .catch((exception) => console.log("Exception!!:" + exception))
        .then(
            async (response) => {

                element.innerHTML = "Asteapta putin ..."

                result = await response.json();
                console.log(JSON.stringify(result));

                var img = document.createElement('img');
                img.src = result.image;

                element.innerHTML = null;
                element.appendChild(img);       
            }
        )
}