
let currentIndex=0;
let rightanswer=0;
function getData()
{
    let xhttp= new XMLHttpRequest();

    xhttp.onreadystatechange=function(){
        console.log(xhttp.readyState)
        if(this.readyState===4 && this.status===200)
        { 
            let QuestionsObject=JSON.parse(this.responseText);
            let QuestionCount=QuestionsObject.length;
            console.log(QuestionCount);
            createBullets(QuestionCount);
            addQuestionDate(QuestionsObject[currentIndex],QuestionCount);
            countdown(10,QuestionCount);
            submitButton.onclick=()=>{
                let RightAnswer=QuestionsObject[currentIndex].right_answer;
                currentIndex++;
                checkAnswer(RightAnswer,QuestionCount);
                QuizArea.innerHTML="";
                AnswerArea.innerHTML="";
                addQuestionDate(QuestionsObject[currentIndex],QuestionCount);
                handelBullets();
                clearInterval(Interval);
                countdown(10,QuestionCount);
                showResults(QuestionCount);
                
            }
        }
    }



    xhttp.open("GET","jsquestions.json",true);
    xhttp.send();
}
getData()
function exam2(){

    open("examCss.html");
}
function exam3(){

    open("examjs.html");
}

function PlayAudion()
{
   
    document.getElementById("myaudio").play();
  
}
let countspan=document.querySelector(".quiz-info .count span");
let bulletsSpanContainer=document.querySelector(".bullets .spans");



function createBullets(number)
{
    countspan.innerHTML=number;
    //creat spans
    for(let index=0;index<number;index++)
    {    

        //create bullet
        let theBullet =document.createElement("span");
     //check if frist span
        if(index===0)
        {
            theBullet.className="on"
        }

        bulletsSpanContainer.appendChild(theBullet)
    }
}

//Add Date

let submitButton=document.querySelector(".submit-button");
let QuizArea=document.querySelector(".quiz-area");
let AnswerArea=document.querySelector(".answer-area");

function addQuestionDate(obj,count)
{
 if(currentIndex<count){
    let Questiontitle=document.createElement("h2");
    let QuestionText=document.createTextNode(obj['title']);
    Questiontitle.appendChild(QuestionText);
    QuizArea.appendChild(QuestionText);

    for(let index=0;index<4;index++)
    {
        let mainDiv=document.createElement("div");
        mainDiv.className="answer";
        let radioInput=document.createElement("input");
        radioInput.name='question';
        radioInput.type='radio';
        radioInput.id=`answer_${index+1}`;
        radioInput.dataset.answer=obj[`answer_${index+1}`];
        let Label=document.createElement("label");
        Label.htmlFor=`answer_${index+1}`;
        let labelText=document.createTextNode(obj[`answer_${index+1}`]);
        Label.appendChild(labelText);
        mainDiv.appendChild(radioInput);
        mainDiv.appendChild(Label);
        AnswerArea.appendChild(mainDiv);

        if(index===0)
        {
          radioInput.checked=true;
        }
   }
}
 }
 let bulletselemets=document.querySelector(".bullets");
 let results=document.querySelector(".results");
 let TheResults;
function showResults(count)
{
    if(currentIndex===count)
    {   
        console.log("finished")
        QuizArea.remove();
        AnswerArea.remove();
        submitButton.remove();
        bulletselemets.remove();

         if(rightanswer <count )
         {
           TheResults=`<span class="good"> GOOD </span>`
         }
        else if(rightanswer===count)
        {
            TheResults=`<span class="perfect"> Perfect </span> All Answer Is Good` ;
        }
        else{
            TheResults=`<span class="bad"> Bad </span> ` ;
        }
         results.innerHTML=TheResults;
         results.style.padding='10px';
         results.style.backgroundColor='white';
         results.style.marginTop="10px"
    }
}

let Interval;
let CountDownElements=document.querySelector(".countdown");

function countdown(duration,count)
{
    if(currentIndex<count)
    {
        let minutes ,seconds;
        Interval=setInterval(function()
        {
            minutes=parseInt(duration / 60);
            seconds=parseInt(duration % 60);
            minutes =minutes<10? `0 ${minutes}` :minutes;
            seconds =seconds<10? `0 ${seconds}` :seconds;

            CountDownElements.innerHTML=`${minutes}:${seconds}`
            if(--duration<0)
            {
                clearInterval(Interval);
                submitButton.click();
            }
        },1000)

    }
}

function checkAnswer(rightanswer,questioncount)
{
    let answers=document.getElementsByName("question");
    let ChooseAnswer;
    for(let index=0;index<4;index++)
    {
        if(answers[index].checked)
        {
            ChooseAnswer=answers[index].dataset.answer;
        }
    }

    if(rightanswer===ChooseAnswer)
    {
        rightanswer++;
        console.log("GOOD ANSWER")
    }

} 
function handelBullets()
{
    let bulletspans=document.querySelectorAll(".bullets .spans span");
    let arraySpans=Array.from(bulletspans);
    arraySpans.forEach((span,index)=>{
        if(currentIndex===index)
        {
            span.className="on";
        }
    })
}

















