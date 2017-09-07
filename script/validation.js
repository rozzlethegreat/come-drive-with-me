var validMotorhome = true;
var validLargeCar = true;
var validSmallCar = true;
var validMotorbike = true;
var correctDates = false;
var correctAmount = false;
var correctDrivers = false;
var amountOfPeople = 0;
var amountOfDrivers = 0;
var people, drivers;
var amountOfBikes = 0;
var amountOfsCars = 0;
var amountOflCars = 0;
var amountOfMotorhomes = 0;
var valid = false;
var driversPeople, amountPeople;
var seatCount, driveCount;
var diffDays, dayOfWeek;
var autocomplete = [];
var distanceJourney = 0;



$(document).ready(function () {

    $( function() {
        $( "#dateEnd, #dateStart" ).datepicker();
    } );


    driversPeople = parseInt($('#drivers').val());
    amountPeople = parseInt($('#amount').val());

    $('.infoToolTip').tooltipster({
        theme: 'tooltipster-shadow'
    });

    function svgOn() {
        $('#motorbike').css('opacity', '1');
        $('#motorbike').css('cursor', 'pointer');
        $('#small-car').css('opacity', '1');
        $('#small-car').css('cursor', 'pointer');
        $('#large-car').css('opacity', '1');
        $('#large-car').css('cursor', 'pointer');
        $('#motorhome').css('opacity', '1');
        $('#motorhome').css('cursor', 'pointer');
    }

    function bikeOff() {
        $('#motorbike').css('opacity', '0.5');
        $('#motorbike').css('cursor', 'default');
        validMotorbike = false;
    }

    function bikeOn() {
        $('#motorbike').css('opacity', '1');
        $('#motorbike').css('cursor', 'pointer');
        validMotorbike = true;
    }

    function sCarOff() {
        $('#small-car').css('opacity', '0.5');
        $('#small-car').css('cursor', 'default');
        validSmallCar = false;
    }

    function sCarOn() {
        $('#small-car').css('opacity', '1');
        $('#small-car').css('cursor', 'pointer');
        validSmallCar = true;
    }

    function lCarOff() {
        $('#large-car').css('opacity', '0.5');
        $('#large-car').css('cursor', 'default');
        validLargeCar = false;
    }

    function lCarOn() {
        $('#large-car').css('opacity', '1');
        $('#large-car').css('cursor', 'pointer');
        validLargeCar = true;
    }

    function motorhomeOff() {
        $('#motorhome').css('opacity', '0.5');
        $('#motorhome').css('cursor', 'default');
        validMotorhome = false;
    }

    function motorhomeOn() {
        $('#motorhome').css('opacity', '1');
        $('#motorhome').css('cursor', 'pointer');
        validMotorhome = true;
    }

    $('#check').click(function () {
        $('.errors').css('display', 'none');
        svgOn();
        $('.figuresAmount img').remove();
        $('.figuresDrivers img').remove();
        var dateStart = new Date($('#dateStart').val());
        var dateEnd = new Date($('#dateEnd').val());
        var todaysDate = new Date();
        var amountOfPassengers = $('#amount').val();
        var amountOfDrivers = $('#drivers').val();
        validMotorhome = true;
        validLargeCar = true;
        validSmallCar = true;
        validMotorbike = true;
        dayOfWeek = dateStart.getDay();
        seatCount = 0;
        driveCount = 0;
        diffDays = daysDiff(dateStart, dateEnd);

        if (dateStart == 'Invalid Date') {
            $('.datesNull').css('display', 'block');
            correctDates = false;
        }
        if (dateEnd == 'Invalid Date') {
            $('.datesNull').css('display', 'block');
            correctDates = false;
        } else {
            $('.datesNull').css('display', 'none');
            if (dateStart.getMonth() === todaysDate.getMonth() && todaysDate.getDate() >= dateStart.getDate()) {
                $('.tooEarly').css('display', 'block');
                $('.insufficient').css('display', 'none');
                correctDates = false;
            } else if (dateStart.getMonth() !== todaysDate.getMonth() && todaysDate >= dateStart) {
                $('.tooEarly').css('display', 'block');
                $('.insufficient').css('display', 'none');
                correctDates = false;
            } else {
                $('.tooEarly').css('display', 'none');
                if (dateStart > dateEnd) {
                    $('.insufficient').css('display', 'block');
                    correctDates = false;
                } else {
                    $('.insufficient').css('display', 'none');
                    if (diffDays > 15) {
                        $('.maxAll').css('display', 'block');
                    } else {
                        $('.maxAll').css('display', 'none');
                        correctDates = true;
                    }
                }
            }

            if(diffDays > 5){
                bikeOff();
            }

            if(diffDays < 3){
                lCarOff();
            }

            if((diffDays < 2) || (diffDays > 15)){
                motorhomeOff();
            }

            if(diffDays > 10){
                lCarOff();
                sCarOff();
            }
            if(amountOfPassengers === "" || amountOfDrivers === ""){
                $('.success').css('display', 'none');
                $('.infoNull').css('display', 'inline-block');
                $('#check').css('display', 'inline-block');
                return;
            }

            if(correctAmount === true && correctDates === true && correctDrivers === true) {
                valid = true;
                $('.success').css('display', 'inline-block');
                svgImages(amountPeople,driversPeople);
                $('#check').css('display', 'none');
                if((driversPeople === 1) || ((driversPeople <= 2) && (amountPeople >= 7))){
                    motorhomeOff();
                }
                if((driversPeople === 1) && (amountPeople === 2)){
                    bikeOff();
                    motorhomeOff();

                }
                if((driversPeople === 1) && (amountPeople >= 3)){
                    bikeOff();
                    sCarOff();
                    motorhomeOff();
                }
                if((driversPeople === 1) && (amountPeople > 5)){
                    bikeOff();
                    sCarOff();
                    lCarOff();
                    motorhomeOff();

                    $('.success').css('display', 'none');
                }
                if((driversPeople === 2) && (amountPeople > 6)){
                    bikeOff();
                }
                if((driversPeople === 3) && (amountPeople === 12)){
                    bikeOff();
                }
            }
        }
    });



    function daysDiff(start, end) {
        var daysDifference = Math.round(Math.abs((+ start) - (+ end))/8.64e7) + 1;
        if (daysDifference === parseInt(daysDifference,10)){
            $('.dateDiff').css('background-color', 'white');
            if(daysDifference === 1){
                $('.dateDiff').html('<div>' + daysDifference + ' day</div>');
            }else{
                $('.dateDiff').html('<div>' + daysDifference + ' days</div>');
            }
        } else {
            return;
        }
        return daysDifference;
    }

    $('.startDate').click(function(){
        zero();
    });
    $('.endDate').click(function(){
        zero();
    });

    function svgImages(amountPeople, driversPeople){
        people = 0;
        drivers = 0;
        $('.svg').css('cursor', 'pointer');
        for(var j = 0; j < driversPeople; j++){
            if(j === 6){
                $('.figuresDrivers').prepend('<img src="images/svg/figure.svg" alt="figure" class="figure" id="d'+j+'"></br>');
                $('.figuresDrivers').css('top', '-12px');
            }
            if(j !== 6){
                $('.figuresDrivers').prepend('<img src="images/svg/figure.svg" alt="figure" class="figure" id="d'+j+'">');
                if(drivers <= 6){
                    $('.figuresDrivers').css('top', '-13px');
                }
            }
            drivers += 1;
        }
        for(var i = 0; i < amountPeople; i++){
            if(i === 6){
                $('.figuresAmount').prepend('<img src="images/svg/figure.svg" alt="figure" class="figure" id="a'+i+'"></br>');
                if($('.figuresDrivers').css('top') === ('-12px')){
                    $('.figuresAmount').css('top', '-13px');
                }else{
                    $('.figuresAmount').css('top', '-27px');
                }
            }
            if(i !== 6){
                $('.figuresAmount').prepend('<img src="images/svg/figure.svg" alt="figure" class="figure" id="a'+i+'">');
                if($('.figuresDrivers').css('top') === ('-12px')){
                    $('.figuresAmount').css('top', '-13px');
                }else{
                    $('.figuresAmount').css('top', '-27px');
                }
            }
            people += 1;
        }
    }

    $('#motorbike').click(function () {
        if (diffDays > 5){
            $('.errors').css('display', 'none');
            $('.motorbikeError').css('display', 'inline-block');
            $('.success').css('display', 'none');
            validMotorbike = false;
        } else if (diffDays <= 5 && validMotorbike === false){
            $('.errors').css('display', 'none');
            $('.noBikes').css('display', 'inline-block');
            $('.success').css('display', 'none');
        }
        if (valid === true && validMotorbike === true){
            $('.errors').css('display', 'none');
            cartClick();
            amountOfBikes += 1;
            $('.xsBike').css('display', 'inline-block');
            if (amountOfBikes === 1) {
                $('.cart .motorbike').html('<img src="images/svg/x.svg" class="x" id="mbx">' +
                    '<div class="amountInCart">' + amountOfBikes + 'x motorbike</div>');
                $('#mbx').click(function () {
                    amountOfBikes--;
                    if(amountOfBikes === 0){
                        $('.cart .motorbike').html("");
                    } else if(amountOfBikes === 1){
                        $('.cart .motorbike .amountInCart').html(amountOfBikes + 'x motorbike');
                    }else{
                        $('.cart .motorbike .amountInCart').html(amountOfBikes + 'x motorbikes');
                    }
                    updateDrivers(-1,-1);
                });
            } else {
                $('.cart .motorbike .amountInCart').html(amountOfBikes + 'x motorbikes');
            }
            updateDrivers(1,1);
        }
    });

    $('#small-car').click(function () {
        if(diffDays > 10){
            $('.errors').css('display', 'none');
            $('.carLate').css('display', 'inline-block');
            $('.success').css('display', 'none');
            validSmallCar = false;
        } else if(diffDays <= 10 && validSmallCar === false){
            $('.errors').css('display', 'none');
            $('.nosCar').css('display', 'inline-block');
            $('.success').css('display', 'none');
        }
        if ((valid === true) && (validSmallCar === true)){
            $('.errors').css('display', 'none');
            cartClick();
            amountOfsCars += 1;
            $('.xsCar').css('display', 'inline-block');
            if (amountOfsCars === 1) {
                $('.cart .sCar').html('<img src="images/svg/x.svg" class="x" id="scx">' +
                    '<div class="amountInCart">' + amountOfsCars + 'x small car</div>');
                $('#scx').click(function () {
                    amountOfsCars--;
                    if(amountOfsCars === 0){
                        $('.cart .sCar').html("");
                    } else if(amountOfsCars === 1){
                        $('.cart .sCar .amountInCart').html(amountOfsCars + 'x small car');
                    }else{
                        $('.cart .sCar .amountInCart').html(amountOfsCars + 'x small cars');
                    }
                    updateDrivers(-1,-2);
                });
            } else {
                $('.cart .sCar .amountInCart').html(amountOfsCars + 'x small cars');
            }
            updateDrivers(1,2);
        }
    });

    $('#large-car').click(function () {
        if(diffDays > 10){
            $('.errors').css('display', 'none');
            $('.carLate').css('display', 'inline-block');
            $('.success').css('display', 'none');
            validLargeCar = false;
        }
        if(diffDays < 3){
            $('.errors').css('display', 'none');
            $('.carEarly').css('display', 'inline-block');
            $('.success').css('display', 'none');
            validLargeCar = false;
        }else if(diffDays <= 10 && diffDays >= 3 && validLargeCar === false){
            $('.errors').css('display', 'none');
            $('.nolCar').css('display', 'inline-block');
            $('.success').css('display', 'none');
        }
        if ((valid === true) && (validLargeCar === true)){
            $('.errors').css('display', 'none');
            cartClick();
            amountOflCars += 1;
            $('.xlCar').css('display', 'inline-block');
            if (amountOflCars === 1) {
                $('.cart .lCar').html('<img src="images/svg/x.svg" class="x" id="lcx">' +
                    '<div class="amountInCart">' + amountOflCars + 'x large car</div>');
                $('#lcx').click(function () {
                    amountOflCars--;
                    if(amountOflCars === 0){
                        $('.cart .lCar').html("");
                    } else if(amountOflCars === 1){
                        $('.cart .lCar .amountInCart').html(amountOflCars + 'x large car');
                    }else{
                        $('.cart .lCar .amountInCart').html(amountOflCars + 'x large cars');
                    }
                    updateDrivers(-1,-5);
                });
            } else {
                $('.cart .lCar .amountInCart').html(amountOflCars + 'x large cars');
            }
            updateDrivers(1,5);
        }
    });

    $('#motorhome').click(function () {
        if(diffDays > 15){
            $('.errors').css('display', 'none');
            $('.maxAll').css('display', 'inline-block');
            $('.success').css('display', 'none');
            validMotorhome = false;
        }
        if(diffDays < 2){
            $('.errors').css('display', 'none');
            $('.motorHomeEarly').css('display', 'inline-block');
            $('.success').css('display', 'none');
            validMotorhome = false;
        }else if(diffDays <= 15 && diffDays >= 2 && validMotorhome === false){
            $('.errors').css('display', 'none');
            $('.noMotorhome').css('display', 'inline-block');
            $('.success').css('display', 'none');
        }
        if ((valid === true) && (validMotorhome === true)) {
            $('.errors').css('display', 'none');
            cartClick();
            amountOfMotorhomes += 1;
            $('.xMotorHome').css('display', 'inline-block');
            if (amountOfMotorhomes === 1) {
                $('.cart .motorHome').html('<img src="images/svg/x.svg" class="x" id="mhx">' +
                    '<div class="amountInCart">' + amountOfMotorhomes + 'x motor home</div>');
                $('#mhx').click(function () {
                    amountOfMotorhomes--;
                    if (amountOfMotorhomes === 0) {
                        $('.cart .motorHome').html("");
                    } else if (amountOfMotorhomes === 1) {
                        $('.cart .motorHome .amountInCart').html(amountOfMotorhomes + 'x motor home');
                    } else {
                        $('.cart .motorHome .amountInCart').html(amountOfMotorhomes + 'x motor homes');
                    }
                    updateDrivers(-2, -6);
                });
            } else {
                $('.cart .motorHome .amountInCart').html(amountOfMotorhomes + 'x motor homes');
            }
            updateDrivers(2, 6);
        }
    });

    function updateDrivers(diffDrivers,diffPassengers){
        var oldDrivers = driveCount;
        var oldPassengers = seatCount;
        var newDrivers = oldDrivers + diffDrivers;
        var newPassengers = oldPassengers + diffPassengers;
        var maxPassengers = Number($('#amount').val());
        var maxDrivers = Number($('#drivers').val());

        if (diffDrivers < 0){
            if(newDrivers < maxDrivers){
                for(var i = oldDrivers - 1; i >= newDrivers; i--){
                    $('#d' + i).removeClass('opacity');
                }
            }
        }else{
            if(oldDrivers < maxDrivers){
                for(var j = oldDrivers; j < newDrivers; j++){
                    $('#d' + j).addClass('opacity');
                }
            }
        }
        if (diffPassengers < 0){
            if(newPassengers < maxPassengers){
                for(var k = oldPassengers - 1; k >= newPassengers; k--){
                    $('#a' + k).removeClass('opacity');
                }
            }
        }else{
            if(oldPassengers < maxPassengers){
                for(var l = oldPassengers; l < newPassengers; l++){
                    $('#a' + l).addClass('opacity');
                }
            }
        }
        seatCount = seatCount + diffPassengers;
        driveCount = driveCount + diffDrivers;
        checkCars(newDrivers,newPassengers);
        submitAppear();
    }

    function checkMotorbike(remainingDrivers, remainingPassengers) {
        if (diffDays <= 5) {
            if (remainingDrivers > 1) {
                bikeOn();
            } else if (remainingDrivers === 1 && remainingPassengers <= 1) {
                bikeOn();
            } else {
                bikeOff();
            }
        } else {
            bikeOff();
        }
    }

    function checkSmallCar(remainingDrivers, remainingPassengers) {
        if (diffDays >= 2 && diffDays <= 10) {
            if (remainingDrivers > 1) {
                sCarOn();
            } else if (remainingDrivers === 1 && remainingPassengers <= 2) {
                sCarOn();
            } else {
                sCarOff();
            }
        } else {
            sCarOff();
        }
    }

    function checkLargeCar(remainingDrivers, remainingPassengers) {
        if (diffDays >= 3 && diffDays <= 10) {
            if (remainingDrivers > 1) {
                lCarOn();
            } else if (remainingDrivers === 1 && remainingPassengers <= 5) {
                lCarOn();
            } else {
                lCarOff();
            }
        } else {
            lCarOff();
        }
    }

    function checkMotorhome(remainingDrivers, remainingPassengers) {
        if (diffDays >= 2 && diffDays <= 15) {
            if (remainingDrivers >= 2) {
                motorhomeOn();
            } else if (remainingDrivers === 2 && remainingPassengers <= 6) {
                motorhomeOn();
            } else {
                motorhomeOff();
            }
        } else {
            motorhomeOff();
        }
    }

    function checkCars(drivers,passengers) {
        var maxPassengers = Number($('#amount').val());
        var maxDrivers = Number($('#drivers').val());
        var remainingPassengers = maxPassengers - passengers;
        var remainingDrivers = maxDrivers - drivers;
        checkMotorbike(remainingDrivers, remainingPassengers);
        checkSmallCar(remainingDrivers, remainingPassengers);
        checkLargeCar(remainingDrivers, remainingPassengers);
        checkMotorhome(remainingDrivers, remainingPassengers);
    }

    function cartClick() {
        $('.success').css('display', 'none');
        $('.cartHide').css('display', 'inline-block');
    }

    function submitAppear() {
        var numberWithClassA = $('.figuresAmount img.opacity');
        var numberInListA = $('.figuresAmount img');
        if (numberWithClassA.length === numberInListA.length) {
            $('#submit').css('display', 'inline-block');
        }else{
            $('#submit').css('display', 'none');
        }
    }

    var inputDrivers = $('#infoDrivers');
    var inputPeople = $('#infoAmount');

    $('#amount').keyup(function(){
        driversPeople = parseInt($('#drivers').val());
        amountPeople = parseInt($('#amount').val());
        zero();
        if(amountPeople < 1){
            $('.nanAmount').css('display', 'inline-block');
            $('.tooMany').css('display', 'none');
            $('.exceedA').css('display', 'none');
            $('.notYet').css('display', 'none');
            correctAmount = false;
            $('#check').css('display', 'none');
        }else{
            $('.nanAmount').css('display', 'none');
            if(amountPeople > 12){
                $('.tooMany').css('display', 'inline-block');
                $('.exceedA').css('display', 'none');
                correctAmount = false;
                $('#check').css('display', 'none');
            }
            else{
                $('.tooMany').css('display', 'none');
                correctAmount = false;
                if(amountPeople < driversPeople){
                    $('.exceedA').css('display', 'inline-block');
                    correctAmount = false;
                    $('#check').css('display', 'none');
                }else{
                    $('.exceedA').css('display', 'none');
                    if($('.exceedD').css('display') ===  ('inline-block')) {
                        $('.exceedD').css('display', 'none');
                        amountOfDrivers = $('#drivers').val().replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/(?:\r\n|\r|\n)/g);
                        if(driversPeople === 1){
                            inputDrivers.html(parseInt(amountOfDrivers) + " driver");
                            correctDrivers = true;
                        }else {
                            inputDrivers.html(parseInt(amountOfDrivers) + " drivers");
                            correctDrivers = true;
                        }
                    }
                }
                amountOfPeople = $('#amount').val().replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/(?:\r\n|\r|\n)/g);
                if (amountPeople === parseInt(amountPeople,10)) {
                    if (amountPeople === 1) {
                        inputPeople.html(parseInt(amountOfPeople) + " person");
                        correctAmount = true;
                    } else {
                        inputPeople.html(parseInt(amountOfPeople) + " people");
                        correctAmount = true;
                    }
                } else {
                    inputPeople.html("");
                }
            }
        }
    });


    $('#drivers').keyup(function(){
        driversPeople = parseInt($('#drivers').val());
        amountPeople = parseInt($('#amount').val());
        zero();
        if(driversPeople < 1){
            $('.nanDrivers').css('display', 'inline-block');
            $('.exceedD').css('display', 'none');
            correctDrivers = false;
            $('#check').css('display', 'none');
        }else {
            $('.nanDrivers').css('display', 'none');
            if(driversPeople > amountPeople){
                $('.exceedD').css('display', 'inline-block');
                $('.nanDrivers').css('display', 'none');
                correctDrivers = false;
                $('#check').css('display', 'none');
            }else {
                $('.exceedA').css('display', 'none');
                $('.exceedD').css('display', 'none');
                $('.nanDrivers').css('display', 'none');
                amountOfDrivers = $('#drivers').val().replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/(?:\r\n|\r|\n)/g);
                if (driversPeople === parseInt(driversPeople,10)) {
                    if (driversPeople === 1) {
                        inputDrivers.html(parseInt(amountOfDrivers) + " driver");
                        correctDrivers = true;
                    } else {
                        inputDrivers.html(parseInt(amountOfDrivers) + " drivers");
                        correctDrivers = true;
                    }
                } else {
                    inputDrivers.html("");
                }
            }
        }
    });

    $('.addPath').click(function(){
        var hasLast = true;

        for(var i = 0; i < autocomplete.length; i++){
            if(!autocomplete[i].getPlace() && $("[data-autocomplete=\"" + i + "\"]").is("*")) hasLast = false;
        }
        if(hasLast) {
            $('#inputOD').append('<div><input type="text" name="destination" value="" placeholder="Destination" class="chooseOD waypoint">' +
                '<img src="images/svg/error.svg" class="svgEnd deletePath" alt="cross"></div>');

            $('.deletePath:last').click(function () {
                $(this).parent().remove();
                $('#checkEnd').css('display', 'inline-block');
                $('#submitEnd').css('display','none');
                $('.cartList').css('display','none');
                $('.finalised').css('display','none');
                findClosestDropoff();
            });

            $('.waypoint:last').keypress(function (e) {
                if (e.which == 13) e.preventDefault();
            });

            waypointAutocomplete();
        }
    });

    $('.deletePath:last').click(function () {
        $(this).parent().remove();
        findClosestDropoff();
    });

    function zero(){
        $('.errors').css('display', 'none');
        $('.figuresAmount img').remove();
        $('.figuresDrivers img').remove();
        $('.cart .motorbike').html("");
        $('.cart .motorHome').html("");
        $('.cart .sCar').html("");
        $('.cart .lCar').html("");
        $('.cartHide').css('display', 'none');
        $('.success').css('display', 'none');
        $('#submit').css('display', 'none');
        $('.svg').css('cursor', 'default');
        $('#check').css('display', 'inline-block');
        $('.cart > div').css('color','black');
        valid = false;
        amountOfBikes = 0;
        amountOfsCars = 0;
        amountOflCars = 0;
        amountOfMotorhomes = 0;
    }

    if ( $('[type="date"]').prop('type') != 'date' ) {
        $('[type="date"]').datepicker();
    } //so type = ate works in other browsers

});

