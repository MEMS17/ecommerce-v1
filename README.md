# ecommerce-v1

## Commandes à éxecuter

```bash
git checkout main 

```
```bash
git pull 

```
```bash
cd backend
npm i 

cd frontend
npm i

```

# Logique du backend

> Créer un fichier `.env` , initialiser les constantes suivantes `PORT=?`, `MONGO_URI=?`, `JWT_TOKEN=?`, `JWT_EXPIRATION=?` et remplace les `?` par des valeurs

---

## Création automatique d’un administrateur (seed)

Pour garantir qu’un compte administrateur existe dès le départ, un script de seed est fourni.  
Ce script vérifie si un utilisateur avec l’email `admin@admin.com` existe déjà.  
S’il n’existe pas, il crée un utilisateur admin avec le mot de passe `admin123`.

**Utilisation :**

```bash
cd backend
npm run seed
```

- Si un admin existe déjà, le script ne fait rien.
- Sinon, il crée un admin par défaut (`admin@admin.com` / `admin123`).

> ⚠️ Pense à changer le mot de passe admin après la première utilisation pour la sécurité !

## Organisation des Routes Backend

Toutes les routes de l'API sont préfixées par `/api/v1`.

### Structure principale (`index.js`)
- Initialise Express.
- Connecte à MongoDB.
- Active les middlewares :
  - `cors`, `express.json()`, `express-fileupload`
  - Fichiers statiques via `/public`
  - Gestion des erreurs (404 et serveur)
- Monte les routes via `routes/routes.js`

---

### Fichier de routes central (`routes.js`)
Regroupe les routes principales :

| Ressource     | URL de base              | Accès protégé |
|---------------|--------------------------|---------------|
| Utilisateurs  | `/api/v1/users`          | Oui (partiel) |
| Auth          | `/api/v1/auth`           | Non           |
| Produits      | `/api/v1/products`       | Oui (partiel) |
| Commandes     | `/api/v1/orders`         | Oui (token)   |

---

### Routes Utilisateur (`users.routes.js`)

| Méthode | URL                        | Action                     | Accès            |
|---------|----------------------------|----------------------------|------------------|
| GET     | `/users/`                  | Lister tous les utilisateurs | Public         |
| POST    | `/users/new/`              | Créer un utilisateur        | Admin           |
| GET     | `/users/:id/show`          | Voir un utilisateur         | Public          |
| PUT     | `/users/:id/edit`          | Modifier un utilisateur     | Public       |
| DELETE  | `/users/:id/delete`        | Supprimer un utilisateur    | Public       |

> ⚠️ Les routes sensibles sont protégées par les middlewares `authenticate` (JWT) et `authorize` (vérification du rôle).


