import { useEffect, useMemo, useState } from "react";
import type { FormEvent, Key, ReactNode } from "react";
import { createSlice, configureStore, type PayloadAction } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export interface RecipeSummary {
  id: number;
  title: string;
  image?: string;
}

export interface RecipeSearchResponse {
  results: RecipeSummary[];
  totalResults?: number;
}

interface DataEntry {
  status: "idle" | "loading" | "succeeded" | "failed";
  requestId: number;
  data: unknown;
  error: string | null;
}

interface DataState {
  byKey: Record<string, DataEntry>;
}

interface RootState {
  data: DataState;
}

const initialState: DataState = { byKey: {} };
let nextRequestId = 0;

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    requestStarted(
      state,
      action: PayloadAction<{ key: string; requestId: number }>,
    ) {
      state.byKey[action.payload.key] = {
        status: "loading",
        requestId: action.payload.requestId,
        data: null,
        error: null,
      };
    },
    requestSucceeded(
      state,
      action: PayloadAction<{ key: string; requestId: number; data: unknown }>,
    ) {
      const entry = state.byKey[action.payload.key];
      if (entry?.requestId !== action.payload.requestId) {
        return;
      }
      entry.status = "succeeded";
      entry.data = action.payload.data;
      entry.error = null;
    },
    requestFailed(
      state,
      action: PayloadAction<{
        key: string;
        requestId: number;
        error: string;
      }>,
    ) {
      const entry = state.byKey[action.payload.key];
      if (entry?.requestId !== action.payload.requestId) {
        return;
      }
      entry.status = "failed";
      entry.error = action.payload.error;
    },
  },
});

export const dataActions = dataSlice.actions;

export const store = configureStore({
  reducer: { data: dataSlice.reducer },
});

type AppDispatch = typeof store.dispatch;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export async function fetchData(
  url: string,
  signal: AbortSignal,
): Promise<unknown> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Recipe search failed (${response.status}). Check your API key and try again.`);
  }
  const data: unknown = await response.json();
  return data;
}

export function parseRecipeResults(data: unknown): RecipeSummary[] {
  if (typeof data !== "object" || data === null || !("results" in data)) {
    throw new Error("The recipe API returned an unexpected response.");
  }

  const results = data.results;
  if (
    !Array.isArray(results) ||
    !results.every(
      (recipe: unknown) =>
        typeof recipe === "object" &&
        recipe !== null &&
        "id" in recipe &&
        typeof recipe.id === "number" &&
        "title" in recipe &&
        typeof recipe.title === "string" &&
        (!("image" in recipe) || typeof recipe.image === "string"),
    )
  ) {
    throw new Error("The recipe API returned invalid recipe data.");
  }

  return results.map((recipe) => ({
    id: recipe.id,
    title: recipe.title,
    ...("image" in recipe && typeof recipe.image === "string"
      ? { image: recipe.image }
      : {}),
  }));
}

interface DataFetcherProps<T> {
  requestKey: string;
  url: string;
  parseData: (data: unknown) => T[];
  getKey: (item: T) => Key;
  renderItem: (item: T) => ReactNode;
}

export function DataFetcher<T>({
  requestKey,
  url,
  parseData,
  getKey,
  renderItem,
}: DataFetcherProps<T>) {
  const dispatch = useAppDispatch();
  const entry = useAppSelector((state) => state.data.byKey[requestKey]);

  useEffect(() => {
    const controller = new AbortController();
    const requestId = ++nextRequestId;
    dispatch(dataActions.requestStarted({ key: requestKey, requestId }));

    async function load(): Promise<void> {
      try {
        const responseData = await fetchData(url, controller.signal);
        const parsedData = parseData(responseData);
        dispatch(
          dataActions.requestSucceeded({
            key: requestKey,
            requestId,
            data: parsedData,
          }),
        );
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        const message =
          error instanceof Error ? error.message : "An unexpected error occurred.";
        dispatch(
          dataActions.requestFailed({
            key: requestKey,
            requestId,
            error: message,
          }),
        );
      }
    }

    void load();
    return () => controller.abort();
  }, [dispatch, parseData, requestKey, url]);

  const parsedResult = useMemo(() => {
    if (entry?.status !== "succeeded") {
      return { items: [] as T[], error: null };
    }
    try {
      return { items: parseData(entry.data), error: null };
    } catch (error) {
      return {
        items: [] as T[],
        error:
          error instanceof Error
            ? error.message
            : "The response data is invalid.",
      };
    }
  }, [entry, parseData]);

  if (!entry || entry.status === "loading") {
    return <p role="status">Loading recipes...</p>;
  }

  if (entry.status === "failed") {
    return <p role="alert">{entry.error}</p>;
  }

  if (parsedResult.error) {
    return <p role="alert">{parsedResult.error}</p>;
  }

  if (parsedResult.items.length === 0) {
    return <p>No recipes found. Try another search.</p>;
  }

  return (
    <ul className="recipe-list">
      {parsedResult.items.map((item) => (
        <li key={getKey(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

function RecipeSearch() {
  const [apiKey, setApiKey] = useState("");
  const [query, setQuery] = useState("");
  const [searchRequest, setSearchRequest] = useState<{
    url: string;
    requestKey: string;
  } | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const trimmedKey = apiKey.trim();
    const trimmedQuery = query.trim();

    if (!trimmedKey || !trimmedQuery) {
      setFormError("Enter both an API key and a recipe search term.");
      return;
    }

    const params = new URLSearchParams({
      apiKey: trimmedKey,
      query: trimmedQuery,
      number: "10",
      addRecipeInformation: "true",
    });
    setSearchRequest({
      url: `https://api.spoonacular.com/recipes/complexSearch?${params}`,
      requestKey: "recipe-search",
    });
    setFormError(null);
  }

  return (
    <main className="app">
      <h1>Recipe Finder</h1>
      <p>
        Search Spoonacular for recipes. Your API key is used for this request
        and is not saved by this app.
      </p>
      <form className="search-form" onSubmit={handleSubmit}>
        <label>
          Spoonacular API key
          <input
            type="password"
            autoComplete="off"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            required
          />
        </label>
        <label>
          Recipe search
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. vegetable curry"
            required
          />
        </label>
        <button type="submit">Search recipes</button>
      </form>
      <p className="notice">
        The API key is sent directly to Spoonacular and is visible to your
        browser while the request is made. Do not use a private production key
        in a public deployment.
      </p>
      {formError && <p role="alert">{formError}</p>}
      {searchRequest && (
        <section aria-label="Recipe search results">
          <DataFetcher<RecipeSummary>
            requestKey={searchRequest.requestKey}
            url={searchRequest.url}
            parseData={parseRecipeResults}
            getKey={(recipe) => recipe.id}
            renderItem={(recipe) => (
              <article className="recipe-card">
                {recipe.image && (
                  <img src={recipe.image} alt="" loading="lazy" />
                )}
                <h2>{recipe.title}</h2>
              </article>
            )}
          />
        </section>
      )}
    </main>
  );
}

export default function DailyChallengeProject() {
  return (
    <Provider store={store}>
      <RecipeSearch />
    </Provider>
  );
}