var onScreenMarkers = [];
var currentMarker, closestPickup, map, infoBox, userLocation, directionsDisplay;
var transportMode = 'DRIVING';
var positionSelect, titleSelect, method;

var allMarkers = [
    {
        lat: -37.000944,
        lng: 174.778953,
        title: 'Auckland Airport',
        description: 'Drop off/Pick up point'
    },
    {
        lat: -36.850543,
        lng: 174.756840,
        title: 'Auckland Central',
        description: 'Drop off/Pick up point'
    },
    {
        lat: -37.782849,
        lng: 175.279382,
        title: 'Hamilton Central',
        description: 'Drop off/Pick up point'
    },
    {
        lat: -38.687062,
        lng: 176.072684,
        title: 'Taupo Central',
        description: 'Drop off/Pick up point'
    },
    {
        lat: -38.660705,
        lng: 177.985965,
        title: 'Gisborne Airport',
        description: 'Drop off/Pick up point'
    },
    {
        lat: -37.687037,
        lng: 176.168565,
        title: 'Tauranga Central',
        description: 'Drop off/Pick up point'
    },
    {
        lat: -39.057202,
        lng: 174.075248,
        title: 'New Plymouth Central',
        description: 'Drop off/Pick up point'
    },
    {
        lat: -39.643037,
        lng: 176.846673,
        title: 'Hastings Central',
        description: 'Drop off/Pick up point'
    },
    {
        lat: -40.328291,
        lng: 175.619742,
        title: 'Palmerston North Airport',
        description: 'Drop off/Pick up point'
    },
    {
        lat: -40.357318,
        lng: 175.608031,
        title: 'Palmerston North Central',
        description: 'Drop off/Pick up point'
    },
    {
        lat: -40.950588,
        lng: 175.659595,
        title: 'Masterton Central',
        description: 'Drop off/Pick up point'
    },
    {
        lat: -41.323455,
        lng: 174.804896,
        title: 'Wellington Airport',
        description: 'Drop off/Pick up point'
    },
    {
        lat: -41.292392,
        lng: 174.773879,
        title: 'Wellington Central',
        description: 'Drop off/Pick up point'
    },
    {
        lat: -39.418356,
        lng: 175.401209,
        title: 'Ohakune Central',
        description: 'Drop off/Pick up point'
    },
    {
        lat: -35.724126,
        lng: 174.323261,
        title: 'Whangarei Central',
        description: 'Drop off/Pick up point'
    }
];



