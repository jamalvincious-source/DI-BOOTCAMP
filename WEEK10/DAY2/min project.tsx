export interface RecipeData {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
}

function isRecipeData(value: unknown): value is RecipeData {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "string" &&
    "title" in value &&
    typeof value.title === "string" &&
    "ingredients" in value &&
    Array.isArray(value.ingredients) &&
    value.ingredients.every(
      (ingredient: unknown) => typeof ingredient === "string",
    ) &&
    "instructions" in value &&
    typeof value.instructions === "string" &&
    "isFavorite" in value &&
    typeof value.isFavorite === "boolean"
  );
}

export class RecipeItem implements RecipeData {
  constructor(
    public id: string,
    public title: string,
    public ingredients: string[],
    public instructions: string,
    public isFavorite = false,
  ) {}

  static create(
    title: string,
    ingredients: string[],
    instructions: string,
  ): RecipeItem {
    return new RecipeItem(
      crypto.randomUUID(),
      title.trim(),
      ingredients.map((ingredient) => ingredient.trim()).filter(Boolean),
      instructions.trim(),
    );
  }

  static fromData(data: RecipeData): RecipeItem {
    return new RecipeItem(
      data.id,
      data.title,
      [...data.ingredients],
      data.instructions,
      data.isFavorite,
    );
  }
}

export class RecipeCollection {
  private static readonly storageKey = "week10-recipe-book";
  private recipes: RecipeItem[];

  constructor() {
    this.recipes = this.load();
  }

  getAll(): RecipeItem[] {
    return [...this.recipes];
  }

  add(recipe: RecipeItem): void {
    this.recipes = [...this.recipes, recipe];
    this.save();
  }

  remove(id: string): void {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
    this.save();
  }

  toggleFavorite(id: string): void {
    this.recipes = this.recipes.map((recipe) =>
      recipe.id === id
        ? new RecipeItem(
            recipe.id,
            recipe.title,
            [...recipe.ingredients],
            recipe.instructions,
            !recipe.isFavorite,
          )
        : recipe,
    );
    this.save();
  }

  clear(): void {
    this.recipes = [];
    this.save();
  }

  private load(): RecipeItem[] {
    const savedRecipes = localStorage.getItem(RecipeCollection.storageKey);
    if (savedRecipes === null) {
      return [];
    }

    const data: unknown = JSON.parse(savedRecipes);
    if (!Array.isArray(data)) {
      throw new Error("Saved recipes have an invalid format.");
    }

    return data.map((recipe: unknown) => {
      if (!isRecipeData(recipe)) {
        throw new Error("A saved recipe has an invalid format.");
      }

      return RecipeItem.fromData(recipe);
    });
  }

  private save(): void {
    localStorage.setItem(
      RecipeCollection.storageKey,
      JSON.stringify(this.recipes),
    );
  }
}

export class RecipeTemplate {
  constructor(
    private readonly root: HTMLElement,
    private readonly collection: RecipeCollection,
    private readonly reportError: (message: string) => void,
  ) {
    this.render();
    this.root.addEventListener("submit", (event) => this.handleSubmit(event));
    this.root.addEventListener("click", (event) => this.handleClick(event));
  }

  render(): void {
    const heading = document.createElement("h1");
    heading.textContent = "Recipe Book";

    const form = document.createElement("form");
    form.id = "recipeEntryForm";
    form.className = "recipe-form";

    const title = document.createElement("input");
    title.id = "recipeTitle";
    title.name = "title";
    title.type = "text";
    title.placeholder = "Recipe Title";
    title.required = true;
    title.maxLength = 120;
    title.setAttribute("aria-label", "Recipe title");

    const ingredients = document.createElement("textarea");
    ingredients.id = "ingredients";
    ingredients.name = "ingredients";
    ingredients.placeholder = "Enter ingredients (one per line)";
    ingredients.required = true;
    ingredients.setAttribute("aria-label", "Ingredients");

    const instructions = document.createElement("textarea");
    instructions.id = "instructions";
    instructions.name = "instructions";
    instructions.placeholder = "Enter cooking instructions";
    instructions.required = true;
    instructions.setAttribute("aria-label", "Cooking instructions");

    const addButton = document.createElement("button");
    addButton.type = "submit";
    addButton.textContent = "Add Recipe";

    form.append(title, ingredients, instructions, addButton);

    const status = document.createElement("p");
    status.className = "recipe-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");

