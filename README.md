# TrixCamp
Simple, distraction free writing app based on [Basecamp's trix-editor](https://github.com/basecamp/trix).

<img src="https://raw.githubusercontent.com/michaeljcalkins/trixcamp/master/src/browser/img/screenshot.png" height="400">

## Getting Started

1. Download your version below
2. Know the keyboard shortcuts:
  - `cmd+s` to save
  - `cmd+n` to create a new document
  - `cmd+o` to open a document

## Downloads

[Mac Download](https://s3.amazonaws.com/michaeljcalkins/TrixCamp-darwin-x64.zip)

[Windows Download](https://s3.amazonaws.com/michaeljcalkins/TrixCamp-win32-x64.zip)

[Linux Download](https://s3.amazonaws.com/michaeljcalkins/TrixCamp-linux-x64.zip)

## Developer's Guide

1. Install all components: `npm install`
2. Run electron: `electron .`
3. Start editing!

TrixCamp takes the title and contents of the trix editor and builds a JSON object that looks like:

```
{
  "title": "Man In The Arena",
  "contents": "It is not the critic who counts; not the man who points out how the strong man..."
}
```

## Todo

- I have doubts the keyboard shortcuts work on windows, I don't own a computer like that
- Editor bar should always be in view
- Indent the ul and ol list via css a bit
- Auto save every minute to five minutes
- Unsaved indicator
- Export to markdown
- Remember files you've opened in a toggleable left hand menu
- Be able to insert images

## Why

This was part of an experiment I did in planning and delivering applications quickly and I feel this was a highly successful and useful proejct.

More on that here: http://michaeljcalkins.com/2016/02/10/planning-so-you-can-deliver/
