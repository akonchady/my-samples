import React from 'react';

const dateDisplay = (dateString) =>
  new Date(dateString).toDateString();

const Article = (props) => {
  const { article, actions } = props;
  const author = actions.lookupAuthor(article.authorId);
  return (
    <div>
      <div>{article.title}</div>
      <div>
        { dateDisplay(article.date) }
      </div>
      <div>
        <a href={author.website} target="_blank">
          {author.firstName} {author.lastName}
        </a>
      </div>
      <div>{article.body}</div>
    </div>
  );
};

export default Article;
