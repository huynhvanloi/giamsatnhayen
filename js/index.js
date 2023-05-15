// Document operation functions
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

// Show Sidebar
menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

// Hide Sidebar
closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

// Change Theme
themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");
  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});

// Update Time
function updateCurrentTime() {
  var now = new Date();
  // now.setUTCHours(now.getUTCHours() + 7); // Thêm 7 giờ để chuyển múi giờ về GMT+7
  var hours = now.getHours().toString().padStart(2, '0');
  var minutes = now.getMinutes().toString().padStart(2, '0');
  var seconds = now.getSeconds().toString().padStart(2, '0');
  var day = now.getDate().toString().padStart(2, '0');
  var month = (now.getMonth() + 1).toString().padStart(2, '0');
  var year = now.getFullYear().toString();
  var formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  document.getElementById('current-time').textContent = formattedDate;
}
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

/// firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANNelf16RkVkyZV_9DvLKnWR8qi3DB_ho",
  authDomain: "raspberry-4e39d.firebaseapp.com",
  databaseURL: "https://raspberry-4e39d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "raspberry-4e39d",
  storageBucket: "raspberry-4e39d.appspot.com",
  messagingSenderId: "628449356988",
  appId: "1:628449356988:web:e9875047f9240bce66b4b9",
  measurementId: "G-G3PND12RJ6"
};

