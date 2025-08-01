(function($) {

    $(function() {

        const possible_matched      = [

                                        [ $(".box-1"), $(".box-2"), $(".box-3") ],
                                        [ $(".box-4"), $(".box-5"), $(".box-6") ],
                                        [ $(".box-7"), $(".box-8"), $(".box-9") ],
                                        [ $(".box-1"), $(".box-4"), $(".box-7") ],
                                        [ $(".box-2"), $(".box-5"), $(".box-8") ],
                                        [ $(".box-3"), $(".box-6"), $(".box-9") ],
                                        [ $(".box-1"), $(".box-5"), $(".box-9") ],
                                        [ $(".box-3"), $(".box-5"), $(".box-7") ]

                                    ];

        var boxes                   = $("#tic-tac-toe tr td");

        $.each( boxes, function( index, element ) {

            console.log( index, element );

        });

    });

})(jQuery)

var popup_style = {

    SelectPlayersName : function( params ) {

        Swal.fire({

            title: "Enter Your Names",
            html: `
              <input id="swal-input1" class="swal2-input" placeholder="Player 1">
              <input id="swal-input2" class="swal2-input" placeholder="Player 2">
            `,
            preConfirm: () => {

                const player1 = $("#swal-input1").val() === "" ? "Player 1" : $("#swal-input1").val();
                const player2 = $("#swal-input2").val() === "" ? "Player 2" : $("#swal-input1").val();;

                $("#player1-btn").text(player1);
                $("#player2-btn").text(player2);
            }
        });

    },

    message : function( Title,icon = '' ){

        Swal.fire({

            title: Title,
            icon: icon,
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

};

popup_style.SelectPlayersName();