    const recipeContainer = document.createElement("section");
    recipeContainer.id = "recipeContainer";
    recipeContainer.className = "recipe-list";
    recipeContainer.setAttribute("aria-label", "Your recipes");

    const clearButton = document.createElement("button");
    clearButton.type = "button";
    clearButton.dataset.action = "clear";
    clearButton.className = "clear-button";
    clearButton.textContent = "Clear All Recipes";

    this.root.replaceChildren(
      heading,
      form,
      status,
      recipeContainer,
      clearButton,
    );
    this.renderRecipes();
  }

  private handleSubmit(event: SubmitEvent): void {
    if (!(event.target instanceof HTMLFormElement)) {
      return;
    }
    event.preventDefault();

    const form = event.target;
    const title = form.elements.namedItem("title");
    const ingredients = form.elements.namedItem("ingredients");
    const instructions = form.elements.namedItem("instructions");
    if (
      !(title instanceof HTMLInputElement) ||
      !(ingredients instanceof HTMLTextAreaElement) ||
      !(instructions instanceof HTMLTextAreaElement)
    ) {
      this.reportError("The recipe form is missing a required field.");
      return;
    }

    const recipeTitle = title.value.trim();
    const recipeIngredients = ingredients.value
      .split(/\r?\n/)
      .map((ingredient) => ingredient.trim())
      .filter(Boolean);
    const recipeInstructions = instructions.value.trim();

    if (!recipeTitle || recipeIngredients.length === 0 || !recipeInstructions) {
      this.reportError("Enter a title, at least one ingredient, and instructions.");
      return;
    }

    this.runAction(() => {
      this.collection.add(
        RecipeItem.create(recipeTitle, recipeIngredients, recipeInstructions),
      );
      form.reset();
      this.setStatus("Recipe added.");
    });
  }

  private handleClick(event: MouseEvent): void {
    if (!(event.target instanceof Element)) {
      return;
    }
    const button = event.target.closest<HTMLButtonElement>("button[data-action]");
    if (!button) {
      return;
    }

    const id = button.dataset.id;
    if (button.dataset.action === "clear") {
      this.runAction(() => {
        this.collection.clear();
        this.setStatus("All recipes cleared.");
      });
    } else if (id && button.dataset.action === "delete") {
      this.runAction(() => {
        this.collection.remove(id);
        this.setStatus("Recipe deleted.");
      });
    } else if (id && button.dataset.action === "favorite") {
      this.runAction(() => {
        this.collection.toggleFavorite(id);
        this.setStatus("Favorite status updated.");
      });
    }
  }

  private runAction(action: () => void): void {
    try {
      action();
      this.renderRecipes();
    } catch (error) {
      this.reportError(
        error instanceof Error ? error.message : "The recipe could not be saved.",
      );
      this.renderRecipes();
    }
  }

  private renderRecipes(): void {
    const container = this.root.querySelector<HTMLElement>("#recipeContainer");
    if (!container) {
      this.reportError("The recipe list container could not be found.");
      return;
    }

    const recipes = this.collection.getAll();
    if (recipes.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.textContent = "No recipes yet. Add one using the form above.";
      container.replaceChildren(emptyMessage);
      return;
    }

    const cards = recipes.map((recipe) => {
      const card = document.createElement("article");
      card.className = "recipe-card";

      const heading = document.createElement("h2");
      heading.textContent = recipe.title;
      card.append(heading);

      const favoriteButton = document.createElement("button");
      favoriteButton.type = "button";
      favoriteButton.dataset.action = "favorite";
      favoriteButton.dataset.id = recipe.id;
      favoriteButton.setAttribute(
        "aria-pressed",
        String(recipe.isFavorite),
      );
      favoriteButton.textContent = recipe.isFavorite
        ? "Remove from favorites"
        : "Add to favorites";
      card.append(favoriteButton);

      const details = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = "View recipe details";
      details.append(summary);

      const ingredientsHeading = document.createElement("h3");
      ingredientsHeading.textContent = "Ingredients";
      const ingredientsList = document.createElement("ul");
      for (const ingredient of recipe.ingredients) {
        const item = document.createElement("li");
        item.textContent = ingredient;
        ingredientsList.append(item);
      }

      const instructionsHeading = document.createElement("h3");
      instructionsHeading.textContent = "Instructions";
      const instructions = document.createElement("p");
      instructions.textContent = recipe.instructions;
      details.append(
        ingredientsHeading,
        ingredientsList,
        instructionsHeading,
        instructions,
      );
      card.append(details);

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.dataset.action = "delete";
      deleteButton.dataset.id = recipe.id;
      deleteButton.textContent = "Delete recipe";
      card.append(deleteButton);
      return card;
    });

    container.replaceChildren(...cards);
  }

  private setStatus(message: string): void {
    const status = this.root.querySelector<HTMLElement>(".recipe-status");
    if (status) {
      status.textContent = message;
      status.setAttribute("role", "status");
    }
  }
}

