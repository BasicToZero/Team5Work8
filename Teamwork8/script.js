const app = document.getElementById("app");

let selectedRole = "student";

/* User Data */

let users =
JSON.parse(localStorage.getItem("users"))
|| [];

/* User Save */

function saveUsers(){

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
}

/* Login */

function renderLogin(){

    app.innerHTML = `

    <div class="card">

        <div class="header">

            <div class="logo">🌟</div>

            <h2>Бяцхан Туслагч</h2>

            <p>Login</p>

        </div>

        <div class="body">

            <div class="role-buttons">

                <button class="role-btn active"
                onclick="selectRole(this,'student')">
                🎒 Сурагч
                </button>

                <button class="role-btn"
                onclick="selectRole(this,'teacher')">
                📚 Багш
                </button>

                <button class="role-btn"
                onclick="selectRole(this,'parent')">
                👨‍👩‍👦 Эцэг эх
                </button>

                <button class="role-btn"
                onclick="selectRole(this,'admin')">
                ⚙️ Админ
                </button>

            </div>

            <div id="loginFields"></div>

            <input
            type="password"
            id="password"
            placeholder="Password"
            >

            <button class="main"
            onclick="login()">
            Login
            </button>

            <div class="switch">

                Account Байхгүй юу?

                <span onclick="renderRegister()">
                Account шинээр нээх
                </span>

            </div>

        </div>

    </div>
    `;

    updateLoginFields();
}

/* Sign up */

function renderRegister(){

    app.innerHTML = `

    <div class="card">

        <div class="header">

            <div class="logo">🌟</div>

            <h2>Account шинээр нээх</h2>

        </div>

        <div class="body">

            <div class="role-buttons">

                <button class="role-btn active"
                onclick="selectRole(this,'student','register')">
                🎒 Сурагч
                </button>

                <button class="role-btn"
                onclick="selectRole(this,'teacher','register')">
                📚 Багш
                </button>

                <button class="role-btn"
                onclick="selectRole(this,'parent','register')">
                👨‍👩‍👦 Эцэг эх
                </button>

                <button class="role-btn"
                onclick="selectRole(this,'admin','register')">
                ⚙️ Админ
                </button>

            </div>

            <input
            id="name"
            placeholder="Нэр"
            >

            <div id="registerFields"></div>

            <input
            type="password"
            id="regPassword"
            placeholder="Password"
            >

            <button class="main"
            onclick="register()">
            Sign Up
            </button>

            <div class="switch">

                Account байгаа юу?

                <span onclick="renderLogin()">
                Login
                </span>

            </div>

        </div>

    </div>
    `;

    updateRegisterFields();
}

/* Role */

function selectRole(btn, role){

    document.querySelectorAll(".role-btn")
    .forEach(b => {

        b.classList.remove("active");
    });

    btn.classList.add("active");

    selectedRole = role;

    if(document.getElementById("loginFields")){

        updateLoginFields();
    }

    if(document.getElementById("registerFields")){

        updateRegisterFields();
    }
}

/* Login Screen */

function updateLoginFields(){

    const fields =
    document.getElementById("loginFields");

    if(selectedRole === "student"){

        fields.innerHTML = `
        <input
        id="studentCode"
        placeholder="Сурагч Код"
        >
        `;
    }

    else if(selectedRole === "teacher"){

        fields.innerHTML = `
        <input
        id="teacherCode"
        placeholder="Багш код"
        >
        `;
    }

    else if(selectedRole === "parent"){

        fields.innerHTML = `

        <input
        type="email"
        id="email"
        placeholder="Эцэг эх имэйл"
        >

        <input
        id="childCode"
        placeholder="Хүүхдын сурагч код"
        >
        `;
    }

    else if(selectedRole === "admin"){

        fields.innerHTML = `
        <input
        id="adminCode"
        placeholder="Admin код"
        >
        `;
    }
}

/* Register screen */

function updateRegisterFields(){

    const fields =
    document.getElementById("registerFields");

    if(selectedRole === "student"){

        fields.innerHTML = `
        <input
        id="studentCode"
        placeholder="Сурагч Код"
        >
        `;
    }

    else if(selectedRole === "teacher"){

        fields.innerHTML = `
        <input
        id="teacherCode"
        placeholder="Багш код"
        >
        `;
    }

    else if(selectedRole === "parent"){

        fields.innerHTML = `

        <input
        type="email"
        id="email"
        placeholder="Эцэг эх имэйл"
        >

        <input
        id="childCode"
        placeholder="Хүүхдын сурагч код"
        >
        `;
    }

    else if(selectedRole === "admin"){

        fields.innerHTML = `
        <input
        id="adminCode"
        placeholder="Admin код"
        >
        `;
    }
}

/* Register*/

function register(){

    const name =
    document.getElementById("name").value;

    const password =
    document.getElementById("regPassword").value;

    let user = {

        role:selectedRole,
        name:name,
        password:password
    };

    if(selectedRole === "student"){

        user.studentCode =
        document.getElementById("studentCode").value;
    }

    else if(selectedRole === "teacher"){

        user.teacherCode =
        document.getElementById("teacherCode").value;
    }

    else if(selectedRole === "parent"){

        user.email =
        document.getElementById("email").value;

        user.childStudentCode =
        document.getElementById("childCode").value;
    }

    else if(selectedRole === "admin"){

        user.adminCode =
        document.getElementById("adminCode").value;
    }

    users.push(user);

    saveUsers();

    alert("Account Created!");

    renderLogin();
}

/* Login */

function login(){

    const password =
    document.getElementById("password").value;

    let user = null;

    if(selectedRole === "student"){

        const code =
        document.getElementById("studentCode").value;

        user = users.find(u =>

            u.role === "student" &&
            u.studentCode === code &&
            u.password === password
        );
    }

    else if(selectedRole === "teacher"){

        const code =
        document.getElementById("teacherCode").value;

        user = users.find(u =>

            u.role === "teacher" &&
            u.teacherCode === code &&
            u.password === password
        );
    }

    else if(selectedRole === "parent"){

        const email =
        document.getElementById("email").value;

        const childCode =
        document.getElementById("childCode").value;

        user = users.find(u =>

            u.role === "parent" &&
            u.email === email &&
            u.childStudentCode === childCode &&
            u.password === password
        );
    }

    else if(selectedRole === "admin"){

        const code =
        document.getElementById("adminCode").value;

        user = users.find(u =>

            u.role === "admin" &&
            u.adminCode === code &&
            u.password === password
        );
    }

    if(!user){

        alert("Wrong Login Information");

        return;
    }

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

    /* Redict */

    if(user.role === "student"){

        window.location.href =
        "student.html";
    }

    else if(user.role === "teacher"){

        window.location.href =
        "teacher.html";
    }

    else if(user.role === "parent"){

        window.location.href =
        "parent.html";
    }

    else if(user.role === "admin"){

        window.location.href =
        "admin.html";
    }
}

/* Start */

renderLogin();