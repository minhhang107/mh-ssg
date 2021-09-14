# mh-ssg

A simple static site generator that converts text files into HTML files

# Features

- Allows input of a single text file
- Allows input of a directory containing text file(s)
- Supports custom stylesheet
- Supports user-specified output folder
- Converts first line of text file into title

# Installation

```
1.   Clone the project
2.   npm i -g
```

# Usage

```
mh-ssg -i text.txt
mh-ssg -i folder
mh-ssg -i folder -o sampleFolder -s https://example.com/with/css.css
```

# Help

```
Usage: mh-ssg -i <filename> -o <outputpath> -s <stylesheet>

Options:
  -h, --help        Show help                                          [boolean]
  -i, --input       Specify input file or input folder (required)        [array]
  -o, --output      Specify output path                                  [array]
  -s, --stylesheet  Specify stylesheet for html file      [string] [default: ""]
  -v, --version     Show program name and version
```

# License

This project is licensed under the [MIT](https://github.com/minhhang107/mh-ssg/blob/main/LICENSE) License
