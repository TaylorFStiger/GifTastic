 // Initial array of Celebrities
            var celebArray = ["Kim Kardashian", "The Rock", "Brad Pitt", "Cardi B", "Ru Paul", "Stephen Colbert",
                "Donald Trump", "Michael Jackson", "Cher",];
                $(document).ready(function() {
            // displayCelebGifs function re-renders the HTML to display the appropriate content
            function displayCelebGifs() {

                var celebrity = $(this).attr("data-name");
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celebrity + "&rating=g&apikey=L94hbGrxJuaN05sXucGR4YWW9ZYnX7wR&limit=10";

                // Creating an AJAX call for the specific celeb button being clicked
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {

                    console.log(response);

                    var results = response.data;

                    // Creating a div to hold the celebrity gifs
                    var celebDiv = $("<div class='celebrity'>");

                    //  loop through the results
                    for (var i = 0; i < results.length; i++) {

                        var dataImage = $("<img>");
                        dataImage.attr("src", results[i].images.fixed_height_still.url);
                        dataImage.attr("data-still", results[i].images.fixed_height_still.url);
                        dataImage.attr("data-animate", results[i].images.fixed_height.url);
                        dataImage.addClass("gif");
                        dataImage.attr("data-state", "animate");


                        var newItemdiv = $('<div class="newItem">');
                        var gifRating = results[i].rating;
                        var divRating = $("<p>").text("Rating: " + gifRating);

                        newItemdiv.append(divRating);
                        newItemdiv.append(dataImage);

                        celebDiv.prepend(newItemdiv);


                        //  Putting the celeb in front of the previous celebs
                        $("#celebrity-view").prepend(celebDiv);

                        dataImage.on("click", function () {
                            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                            var state = $(this).attr("data-state");
                            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                            // Then, set the image's data-state to animate
                            // Else set src to the data-still value
                            if (state === "still") {
                                $(this).attr("src", $(this).attr("data-animate"));
                                $(this).attr("data-state", "animate");
                            } else {
                                $(this).attr("src", $(this).attr("data-still"));
                                $(this).attr("data-state", "still");
                            }
                        });



                    }
                });

            }

            // Function for displaying movie data
            function renderButtons() {

                // Deleting the movies prior to adding new movies
                // (this is necessary otherwise you will have repeat buttons)
                $("#buttons-view").empty();

                // Looping through the array of celebrities
                for (var i = 0; i < celebArray.length; i++) {

                    // Then dynamicaly generating buttons for each celebrity in the array
                    var a = $("<button>");
                    // Adding a class of celeb-btn to our button
                    a.addClass("celeb-btn");
                    // Adding a data-attribute
                    a.attr("data-name", celebArray[i]);
                    // Providing the initial button text
                    a.text(celebArray[i]);
                    // Adding the button to the buttons-view div
                    $("#buttons-view").append(a);
                }
            }

            // This function handles events where a celebrity button is clicked
            $("#add-celeb").on("click", function (event) {
                event.preventDefault();
                // This line grabs the input from the textbox
                var celebrity = $("#celeb-input").val().trim();

                // Adding movie from the textbox to our array
                celebArray.push(celebrity);

                // Calling renderButtons which handles the processing of our movie array
                renderButtons();
            });

            // Adding a click event listener to all elements with a class of "movie-btn"
            $(document).on("click", ".celeb-btn", displayCelebGifs);

            // Calling the renderButtons function to display the intial buttons
            renderButtons()
            
        });