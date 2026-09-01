# Cabinet ADVICE

Multilingual marketing site for Cabinet ADVICE (React + Vite + Tailwind CSS).

## Development

```bash
cp .env.example .env   # optional locally; edit values as needed
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Environment variables

Production uses **`.env` directly** — there is no `.env.production` file.

Copy `.env.example` to `.env` and set values before building. All `VITE_*` variables are **build-time only**; Vite embeds them into the static bundle. After any `.env` change you must rebuild:

```bash
npm run build
```

| Variable | Purpose |
|----------|---------|
| `VITE_SITE_URL` | Canonical public URL (SEO, sitemap, Open Graph) |
| `VITE_SITE_NAME` | Site / organization name |
| `VITE_CONTACT_*` | Contact details on the site |
| `VITE_WHATSAPP_URL` | WhatsApp link |
| `VITE_WEB3FORMS_ACCESS_KEY` | Contact form submission ([Web3Forms](https://web3forms.com)) |

## Production deploy (Apache, no Docker)

This branch (`deploy/server-no-docker`) targets the shared Ubuntu server at **`46.202.168.145`** with Apache 2.4 under `/var/www/`. It does **not** use Docker.

| Item | Value |
|------|-------|
| Deploy path | `/var/www/cabinet-advice` |
| DocumentRoot | `/var/www/cabinet-advice/dist` |
| Apache site | `cabinet-advice` → `/etc/apache2/sites-available/cabinet-advice.conf` |
| Domains | `cabinet-advice.net`, `www.cabinet-advice.net` |

**Multi-app safety:** This vhost is separate from ConsultLink (`consultlink`, `consultlink-le-ssl`, `consultlink-api`, `consultlink-api-le-ssl`) and from `expertconnect-frontend` / `expertconnect-backend`. Do not modify those configs.

Without the `cabinet-advice` vhost enabled, requests to the domain may hit Apache's default site and return **404**.

### First-time setup on the server

```bash
cd /var/www/cabinet-advice
git fetch origin
git checkout deploy/server-no-docker && git pull

cp .env.example .env && nano .env
# Set VITE_SITE_URL=https://cabinet-advice.net and other VITE_* values

node -v   # prefer Node 20+; 18 may work
npm ci
npm run build

sudo a2enmod rewrite headers
sudo cp apache.conf /etc/apache2/sites-available/cabinet-advice.conf
sudo a2ensite cabinet-advice
sudo apache2ctl configtest && sudo systemctl reload apache2

# After HTTP works:
sudo certbot --apache -d cabinet-advice.net -d www.cabinet-advice.net
```

The Vite build writes to `dist/`. Apache serves that folder via `DocumentRoot`. SPA routing is handled by `public/.htaccess` (copied into `dist/` on build), which requires **`mod_rewrite`** and **`AllowOverride All`** in `apache.conf`.

### Updates (routine deploy)

```bash
cd /var/www/cabinet-advice
git pull
npm ci
npm run build
```

Reload Apache **only** if `apache.conf` changed:

```bash
sudo cp apache.conf /etc/apache2/sites-available/cabinet-advice.conf
sudo apache2ctl configtest && sudo systemctl reload apache2
```

### Optional deploy script

```bash
npm run deploy
```

Runs `scripts/deploy.sh` — checks `.env` exists, validates `VITE_SITE_URL`, then `npm ci` + `npm run build`. Manual steps above remain the primary documented path.

### Verify checklist

```bash
# Local vhost test (on the server)
curl -sI -H "Host: cabinet-advice.net" http://127.0.0.1/

# Public HTTPS
curl -sI https://cabinet-advice.net

# Backend health (ConsultLink API on same server — should not be affected)
curl -sI https://api.cabinet-advice.net/up
```

In the browser:

- [ ] `https://cabinet-advice.net` loads the site
- [ ] Client-side routes work (refresh on `/fr/services`, etc.)
- [ ] Contact form submits (requires `VITE_WEB3FORMS_ACCESS_KEY` in `.env` before build)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Optional server build helper |
