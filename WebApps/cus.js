var owl, alert_timeout, signin_status;
var rdDyn;

$( document ).ready(function() {

    var h       = document.location.hostname;
    var dynUrl  = "http://" + h + "/cake2/rd_cake/dynamic_details/info_for.json";
    var thumb_h = 200;
    var thumb_w = 200;
    var scaler  = 'http://' + h + '/cake2/rd_cake/webroot/files/image.php';
    var d       = rdDynamic({dynUrl: dynUrl, thumb_h: thumb_h, thumb_w: thumb_w, scaler: scaler},window.jQuery);
    var i 		= d.addDynamicInfo();
    rdDyn 		= d;

    //If it is a preview page....
    $('#Help').on('pageshow',function(e){
        if($.getUrlVar('dynamic_id') != undefined){
            $.mobile.changePage('#Help');
            return;
        }
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
        // This event fires on tab show after a tab has been shown.
        // e.target -> newly activated tab   |   e.relatedTarget -> previous active tab
        if( e.target.toString().indexOf("register") >= 0 ){
            $('.alert').hide(); // So that the alerts from the 'connect' page dont affect the ones on 'register' page
            if(signin_status == "online"){
                $('#registration_form').hide();
                $('#registration_notice').show();

                $("button[name=disconnect_for_registration]").off().on('click',function(){
                    var urlLogoff = 'http://10.1.0.1:3990/json/logoff';
                    $.ajax({url: urlLogoff + "?callback=?", dataType: "jsonp", timeout: 4000})
                        .done(function(j){
                            $('#registration_notice').hide();
                            $('#registration_form').show();
                        });
                });
            }else{
                $('#registration_notice').hide();
                $('#registration_form').show();
            }

        }else if( e.target.toString().indexOf("gallery") >= 0 ){
            owl.play();

        }else if( e.target.toString().indexOf("connect") >= 0 ){
            $('.alert').hide(); // So that the alerts from the 'register' page dont affect the ones on 'connect' page
            rdDyn.callIndex();
        }
    });

    $('a[data-toggle="tab"]').on('hidden.bs.tab', function(e){
        // This event fires after a new tab is shown (and thus the previous active tab is hidden). [ event.target == previous active tab ]
        if( e.target.toString().indexOf("gallery") >= 0 ){
            owl.stop();

        }else if( e.target.toString().indexOf("connect") >= 0 ){
            rdDyn.callclearRefresh(); // Refreshes session data and restarts refresh counter
        }
    });

    function move() {
        var elem = document.getElementById("myBar");
        var width = 1;
        var id  = setInterval(frame , 10);
        function frame() {
            if(width >= 100){
                clearInterval(id);

            }else {
                width++;
                elem.style.width +'%';
                elem.innerHTML = width * 1 +'%';
            }
        }
    }
});