function initMap(){

    var mapOptions = {
        center: {
            lat: -39.418356,
            lng: 175.401209
        },
        zoom: 7,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        keyboardShortcuts: false,
        fullscreenControl: false,
        backgroundColor: 'lightgrey',
        draggable: false,
        scrollwheel: false,
        styles: [
            {
                stylers: [
                    {
                        hue: '#5dd06f'
                    },
                    {
                        saturation: 10
                    }
                ]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [
                    {
                        hue: '#ffcd57'
                    },
                    {
                        lightness: -20
                    },
                    {
                        visibility: 'none'
                    }
                ]
            },
            {
                featuretype: 'transit',
                elementType: 'labels',
                stylers: [
                    {
                        hue: '#1c050e'
                    },
                    {
                        saturation: -10
                    }
                ]
            },
            {
                featureType: 'water',
                stylers: [
                    {
                        color: '#1d8fd0'
                    },
                    {
                        lightness: 50
                    }
                ]
            },
            {
                featureType: 'poi',
                stylers: [
                    {
                        visibility: 'off'
                    }
                ]
            }
        ]
    };

    waypointAutocomplete();

    map = new google.maps.Map(document.getElementById('map'), mapOptions);


}

function waypointAutocomplete(){
    $('.waypoint').each(function(){
        if($(this).hasClass('waypointInit')) return;
        $(this).addClass('waypointInit');
        $(this).keyup(function(){
            $('.selectDest').css('display','none');
            $('.finalised').css('display','none');
            $('#checkEnd').css('display', 'inline-block');
            $('#submitEnd').css('display','none');
            $('.cartList').css('display','none');
        });

        var defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(-41.81226714,171.77124023),
            new google.maps.LatLng(-34.10725640,179.65942383)
        );
        var options = {
            bounds: defaultBounds
        };

        newAutocomplete = new google.maps.places.Autocomplete(this, options);
        newAutocomplete.addListener("place_changed", function() {
            // var autoLocation = this.getPlace().geometry.location;
            var autoStart;
            for (var i = 0; i < allMarkers.length; i++){
                var startPoint = document.getElementById('origin').value;
                if(startPoint === allMarkers[i].title){
                    var startLng = allMarkers[i].lng;
                    var startLat = allMarkers[i].lat;
                    autoStart = {
                        lat: startLat,
                        lng: startLng
                    };
                }
            }
            showDirection("map", "DRIVING", autoStart);
        });
        autocomplete.push(newAutocomplete);
        $(this).parent().attr("data-autocomplete", autocomplete.length-1);
    });

}

