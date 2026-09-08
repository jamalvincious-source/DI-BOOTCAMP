(function(username) {
    const navbar = document.getElementById('navbar') || document.body;
    
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.gap = '10px';
    
    div.innerHTML = `
        <span>Welcome, ${username}!</span>
        <img src="https://via.placeholder.com/40" alt="Profile Picture" style="border-radius: 50%; width: 40px; height: 40px;">
    `;
    
    navbar.appendChild(div);
})('John');