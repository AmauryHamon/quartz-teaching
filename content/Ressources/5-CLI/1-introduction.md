---
title: CLI Introduction
draft: false
tags:
  - avancé
  - essentiels
  - CLI
description: How to use your computer differently
---

While humans use computers in many ways, the most widely used is through a Graphical User Interface (GUI).

Although easy to use, a GUI can feel limiting to some tasks, especially when thinking of repetitive ones.

A ==command-line interface== (CLI) allows users to interact with a computer by reading and writing text. It excels at making repetitive tasks automatic and fast.

Knowing bits of CLI can really help if you are interested in writing and running scripts, installing utilities, librairies, etc.

Here is a very clean and extensive [CLI guide](https://github.com/Idnan/bash-guide)

Here is a [intro course](https://swcarpentry.github.io/shell-novice/) on Bash by Software Carpentry

# Useful commands

## Navigating folders

```zsh
# show current folder
pwd
# change to user's directory
cd ~ 
# change to "folder" directory
cd folder
# change to parent folder
cd ..
# list files in current folder
ls 
# list files in the subfolder "subfolder"
ls subfolder
# list files (including hidden ones) in the subfolder "subfolder"
ls -a subfolder
# list files (including their permissions and sizes) in the subfolder "subfolder"
ls -l subfolder
```

## Actions on files and folders

```zsh
# rename a file
mv old_filename.txt new_filename.txt
# same command but moving the file instead
mv old_filename.txt folder/new_filename.txt
# copy a file
cp source_file.txt copied_file.txt
# copy a folder
cp -R source_folder copied_folder
# create a file "new_file.txt" (or update its modification date if it exists)
touch new_file.txt
# create a folder
mkdir folder
# create a folder with its destination if necessary
mkdir -p folder/children_folder
# delete a file
rm file.txt
# delete a file without write access
rm -f file.txt
# delete a folder
rm folder
# delete a folder with content inside
rm -R folder
```

## Working on multiple files

We can write scripts directly in the terminal, or save them as a `.sh` file to execute later.

### Iterate through files in the current directory

```zsh
for file in *; do
  echo "$file"
done
```

`*` matches every file and folder in the current directory. The loop runs once per item, and `$file` holds its name.

### Iterate through files in a specific folder

```zsh
for file in path/to/folder/*; do
  echo "$file"
done
```

Replace `path/to/folder` with the actual path. `$file` will contain the full path to each item, e.g. `path/to/folder/image.png`.

### Only match files with a specific extension

```zsh
for file in path/to/folder/*.txt; do
  echo "Processing: $file"
done
```

Swap `*.txt` for any pattern — e.g. `*.jpg`, `*.html` — to filter by extension.

### Include files inside sub-folders (recursive)

```zsh
for file in path/to/folder/**/*; do
  echo "$file"
done
```

`**/` tells the shell to descend into sub-folders as well. In zsh this works by default; in bash you first need to run `shopt -s globstar`.

## Finding content in files

`grep` searches for a text pattern inside files and prints every matching line.

```zsh
# search for "hello" in a single file
grep "hello" file.txt

# search in all files inside a folder
grep "hello" path/to/folder/*

# search recursively through all sub-folders
grep -r "hello" path/to/folder

# case-insensitive search
grep -i "hello" file.txt

# show line numbers alongside matches
grep -n "hello" file.txt

# only list the names of files that contain a match (not the lines themselves)
grep -rl "hello" path/to/folder

# invert the search — show lines that do NOT match
grep -v "hello" file.txt

# count how many lines match
grep -c "hello" file.txt
```

You can combine flags together. For example, to do a recursive, case-insensitive search and show line numbers:

```zsh
grep -rin "hello" path/to/folder
```


# Usefull CLI Tools

## ffmpeg

ffmpeg is a free software dedicated to audio and video files tasks such as conversion, compression.

Julien Bidoret has a great ressource on ffmpeg basics [here](https://radicalweb.design/ressources/cli/ffmpeg/)

## rsync

`rsync` efficiently copies and synchronizes files between two locations — two local folders, or a local folder and a remote server. Unlike `cp`, it only transfers files that have changed, making it much faster for repeated syncs.

```zsh
# copy a local folder to another local location
rsync -r source/ destination/

# sync with verbose output (shows each file being transferred)
rsync -rv source/ destination/

# sync and preserve permissions, timestamps, symlinks (recommended)
rsync -a source/ destination/

# dry run — preview what would be transferred without actually doing it
rsync -an source/ destination/

# delete files in destination that no longer exist in source
rsync -a --delete source/ destination/

# sync a local folder to a remote server over SSH
rsync -a source/ user@server:/path/to/destination/

# sync from a remote server to a local folder
rsync -a user@server:/path/to/source/ destination/

# show progress for each file during transfer
rsync -a --progress source/ destination/

# exclude specific files or folders
rsync -a --exclude="*.log" --exclude=".git" source/ destination/
```

> [!tip] Trailing slash matters
> `rsync -a source/ destination/` copies the **contents** of `source` into `destination`.
> `rsync -a source destination/` copies the `source` **folder itself** into `destination`, creating `destination/source/`.

