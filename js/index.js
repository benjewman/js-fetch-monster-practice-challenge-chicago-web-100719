
document.addEventListener('DOMContentLoaded', function(){
    const monsterDiv = document.getElementById('monster-container');
    

    function renderForm() {
        const formDiv = document.getElementById('create-monster');
        const formHtml = `
        <form>
            <input type='text' value='name'></input>
            <input type='text' value='age'></input>
            <input type='text' value='description'></input>
            <button type='submit'>Create Monster</button>
        </form>
        `;
        formDiv.insertAdjacentHTML('afterbegin', formHtml);
    }
    
    function renderMonster(monster) {
        monsterHtml = `
        <div>
            <h2>${monster.name}</h2>
            <h4>Age: ${monster.age}</h4>
            <p>Bio: ${monster.description}</p>
        </div>
        `;
        monsterDiv.insertAdjacentHTML('beforeend', monsterHtml);
    }
    
    function renderMonsters(monsters) {
        monsterDiv.innerHTML = '';
        monsters.forEach (monster => renderMonster(monster));
    }
    
    function fetchMonsters(page) {
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(resp => resp.json())
        .then(monsters => {
            if (monsters.length > 0) {
                renderMonsters(monsters)
            } else {
                page --;
            }
                
        })
    }
    
    function main() {
        let page = 1;
        fetchMonsters(page);
        renderForm();
        
        const forwardBtn = document.getElementById('forward');
        
        forwardBtn.addEventListener('click', function(event) {
            page ++;
            fetchMonsters(page);
        });
        
        const backBtn = document.getElementById('back');
        
        backBtn.addEventListener('click', function(event) {
            if (page > 1) {
                page --;
                fetchMonsters(page);
            }  
        });

        const form = document.querySelector('form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            // debugger;
            // console.log(event.target)
            
            const newMonster = {
                'name': event.target.children[0].value,
                'age': event.target.children[1].value,
                'description': event.target.children[2].value
            }

            reqObj = {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body: JSON.stringify(newMonster)
            }

            fetch('http://localhost:3000/monsters', reqObj)
            .then(resp => resp.json())
            .then(monster => {
                console.log(monster)
                
            })
        })

    }

    main();




    // function renderNextMonsters(startingNumber) {
    //     fetch('http://localhost:3000/monsters')
    //     .then(resp => resp.json())
    //     .then(monsters => )
    // }
});

