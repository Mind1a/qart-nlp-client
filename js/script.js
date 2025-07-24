// About page Start
const articlesBox = document.querySelector(".articles_box");
fetch("../db/worked_project.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      const onProjectArticle = document.createElement("article");
      onProjectArticle.classList.add("on_project_article");
      const articleTitle = document.createElement("h3");
      articleTitle.classList.add("article_title");
      articleTitle.textContent = element.name;
      const articleSubTitle = document.createElement("h4");
      articleSubTitle.classList.add("article_subtitle");
      articleSubTitle.textContent = element.position;
      const articleIcon = document.createElement("aside");
      articleIcon.classList.add("article_icon");
      element.media.forEach((urll) => {
        const img = document.createElement("img");
        img.src = urll;
        img.alt = element.name;
        articleIcon.appendChild(img);
      });
      onProjectArticle.appendChild(articleTitle);
      onProjectArticle.appendChild(articleSubTitle);
      onProjectArticle.appendChild(articleIcon);
      articlesBox.appendChild(onProjectArticle);
    });
  });

const textArea = document.querySelector("#text_input");
const wordCount = document.querySelector("#word_count");
textArea.addEventListener("input", (e) => {
  const str = textArea.value;
  const matches = str.match(/[^ \t\n\r,.!?;:()"'`[\]{}<>\\/|@#$%^&*-+=~]/g);
  if (matches) {
    wordCount.textContent = matches.length + "/250";
  } else {
    wordCount.textContent = "0/250";
  }
  if (matches && matches.length > 250) {
    wordCount.style.color = "red";
    // textArea.style.borderColor = "red";
    textArea.setCustomValidity("Must be less than 250 words");
  } else {
    wordCount.style.color = "";
    // textArea.style.borderColor = "";
    textArea.setCustomValidity("");
  }
});
