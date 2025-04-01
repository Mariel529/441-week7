async function populateBooks() {
    const requestURL = "https://raw.githubusercontent.com/chousg/JSON/refs/heads/main/comouter-book.json"; // 替换为您的实际JSON URL
    try {
        const response = await fetch(requestURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const bookCollection = await response.json();
        populateHeader(bookCollection);
        populateBooksList(bookCollection);
    } catch (error) {
        console.error('Error fetching books:', error);
        document.getElementById('books-container').innerHTML = '<p>Failed to load books. Please check the URL and try again.</p>';
    }
}

function populateHeader(obj) {
    document.getElementById('collection-title').textContent = obj.collectionName || 'Must-Read Computer Books';
    document.getElementById('collection-meta').textContent = `Publisher: ${obj.publisher || 'Tech Publications'} • Published: ${obj.yearPublished || '2023'}`;
}

function populateBooksList(obj) {
    const section = document.querySelector("#books-container");
    const books = obj.books || [];

    books.forEach(book => {
        const myArticle = document.createElement("article");

        const myH2 = document.createElement("h2");
        myH2.textContent = book.title;

        const myPara1 = document.createElement("p");
        myPara1.textContent = `Author: ${book.author}`;

        const myPara2 = document.createElement("p");
        myPara2.textContent = `Pages: ${book.pages}`;

        const myPara3 = document.createElement("p");
        myPara3.textContent = "Topics:";

        const myList = document.createElement("ul");
        const topics = book.topics || [];

        topics.forEach(topic => {
            const listItem = document.createElement("li");
            listItem.textContent = topic;
            myList.appendChild(listItem);
        });

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);
    });
}
document.addEventListener('DOMContentLoaded', populateBooks);