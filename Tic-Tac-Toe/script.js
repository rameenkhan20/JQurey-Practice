
(function($){

    $(function() {                   // .ready 

        var player1_wins       = 0;
        var player2_wins       = 0;

        const possible_success_matches =  [

                                        [ $(".box-1"), $(".box-2"), $(".box-3") ],
                                        [ $(".box-4"), $(".box-5"), $(".box-6") ],
                                        [ $(".box-7"), $(".box-8"), $(".box-9") ],
                                        [ $(".box-1"), $(".box-4"), $(".box-7") ],
                                        [ $(".box-2"), $(".box-5"), $(".box-8") ],
                                        [ $(".box-3"), $(".box-6"), $(".box-9") ],
                                        [ $(".box-1"), $(".box-5"), $(".box-9") ],
                                        [ $(".box-3"), $(".box-5"), $(".box-7") ]

                                    ];

        $(".player1:not(:has(.win_count_player1))").append("<span class='win_count_player1 heading-24 '> Wins:  0 </span>")  //for adding #wins
        $(".player2:not(:has(.win_count_player2))").append("<span class='win_count_player2 heading-24 '> Wins:  0 </span>")

        popup_style.SelectPlayersName().then( res => {

            if(res.isConfirmed){

                var player1_name       = res.value.player1;

                var player2_name       = res.value.player2;

                // var player1_wins       = parseInt(localStorage.getItem(player1_wins)) || 0; 

                // var player2_wins       = parseInt(localStorage.getItem(player2_wins)) || 0;

                var player1_mark       = res.value.choosen_mark;

                var player2_mark       = (player1_mark === "X") ? "O" : "X"; 

                var current_player     = Math.floor(Math.random() * 2);

                var current_turn       = (current_player == "0") ? ".player1" : ".player2";

                $(current_turn).addClass("active");

                let boxes              = $("#tic-tac-toe tr td");

                var is_winner          = false;

                var allMarked          = false;

                let reset_button       = $(".reset-btn");

                reset_button.on("click" , function(evt){

                    popup_style.confirmation().then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: "The Game Begins Now!",
                                icon: "success"
                            });
                            boxes.removeAttr("data-mark");
                            boxes.text("");

                            is_winner          = false;

                            allMarked          = false;
    
                            current_player     = Math.floor(Math.random() * 2);
    
                            current_turn       = (current_player == "0") ? ".player1" : ".player2";
    
                            $(current_turn).addClass("active");


                        }
                        

                    });

                })

                boxes.on("click", function (e) {
                    
                    if ($(this).attr("data-mark")) return;     //if already has marked

                    let mark = (current_player == "0") ? player1_mark : player2_mark;  //player marks on the grid

                    $(this).attr("data-mark", mark).text(mark);   //mark added

                    let player_name = (current_player == "0") ? player1_name : player2_name;    

                    current_player = (current_player == "0") ? "1" : "0";   //switching turns 
                    
                    $.each(possible_success_matches , function( index , element ){   // key , value pair

                        let element1 = element[0].attr("data-mark");

                        let element2 = element[1].attr("data-mark");

                        let element3 = element[2].attr("data-mark");

                        if(element1 && element2 && element3) {

                            if (  element1 == element2 && element2 == element3 && element1 == element3 ) {

                                popup_style.message( {title : `The Winner is ${player_name}` , icon : "success"})

                                boxes.attr( "data-mark","  " );   
                                
                                current_player = (current_player == "0") ? "1" : "0";     //current player == winner 

                                // (current_player == "0") ? (player1_wins += 1) : (player2_wins += 1);  // win-count 
                                is_winner = true;
                                
                                // adding name and #win to local storage 

                                if(current_player == "0"){
                                    player1_wins += 1;
                                    $(".win_count_player1").text("Wins:  " + player1_wins);
                                    // localStorage.setItem( player1_name , player1_wins);
                                }
                                else{
                                    player2_wins += 1;
                                    $(".win_count_player2").text("Wins:  " +player2_wins);
                                    // localStorage.setItem( player2_name , player2_wins); 
                                }

                                
                                return false;

                            }
                        }
                    })

                    

                    if(!is_winner){             //When there a Draw Logic

                        boxes.each(function () {

                            if ($(this).attr("data-mark") === undefined) {

                                allMarked = false;

                                return false; // break the loop

                            }else{
                                allMarked = true;
                            }
                        });
                    }

                    


                    if(allMarked){
                        popup_style.message( {title : "Its a Draw" , icon : "warning"})
                    }

                    $(current_turn).removeClass("active");

                    current_turn = (current_player == "0") ? ".player1" : ".player2";

                    $(current_turn).addClass("active");

                    console.log("allMarked",allMarked,"is_winner", is_winner)

                })
            }


        });

    });

})(jQuery);



var popup_style = {

    SelectPlayersName : function( prams ) {

        if ( typeof prams == "undefined") prams = {}

        $defaults = {
            player1_name               : "Player 1",
            player2_name               : "Player 2",
            title                      : "Enter Your Names",
            player1_html_attr          : "#player1-btn",
            player2_html_attr          : "#player2-btn"  
        }

        $.each($defaults,function(key,value) {
            prams[key] = ( typeof prams[key] == "undefined") ? value : prams[key];
        });

        let choosen_mark = "";

        return Swal.fire({

            title: prams.title,
            html: `
                <input id="swal-input1" class="swal2-input" placeholder= ${prams.player1_name} >
                <input id="swal-input2" class="swal2-input" placeholder= ${prams.player2_name} >
                <div>
                    <h4> ${prams.player1_name} Picks </h4>
                    <input type="radio" id="mark_selection1" name="mark" value="X">
                    <label for="mark_selection1"> X </label>
                    <input type="radio" id="mark_selection2" name="mark" value="O">
                    <label for="mark_selection2"> O </label>
                </div>
            `,
            preConfirm: () => {

                let player1   = $("#swal-input1").val() === "" ? prams.player1_name : $("#swal-input1").val();
                let player2   = $("#swal-input2").val() === "" ? prams.player2_name : $("#swal-input2").val();
                choosen_mark    = $("input[name='mark']:checked").val();

                if(!choosen_mark){
                    Swal.showValidationMessage("Please select X or O");
                    return false;
                }

                player_1 = `${player1} : ${choosen_mark}`;
                player_2 = `${player2} : ${(choosen_mark === "X") ? "O" : "X"}`;

                $(prams.player1_html_attr).text(player_1);
                $(prams.player2_html_attr).text(player_2);

                arg = {
                    choosen_mark  :choosen_mark,
                    player1       :player1,
                    player2       :player2
                }

                return arg;

            }


        })
    
    },

    message : function( prams ){

        if ( typeof prams == "undefined") prams = {}

        $defaults = {
            title               : "",
            icon                : ""
            
        }

        $.each($defaults,function(key,value) {
            prams[key] = ( typeof prams[key] == "undefined") ? value : prams[key];
        });

        Swal.fire({

            title: prams.title,
            icon: prams.icon,
            // showClass: {
            //     popup: `
            //       animate__animated
            //       animate__fadeInUp
            //       animate__faster
            //     `
            // },
            hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `
            }
        });
    },

    confirmation : function(){
        return Swal.fire({
            title: "Are you sure?",
            text: "Reset the game now!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "Black",
            cancelButtonColor: "Black",
            confirmButtonText: "Yes!"
        })
    },

};

// popup_style.message( {title:"The winner ____",icon:"success"} );
// popup_style.SelectPlayersName();


