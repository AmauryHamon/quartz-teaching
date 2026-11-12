---
title: Reading CSV Data
draft: false
tags:
  - avancé
  - JS
description: Reading data from CSV file
---

# What is a CSV file?

CSV stands for ==Comma-Separated Values==. It is a plain text file that stores a table, like a spreadsheet.

It's a handy way to prepare data for a website: you can fill a table in Excel, Google Sheets or Numbers, export it as `.csv`, and read it with JavaScript. No need to write [[Ressources/3-JS/10-json|JSON]] by hand.

Here is a sample file called `projects.csv` ([download it](/files/projects.csv)):

```csv
title,category,year,color
Poster Series,Graphic design,2024,#ff6b6b
Type Specimen,Typography,2025,#4ecdc4
Zine,Book design,2025,#ffd93d
Portfolio Website,Web design,2026,#7c6ef7
Variable Font,Typography,2026,#a29bfe
```

There are only three rules:
- each **line** is a **row**
- **commas** separate the **columns**
- the **first line** is the **header**: it gives a name to each column

Opened in a spreadsheet app, the same file looks like this:

| title             | category       | year | color     |
| ----------------- | -------------- | ---- | --------- |
| Poster Series     | Graphic design | 2024 | `#ff6b6b` |
| Type Specimen     | Typography     | 2025 | `#4ecdc4` |
| Zine              | Book design    | 2025 | `#ffd93d` |
| Portfolio Website | Web design     | 2026 | `#7c6ef7` |
| Variable Font     | Typography     | 2026 | `#a29bfe` |

## Exporting a CSV from a spreadsheet

- **Google Sheets**: File → Download → Comma-separated values (.csv)
- **Excel**: File → Save As → CSV UTF-8 (.csv)
- **Numbers**: File → Export To → CSV…

> [!warning] Excel in French
> Excel set to French often uses `;` instead of `,` to separate the columns. Open your `.csv` in VS Code to check which one your file uses.

# Vanilla JS

JavaScript can't read a CSV file directly: it only receives ==one long string of text==. Our job is to turn that text into an [[Ressources/3-JS/4-arrays-objects#08. Arrays of Objects — the Real-world Pattern|array of objects]], the shape we already know how to loop through:

```js
[
  { title: "Poster Series", category: "Graphic design", year: 2024, color: "#ff6b6b" },
  { title: "Type Specimen", category: "Typography", year: 2025, color: "#4ecdc4" },
  // ...
]
```

We'll get there in 5 steps:
1. Load the file → get the text
2. Split the text into lines
3. Separate the header from the rows
4. Split each row into values
5. Turn each row into an object

## 1. Load the file with fetch

We load the file with [[Ressources/3-JS/11-fetch-intro|fetch]], exactly like we do with an API. The only difference: a CSV is not JSON, so we use `response.text()` instead of `response.json()`.

```js
fetch("projects.csv")
  .then(response => response.text())
  .then(text => {
    console.log(text);
  });
```

The path `"projects.csv"` is relative to your HTML file, so in this case both files sit in the same folder:

```
my-project/
├── index.html
├── script.js
└── projects.csv
```