function unlockMap(){
    mapOptions = {
        scrollwheel: true,
        draggable: true,
        draggableCursor: 'pointer',
        disableDefaultUI: true,
        disableDoubleClickZoom: false,
        fullscreenControl: false,
        backgroundColor: 'lightgrey',
        keyboardShortcuts: false
    };
    findUser();
    addAllMarkers();
    map.setOptions(mapOptions);
}

google.maps.event.addDomListener(window, 'load', initMap());

function addAllMarkers() {
    for (var i = 0; i < allMarkers.length; i++){
        marker = new google.maps.Marker({
            position:{
                lat: allMarkers[i].lat,
                lng: allMarkers[i].lng
            },
            map: map,
            animation: google.maps.Animation.DROP,
            icon: 'images/marker-grey.png',
            title: allMarkers[i].title,
            description: allMarkers[i].description
        });
        onScreenMarkers.push(marker);
        allInfoBox(marker);
    }
}

function allInfoBox(marker) {
    if(infoBox){
        infoBox.close();
    }
    infoBox = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function(){
        infoBox.setContent("<div class='title'><strong>"+marker.title+"</strong></div>"+
            "<div class='description'>"+marker.description+"</div>");
        infoBox.open(map, marker);
        currentMarker = marker;
        if(userLocation) {
            showDirection(currentMarker.position, transportMode, userLocation.position);
        }
    });
}

