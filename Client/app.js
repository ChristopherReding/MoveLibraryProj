(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });


        e.preventDefault();
    }

    function getMovies(e){

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',            
            success: function( data, textStatus, jQxhr ){
                console.log("it worked!");
                //$('#response pre').html( data );
                let tableHeader = "<tr><td>Title</td><td>Director</td><td>Genre</td></tr>"
                let tableData = " ";
                let movieData = data;
                for(let i =0; i< movieData.length; i++)
                {
                    tableData += "<tr id='Movie-"+movieData[i].movieId+"' ><td><input value='" + movieData[i].title + "'></input></td><td><input value='" + movieData[i].director + "'></input></td><td><input value ='" + movieData[i].genre + "'></input></td><td><a href='http://localhost:44325/api/movie/"+movieData[i].movieId+"'>Edit</a></td></tr>";
                }
                document.getElementById('response').innerHTML = tableHeader + tableData;
                
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
                console.log("it didn't work!");
            }
        });

        

        e.preventDefault();
    }

    // function getSingleMovie(e){
    //     $.ajax({
    //         url: 'https://localhost:44325/api/movie',
    //         dataType: 'json',
    //         type: 'get',
    //         contentType: 'application/json',
    //         data: ,
    //         success: function ( data, textStatus, jQxhr ){
    //             console.log("edit sucess!");


    //         },
    //         error: function( jqXhr, textStatus, errorThrown ){
    //             console.log( errorThrown );

    // }

    // function editMovie(e){
    //     $.ajax({
    //         url: 'https://localhost:44325/api/movie',
    //         dataType: 'json',
    //         type: 'put',
    //         contentType: 'application/json',
    //         data: JSON.stringify(dict),
    //         success: function ( data, textStatus, jQxhr ){
    //             console.log("edit sucess!");

    //         },
    //         error: function( jqXhr, textStatus, errorThrown ){
    //             console.log( errorThrown );

    // }


   
    $('#my-form').submit( processForm );

    //$('#displayMovies').submit( getMovies );
    //$('#displaySingleMovie').submit ( getSingleMovie );
    //$('#updateMovie').submit ( editMovie );

    //$('#displayMovies').submit( getMovies );
    window.onload = getMovies;

})(jQuery);