const speechNotes = {
    1: "«Здравствуйте. Моя презентация посвящена Павлу Петровичу Блонскому — уникальному советскому ученому, который стоял у истоков новой педагогики после революции 1917 года. Его идеи опередили свое время.»",
    2: "«Блонский получил блестящее философское и психологическое образование. После революции он безоговорочно принял новую власть, так как верил, что она позволит создать школу для простого народа.»",
    3: "«Блонский жестко критиковал старую дореволюционную школу за зубрежку. Он утверждал, что педагогика — это точная наука. Учитель должен сначала изучить биологию и психику ребенка, и только потом обучать.»",
    4: "«В 1919 году Блонский издает книгу 'Трудовая школа'. Он предложил сделать труд основой образования. Но речь шла о том, чтобы через практику и работу руками дети целостно познавали законы наук.»",
    5: "«Павел Петрович считал педологию главным инструментом учителя. Он утверждал, что нельзя воспитывать ребенка по частям — нужно видеть связь между его здоровьем, средой дома и успехами в учебе.»",
    6: "«Для педагогики невероятно важна его стадиальная теория памяти. Например, Блонский доказал, что младшие школьники часто не выполняют задания просто потому, что вербальная память у них еще формируется.»",
    7: "«Несмотря на то, что в конце 1930-х годов педологию в СССР запретили, идеи Блонского о проектной деятельности и уважении к личности ребенка лежат в основе современных стандартов обучения. Спасибо за внимание!»"
};

const interactiveFacts = {
    'portraitWrapper': "Интересный факт: Блонский написал первые советские учебники по педагогике и лично создавал школьные программы нового государства.",
    'classroomWrapper': "Интересный факт: Блонский предлагал полностью отменить традиционные отметки и домашние задания, считая их насилием над ребенком.",
    'laborWrapper': "Интересный факт: В трудовой школе Блонского дети не просто учились ремеслу, а связывали работу (например, на огороде) с изучением биологии и химии.",
    'pedologyWrapper': "Интересный факт: Из-за критики педологии в 1936 году Блонский подвергся травле, а его фундаментальные труды были запрещены к публикации на десятилетия."
};

let currentSlide = 1;
const totalSlides = 7;

function showSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > totalSlides) return;
    
    currentSlide = slideNumber;

    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.classList.remove('active'));

    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(`slide-${slideNumber}`).classList.add('active');
    document.getElementById(`btn-${slideNumber}`).classList.add('active');

    document.getElementById('cheatText').innerText = speechNotes[slideNumber];
    
    resetInteractiveFacts();
}

function resetInteractiveFacts() {
    document.querySelectorAll('.interactive-fact').forEach(wrapper => {
        wrapper.classList.remove('fact-opened');
        const overlay = wrapper.querySelector('.fact-overlay');
        if (overlay) {
            overlay.innerText = "Нажмите для интересного факта";
        }
    });
}

function initNavigation() {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            showSlide(index + 1);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' || event.key === ' ') {
            event.preventDefault();
            if (currentSlide < totalSlides) showSlide(currentSlide + 1);
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            if (currentSlide > 1) showSlide(currentSlide - 1);
        }
    });
}

function initInteractiveFacts() {
    Object.keys(interactiveFacts).forEach(id => {
        const wrapper = document.getElementById(id);
        if (!wrapper) return;

        const overlay = wrapper.querySelector('.fact-overlay');
        
        wrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (wrapper.classList.contains('fact-opened')) {
                wrapper.classList.remove('fact-opened');
                overlay.innerText = "Нажмите для интересного факта";
            } else {
                wrapper.classList.add('fact-opened');
                overlay.innerText = interactiveFacts[id];
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initInteractiveFacts();
    showSlide(1);
});
