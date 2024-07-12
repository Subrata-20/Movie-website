function signup() {
    document.querySelector(".ok").innerText = "Welcome back!";
    document.querySelector(".form1").classList.add('form1', 'pt-6', 'w-full', 'md:w-3/4', 'lg:w-full');
    document.querySelector(".form1").innerHTML = `
        <input type="email" placeholder="name@gmail.com" class="enter3 border focus:outline-none focus:outline-blue-600 shadow-md border-gray-300 rounded-md px-4 py-3 w-full mb-6">
        <input type="password" placeholder="password" class="enter4 border focus:outline-none shadow-md border-gray-300 rounded-md px-4 py-3 w-full mb-6">
        <button type="submit" class="continue border-0 shadow-md bg-blue-600 rounded-md px-2 py-3 w-full mb-2 hover:bg-blue-700 font-semibold text-white">Continue</button>`;
    let foot = document.querySelector('footer');
    foot.innerHTML = `Don't have an account? <button onclick="signup()" class="text-blue-700"><a href="login.html">Create one</a></button>`;  
    document.querySelector(".botton").style.display = "none";
    document.querySelector(".or").style.display = "none";
    document.querySelector(".frgt").classList.remove('hidden');
    document.querySelector(".frgt").classList.add('flex');
    document.querySelector(".continue").addEventListener('click', (e) => {
        e.preventDefault();
        let enter3 = document.querySelector(".enter3").value;
        let enter4 = document.querySelector(".enter4").value;
        if (enter3 === "" || enter4 === "") {
            alert("Please fill the required information");
        } else {
            window.location.href = "index.html"; // Redirect to the home page
        }
    });
}

let sign = document.querySelector(".sign");
sign.addEventListener('submit', (e) => {
    e.preventDefault();
    let enter1 = document.querySelector(".enter1").value;
    let enter2 = document.querySelector(".enter2").value;

    if (enter1 === "" || enter2 === "") {
        alert("Please fill the required information");
    } 
    else if (sign.innerHTML === "Sign Up") {
        document.querySelector(".ok").innerText = "Welcome back!";
        document.querySelector(".form1").classList.add('form1', 'pt-6', 'w-full', 'md:w-3/4', 'lg:w-full');
        document.querySelector(".form1").innerHTML = `
            <input type="email" placeholder="name@gmail.com" class="enter3 border focus:outline-none focus:outline-blue-600 shadow-md border-gray-300 rounded-md px-4 py-3 w-full mb-6">
            <input type="password" placeholder="password" class="enter4 border focus:outline-none shadow-md border-gray-300 rounded-md px-4 py-3 w-full mb-6">
            <button type="submit" class="continue border-0 shadow-md bg-blue-600 rounded-md px-2 py-3 w-full mb-2 hover:bg-blue-700 font-semibold text-white">Continue</button>`;
        
        let foot = document.querySelector('footer');
        foot.innerHTML = `Don't have an account? <button onclick="signup()" class="text-blue-700"><a href="login.html">Create one</a></button>`;
        
        document.querySelector(".botton").style.display = "none";
        document.querySelector(".or").style.display = "none";
        document.querySelector(".frgt").classList.remove('hidden');
        document.querySelector(".frgt").classList.add('flex');
        alert("You have signed up successfully!");

        document.querySelector(".continue").addEventListener('submit', (e) => {
            e.preventDefault();
            let enter3 = document.querySelector(".enter3").value;
            let enter4 = document.querySelector(".enter4").value;
            if (enter3 === "" || enter4 === "") {
                alert("Please fill the required information");
            } else if (enter1 === enter3 && enter2 === enter4) {
                alert("You have successfully signed in!");
                window.location.href = "index.html";
            } else {
                alert("Entered information does not match the original details.");
            }
        });
    }
});