firebase.initializeApp(firebaseConfig);
$(document).ready(function () {
  var database = firebase.database();
  var Temperature;
  var Humidity;
  var Light;
  database.ref().on("value", function (snap) {
    Humidity = snap.val().humidity;
    Temperature = snap.val().temperature;
    Light = snap.val().light;
    //led cu
    ledCu= snap.child("Control").val().LED_CU;
    //auto
    autoMode = snap.child("/").val().Auto;
    //loa
    loa = snap.child("Control").val().MUSIC;
    //den suoi am
    demSuoiAm = snap.child("Control").val().LED_SUOI;
    //quat 
    quatThongGio = snap.child("Control").val().FAN;
    //phun suong
    phunSuong = snap.child("Control").val().HUMI;
    document.getElementById("Temperature").innerHTML = Temperature + " &deg;C";
    document.getElementById("Humidity").innerHTML = Humidity + " %";
    document.getElementById("Light").innerHTML = Light;

    if (ledCu) {    // check from the firebase
      document.getElementById("unact").style.display = "none";
      document.getElementById("act").style.display = "block";
    } else {
      document.getElementById("unact").style.display = "block";
      document.getElementById("act").style.display = "none";
    }
    //FAN
    if (quatThongGio) {    // check from the firebase
      document.getElementById("unact1").style.display = "none";
      document.getElementById("act1").style.display = "block";
    } else {
      document.getElementById("unact1").style.display = "block";
      document.getElementById("act1").style.display = "none";
    }
    //LED_SUOI
    if (demSuoiAm) {    // check from the firebase
      document.getElementById("unact2").style.display = "none";
      document.getElementById("act2").style.display = "block";
    } else {
      document.getElementById("unact2").style.display = "block";
      document.getElementById("act2").style.display = "none";
    }
    //MUSIC
    if (loa) {    // check from the firebase
      document.getElementById("unact3").style.display = "none";
      document.getElementById("act3").style.display = "block";
    } else {
      document.getElementById("unact3").style.display = "block";
      document.getElementById("act3").style.display = "none";
    }
    //HUMI
    if (phunSuong) {    // check from the firebase
      document.getElementById("unact4").style.display = "none";
      document.getElementById("act4").style.display = "block";
    } else {
      document.getElementById("unact4").style.display = "block";
      document.getElementById("act4").style.display = "none";
    }

    //auto
    if (autoMode) {    // check from the firebase
      document.getElementById("unact5").style.display = "none";
      document.getElementById("act5").style.display = "block";
    } else {
      document.getElementById("unact5").style.display = "block";
      document.getElementById("act5").style.display = "none";
    }
  });

  //nút bấm LED cú
  $(".toggle-btn").click(function () {
    ////controler device led
    var firebaseRef = firebase.database().ref().child("Control").child("LED_CU");
    var firebaseRef_status = firebase.database().ref().child("DeviceStatus");
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    var day = now.getDate().toString().padStart(2, '0');
    var month = (now.getMonth() + 1).toString().padStart(2, '0');
    var year = now.getFullYear().toString();
    var formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    if (ledCu) {    // post to firebase
    
      data = {
        name: "Đèn Chống Cú",
        time: formattedDate,
        status: "Bật",
      }
      firebaseRef_status.push(data)
      firebaseRef.set(true);
      ledCu = false;
    } else {
  
      data2 = {
        name: "Đèn Chống Cú",
        time: formattedDate,
        status: "Tắt",
      }
      firebaseRef_status.push(data2)
      firebaseRef.set(false);
      ledCu = true;
    }
  })
  //fan
  $(".toggle-btn1").click(function () {
    ////controler device led
    var firebaseRef = firebase.database().ref().child("Control").child("FAN");
    var firebaseRef_status = firebase.database().ref().child("DeviceStatus");
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    var day = now.getDate().toString().padStart(2, '0');
    var month = (now.getMonth() + 1).toString().padStart(2, '0');
    var year = now.getFullYear().toString();
    var formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    if (quatThongGio) {    // post to firebase
      
      data = {
        name: "Quạt",
        time: formattedDate,
        status: "Bật",
      }
      firebaseRef_status.push(data)
      firebaseRef.set(true);
      quatThongGio = false;
    } else {
     
      data2 = {
        name: "Quạt",
        time: formattedDate,
        status: "Tắt",
      }
      firebaseRef_status.push(data2)
      firebaseRef.set(false);
      quatThongGio = true;
    }
  })
  //suoi
  $(".toggle-btn2").click(function () {
    ////controler device led
    var firebaseRef = firebase.database().ref().child("Control").child("LED_SUOI");
    var firebaseRef_status = firebase.database().ref().child("DeviceStatus");
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    var day = now.getDate().toString().padStart(2, '0');
    var month = (now.getMonth() + 1).toString().padStart(2, '0');
    var year = now.getFullYear().toString();
    var formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    if (demSuoiAm) {    // post to firebase
     
      data = {
        name: "Đèn Sưởi",
        time: formattedDate,
        status: "Bật",
      }
      firebaseRef_status.push(data)
      firebaseRef.set(true);
      demSuoiAm = false;
    } else {
     
      data2 = {
        name: "Đèn Sưởi",
        time: formattedDate,
        status: "Tắt",
      }
      firebaseRef_status.push(data2)
      firebaseRef.set(false);
      demSuoiAm = true;
    }
  })
  //music
  $(".toggle-btn3").click(function () {
    ////controler device led
    var firebaseRef = firebase.database().ref().child("Control").child("MUSIC");
    var firebaseRef_status = firebase.database().ref().child("DeviceStatus");
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    var day = now.getDate().toString().padStart(2, '0');
    var month = (now.getMonth() + 1).toString().padStart(2, '0');
    var year = now.getFullYear().toString();
    var formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    if (loa) {    // post to firebase
    
      data = {
        name: "Tiếng Gọi Yến",
        time: formattedDate,
        status: "Bật",
      }
      firebaseRef_status.push(data)
      firebaseRef.set(true);
      loa = false;
    } else {
     
      data2 = {
        name: "Tiếng Gọi Yến",
        time: formattedDate,
        status: "Tắt",
      }
      firebaseRef_status.push(data2)
      firebaseRef.set(false);
      loa = true;
    }
  })
  //humi
  $(".toggle-btn4").click(function () {
    ////controler device led
    var firebaseRef = firebase.database().ref().child("Control").child("HUMI");
    var firebaseRef_status = firebase.database().ref().child("DeviceStatus");
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    var day = now.getDate().toString().padStart(2, '0');
    var month = (now.getMonth() + 1).toString().padStart(2, '0');
    var year = now.getFullYear().toString();
    var formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    if (phunSuong) {    // post to firebase

      data = {
        name: "Phun Sương",
        time: formattedDate,
        status: "Bật",
      }
      firebaseRef_status.push(data)
      firebaseRef.set(true);
      phunSuong = false;
    } else {

      data2 = {
        name: "Phun Sương",
        time: formattedDate,
        status: "Tắt",
      }
      firebaseRef_status.push(data2)
      firebaseRef.set(false);
      phunSuong = true;
    }
  })
  //auto 
  $(".toggle-btn5").click(function () {
    ////controler device led
    var firebaseRef = firebase.database().ref().child("Auto");
    var firebaseRef_status = firebase.database().ref().child("DeviceStatus");
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    var day = now.getDate().toString().padStart(2, '0');
    var month = (now.getMonth() + 1).toString().padStart(2, '0');
    var year = now.getFullYear().toString();
    var formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    if (autoMode) {    // post to firebase
      console.log(loa)
      data = {
        name: "Tự Động",
        time: formattedDate,
        status: "Bật",
      }
      firebaseRef_status.push(data)
      firebaseRef.set(true);
      autoMode = false;
    } else {
      console.log(autoMode)
      data2 = {
        name: "Tự Động",
        time: formattedDate,
        status: "Tắt",
      }
      firebaseRef_status.push(data2)
      firebaseRef.set(false);
      autoMode = true;
    }
  })
});