function findUser(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            userLocation = new google.maps.Marker({
                position:{
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                map: map,
                animation: google.maps.Animation.DROP
            });
            map.panTo(userLocation.position);
            findClosestPickup();
            showDirection(closestPickup.position, transportMode, userLocation.position);
        });
    }
}

function findClosestPickup(){
    var closestDistance = Infinity;
    for (var i = 0; i < onScreenMarkers.length; i++) {
        var singleMarker = onScreenMarkers[i];
        var distance = google.maps.geometry.spherical.computeDistanceBetween(userLocation.position, singleMarker.position);
        if(distance < closestDistance){
            closestDistance = distance;
            closestPickup = singleMarker;
            currentMarker = closestPickup;
        }
    }
}

function findClosestDropoff(){
    var closestDistance = Infinity;
    var lastLocation;
    for (var j = 0; j < autocomplete.length; j++){
        if($("[data-autocomplete=\""+ j +"\"").is("*")){
            lastLocation = autocomplete[j].getPlace().geometry.location;
        }
    }
    for (var i = 0; i < onScreenMarkers.length; i++) {
        var singleMarker = onScreenMarkers[i];
        var distance = google.maps.geometry.spherical.computeDistanceBetween(lastLocation, singleMarker.position);
        if(distance < closestDistance){
            closestDistance = distance;
            closestDropoff = singleMarker;
            currentMarker = closestDropoff;
        }
    }
}

