/* 
Student Name: Kyu Yeon Kim 
Student ID:   19069575
Description of the file:
This is JS file which will be used for the admin page.
The functions includes: 
    Receving information of bookings two hours from now from admin.php
    Receving the reference number and sending it to admin2.php
    Recevied information will be displayed on admin page
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

function searchData() {
    
    var data = "";
    var result = document.getElementById('searchResult');

    var xhr = new createRequest();
    xhr.open("POST", "admin.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        str = "";
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response);
            
            str += "<table style='border-collapse: collapse; border: 1px solid black; '>";
            str += "<tr style='border-collapse: collapse; border: 1px solid black;'>";
            str += "<th style='border-collapse: collapse; border: 1px solid black;'>Id</th>";
            str += "<th style='border-collapse: collapse; border: 1px solid black;'>Name</th>";
            str += "<th style='border-collapse: collapse; border: 1px solid black;'>Phone</th>";
            str += "<th style='border-collapse: collapse; border: 1px solid black;'>Street Number</th>";
            str += "<th style='border-collapse: collapse; border: 1px solid black;'>Street Name</th>";
            str += "<th style='border-collapse: collapse; border: 1px solid black;'>Suburb</th>";
            str += "<th style='border-collapse: collapse; border: 1px solid black;'>Destination suburb</th>";
            str += "<th style='border-collapse: collapse; border: 1px solid black;'>Pickup Date/Time</th>";
            str += "<th style='border-collapse: collapse; border: 1px solid black;'>Booking Updated</th>";
            str += "<th style='border-collapse: collapse; border: 1px solid black;'>Assigned</th>";
            str += "</tr>";
            
            response.forEach((info) => {
                str += "<tr style='border-collapse: collapse; border: 1px solid black;'>";
                str += "<th style='border-collapse: collapse; border: 1px solid black;'>" + info.ID + "</th>";
                str += "<th style='border-collapse: collapse; border: 1px solid black;'>" + info.Name + "</th>";
                str += "<th style='border-collapse: collapse; border: 1px solid black;'>" + info.Phone + "</th>";
                str += "<th style='border-collapse: collapse; border: 1px solid black;'>" + info.StreetNum + "</th>";
                str += "<th style='border-collapse: collapse; border: 1px solid black;'>" + info.StreetName + "</th>";
                str += "<th style='border-collapse: collapse; border: 1px solid black;'>" + info.Suburb + "</th>";
                str += "<th style='border-collapse: collapse; border: 1px solid black;'>" + info.DestSurb + "</th>";
                str += "<th style='border-collapse: collapse; border: 1px solid black;'>" + info.DateTime + "</th>";
                str += "<th style='border-collapse: collapse; border: 1px solid black;'>" + info.BookDate + "</th>";
                str += "<th style='border-collapse: collapse; border: 1px solid black;'>" + info.Assign + "</th>";
                str += "</tr>";
                
            });
            str += "</table>";
            result.innerHTML = str;
        } 
    };
    xhr.send(data);
}

function assignTaxi(refNum) {
    
    var data = "refNum=" + refNum;
    console.log(data);
    console.log(refNum);
    var result = document.getElementById('assignResult');

    var xhr = new createRequest();
    xhr.open("POST", "admin2.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response);            
            result.innerHTML = "Reference Number: " + response[0].ID + " has been assigned to a taxi.";
            
        } else {
            result.innerHTML = "<p>No Matching Reference Number</p>";
        }
    };
    xhr.send(data);
}
