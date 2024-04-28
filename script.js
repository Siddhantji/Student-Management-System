let studentData = []; // Declare studentData as a global variable

let input = document.getElementById("input");


const sZtoA = document.getElementById("sZtoA");
const sAtoZ = document.getElementById("sAtoZ");
const sMarks = document.getElementById("sMarks");
const sClass = document.getElementById("sClass");
const sPassing = document.getElementById("sPassing");
const sGender = document.getElementById("sGender");

const tbody = document.getElementById("tbody");




document.addEventListener("DOMContentLoaded", function () {
  // Fetch the array of student data and populate the table
  fetch(
    "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json"
  )
    .then((response) => response.json())
    .then((data) => {
      studentData = data; // Assign fetched data to studentData

      // Populate the table initially
      populateTable(studentData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  // Rest of the code...
});




function populateTable(data) {
  //clear the table
  tbody.innerHTML = "";

  // Populate the table
  data.forEach((element) => {
    tbody.innerHTML += `
    <tr>
        <td class="text-center p-0">${element.id}</td>
        <td class="d-flex"><img class=" me-3 img-width" src='${element.img_src}' alt="">${element.first_name} ${element.last_name}</td>
        <td >${element.gender}</td>
        <td >${element.class}</td>
        <td >${element.marks}</td>
        <td >${element.passing ? 'pass':'fail'}</td>
        <td >${element.email}</td>
    </tr>
    `;
  });
}

document.getElementById("search").addEventListener("click",function(event){
  event.preventDefault(); 
  let searchT = input.value.trim().toLowerCase();
  console.log("Search query:", searchT);
  let searched = studentData.filter(value => {
    return(
      value.first_name.toLowerCase().includes(searchT)|| 
      value.last_name.toLowerCase().includes(searchT)|| 
      value.email.toLowerCase().includes(searchT));
  });
  populateTable(searched);

});

sAtoZ.addEventListener("click",function(){sorted("first_name","asc");});
sZtoA.addEventListener("click",function(){sorted("first_name","dsc")});
sMarks.addEventListener("click",function(){sorted("marks","asc")});
sPassing.addEventListener("click",function(){sorted("passing","dsc")});
sClass.addEventListener("click",function(){sorted("class","asc")});
sGender.addEventListener("click",function(){sorted("gender","asc")});

function sorted(key,order){
    studentData.sort((a,b) => {
        const va =  a[key];
        const vb =  b[key];
        let comp = 0;
        if(va > vb){
            comp = 1;
        }
        else if (va < vb){
            comp = -1;
        }
        return order === 'dsc' ? comp * -1 : comp;
    });
    populateTable(studentData);
}