function changeTransport(mode) {
    method = mode.toUpperCase();
    if(positionSelect !== undefined){
        showDirection(positionSelect.position, method, userLocation.position);
        return;
    }
    if(userLocation !== undefined) {
        showDirection(closestPickup.position, method, userLocation.position);
    }
}


function changeSelect() {
    if(method === undefined){
        method = transportMode;
    }
    var e = document.getElementById('pickupOptions');
    $('#pick').css('display','inline-block');
    var userSelect = e.options[e.selectedIndex].text;
    document.getElementById('origin').value = userSelect;
    $('.findPickup div p').html(userSelect);
    for(var i = 0; i < allMarkers.length; i++){
        if(allMarkers[i].title === userSelect){
            positionSelect = new google.maps.Marker({
                position: {
                    lat: allMarkers[i].lat,
                    lng: allMarkers[i].lng
                }
            });
            titleSelect = allMarkers[i].title;
            map.panTo(positionSelect.position);
            showDirection(positionSelect.position, method, userLocation.position);
        }
    }
}

function showDirection(location,mode,startLocation){
    var waypoints = [];
    $('.findPickup div p').html("");
    if(directionsDisplay){
        directionsDisplay.setMap(null);
    }
    var directionService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    if(location === "map"){
        location = autocomplete[autocomplete.length-1].getPlace().geometry.location;
        for (var i = 0; i < autocomplete.length; i++){
            if($("[data-autocomplete=\""+ i +"\"]").is("*")){
                if(i < autocomplete.length-1){
                    waypoints.push({
                        location: autocomplete[i].getPlace().geometry.location,
                        stopover: true
                    });
                }
            }
        }
    }
    if(location === "end"){
        location = closestDropoff.position;
        for (var j = 0; j < autocomplete.length; j++){
            if($("[data-autocomplete=\""+ j +"\"]").is("*")){
                waypoints.push({
                    location: autocomplete[j].getPlace().geometry.location,
                    stopover: true
                });
            }
        }
    }

    directionService.route({
        origin: startLocation,
        destination: location,
        waypoints: waypoints,
        travelMode: google.maps.TravelMode[mode]
    }, function(response, status){
        if(status === 'OK'){
            directionsDisplay.setDirections(response);
            distanceJourney = 0;

            for(var i = 0; i < response.routes[0].legs.length; i++){
                distanceJourney += response.routes[0].legs[i].distance.value;
            }

            distanceJourney = distanceJourney / 1000;
            numberInCart(distanceJourney);

        } else if(status === 'NOT_FOUND'){
            alert('Sorry, there was an error finding your location.');
        } else if(status === 'ZERO_RESULTS'){
            alert('Sorry, no results were found.');
        } else if(status === 'MAX_WAYPOINTS_EXCEEDED'){
            alert('Error: Too many way points.');
        } else if(status === 'INVALID_REQUEST'){
            alert('Error: Invalid direction request.');
        } else if(status === 'OVER_QUERY_LIMIT'){
            alert('Error: Webpage has sent too many requests.');
        } else if(status === 'REQUEST_DENIED'){
            alert('Error: Webpage not allowed to use the directions service.');
        } else if(status === 'UNKNOWN_ERROR'){
            alert('Error: Directions request could not be processed due to a server error.');
        }

        if(positionSelect === undefined){
            $('.findPickup div p').html(closestPickup.title);
        }else{
            $('.findPickup div p').html(titleSelect);
        }
        $('#pick').css('display','inline-block');
    });
}

