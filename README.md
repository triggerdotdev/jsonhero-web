<p align="center">
<img width="300" src="https://raw.githubusercontent.com/jsonhero-io/jsonhero-web/main/docs/images/JsonHeroLogo.png"/>
</p>

# JSONHero

JSON Hero is a beautiful JSON viewer for the web. Stop reading thousand-line JSON documents in your editor

- View JSON any way you'd like: Column View, Tree View, Editor View, and more.
- Automatically infers the contents of strings and provides useful previews
- Creates an inferred JSON Schema that could be used to validate your JSON
- Quickly scan related values to check for edge cases

![JSON Hero Screenshot](https://raw.githubusercontent.com/jsonhero-io/jsonhero-web/main/docs/images/main.png)

## Features

### Column view

Inspired by macOS Finder, Column View is a new way to browse a JSON document.

![JSON Hero Column View](https://raw.githubusercontent.com/jsonhero-io/jsonhero-web/main/docs/images/features-columnview.gif)

It has all the features you'd expect: Keyboard navigation, Path bar, history.

It also has a nifty feature that allows you to "hold" a descendent selected and travel up through the hierarchy, and then move between siblings and view the different values found at that path. It's hard to describe, but here is an animation to help demonstrate:

![Column View - Traverse with Context](https://raw.githubusercontent.com/jsonhero-io/jsonhero-web/main/docs/images/features-traversewithcontext.gif)

As you can see, holding the `Option` (or `Alt` key on Windows) while moving to a parent keeps the part of the document selected and shows it in context of it's surrounding JSON. Then you can traverse between items in an array and compare the values of the selection across deep hierarchy cahnges.

### Editor view

View your entire JSON document in an editor, but keep the nice previews and related values you get from the sidebar as you move around the document:

![Editor view](https://raw.githubusercontent.com/jsonhero-io/jsonhero-web/main/docs/images/features-editorview.gif)

### Content Previews

JSON Hero automatically infers the content of strings and provides useful previews and properties of the value you've selected. It's "Show Don't Tell" for JSON:

#### Image URLs

![Preview colors](https://raw.githubusercontent.com/jsonhero-io/jsonhero-web/main/docs/images/features-preview-imageurls.png)

#### Website URLs

![Preview websites](https://raw.githubusercontent.com/jsonhero-io/jsonhero-web/main/docs/images/features-preview-websiteurls.png)

#### Tweet URLS

![Preview tweets](https://raw.githubusercontent.com/jsonhero-io/jsonhero-web/main/docs/images/features-preview-tweeturls.png)

#### JSON URLs

![Preview JSON](https://raw.githubusercontent.com/jsonhero-io/jsonhero-web/main/docs/images/features-preview-tweeturls.png)

####

#### Colors

![Preview colors](https://raw.githubusercontent.com/jsonhero-io/jsonhero-web/main/docs/images/features-preview-colors.png)

### Tree view

> Coming soon

### Terminal

> Coming soon

## Bugs and Feature Requests

Have a bug or a feature request? Feel free to [open a new issue](/issues).

You can also join our [Discord channel](https://discord.gg/ZQq6Had5nP) to hang out and discuss anything you'd like.

## Developing

To run locally, first clone the repo and install the dependencies:

```bash
git clone https://github.com/jsonhero-io/jsonhero-web.git
cd jsonhero-web
npm install
```

Then, create a file at the root of the repo called `.env` and set the `SESSION_SECRET` value:

```
SESSION_SECRET=abc123
```

Now, run `npm start` and open your browser to `http://localhost:8787`
