import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";

const categories = [
  { name: "Mountain", slug: "mountain", icon: "◈" },
  { name: "Beaches", slug: "beaches", icon: "≈" },
  { name: "Birds", slug: "birds", icon: "⌁" },
  { name: "Food", slug: "food", icon: "✳" },
];

const fallbackPhotos = {
  mountain: [
    "photo-1464822759023-fed622ff2c3b", "photo-1519681393784-d120267933ba",
    "photo-1464278533981-50106e6176b1", "photo-1500530855697-b586d89ba3ee",
    "photo-1454496522488-7a8e488e8606", "photo-1511497584788-876760111969",
    "photo-1470770841072-f978cf4d019e", "photo-1464278533981-50106e6176b1",
  ],
  beaches: [
    "photo-1507525428034-b723cf961d3e", "photo-1519046904884-53103b34b206",
    "photo-1500375592092-40eb2168fd21", "photo-1490750967868-88aa4486c946",
    "photo-1518837695005-2083093ee35b",         "photo-1500375592092-40eb2168fd21",
    "photo-1506929562872-bb421503ef21", "photo-1493558103817-58b2924bce98",
  ],
  birds: [
    "photo-1444464666168-49d633b86797", "photo-1452570053594-1b985d6ea890",
    "photo-1474511320723-9a56873867b5", "photo-1480044965905-02098d419e96",
    "photo-1549608276-5786777e6587", "photo-1552728089-57bdde30beb3",
    "photo-1522926193341-e9ffd686c60f", "photo-1501706362039-c6e13d7b320d",
  ],
  food: [
    "photo-1546069901-ba9599a7e63c", "photo-1504674900247-0877df9cc836",
    "photo-1476224203421-9ac39bcb3327", "photo-1498837167922-ddd27525d352",
    "photo-1512621776951-a57141f2eefd", "photo-1565299624946-b28f40a0ae38",
    "photo-1540189549336-e6e99c3679fe", "photo-1490645935967-10de6ba17061",
  ],
};

const sampleImages = (query, page) => {
  const key = query.toLowerCase();
  const category = categories.find((item) =>
    key.includes(item.name.toLowerCase()) || item.name.toLowerCase().includes(key)
  );
  if (!category) {
    return Array.from({ length: 30 }, (_, index) => {
      const imageNumber = (page - 1) * 30 + index;
      return {
        id: `${key}-${imageNumber}`,
        src: `https://loremflickr.com/700/525/${encodeURIComponent(query)}?lock=${imageNumber + 1}`,
        alt: `${query} photo ${imageNumber + 1}`,
        photographer: "SnapScout collection",
      };
    });
  }
  const ids = fallbackPhotos[category?.slug ?? "mountain"];

  return Array.from({ length: 30 }, (_, index) => {
    const imageNumber = (page - 1) * 30 + index;
    const id = ids[imageNumber % ids.length];
    return {
      id: `${key}-${imageNumber}`,
      src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`,
      alt: `${query} photo ${imageNumber + 1}`,
      photographer: "SnapScout collection",
    };
  });
};

function App() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchText(params.get("q") ?? "");
  }, [location.search]);

  function handleSearch(event) {
    event.preventDefault();
    const query = searchText.trim();
    if (query) navigate(`/search/${encodeURIComponent(query)}`);
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="SnapScout home">
          <span className="brand-mark">S</span>
          <span>snap<span className="brand-light">scout</span></span>
        </Link>
        <form className="search-form" onSubmit={handleSearch} role="search">
          <span aria-hidden="true">⌕</span>
          <input
            aria-label="Search photos"
            placeholder="Search photos"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">A little inspiration, every day</p>
          <h1>Find your next <span>favorite view.</span></h1>
          <p className="hero-copy">A curated corner of the world, one photo at a time.</p>
        </section>

        <nav className="category-nav" aria-label="Photo categories">
          {categories.map((category) => (
            <NavLink
              key={category.slug}
              to={`/SnapScout/${category.slug}`}
              className={({ isActive }) => `category-link${isActive ? " selected" : ""}`}
            >
              <span aria-hidden="true">{category.icon}</span>
              {category.name}
            </NavLink>
          ))}
        </nav>

        <Routes>
          <Route path="/" element={<Gallery title="Mountain" />} />
          <Route path="/SnapScout/:category" element={<CategoryGallery />} />
          <Route path="/search/:query" element={<SearchGallery />} />
          <Route path="*" element={<Gallery title="Mountain" />} />
        </Routes>
      </main>
      <footer>Made for curious eyes <span aria-hidden="true">✦</span></footer>
    </div>
  );
}

function CategoryGallery() {
  const { category = "mountain" } = useParams();
  const selected = categories.find((item) => item.slug === category.toLowerCase());
  return <Gallery title={selected?.name ?? "Mountain"} query={selected?.name ?? "Mountain"} />;
}

function SearchGallery() {
  const { query = "" } = useParams();
  return <Gallery title={`Results for “${query}”`} query={query} />;
}

function Gallery({ title, query = title }) {
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

    async function loadPhotos() {
      setLoading(true);
      setError("");
      try {
        if (!apiKey) {
          if (!cancelled) setPhotos(sampleImages(query, page));
          return;
        }

        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=30&page=${page}`,
          { headers: { Authorization: apiKey } }
        );
        if (!response.ok) {
          throw new Error(`Photo search failed (${response.status}). Check your Pexels API key and try again.`);
        }
        const data = await response.json();
        if (!cancelled) {
          setPhotos(data.photos.map((photo) => ({
            id: photo.id,
            src: photo.src.large,
            alt: photo.alt || `${query} photo`,
            photographer: photo.photographer,
          })));
        }
      } catch (loadError) {
        if (!cancelled) setError(loadError.message || "Unable to load photos.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPhotos();
    return () => { cancelled = true; };
  }, [query, page]);

  useEffect(() => setPage(1), [query]);

  return (
    <section className="gallery-section" aria-live="polite">
      <div className="gallery-heading">
        <div>
          <p className="eyebrow">The collection</p>
          <h2>{title}</h2>
        </div>
        <span className="photo-count">{photos.length} moments</span>
      </div>
      {!import.meta.env.VITE_PEXELS_API_KEY && (
        <p className="demo-note">Showing a curated preview. Add a Pexels API key to load live search results.</p>
      )}
      {error && <p className="error-message" role="alert">{error}</p>}
      {loading && <p className="loading-message">Finding something lovely…</p>}
      {!loading && !error && (
        <>
          <div className="photo-grid">
            {photos.map((photo) => (
              <figure className="photo-card" key={photo.id}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <figcaption><span>{photo.alt}</span><small>Photo by {photo.photographer}</small></figcaption>
              </figure>
            ))}
          </div>
          <div className="pagination">
            <button type="button" disabled={page === 1} onClick={() => setPage((current) => current - 1)}>
              ← Previous
            </button>
            <span>Page {page}</span>
            <button type="button" onClick={() => setPage((current) => current + 1)}>
              Next →
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default App;
