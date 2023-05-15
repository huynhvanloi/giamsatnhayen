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
  var hours = now.getHours().toString().padStart(2, "0");
  var minutes = now.getMinutes().toString().padStart(2, "0");
  var seconds = now.getSeconds().toString().padStart(2, "0");
  var day = now.getDate().toString().padStart(2, "0");
  var month = (now.getMonth() + 1).toString().padStart(2, "0");
  var year = now.getFullYear().toString();
  var formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  document.getElementById("current-time").textContent = formattedDate;
}
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

const firebaseConfig = {
  apiKey: "AIzaSyANNelf16RkVkyZV_9DvLKnWR8qi3DB_ho",
  authDomain: "raspberry-4e39d.firebaseapp.com",
  databaseURL:
    "https://raspberry-4e39d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "raspberry-4e39d",
  storageBucket: "raspberry-4e39d.appspot.com",
  messagingSenderId: "628449356988",
  appId: "1:628449356988:web:e9875047f9240bce66b4b9",
  measurementId: "G-G3PND12RJ6",
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
    ledCu = snap.child("Control").val().LED_CU;
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
    if (ledCu) {
      document.getElementById("unact").style.display = "none";
      document.getElementById("act").style.display = "block";
    } else {
      document.getElementById("unact").style.display = "block";
      document.getElementById("act").style.display = "none";
    }
    //FAN
    if (quatThongGio) {
      document.getElementById("unact1").style.display = "none";
      document.getElementById("act1").style.display = "block";
    } else {
      document.getElementById("unact1").style.display = "block";
      document.getElementById("act1").style.display = "none";
    }
    //LED_SUOI
    if (demSuoiAm) {
      document.getElementById("unact2").style.display = "none";
      document.getElementById("act2").style.display = "block";
    } else {
      document.getElementById("unact2").style.display = "block";
      document.getElementById("act2").style.display = "none";
    }
    //MUSIC
    if (loa) {
      document.getElementById("unact3").style.display = "none";
      document.getElementById("act3").style.display = "block";
    } else {
      document.getElementById("unact3").style.display = "block";
      document.getElementById("act3").style.display = "none";
    }
    //HUMI
    if (phunSuong) {
      document.getElementById("unact4").style.display = "none";
      document.getElementById("act4").style.display = "block";
    } else {
      document.getElementById("unact4").style.display = "block";
      document.getElementById("act4").style.display = "none";
    }

    //auto
    if (autoMode) {
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
    var firebaseRef = firebase
      .database()
      .ref()
      .child("Control")
      .child("LED_CU");
    var firebaseRef_status = firebase.database().ref().child("DeviceStatus");
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, "0");
    var minutes = now.getMinutes().toString().padStart(2, "0");
    var seconds = now.getSeconds().toString().padStart(2, "0");
    var day = now.getDate().toString().padStart(2, "0");
    var month = (now.getMonth() + 1).toString().padStart(2, "0");
    var year = now.getFullYear().toString();
    var formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    if (ledCu) {
      // post to firebase

      data = {
        name: "Đèn Chống Cú",
        time: formattedDate,
        status: "Bật",
      };
      firebaseRef_status.push(data);
      firebaseRef.set(true);
      ledCu = false;
    } else {
      data2 = {
        name: "Đèn Chống Cú",
        time: formattedDate,
        status: "Tắt",
      };
      firebaseRef_status.push(data2);
      firebaseRef.set(false);
      ledCu = true;
    }
  });
  //fan
  $(".toggle-btn1").click(function () {
    ////controler device led
    var firebaseRef = firebase.database().ref().child("Control").child("FAN");
    var firebaseRef_status = firebase.database().ref().child("DeviceStatus");
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, "0");
    var minutes = now.getMinutes().toString().padStart(2, "0");
    var seconds = now.getSeconds().toString().padStart(2, "0");
    var day = now.getDate().toString().padStart(2, "0");
    var month = (now.getMonth() + 1).toString().padStart(2, "0");
    var year = now.getFullYear().toString();
    var formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    if (quatThongGio) {
      // post to firebase

      data = {
        name: "Quạt",
        time: formattedDate,
        status: "Bật",
      };
      firebaseRef_status.push(data);
      firebaseRef.set(true);
      quatThongGio = false;
    } else {
      data2 = {
        name: "Quạt",
        time: formattedDate,
        status: "Tắt",
      };
      firebaseRef_status.push(data2);
      firebaseRef.set(false);
      quatThongGio = true;
    }
  });
  //suoi
  $(".toggle-btn2").click(function () {
    ////controler device led
    var firebaseRef = firebase
      .database()
      .ref()
      .child("Control")
      .child("LED_SUOI");
    var firebaseRef_status = firebase.database().ref().child("DeviceStatus");
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, "0");
    var minutes = now.getMinutes().toString().padStart(2, "0");
    var seconds = now.getSeconds().toString().padStart(2, "0");
    var day = now.getDate().toString().padStart(2, "0");
    var month = (now.getMonth() + 1).toString().padStart(2, "0");
    var year = now.getFullYear().toString();
    var formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    if (demSuoiAm) {
      // post to firebase

      data = {
        name: "Đèn Sưởi",
        time: formattedDate,
        status: "Bật",
      };
      firebaseRef_status.push(data);
      firebaseRef.set(true);
      demSuoiAm = false;
    } else {
      data2 = {
        name: "Đèn Sưởi",
        time: formattedDate,
        status: "Tắt",
      };
      firebaseRef_status.push(data2);
      firebaseRef.set(false);
      demSuoiAm = true;
    }
  });
  //music
  $(".toggle-btn3").click(function () {
    ////controler device led
    var firebaseRef = firebase.database().ref().child("Control").child("MUSIC");
    var firebaseRef_status = firebase.database().ref().child("DeviceStatus");
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, "0");
    var minutes = now.getMinutes().toString().padStart(2, "0");
    var seconds = now.getSeconds().toString().padStart(2, "0");
    var day = now.getDate().toString().padStart(2, "0");
    var month = (now.getMonth() + 1).toString().padStart(2, "0");
    var year = now.getFullYear().toString();
    var formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    if (loa) {
      // post to firebase

      data = {
        name: "Tiếng Gọi Yến",
        time: formattedDate,
        status: "Bật",
      };
      firebaseRef_status.push(data);
      firebaseRef.set(true);
      loa = false;
    } else {
      data2 = {
        name: "Tiếng Gọi Yến",
        time: formattedDate,
        status: "Tắt",
      };
      firebaseRef_status.push(data2);
      firebaseRef.set(false);
      loa = true;
    }
  });
  //humi
  $(".toggle-btn4").click(function () {
    ////controler device led
    var firebaseRef = firebase.database().ref().child("Control").child("HUMI");
    var firebaseRef_status = firebase.database().ref().child("DeviceStatus");
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, "0");
    var minutes = now.getMinutes().toString().padStart(2, "0");
    var seconds = now.getSeconds().toString().padStart(2, "0");
    var day = now.getDate().toString().padStart(2, "0");
    var month = (now.getMonth() + 1).toString().padStart(2, "0");
    var year = now.getFullYear().toString();
    var formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    if (phunSuong) {
      // post to firebase

      data = {
        name: "Phun Sương",
        time: formattedDate,
        status: "Bật",
      };
      firebaseRef_status.push(data);
      firebaseRef.set(true);
      phunSuong = false;
    } else {
      data2 = {
        name: "Phun Sương",
        time: formattedDate,
        status: "Tắt",
      };
      firebaseRef_status.push(data2);
      firebaseRef.set(false);
      phunSuong = true;
    }
  });
  //auto
  $(".toggle-btn5").click(function () {
    ////controler device led
    var firebaseRef = firebase.database().ref().child("Auto");
    var firebaseRef_status = firebase.database().ref().child("DeviceStatus");
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, "0");
    var minutes = now.getMinutes().toString().padStart(2, "0");
    var seconds = now.getSeconds().toString().padStart(2, "0");
    var day = now.getDate().toString().padStart(2, "0");
    var month = (now.getMonth() + 1).toString().padStart(2, "0");
    var year = now.getFullYear().toString();
    var formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    if (autoMode) {
      // post to firebase
      console.log(loa);
      data = {
        name: "Tự Động",
        time: formattedDate,
        status: "Bật",
      };
      firebaseRef_status.push(data);
      firebaseRef.set(true);
      autoMode = false;
    } else {
      console.log(autoMode);
      data2 = {
        name: "Tự Động",
        time: formattedDate,
        status: "Tắt",
      };
      firebaseRef_status.push(data2);
      firebaseRef.set(false);
      autoMode = true;
    }
  });
});

var database = firebase.database();

// Lấy danh sách các ảnh từ Firebase Storage
var database = firebase.database();
var usersRef_sensor = database.ref("SensorHistory");
// Listen for changes in the data and update the HTML table
usersRef_sensor.on("value", function (snapshot) {
  var tableBody = document.getElementById("tableBody-history");
  tableBody.innerHTML = "";

  snapshot.forEach(function (childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    var newRow = document.createElement("tr");
    newRow.innerHTML =
      "<td>" +
      childData.time +
      "</td><td>" +
      childData.temperature + " &deg;C"+
      "</td>" +
      "<td>" +
      childData.humidity + " %"+
      "</td>" +
      "<td>" +
      childData.light +
      "</td>";
    tableBody.prepend(newRow);

    // Add a new row to the HTML table with the data from the database
  });
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
  var filename = "History_Data.xlsx";
  XLSX.writeFile(workbook, filename);
}