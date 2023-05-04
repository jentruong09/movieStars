let movieNameSearched = document.getElementById("search-input");
let searchBtn = document.getElementById("search-btn");
let searchResult = document.getElementById("search-results");
let resultContainer = document.getElementById("container");
let movieCloseBtn = document.getElementById("movie-close-btn");

// fetch API data
let getMovie = () => {
    let movieName = movieNameSearched.value
    

    if (movieName.length <= 0) {
        searchResult.innerHTML = `<h3 class="error-msg">Please Enter A Movie Name</h3>`;
      }
      //If input field is NOT empty
      else {
        fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=${key}`)
          .then((response) => response.json())
          .then((data) => {
            //If movie exists in database
            if (data.Response == "True") {
                console.log(data)
                
              searchResult.innerHTML = `
                <div class="info">
                    <img src=${data.Poster} class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <i class='bx bxs-star'></i>
                            <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="details">
                            <span>Rated: ${data.Rated}</span>
                            <span>Year: ${data.Year}</span>
                            <span>Runtime: ${data.Runtime}</span>
                        </div>
                        <div class="genre">
                            <div>${data.Genre.split(",").join("</div><div>")}</div>
                        </div>
                    </div>
                </div>
                <h3>Plot:</h3>
                <p>${data.Plot}</p>
                <h3>Cast:</h3>
                <p>${data.Actors}</p>
                
            `;
            resultContainer.style.display = "inline"
            }
            //if movie does not exists in database
            else {
                searchResult.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
                resultContainer.style.display = "inline"
            }
          })
          //if error occurs
          .catch(() => {
            searchResult.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            resultContainer.style.display = "inline"
          });
      }
};

//event listeners
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
movieCloseBtn.addEventListener("click", () => {
    //console.log("clicked")
    resultContainer.style.display = "none"
});