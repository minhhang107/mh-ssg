# mh-ssg

A simple static site generator that converts text files into HTML files

# Features

- Allows input of a single text file
- Allows input of a directory containing text file(s)
- Supports custom stylesheet
- Supports user-specified output folder
- Finds and sets title to HTML file (if available)

# Installation

```
1.   Clone the project
2.   Install [NodeJs](https://nodejs.org/en/)
3.   Redirect to project directory
4.   Install the tool with npm i -g .
```

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

# License

This project is licensed under the [MIT](https://github.com/minhhang107/mh-ssg/blob/main/LICENSE) License
