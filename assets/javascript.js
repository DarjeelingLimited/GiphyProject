$(document).ready(function () {

    // console.log("ready!");

    // set an array of gifs
    var topics = ["New York", "Comedy ", "Live", "Actor", "Funny", "Dance", "Laughs", "Music", "Slapstick", "News"];
    topics.reverse();
    console.log(topics);

    // create a button per array item
    //add the attribute data-snl to each gif

    function createButtons() {

        var buttons = new Array();

        for (var i = 0; i < topics.length; i++) {
            $("#buttonGif").prepend('<button type="button" class="btn btn-primary mx-1" data-snl="' + topics[i] + '-snl' + '">' + topics[i] + '</button>');
        }
    }

    createButtons();
    gifSearch();


    // // Adding click event listen listener to all buttons
    function gifSearch() {



        $("button").on("click", function () {

            //empty out the gifs from the previous button's click (i.e. so it's not 10 + 10)
            $("#gifs-appear-here").empty();

            // In this case, the "this" keyword refers to the button that was clicked
            // Grabbing and storing the data-snl property value from the button
            var gif = $(this).attr("data-snl");
            console.log(gif);

            // Constructing a URL to search Giphy for the snl name
            var queryURL = "https://api.giphy.com/v1/gifs/search?&q=" + gif + "&api_key=jBqHsEOrrjaD8mVUXWjKGP6CJkoHXPMo&limit=10";


            // Performing our AJAX GET request
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                // the callback - run a function off the input (a response)
                .then(function (response) {
                    // console.log(queryURL);

                    // Storing an array of results in the results variable
                    // storing the data from the AJAX request in the results variable
                    var results = response.data;

                    // Looping through each result item
                    for (var i = 0; i < results.length; i++) {

                        // Only taking action if the gif has an appropriate rating
                        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                            // Creating and storing a div tag
                            var gifDiv = $("<div>").addClass("divBlock");
                            // Storing the result item's rating
                            var rating = results[i].rating;
                            // Creating a paragraph tag with the result item's rating
                            var p = $("<p>").text("Rating: " + results[i].rating);
                            p.addClass("my-2 align-text-bottom");

                            // Creating and storing an image tag
                            var gifImage = $("<img>");

                            // Setting the src attribute of the image to a property pulled off the result item
                            // gifImage.attr("src", results[i].images.fixed_height.url);

                            //make it default to 'still' first instead of showing animated version ^^ 
                            gifImage.attr("src", results[i].images.fixed_height_still.url);
                            //getting the still version of the gif
                            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                            //getting the animated version of the gif
                            gifImage.attr("data-animate", results[i].images.fixed_height.url);
                            

                            // adding pauseGif class to call later in the onclick function
                            // using some bootstrap classes to spread out the images
                            gifImage.addClass("align-items-center mx-2 my-2 pauseGif");

                            // Appending the paragrah and image tag to the gifDiv
                            gifDiv.append(gifImage);
                            gifDiv.append(p);

                            // Prependng the gifDiv to the HTML page in the "#gifs-appear-here" div
                            $("#gifs-appear-here").prepend(gifDiv);
                        }
                    }



                    $(".pauseGif").on("click", function () {

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
                    }
                    ); //closes on click
                })
        })//closes the then 

        // //click submit button to add to array
        // $("#newGif").on("click", function(){
        //     var newTopic = $(".addedTopic").val().trim() //so there's no white space
        //     //push the new value to the array
        //     topics.push(newTopic);
        // }

    }        //from class activity
})
