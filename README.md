# Friendzone Project

## Getting Started

Clone the parent project and the three independent repositories:

```bash
git clone git@github.com:gmorikawa/friendzone.git
cd friendzone
git clone --branch develop git@github.com:gmorikawa/friendzone-core.git api
git clone --branch develop git@github.com:gmorikawa/friendzone-web.git app
git clone --branch develop git@github.com:gmorikawa/friendzone-back-office.git back-office
```

Alternatively, run `bash /path/to/fetch-all.sh` from the directory where you want
to create a new `friendzone` checkout. The script clones the parent repository, `api`, and `app`. Then clone the
back-office repository separately:

```bash
cd friendzone
git clone --branch develop git@github.com:gmorikawa/friendzone-back-office.git back-office
```

The `compose.yaml` file runs the API, React app, Angular back-office, SQL Server,
Mailpit, and an Nginx development proxy. Docker Compose is the only required
runtime; you do not need Node or .NET installed on the host.

Copy the environment example before starting:

```bash
cp .env.example .env
```

Fill all twelve values in `.env`. Each service uses `DOMAIN` (hostname only),
`PORT` (numeric public port), and `SCHEMA` (`http` or `https`, without `://`).
The prefixes are `WEB_CLIENT`, `OFFICE_CLIENT`, `CORE`, and `EMAIL`. There are no
defaults: Compose rejects missing or empty values. Use distinct hostnames for the
four services. `NGINX_PORT` is optional and defaults to 80 when unset or empty.
For direct access to this stack, set each service's public `PORT` to match
`NGINX_PORT`. These service settings describe URLs and CORS origins; they do not
publish additional ports.

Add your configured hostnames to your machine's hosts file (for example,
`/etc/hosts`). For example, if you chose the following domains:

```text
127.0.0.1 api.friendzone.local app.friendzone.local office.friendzone.local email.friendzone.local
```

Create the persistent data directories and start from the project root:

```bash
mkdir -p data/sqlserver data/mailpit
docker compose up --build
```

Wait for database initialization, dependency installation, and development server
startup before opening the sites. Nginx may briefly return 502 during startup.

| URL | Service |
| --- | --- |
| `${CORE_SCHEMA}://${CORE_DOMAIN}:${CORE_PORT}` | API (`/`, `/hello`, `/email-test`) |
| `${WEB_CLIENT_SCHEMA}://${WEB_CLIENT_DOMAIN}:${WEB_CLIENT_PORT}` | React app |
| `${OFFICE_CLIENT_SCHEMA}://${OFFICE_CLIENT_DOMAIN}:${OFFICE_CLIENT_PORT}` | Angular back-office |
| `${EMAIL_SCHEMA}://${EMAIL_DOMAIN}:${EMAIL_PORT}` | Mailpit UI (existing UI authentication) |

Nginx publishes only `${NGINX_PORT:-80}` on the host to its container port 80.
For example, `NGINX_PORT=5080` makes every domain accessible on port 5080.
Routing uses hostnames on this shared endpoint;
unknown hostnames return 404. Browser URLs omit port 80 for HTTP and 443 for HTTPS.
Schema values describe public URLs and forwarded protocol headers; configuring
`https` does not install certificates or add a TLS listener. This stack serves HTTP;
HTTPS requires a separately configured TLS terminator. SQL Server and SMTP are available within Docker as `database:1433`
and `email:1025`; their host ports are not published.

### Networking and CORS

All services share the `friendzone-network` bridge. Only Nginx publishes a host
port. This bridge permits outbound connections and direct container-IP access from
the Docker host; it does not provide the previous isolated-network configuration.
IPvlan and its host-side interface helper are not used by the current Compose file.

On this machine, map the domains to `127.0.0.1`. On other LAN machines, map them to
the Docker host's LAN IP and use `NGINX_PORT` (80 by default).

Nginx builds the two allowed frontend origins from `WEB_CLIENT_*` and
`OFFICE_CLIENT_*`, and applies API CORS to `CORE_DOMAIN`. It answers allowed API preflight requests
with 204, reflects requested header names, allows GET/HEAD/POST/PUT/PATCH/DELETE/OPTIONS,
and includes CORS headers on error responses. Unlisted origins receive no CORS
permission and their API preflights return 403. Credentialed cross-origin requests
are not enabled. The API itself does not configure CORS, and Nginx suppresses
upstream CORS headers to avoid duplicates.

The official Nginx image renders `docker/nginx/default.conf.template` into
`/etc/nginx/conf.d/default.conf` at container startup. Its substitution filter
preserves native Nginx variables such as `$host`. After editing `.env` or the
Nginx template, recreate Nginx to rerender configuration:

```bash
docker compose up -d --force-recreate nginx
docker compose exec nginx nginx -t
```

After changing frontend domains, also recreate `app` and `back-office` so their
host allowlists receive the new environment.

### Development reloads

Edit files in `api`, `app`, or `back-office` normally. Source directories are
mounted into the containers, and polling detects changes roughly every second.
React uses HMR; Angular uses HMR/live reload as supported by the edit. The API uses
`dotnet watch`, automatically restarting when an edit cannot be hot-reloaded.
Nginx forwards the WebSocket connections required for live updates.

Docker volumes keep Linux dependencies and generated files separate from host
`node_modules`, `.angular`, `bin`, and `obj` directories. Frontend containers run
offline `npm ci` on every start using a cache prepared during image builds. API
NuGet packages are also restored into its image during the build. After changing
dependency manifests or lockfiles, rebuild the relevant service with
`docker compose up --build -d app`, `back-office`, or `api`. Image builds need
internet access; ordinary startup and source reloads do not. Rebuild after changing
a Dockerfile with `docker compose up --build`.

The API SMTP host and port are overridden by Compose; existing credentials are retained.

Use `docker compose logs -f api app back-office nginx` to inspect startup/reload
errors and `docker compose down` to stop the stack while retaining data and caches.
Avoid `down --volumes` unless you intend to reset volumes. Each project's Dockerfile
is for development, not a production deployment.

## Structure

This project uses three independent Git repositories:

* `api`: contains the `friendzone-core` repository from GitHub.
* `app`: contains the `friendzone-web` repository from GitHub.
* `back-office`: contains the `friendzone-back-office` repository from GitHub.

Commit and push changes within each project independently. The parent repository
tracks commit references for `api`, `app`, and `back-office` as Git links. Commit
updated references in the parent repository when you want to record newer project
revisions. There is no `.gitmodules` file, so clone each repository explicitly
using the commands above.

To update their `develop` branches, first switch each repository to `develop`,
then pull from its configured remote. For the existing repositories, that remote
is named `github`:

```bash
git -C api switch develop
git -C api pull --ff-only github develop
git -C app switch develop
git -C app pull --ff-only github develop
git -C back-office switch develop
git -C back-office pull --ff-only github develop
```

Fresh clones use the remote name `origin`; use `origin` instead of `github` there.
