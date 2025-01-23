window.addEventListener("DOMContentLoaded",()=>{
    //Star
    const startButton = document.querySelectorAll('.star');
    
    startButton.forEach((star, index) => {
        star.addEventListener('click', function() {
            startButton.forEach(s => s.classList.remove('checked'));
            
            for (let i = 0; i <= index; i++) {
                startButton[i].classList.add('checked');
            }
        });
    });
})

