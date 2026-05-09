const user =
JSON.parse(localStorage.getItem("currentUser"));

function logout(){

    localStorage.removeItem("currentUser");

    window.location.href = "index.html";
}