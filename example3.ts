require("typescript-require");

const fs = require("fs");
const EOL = "\r\n";

class Book {
  constructor(private title: string, private description: string) {}
}

class Author {
  constructor(private author: string, private books: Book[]) {}
}

let authursMap = new Map<string, Book[]>();


const transformContent = (txt: string): string => {
  let arr = txt.split(EOL);
  if (arr[arr.length - 1] == "") {
    arr.splice(arr.length - 1, 1);
  }
  arr.splice(0, 1);
  arr.forEach((str) => {
    toMap(str);
  });
  const authors = Array.from(authursMap.entries()).map(
    ([key, value]) => new Author(key, value)
  );
  return JSON.stringify({ authors: authors });
};

const toMap = (str: string): void => {
  const tokens = str.split("; ");
  let books = authursMap.get(tokens[1]);
  if (books == null) {
    books = new Array();
  }
  books.push(new Book(tokens[0], tokens[2]));
  authursMap.set(tokens[1], books);
};

const fileContent = fs.readFileSync("books.csv", "utf8");

const newContent = transformContent(fileContent);

fs.writeFile("books.json", newContent, function (error: Error) {
  if (error) throw error;
});





