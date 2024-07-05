function signup(){
document.querySelector(".ok").innerText = "Welcome back!";
document.querySelector(".form1").innerHTML = `<input type="text" placeholder="name@gmail.com" class="border focus:outline-none focus:outline-blue-600 shadow-md border-gray-300 rounded-md px-4 py-3 w-96 mb-6">
            <input type="text" placeholder="password" class="border focus:outline-none  shadow-md border-gray-300 rounded-md px-4 py-3 w-96 mb-6">
            <button class="sign border-0 shadow-md bg-blue-600 rounded-md px-2 py-3 w-96 mb-10 hover:bg-blue-700 font-semibold text-white">Continue</button>`;
let foot = document.querySelector('footer');
foot.innerHTML = "";
foot.innerHTML = `Don't have an account? <button  onclick="signup()" class="text-blue-700"><a href = "login.html">Create one</a></button>`;
document.querySelector(".botton").style.display = "none";
document.querySelector(".or").style.display = "none";
document.querySelector(".frgt").classList.remove('hidden');
document.querySelector(".frgt").classList.add('flex');
}