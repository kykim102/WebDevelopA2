/* 
Student Name: Kyu Yeon Kim 
Student ID:   19069575
Description of the file:
This is JS file which will be used for the booking page.
The functions includes: 
    Validation of each field
    Validation of date and time
    Sending input data to booking.php
    Receving information from booking.php and display on booking page
*/

function createRequest() {
    var xhr = false;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhr;
}

function validate(name, phone, streetNum, streetName, suburb, destSurb, dateTime) {
    var validation = true;

    if (name == "") {
        validation = false;
    }
    if (phone == "") {
        validation = false;
    }
    if (streetNum == "") {
        validation = false;
    }
    if (streetName == "") {
        validation = false;
    }
    if (suburb == "") {
        validation = false;
    }
    if (destSurb == "") {
        validation = false;
    }
    if (dateTime == "") {
        validation = false;
    }

    return validation;
}

function timeValidate(dateTime) {
    var inputDT = new Date(dateTime);
    var now = new Date();
    var validate = true;

    if (inputDT < now) {
        validate = false;
    }

    return validate;
}


function putData() {
    //Get Values
    var name = document.getElementById("nameInfo").value;
    var phone = document.getElementById("phoneInfo").value;
    var streetNum = document.getElementById("streetNumberInfo").value;
    var streetName = document.getElementById("streetInfo").value;
    var suburb = document.getElementById("suburbInfo").value;
    var destSurb = document.getElementById("destinationInfo").value;
    var dateTime = document.getElementById("dateTimeInfo").value;
    
    var point = document.getElementById("bookingResult");
    
    //validation of the values
    var validation = validate(name, phone, streetNum, streetName, suburb, destSurb, dateTime);

    // Time validation
    var validationDT = timeValidate(dateTime);

    if (!validation) {
        point.setAttribute("class", "error");
        point.innerHTML = "All fields are required to make a booking.";

    } else {

        if (!validationDT) {
            point.setAttribute("class", "error");
            point.innerHTML = "Booking date and time cannot be earlier than current date and time";

        } else {
            // Execute On the page
            var data =
                "Name=" + name +
                "&Phone=" + phone +
                "&StreetNum=" + streetNum +
                "&StreetName=" + streetName +
                "&Suburb=" + suburb +
                "&DestSurb=" + destSurb +
                "&DateTime=" + dateTime.replace("T", " ");

            var xhr = new createRequest();
            xhr.open("POST", "booking.php", true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    var date = new Date(response[0].DateTime);
                    console.log(response);
                    point.setAttribute("class", "booked");
                    point.innerHTML =
                        "Booking confirmed. Your booking number is: " + response[0].ID + ". Pick up time is at " + date.toTimeString().slice(0, 5) + " on " + date.toDateString();
                }
            };
            xhr.send(data)
        }
    }
}