function addStyles(): void {
  const style = document.createElement("style");
  style.textContent = `
    :root { color: #243044; background: #f3f6fb; font: 16px/1.5 system-ui, sans-serif; }
    body { margin: 0; padding: 2rem 1rem; }
    .recipe-app { max-width: 760px; margin: 0 auto; }
    .recipe-app h1 { margin-top: 0; }
    .recipe-form, .recipe-card { display: grid; gap: .75rem; }
    .recipe-form { padding: 1rem; background: white; border-radius: .75rem; box-shadow: 0 2px 12px #18233a12; }
    input, textarea, button { font: inherit; }
    input, textarea { box-sizing: border-box; width: 100%; padding: .7rem; border: 1px solid #aab5c5; border-radius: .4rem; }
    textarea { min-height: 6rem; resize: vertical; }
    button { width: fit-content; padding: .55rem .85rem; border: 0; border-radius: .4rem; background: #2459a6; color: white; cursor: pointer; }
    button:hover { background: #173f7c; }
    button:focus-visible, input:focus-visible, textarea:focus-visible, summary:focus-visible { outline: 3px solid #f1b93c; outline-offset: 2px; }
    .recipe-status { min-height: 1.5em; }
    .recipe-list { display: grid; gap: 1rem; }
    .recipe-card { padding: 1rem; background: white; border-radius: .75rem; box-shadow: 0 2px 12px #18233a12; }
    .recipe-card h2, .recipe-card h3 { margin: 0; }
    .recipe-card details { margin: .25rem 0; }
    .recipe-card summary { width: fit-content; cursor: pointer; font-weight: 600; }
    .recipe-card details p { white-space: pre-wrap; }
    .clear-button { margin-top: 1rem; background: #9c2b2b; }
    .clear-button:hover { background: #741e1e; }
  `;
  document.head.append(style);
}

function mountRecipeBook(): void {
  let root = document.querySelector<HTMLElement>("#recipeApp");
  if (!root) {
    root = document.createElement("main");
    root.id = "recipeApp";
    root.className = "recipe-app";
    document.body.append(root);
  }

  addStyles();

  try {
    const collection = new RecipeCollection();
    new RecipeTemplate(root, collection, (message) => {
      const status = root?.querySelector<HTMLElement>(".recipe-status");
      if (status) {
        status.textContent = message;
        status.setAttribute("role", "alert");
      }
    });
  } catch (error) {
    const message = document.createElement("p");
    message.setAttribute("role", "alert");
    message.textContent =
      error instanceof Error
        ? `Could not load saved recipes: ${error.message}`
        : "Could not load saved recipes.";
    root.append(message);
  }
}

if (typeof document !== "undefined") {
  mountRecipeBook();
}
