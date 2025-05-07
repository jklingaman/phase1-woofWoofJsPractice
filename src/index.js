
function buildSpan(dog) {
    const dogBar = document.querySelector('#dog-bar');
    const span = document.createElement('span');

    span.id = `${dog.id}`;
    span.textContent = `${dog.name}`;

    span.addEventListener('click', () => {
        const dogInfo = document.querySelector('#dog-info');
        const div = document.createElement('div');
        let buttonText;

        dogInfo.innerHTML = '';
        
        if (dog.isGoodDog === false) {
            buttonText = 'Good Dog!'
        } else {
            buttonText = 'Bad Dog!'
        }

        div.innerHTML = `
        <img src='${dog.image}'/>
        <h2>${dog.name}</h2>
        <button id='clicked' style='border-radius: 10px; box-shadow: 5px 2.5px 2.5px grey'>${buttonText}</button>
        `

        dogInfo.appendChild(div)


        const btn = document.querySelector('#clicked');
        btn.addEventListener('click', () => {
            WhosAGoodPup(dog, btn)
        });
    });

    dogBar.appendChild(span)
}
function displaySpan() {
    fetch('http://localhost:3000/pups')
    .then((res) => res.json())
    .then((dogs) => {
        dogs.forEach((dog) => {
            buildSpan(dog)
        })
        // filterGoodDogs(dogs)
    })
}

function WhosAGoodPup(dog, btn) {
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        'method': 'PATCH',
        'headers': {
            'Content-Type': 'application/json',
        }, 
        body:JSON.stringify({
            isGoodDog: !dog.isGoodDog
        })
       
    })
    .then((res) => res.json())
    .then((updatedDog) => {
        dog.isGoodDog = updatedDog.isGoodDog

        if (dog.isGoodDog === false) {
            btn.textContent = 'Good Dog!'
        } else {
            btn.textContent = 'Bad Dog!'
        }
    });
}

// function filterGoodDogs(value) {
//     const filterBtn = document.querySelector('#good-dog-filter');
//     const span = document.querySelectorAll(`#${id}`)

//     filterBtn.addEventListener('click', () => {
//         if(value.isGoodDog === false) {
//             span.classList.add('hidden');
//             filterBtn.textContent = 'Filter Good Dogs: ON'
//         } else {
//             span.classList.remove('hidden');
//             filterBtn.textContent = 'Filter Good Dogs: OFF'
//         }
//     })
// }

function init() {
    displaySpan()
}
document.addEventListener('DOMContentLoaded', () => init())