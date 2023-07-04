// Массив доступных для игры слов
const words = ['дом', 'рыба', 'книга', 'душа', 'жизнь', 'лес', 'мир', 'дача', 'ребро', 'гора', 'часы', 'небо', 'рука', 'овца', 'звук', 'луна', 'свет', 'кость', 'лужа', 'знак', 'лось', 'рада', 'конь', 'глаз', 'лиса', 'куст', 'лист', 'гриб', 'свет', 'щит', 'лапа', 'облако', 'нить', 'шаг', 'зверь', 'бревно', 'пыль', 'ромашка', 'колесо', 'руль', 'копыто', 'крыльцо', 'дождь', 'трава', 'зола', 'веревка', 'провод', 'ветка', 'забота', 'речка', 'гусь', 'гнездо', 'птица', 'береза', 'бутон', 'ящик', 'груша', 'рог', 'кедр', 'хвост', 'дно', 'сосна', 'вода', 'кружка', 'мандарин', 'бокал', 'карта', 'курица', 'лимон', 'обувь', 'палка', 'пенал', 'печенье', 'степь', 'резинка', 'стропа', 'муха', 'паук', 'печать', 'борода', 'щенок', 'яблоко', 'капуста', 'хлеб', 'омлет', 'макарон', 'арбуз', 'дерево', 'банан', 'кровать', 'обезьяна', 'коробка', 'комод', 'карандаш', 'мебель', 'кресло', 'лампа', 'книжка', 'носки', 'подушка'];

// Выбираем случайное слово из 83 для текущей игры
const currentWord = words[Math.round(Math.random() * 83)];

// Получаем блок, в котором находится угадываемое слово и заполняем пустыми кнопками слово, которое надо угадать
const word = document.querySelector("#word");
for(let i = 0;i<currentWord.length;i++){
    const newElement = document.createElement('button');
    word.append(newElement);
}
// Получаем коллекцию кнопок, которые находятся внутри блока word
const wordChildren = word.children;

// Клавиатура визуальная
const keyboard = document.querySelector(".keyboard");

// Буквы клавиатуры
const letters = keyboard.children;

// Счетчик ошибочных выборов буквы
let mistakesCount = 0;

// Счетчик правильных выборов буквы
let rightCount = 0;

// Получаем всплывающее победное окно
let winPopup = document.querySelector(".popup");

// Получаем кнопку, для начала новой игры, и при нажатии обновляем страницу
let winButton = winPopup.querySelector(".play-again-button");
winButton.onclick = function () {
    location.reload();
}


console.log(currentWord);

// Получаем элементы виселицы в коллекцию и скрываем их
const hangElements = document.querySelector(".hangman").children;
for(let el of hangElements){
    el.style.visibility = "hidden";
}

// Получение окна проигрыша и кнопки закрытия
const defeatPopup = document.querySelector(".modal-container");
const defeatButton = document.querySelector(".close-modal");
defeatButton.addEventListener("click",function(){
    location.reload();
});

// Добавляем обработчик событий к каждой кнопке-букве, чтобы она печаталась, при условии что буква не ошибочная
let fl = true;
for (let letter of letters) {
    letter.addEventListener("click", function () {
        fl = false;
        for(let i = 0;i<currentWord.length;i++){
            if (currentWord[i] == this.textContent.toLowerCase() && wordChildren[i].textContent == "") {
                fl = true;
                this.classList.add("right");
                wordChildren[i].textContent = this.textContent;
                rightCount++;
                if(rightCount==currentWord.length){
                    winPopup.style.visibility = "visible";
                }
            }
        }
        if(!fl){
            this.classList.add("wrong");
            hangElements[mistakesCount].style.visibility = "visible";
            mistakesCount++;    
            if(mistakesCount>=8){
                defeatPopup.style.visibility = "visible";
            }
        }
    });
}