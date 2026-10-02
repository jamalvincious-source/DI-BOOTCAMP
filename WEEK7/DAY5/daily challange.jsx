import { useState } from 'react';

const DailyChallenge = () => {
  const [languages, setLanguages] = useState([
    { name: 'Php', votes: 0 },
    { name: 'Python', votes: 0 },
    { name: 'JavaSript', votes: 0 },
    { name: 'Java', votes: 0 },
  ]);

  const voteForLanguage = (languageIndex) => {
    setLanguages((currentLanguages) =>
      currentLanguages.map((language, index) =>
        index === languageIndex
          ? { ...language, votes: language.votes + 1 }
          : language
      )
    );
  };

  return (
    <main className="app-container">
      <section className="vote-card">
        <h1>Vote for your favorite language</h1>

        <div className="language-list">
          {languages.map((language, index) => (
            <div key={language.name} className="language-item">
              <button
                className="vote-button"
                onClick={() => voteForLanguage(index)}
              >
                {language.name}
              </button>
              <span className="votes-count">{language.votes} votes</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default DailyChallenge;
