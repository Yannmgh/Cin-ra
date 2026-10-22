# Cinéra

Application de streaming (type mini Netflix) construite avec React, Redux Toolkit et l'API [TMDB](https://www.themoviedb.org/). Découvrez des films tendance, recherchez-en, consultez leurs détails (casting, bande-annonce, recommandations) et gardez une liste de favoris liée à votre compte.

## Fonctionnalités

- **Films** : page d'accueil façon Netflix (bannière héro + rangées Tendances / À l'affiche / Mieux notés / Bientôt disponibles), page Découvrir avec filtre par genre et pagination
- **Recherche** : recherche en direct (debounce) avec URL synchronisée (`/search?q=...`), accessible depuis la barre de navigation
- **Page détail** : synopsis, casting, bande-annonce YouTube, recommandations, budget/recettes, langue, statut, lien vers le site officiel
- **Comptes utilisateurs** : inscription, connexion, déconnexion, page profil (avatar, statistiques, aperçu des favoris) — authentification 100 % côté client (voir [Limites](#limites--authentification))
- **Favoris** : liés au compte connecté, persistés en `localStorage`, routes protégées (redirection vers la connexion si non authentifié)
- **Design** : thème sombre, identité de marque (logo, palette or/ambre), squelettes de chargement, responsive

## Stack technique

| | |
|---|---|
| Framework | React 19 + Vite |
| State management | Redux Toolkit (`createSlice`, `createAsyncThunk`, `createSelector`) |
| Routing | React Router v7 |
| UI | React-Bootstrap + Bootstrap 5 (recompilé via Sass pour la couleur de marque) |
| API | [TMDB API v3](https://developer.themoviedb.org/reference/getting-started) |
| Lint | oxlint |

## Architecture

```
src/
├── app/
│   └── store.js                 # Store Redux (combine tous les reducers)
├── features/                    # Un dossier par domaine métier (slices Redux Toolkit)
│   ├── auth/authSlice.js        # Inscription, connexion, déconnexion, session
│   ├── favorites/favoritesSlice.js  # Favoris par utilisateur (localStorage)
│   ├── home/homeSlice.js        # Tendances, mieux notés, à l'affiche, à venir
│   ├── movieDetail/movieDetailSlice.js  # Détail d'un film + recommandations
│   └── movies/moviesSlice.js    # Découverte (genres, pagination) + recherche
├── services/
│   └── tmdbService.js           # Tous les appels fetch vers l'API TMDB
├── hooks/
│   ├── useForm.js               # Hook générique pour les formulaires contrôlés
│   └── useFavorite.js           # Bascule un favori (redirige vers /login si déconnecté)
├── components/
│   ├── auth/RequireAuth.jsx     # Garde de route (redirige si non connecté)
│   ├── layout/                  # Navbar, Footer, Logo, Avatar
│   └── movies/                  # MovieCard, MovieGrid, MovieRow, HeroBanner,
│                                 # GenreFilter, Pagination, Skeleton*, Loading/ErrorState
├── pages/                       # Une page par route (voir Routing ci-dessous)
├── styles/
│   └── bootstrap-theme.scss     # Recompilation de Bootstrap avec la couleur de marque
├── App.jsx                      # Déclaration des routes
└── main.jsx                     # Point d'entrée : Provider Redux + BrowserRouter
```

### Routing

| Route | Page | Accès |
|---|---|---|
| `/` | `HomePage` | public |
| `/discover` | `DiscoverPage` | public |
| `/search` | `SearchPage` | public |
| `/movie/:id` | `MovieDetailPage` | public |
| `/login` | `LoginPage` | public |
| `/register` | `RegisterPage` | public |
| `/favorites` | `FavoritesPage` | connecté uniquement |
| `/profile` | `ProfilePage` | connecté uniquement |

## Installation

```bash
npm install
```

Créer un fichier `.env.local` à la racine (voir `.env.example`) avec votre propre clé TMDB :

```
VITE_TMDB_READ_ACCESS_TOKEN=votre_token_v4_tmdb
```

Le token (API Read Access Token, v4 auth) s'obtient gratuitement en créant un compte sur [themoviedb.org](https://www.themoviedb.org/) puis en allant dans *Paramètres > API*.

## Scripts disponibles

```bash
npm run dev       # Lance le serveur de développement (http://localhost:5173)
npm run build     # Build de production dans dist/
npm run preview   # Sert le build de production en local
npm run lint      # Vérifie le code avec oxlint
```

## Limites & authentification

L'authentification (inscription/connexion) est **entièrement côté client** : les utilisateurs et leurs mots de passe (hashés en SHA-256) sont stockés dans le `localStorage` du navigateur, il n'y a pas de serveur ni de base de données. C'est suffisant pour démontrer le pattern React/Redux, mais **ce n'est pas une authentification de production** (pas de vrai salage, données accessibles via les outils de développement du navigateur). Un vrai déploiement nécessiterait une API backend dédiée à l'authentification.

## Crédits

Ce produit utilise l'API TMDB mais n'est ni approuvé ni certifié par TMDB.
