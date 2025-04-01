document.addEventListener('DOMContentLoaded', function() {
    async function populateBooks() {
      const requestURL = "computer-book.json"; // Replace with your actual JSON URL
      const response = await fetch(requestURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const bookCollection = await response.json();
      populateHeader(bookCollection);
      populateBooksList(bookCollection);
    }
  
    function populateHeader(obj) {
      const header = document.querySelector("header");
      const myH1 = document.createElement("h1");
      myH1.textContent = obj.collectionName;
      header.appendChild(myH1);
      const myPara = document.createElement("p");
      myPara.textContent = `Publisher: ${obj.publisher} • Published: ${obj.yearPublished}`;
      header.appendChild(myPara);
    }
  
    function populateBooksList(obj) {
      const section = document.querySelector("section");
      const books = obj.books;
      books.forEach(book => {
        const myArticle = document.createElement("article");
        const myH2 = document.createElement("h2");
        const myPara1 = document.createElement("p");
        const myPara2 = document.createElement("p");
        const myPara3 = document.createElement("p");
        const myList = document.createElement("ul");
        myH2.textContent = book.title;
        myPara1.textContent = `Author: ${book.author}`;
        myPara2.textContent = `Pages: ${book.pages}`;
        myPara3.textContent = "Topics:";
        const topics = book.topics;
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
  
    populateBooks();
  });
