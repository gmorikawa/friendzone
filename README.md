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

The `compose.yaml` file defines the SQL Server database and its initialization
container for local development. Create the bind-mount directory and start the
containers from the project root:

```bash
mkdir -p data/sqlserver
docker compose up -d
```

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
