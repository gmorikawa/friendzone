# Friendzone Project

## Getting Started

Clone the parent project and the two independent repositories:

```bash
git clone git@github.com:gmorikawa/friendzone.git
cd friendzone
git clone --branch develop git@github.com:gmorikawa/friendzone-core.git api
git clone --branch develop git@github.com:gmorikawa/friendzone-web.git app
```

Alternatively, run `bash /path/to/fetch-all.sh` from the directory where you want
to create a new `friendzone` checkout. The script clones all three repositories.

The file `compose.yaml` is a docker compose file containing the necessary containers to setup a working development environment.

To setup the containers run the following command:

```bash
docker compose up -d
```

## Structure

This project uses two independent Git repositories:

* `api`: contains the repository of friendzone-core from Github.
* `app`: contains the repository of friendzone-web from Github.

The parent repository ignores `api/` and `app/`. Commit and push changes within
each project independently; no parent commit is needed when either project changes.

To update their `develop` branches, first switch each repository to `develop`,
then pull from its configured remote. For the existing repositories, that remote
is named `github`:

```bash
git -C api switch develop
git -C api pull --ff-only github develop
git -C app switch develop
git -C app pull --ff-only github develop
```

Fresh clones use the remote name `origin`; use `origin` instead of `github` there.