var database = firebase.database();
// Get a reference
//  to the "users" node in your database
var usersRef_device = database.ref('DeviceStatus');

// Listen for changes in the data and update the HTML table
usersRef_device.on('value', function (snapshot) {
  var tableBody = document.getElementById('tbody');
  tableBody.innerHTML = '';

  snapshot.forEach(function (childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();

    var newRow = document.createElement('tr');
    newRow.innerHTML = '<td>' + childData.time + '</td><td>' + childData.name + '</td>' + '<td>' + childData.status + '</td>';
    tableBody.prepend(newRow);

    // Add a new row to the HTML table with the data from the database

  });
});
/////history data

//Create a new Chart object
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Temperature (°C)',
      data: [],
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
      borderColor: 'rgba(255, 0, 0, 1)',
      borderWidth: 1,
      fill:true,
      backgroundColor:'rgba(255, 0, 0, 0.5)',
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

// Listen for changes to the temperature data
var temperatureRef= database.ref('SensorHistory');
temperatureRef.on('child_added', function(data) {
  var temperatureData = data.val();
  var timeString = temperatureData.time
  var time = timeString.slice(0, 8);
  myChart.data.labels.push(time);
  myChart.data.datasets[0].data.push(temperatureData.temperature);
  if (myChart.data.labels.length > 20) {
    myChart.data.labels.shift();
    myChart.data.datasets[0].data.shift();
  }
  myChart.update();
});

//Create a new Chart object
var ctx = document.getElementById('myChart2').getContext('2d');
var myChart2 = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Humidity (%)',
      data: [],
      backgroundColor: 'rgba(0, 128, 255, 0.2)',
      borderColor: 'rgba(0, 128, 255, 1)',
      borderWidth: 1,
      fill:true,
      backgroundColor:'rgba(0, 128, 255, 0.5)',
    }]
  },
  
});
// Listen for changes to the humidity data
var humidityREF= database.ref('SensorHistory');
humidityREF.on('child_added', function(data2) {
  var humidityData = data2.val();
  var timeString = humidityData.time
  var time = timeString.slice(0, 8);
  myChart2.data.labels.push(time);
  myChart2.data.datasets[0].data.push(humidityData.humidity);
  if (myChart2.data.labels.length > 20) {
    myChart2.data.labels.shift();
    myChart2.data.datasets[0].data.shift();
  }
  myChart2.update();
});

//Create a new Chart object
var ctx = document.getElementById('myChart3').getContext('2d');
var myChart3 = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Light Level (lux)',
      data: [],
      backgroundColor: 'rgba(255, 255, 0, 0.2)',
      borderColor: 'rgba(255, 255, 0, 1)',
      borderWidth: 1,
      fill:true,
      backgroundColor:'rgba(255, 255, 0, 0.5)',
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
// Listen for changes to the light data
var lightREF= database.ref('SensorHistory');
lightREF.on('child_added', function(data3) {
  var lightData = data3.val();
  var timeString = lightData.time
  var time = timeString.slice(0, 8);
  myChart3.data.labels.push(time);
  myChart3.data.datasets[0].data.push(lightData.light);
  if (myChart3.data.labels.length > 20) {
    myChart3.data.labels.shift();
    myChart3.data.datasets[0].data.shift();
  }
  myChart3.update();
});

function exportToExcel() {
  // Get the table HTML element
  var table = document.getElementsByTagName("table")[0];

  // Convert the table to a worksheet object
  var worksheet = XLSX.utils.table_to_sheet(table);

  // Create a new workbook with a worksheet
  var workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Convert the workbook to an Excel file and download
  var filename = "History_Devices.xlsx";
  XLSX.writeFile(workbook, filename);
}

