
const Http = new XMLHttpRequest();
const randomFoxUrl = 'https://randomfox.ca/floof/';

function getFoxPicture(elementId, resultId){

    var result;

    document.getElementById(elementId).onclick = (() => {

        fetch(randomFoxUrl, 
            {
                method: "GET",
            })
            .catch((exception) => console.log("Exception!!:" + exception))
            .then(
                async (response) => {
                    result = await response.json();
                    console.log(JSON.stringify(result));

                    var element = document.getElementById(resultId);
                    var img = document.createElement('img');
                    img.src = result.image;
                    element.innerHTML = "";
                    element.appendChild(img);
                }
            )
        }
    );
}


