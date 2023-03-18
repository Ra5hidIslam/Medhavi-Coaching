// Getting the w
const qna_div = document.getElementById("question-answer");
const date = new Date();
qna = [
    {
        q:"How many isotopes of benzene",
        op:['a','b','c','d']
    },
    {
        q:"How many states of a higs boson",
        op:['e','f','g','h']
    },
    {
        q:"What is a threshold voltage?",
        op:['i','j','k','l']
    }
];

// Creating the question div

let i = 1;
qna.forEach(element => {
    const question_block = document.createElement('div');
    const question_div = document.createElement('div');
    const options_div = document.createElement('div');
    question_div.textContent = element['q'];

    
    element.op.forEach(option =>{
        const options_block = document.createElement('div');
        // adding the radio button
        const ip = document.createElement("input");
        ip.type = "radio";
        ip.name = "button" + i;

        // adding the question as a label
        const q = document.createElement("label");
        q.textContent = option;

        // adding the the block
        options_block.appendChild(ip);
        options_block.appendChild(q);

        // adding the block the the html element 
        question_div.appendChild(options_block);
        
    })

    // adding a submit button 
    const s = document.createElement('button')
    s.textContent = "SUBMIT";
    
    question_block.appendChild(question_div);
    question_block.appendChild(options_div);
    question_block.appendChild(s);
    qna_div.appendChild(question_block);
    i = i+1;
});



// find out which button is pressed on submit 
// I want the id of the submit button selected and the option selected
