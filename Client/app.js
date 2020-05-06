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
                
                let tableHeader = "<tr><td>Title</td><td>Director</td><td>Genre</td></tr>"
                let tableData = " ";
                let movieData = data;
                for(let i =0; i< movieData.length; i++)
                {
                    tableData += "<tr><td><input name = 'title-"+movieData[i].movieId+"' value='" + movieData[i].title + "'></input></td><td><input name='director-"+movieData[i].movieId+"' value='" + movieData[i].director + "'></input></td><td><input name='genre-"+movieData[i].movieId+"' value ='" + movieData[i].genre + "'></input></td><td><button type = 'submit' class='update-button' id='"+movieData[i].movieId+"' >Update</button></td><td><a href='' class='update-link' id='"+movieData[i].movieId+"'>Update</a></td></tr>";
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


    function editMovie( id ){
        alert(id);
        var dict = {
            movieId: id,
        	Title : this[`title-${id}`].value,
            Director: this["director-"+id].value,
            Genre: this["genre-"+id].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });


        //e.preventDefault();
    }


    $("<a>").click(function(){
        var id = $(this).attr('id');
        console.log(id);
        editMovie(id);
    });


    window.onload = getMovies;
    $('#my-form').submit( processForm );
    
    $(document).ready(function(){
    $('.update-button').click( function(){
        var id = $(this).attr('id');
        console.log(id);
        editMovie(id);
        });
    
    });


    
})(jQuery);