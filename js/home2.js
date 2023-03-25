// Getting the w
const qna_div = document.getElementById("question-answer");
const date = new Date();
qna = [
    {
        q:"How many isotopes of benzene",
        op:['a','b','c','d'],
        type:"mcq"
    },
    {
        q:"How many states of a higs boson",
        op:['e','f','g','h'],
        type:"mcq"
    },
    {
        q:"What is a threshold voltage?",
        op:['i','j','k','l'],
        type:"mcq"
    }
    // {
    //     q:"Can you guys please answer this for me? A person is running at a speed of 100 km/h, in how many seconds will he cover 30m?",
    //     type:"blog"
    // }
];

// Creating the question div

let i = 1;
let j = 10;
qna.forEach(element => {
    const question_block = document.createElement('div');
    const question_div = document.createElement('div');
    question_div.className = "question_div";
    question_div.textContent = element['q'];


    if(element.type == "mcq"){
        const options_div = document.createElement('div');
        element.op.forEach(option =>{
            const options_block = document.createElement('div');
        
            // adding the radio button
            const ip = document.createElement("input");
            ip.type = "radio";
            // ip.className = "input" + i;
            ip.value = option;
            ip.name = "radio-buttonss" + i;
            ip.className = 'input' + i;

            // adding the question as a label
            const q = document.createElement("label");
            q.textContent = option;

            // adding the the block 
            options_block.appendChild(ip);
            options_block.appendChild(q);

            // adding the block the the html element 
            options_div.appendChild(options_block);
            j = j+1;
        })

    }
    else
    {
        const blog_interaction_div = document.createElement('div');
        const comment_div = document.createElement('div');
        const upvote_div = document.createElement('div');


        comment_div.textContent = "comment";
        
    }
    // adding a submit button 
    const s = document.createElement('button')
    s.className = "submit-button"
    s.id = i;
    s.textContent = "SUBMIT";
    question_block.appendChild(question_div);
    question_block.appendChild(options_div);
    question_block.appendChild(s);
    qna_div.appendChild(question_block);
    i = i+1;
});



for(let r=1; r<4; r++) {
    (function (i) { 
        const a = document.getElementById(r);
        a.addEventListener('click',e=>{
            // e.preventDefault();
            const p = document.getElementsByClassName('input'+ r);
            for(let el = 0; el< p.length; el++){
                if(p[el].checked){
                    console.log("clicked " + a.id + " " + p[el].value);
                };

            };
            
        });
    })(i);
}


