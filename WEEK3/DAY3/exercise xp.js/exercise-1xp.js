const heading1 = document.querySelector('h1');
console.log(heading1);

const article = document.querySelector('article');
const paragraphs = article.querySelectorAll('p');
const lastParagraph = paragraphs[paragraphs.length - 1];
lastParagraph.remove();

const heading2 = document.querySelector('h2');
heading2.addEventListener('click', () => {
    heading2.style.backgroundColor = 'red';
});

const heading3 = document.querySelector('h3');
heading3.addEventListener('click', () => {
    heading3.style.display = 'none';
});

const boldButton = document.getElementById('boldButton');
boldButton.addEventListener('click', () => {
    document.querySelectorAll('p').forEach((paragraph) => {
        paragraph.style.fontWeight = 'bold';
    });
});

heading1.addEventListener('mouseover', () => {
    const randomSize = Math.floor(Math.random() * 101);
    heading1.style.fontSize = `${randomSize}px`;
});

const secondParagraph = paragraphs[1];
if (secondParagraph) {
    secondParagraph.addEventListener('mouseover', () => {
        secondParagraph.classList.add('fade-out');
    });

    secondParagraph.addEventListener('mouseout', () => {
        secondParagraph.classList.remove('fade-out');
    });
}
