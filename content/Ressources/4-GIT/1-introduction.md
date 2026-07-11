---
title: Introduction to Git
draft: false
tags:
  - avancé
  - essentiels
  - Git
description: Version control your code with Git
---

Git is a version control system that allows you to track changes to files and folders. It’s a powerful tool that can be used for everything from small personal projects to large-scale enterprise applications.

It is often used in combination with platforms like GitHub, and alternatives like GitLab, Codeberg, etc.

Git can either be leveraged through the CLI, or Source Control Panel UI on Visual Studio Code.

Below is a list of most used CLI commands

# Workflow

Generally, we want to use Git to do the following:

1. **Initialize or clone a repository** – Create a new local ==repository== with `git init`, or ==clone== an existing one from a remote host (e.g. GitHub) with `git clone <url>`. This creates a hidden `.git` folder that Git uses to track everything.
2. **Make changes** – Edit, add, or delete files as you normally would. Git watches the working directory and notices what has changed since the last saved state.
3. **Stage your changes** – Before saving, you choose *which* changes to include by ==staging== them with `git add`. Think of the ==staging area== as a draft: you can add files one by one and review what will be saved before committing.
4. **Commit** – A ==commit== is a permanent snapshot of your staged changes. Each commit has a unique ID and a message describing what changed (e.g. `git commit -m "add login page"`). Commits are the building blocks of your project's history.
5. **Push to a remote repository** – Once changes are committed locally, you can ==push== them to a remote repository (e.g. on GitHub) so they are backed up and accessible to collaborators: `git push`.
6. **Pull from a remote repository** – If collaborators have pushed new commits, you ==pull== those changes into your local copy to stay up to date: `git pull`. Git will attempt to merge their changes with yours automatically.
7. **Work with branches** – A ==branch== is an independent line of development. By default your repository has a ==main== branch. You can create new branches to develop features or fix bugs in isolation, then ==merge== them back into `main` once the work is ready — without affecting the stable version of the project.

> [!info] Advanced use cases
>
> 8. **Pull Requests** – On platforms like GitHub, a ==pull request== (PR) is a formal way to propose merging your branch into another (usually `main`). It opens a space for collaborators to review your code, leave comments, and approve or request changes before the merge happens. PRs are the standard collaboration workflow on most open-source and team projects.
> 9. **Rebase** – ==Rebasing== is an alternative to merging. Instead of creating a merge commit, `git rebase <branch>` replays your commits on top of another branch, resulting in a cleaner, linear history. It is commonly used to incorporate the latest changes from `main` into a feature branch before opening a pull request, or to tidy up commits interactively with `git rebase -i` before sharing your work.

# Setup and configuration

```bash
# Initialize a new Git repository
git init
# Clone and create a local copy of a remote repository
git clone <url>
# Configure global Git settings
git config --global <setting_name> <value>
# Configure local Git settings for a specific repo
git config --local <setting_name> <value>
```

# File operations

```bash
# Show working tree status
git status
# Add files to the staging area
git add <file(s)>
# Remove files from working tree and staging area
git rm <file(s)>
# Move or rename a file
git mv <old_file> <new_file>
# Commit changes with a message
git commit -m "commit message"
# Show differences between working tree and last commit
git diff

```

# Branching and Merging

```bash
# List all branches
git branch
# Create a new branch
git branch <branch_name>
# Switch to a specific branch
git checkout <branch_name>
# Merge a branch into the current branch
git merge <branch_name>
# Delete a specific branch
git branch -d <branch_name>
# List all remote branches
git branch -r

# --------------- Advanced ------------------

# Create a new branch based on a remote branch
git checkout -b <branch_name> <remote_name>/<remote_branch>
# Cancel merge in case of conflicts
git merge --abort
# Rebase the current branch onto another branch
git rebase <branch_name>
# Cancel an ongoing rebase operation
git rebase --abort
# Interactive rebase for edit, squash, re-order or drop commits
git rebase -i
# Rebase commits in the current branch onto a remote branch interactively
git rebase -i <remote_name>/<remote_branch>


```

# Remote Repositories

```bash
# List remote repositories
git remote
# Add a remote repository
git remote add <name> <url>
# Fetch from a remote repository
git fetch <remote_name>
# Pull changes from a remote branch
git pull <remote_name> <remote_branch>
# Push changes to a remote repository
git push <remote_name> <local_branch>
# Remove a remote repository
git remote rm <remote_name>
# Display information about a specific remote repository
git remote show <remote_name>
# Show the tracking branches for remote repositories
git remote show <remote_name> --verbose
```

# More informations

Tons of resources are available on [cs.fyi: git cheatsheet](https://cs.fyi/guide/git-cheatsheet)