var priceOflCar = 0;
var priceOfsCar = 0;
var priceOfMotorbike = 0;
var priceOfMotorHome = 0;
var priceOfVehicles = 0;

var priceFuelOflCar = 0;
var priceFuelOfsCar = 0;
var priceFuelOfMotorbike = 0;
var priceFuelOfMotorHome = 0;
var priceOfFuel = 0;

function numberInCart(distance) {
    distance = Math.ceil(distance);
    var amountOfMotorhomes = parseInt($('.motorHome')[0].innerText);
    var amountOfMotorbikes = parseInt($('.motorbike')[0].innerText);
    var amountOflCar = parseInt($('.lCar')[0].innerText);
    var amountOfsCar = parseInt($('.sCar')[0].innerText);
    if(amountOfMotorhomes > 0){
        $('.finalCart .priceHome').html('<div>' + amountOfMotorhomes + 'x motor home at $200 per day, 17/L</div>');
        priceOfMotorHome = amountOfMotorhomes*200;
        priceFuelOfMotorHome = calculation(distance,17);
    }else{
        $('.finalCart .priceHome').html("");
        priceOfMotorHome = 0;
        priceFuelOfMotorHome = 0;
    }
    if(amountOflCar > 0){
        $('.finalCart .priceLCar').html('<div>' + amountOflCar + 'x large car at $144 per day, 9.7/L</div>');
        priceOflCar = amountOflCar*144;
        priceFuelOflCar = calculation(distance,9.7);
    }else{
        $('.finalCart .priceLCar').html("");
        priceOflCar = 0;
        priceFuelOflCar = 0;
    }
    if(amountOfMotorbikes > 0){
        $('.finalCart .priceBike').html('<div>' + amountOfMotorbikes + 'x motorbike at $109 per day, 3.7/L</div>');
        priceOfMotorbike = amountOfMotorbikes*109;
        priceFuelOfMotorbike = calculation(distance,3.7);
    }else{
        $('.finalCart .priceBike').html("");
        priceOfMotorbike = 0;
        priceFuelOfMotorbike = 0;
    }
    if(amountOfsCar > 0){
        $('.finalCart .priceSCar').html('<div>' + amountOfsCar + 'x small car at $129 per day, 8.5/L</div>');
        priceOfsCar = amountOfsCar*109;
        priceFuelOfsCar = calculation(distance,8.5);
    }else{
        $('.finalCart .priceSCar').html("");
        priceOfsCar = 0;
        priceFuelOfsCar = 0;
    }
    var amountOfDays = parseInt($('.dateDiff')[0].innerText);
    priceOfFuel = priceFuelOfsCar + priceFuelOfMotorbike + priceFuelOflCar + priceFuelOfMotorHome;
    priceOfVehicles = (priceOfsCar + priceOfMotorbike + priceOflCar + priceOfMotorHome)*amountOfDays;
    var totalSum = priceOfFuel + priceOfVehicles;
    $('#days').html('<div>Days: ' + amountOfDays + '</div>');
    $('#km').html('<div>KM: ' + distance + '</div>');
    $('#fuel').html('<div>Price of fuel: $' + priceOfFuel.toFixed(2) + '</div>');
    $('#vehicles').html('<div>Price of vehicles: $' + priceOfVehicles + '</div>');
    $('#total').html('<div>Total sum: $' + totalSum.toFixed(2) + '</div>');
}

