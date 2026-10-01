import './App.css';
import Exercise from './Exercise3';
import UserFavoriteAnimals from './UserFavoriteAnimals';

const myelement = <h1>I Love JSX!</h1>;
const sum = 5 + 5;
const user = {
  firstName: 'Bob',
  lastName: 'Dylan',
  favAnimals: ['Horse', 'Turtle', 'Elephant', 'Monkey'],
};

function App() {
  return (
    <main className="app">
      <section className="card" aria-labelledby="page-title">
        <section aria-labelledby="exercise-1-title">
          <p className="eyebrow">Exercise 1 · JSX</p>
          <p className="greeting">Hello World!</p>
          {myelement}
          <p id="exercise-1-title" className="result">
            React is {sum} times better with JSX
          </p>
        </section>
        <section aria-labelledby="exercise-2-title">
          <p className="eyebrow">Exercise 2 · Objects</p>
          <h3 id="exercise-2-title">{user.firstName}</h3>
          <h3>{user.lastName}</h3>
          <UserFavoriteAnimals favAnimals={user.favAnimals} />
        </section>
        <section aria-labelledby="exercise-3-title">
          <p className="eyebrow">Exercise 3 · HTML Tags in React</p>
          <Exercise />
        </section>
      </section>
    </main>
  );
}

export default App;