In the console, `text` is a single [[Ressources/3-JS/1-data-types#Strings|string]] containing the whole file:

```js
"title,category,year,color\nPoster Series,Graphic design,2024,#ff6b6b\nType Specimen,Typography,2025,#4ecdc4\n..."
```

`\n` is the invisible "new line" character: it's what you type when you press Enter.

> [!warning] Use a local server
> If you open `index.html` by double-clicking it (the address starts with `file:///`), the browser blocks `fetch` and shows a ==CORS error== in the console.
> In VS Code, open your project with the **Live Server** extension instead (the address will start with `http://127.0.0.1`).

## 2. Split the text into lines

`split(separator)` cuts a string into an array, each time it finds the separator. Here, the separator is the new line `"\n"`:

```js
const lines = text.trim().split("\n");

console.log(lines);
// [
//   "title,category,year,color",
//   "Poster Series,Graphic design,2024,#ff6b6b",
//   "Type Specimen,Typography,2025,#4ecdc4",
//   "Zine,Book design,2025,#ffd93d",
//   "Portfolio Website,Web design,2026,#7c6ef7",
//   "Variable Font,Typography,2026,#a29bfe"
// ]
```

`trim()` removes spaces and empty lines at the start and end of the text. Most CSV files end with an empty line: without `trim()`, we would get an empty `""` row at the end of the array.

[MDN: split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)

## 3. Separate the header from the rows

The first line is the header, every other line is a row of data:

```js
const headers = lines[0].split(",");
// ["title", "category", "year", "color"]

const rows = lines.slice(1);
// every line, except the first one
```

`slice(1)` returns a new array starting at index `1`, so it skips the header at index `0`.

[MDN: slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

## 4. Split each row into values

We use `split()` again, this time with a comma:

```js
const values = rows[0].split(",");
// ["Poster Series", "Graphic design", "2024", "#ff6b6b"]

values[0]; // "Poster Series"
values[1]; // "Graphic design"
values[2]; // "2024"
values[3]; // "#ff6b6b"
```

The position of each value matches the header: index `0` is the `title`, index `1` is the `category`, and so on.

## 5. Turn each row into an object

We [[Ressources/3-JS/6-loops#for...of|loop]] through every row, and build one object per row:

```js
const projects = [];

for (const row of rows) {
  const values = row.split(",");

  const project = {
    title: values[0],
    category: values[1],
    year: Number(values[2]),
    color: values[3],
  };

  projects.push(project);
}

console.log(projects);
// [
//   { title: "Poster Series", category: "Graphic design", year: 2024, color: "#ff6b6b" },
//   { title: "Type Specimen", category: "Typography", year: 2025, color: "#4ecdc4" },
//   ...
// ]
```

> [!important] Everything is a string
> A CSV file is only text, so every value we get is a ==string==: `"2024"` and not `2024`.
> To do maths, compare or sort years, convert them with `Number()`. See [[Ressources/3-JS/1-data-types#Numbers|numbers]].
> ```js
> "2024" + 1;         // "20241" ❌
> Number("2024") + 1; // 2025 ✅
> ```

### Going further: use the header as keys

Writing `title: values[0]` by hand works well for a small file. If your CSV has many columns, you can use the names in `headers` as the keys of the object:

```js
const projects = [];

for (const row of rows) {
  const values = row.split(",");
  const project = {};

  headers.forEach((header, i) => {
    project[header] = values[i];
  });

  projects.push(project);
}
```

`project[header]` uses the bracket notation: when `header` is `"title"`, it does the same as `project.title`. This version works with any CSV file, but every value stays a string.

## Display the data on the page

Once we have our array of objects, we use the [[Ressources/3-JS/7-dom#07. createElement + append|DOM]] to create one card per project.

In your project, the path would be `"projects.csv"`. In the example below the file is hosted on this site, so the path is `"/files/projects.csv"`.

```html:index.html
<h2>My projects</h2>
<ul class="projects" id="projects"></ul>
```

```css:style.css
.projects {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    gap: 0.75rem;
    padding: 0;
    list-style: none;
}

.project {
    padding: 0.75rem;
    border-radius: 6px;
    border-left: 6px solid;
    background: var(--highlight);
}

.project h3 {
    margin: 0 0 0.25rem;
    font-size: 1rem;
}

.project p {
    margin: 0;
    font-size: 0.85rem;
    color: var(--gray);
}
```

```js:script.js
const list = document.querySelector("#projects");

fetch("/files/projects.csv")
  .then(response => response.text())
  .then(text => {
    // 1. split the text into lines
    const lines = text.trim().split("\n");

    // 2. remove the header
    const rows = lines.slice(1);

    // 3. one row = one project
    for (const row of rows) {
      const values = row.split(",");

      const project = {
        title: values[0],
        category: values[1],
        year: Number(values[2]),
        color: values[3],
      };

      // 4. create a card for each project
      const li = document.createElement("li");
      li.classList.add("project");
      li.style.borderColor = project.color;
      li.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.category} · ${project.year}</p>
      `;
      list.append(li);
    }
  })
  .catch(error => {
    console.error(error);
    list.textContent = "Could not load the CSV file.";
  });
```

Try it: download [projects.csv](/files/projects.csv), add a line in it, and the page shows one more card.

## Use the data

Now that `projects` is a regular array of objects, every array method works:

```js
// only the typography projects
const typography = projects.filter(project => project.category === "Typography");

// the most recent projects first
projects.sort((a, b) => b.year - a.year);
```

See [[Ressources/3-JS/4-arrays-objects#04. filter — Keep Matching Items|filter]] and [[Ressources/3-JS/12-sorting#04. Sorting Objects by a Property|sorting objects by a property]].

## Common mistakes

> [!warning]
>
> 1. Using `.json()` instead of `.text()`
> A CSV is not JSON: `.json()` throws a `SyntaxError`.
> ```js
> .then(response => response.json()) // ❌ SyntaxError
> .then(response => response.text()) // ✅
> ```
> 2. Opening `index.html` without a local server
> `fetch` is blocked on `file:///` addresses. Use Live Server.
> 3. Forgetting `.trim()`
> The empty line at the end of the file becomes an empty row, and the last object is full of `undefined`.
> 4. Spaces after the commas
> With `Zine, Book design`, the category becomes `" Book design"` (with a space). Don't put spaces around commas in your CSV, or clean each value with `values[1].trim()`.
> 5. Forgetting `Number()`
> `"2024"` is a string. Convert numbers before comparing or sorting them.

## Limits of split(",")

`split(",")` is perfect for simple files like ours, but it breaks in a few cases:

- **A value contains a comma.** In CSV, such values are wrapped in quotes: `"Paris, France"`. `split(",")` cuts it in two.
- **The file uses `;`.** Use `split(";")` instead (see [[#Exporting a CSV from a spreadsheet|Excel in French]]).
- **The file comes from Windows.** Lines may end with `\r\n` instead of `\n`, leaving an invisible `\r` at the end of the last value. Use `split(/\r?\n/)` to handle both.

For real-world files, a library like [Papa Parse](https://www.papaparse.com/) handles all of these cases for you.

## TLDR CSV boilerplate

Works with any simple CSV file. `data` is an array of objects, using the header names as keys.

```js
fetch("projects.csv")
  .then(response => response.text())
  .then(text => {
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",");
    const rows = lines.slice(1);

    const data = [];
    for (const row of rows) {
      const values = row.split(",");
      const item = {};
      headers.forEach((header, i) => {
        item[header] = values[i].trim();
      });
      data.push(item);
    }

    console.log(data); // array of objects, ready to loop through
  })
  .catch(error => {
    console.error(error);
  });
```

Prefer `async/await`? See [[Ressources/3-JS/12-async-await|async/await]].