function calculation(kilometres,Lper100){
    var answer;
    answer = ((kilometres/100)*Lper100)*1.859;
    return answer;
}

function infoValidated(){
    unlockMap();
    $('#validationBox').css('display','none');
    $('#stageTwo').css('display','inline-block');
}

function goBack1(){
    $('#validationBox').css('display','inline-block');
    $('#stageTwo').css('display','none');
}

function pickThisLocation(){
    if(document.getElementById('origin').value === ""){
        document.getElementById('origin').value = closestPickup.title;
    }
    userLocation.setMap(null);
    $('#stageThree').css('display','inline-block');
    $('#stageTwo').css('display','none');
    $('#checkEnd').css('display', 'inline-block');
    $('#submitEnd').css('display','none');
    $('.cartList').css('display','none');
    $('.finalised').css('display','none');
}

function goBack2(){
    $('#stageThree').css('display','none');
    $('#stageTwo').css('display','inline-block');
}

function showSubmitButton() {
    if(autocomplete[autocomplete.length-1].getPlace()) {
        $('#checkEnd').css('display', 'none');
        $('#submitEnd').css('display','inline-block');
        $('.cartList').css('display','block');
        findClosestDropoff();

        var autoStart;
        for (var i = 0; i < allMarkers.length; i++){
            var startPoint = document.getElementById('origin').value;
            if(startPoint === allMarkers[i].title){
                var startLng = allMarkers[i].lng;
                var startLat = allMarkers[i].lat;
                autoStart = {
                    lat: startLat,
                    lng: startLng
                };
            }
        }

        showDirection("end", "DRIVING", autoStart);

    } else {
        $('.selectDest').css('display','inline-block');
    }
}

function final() {
    $('.finalised').css('display','inline-block');

}

$('#inputOD #origin').keyup(function(){
    $('#checkEnd').css('display', 'inline-block');
    $('#submitEnd').css('display','none');
    $('.cartList').css('display','none');
});

$('.waypoint').keypress(function (e) {
    if (e.which == 13) e.preventDefault();
});
