# mh-ssg

A simple static site generator that converts text files or markdown files into HTML files

# Features

- Allows input of a single text file or a markdown file
- Allows input of a directory containing text file(s)
- Supports custom stylesheet
- Supports user-specified output folder
- Finds and sets title to HTML file (if available and only works for .txt file)
- Finds and converts Markdown syntax (`Heading 1-6`, `italics`, `bold`, `link`, `inline code`, `horizontal rule`) into correct HTML tags

# Installation

> 1.  Clone the project
> 2.  Install [NodeJs](https://nodejs.org/en/)
> 3.  Redirect to project directory
> 4.  Install the tool with `npm i -g .`

# Help

```
Usage: mh-ssg -i <filename> -o <path> -s <stylesheet>

Options:
  -h, --help        Show help                                          [boolean]
  -i, --input       Specify input file or input folder (required)        [array]
  -o, --output      Specify output path                                  [array]
  -s, --stylesheet  Specify stylesheet for html file                    [string]
  -v, --version     Show version number                                [boolean]
```

# Example

Using `mh-ssg -i file.txt -o folder -s https://cdn.jsdelivr.net/npm/water.css@2/out/water.css` will convert

##### ./file.txt

```
Silver Blaze


I am afraid, Watson, that I shall have to go,” said Holmes, as we
sat down together to our breakfast one morning.

“Go! Where to?”

“To Dartmoor; to King’s Pyland.”
```

into

##### ./folder/file.html

```
<!doctype html>
<html lang="en" dir="ltr">
<head>
<title>Silver Blaze</title>
<meta charset="utf-8">

<meta name="viewport" content="width=device-width, initial-scale=1"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">


</head>
<body>
<h1>Silver Blaze</h1>

<p>I am afraid, Watson, that I shall have to go,” said Holmes, as we sat down together to our breakfast one morning.</p>

<p>“Go! Where to?”</p>

<p>“To Dartmoor; to King’s Pyland.”</p>

</body>
</html>
```

# License

This project is licensed under the [MIT](https://github.com/minhhang107/mh-ssg/blob/main/LICENSE) License
