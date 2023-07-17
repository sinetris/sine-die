# sine-die a semantic HTML theme for Hugo

## HTML elements to structure every page

- `header`
- `nav`
- `main`
- `article`
- `aside`
- `footer`

## Example

```html
<!DOCTYPE html>
<html class="no-js" lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <title>Example page with ARIA roles</title>
    <link rel="stylesheet" href="style.css" type="text/css" />
    <link rel="canonical" href="https://aria.example.test/basic-page" />
  </head>
  <body>
    <!-- Main header. Keep it consistent between website sections pages. -->
    <header>
      <!-- Only one H1 tag per page. Usually the same content as the page title. -->
      <h1>Example page with ARIA roles</h1>
      <!-- It's common practice, but not mandatory, to put the main navigation menu within the main header. -->
      <nav aria-labelledby="primary-navigation">
        <h2 id="primary-navigation">Primary navigation</h2>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Our team</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <!-- Is also common to have a search form to navigate through the website. -->
        <search>
          <form role="search">
            <input type="search" name="q" placeholder="Search query" aria-label="Search through site content">
            <input type="submit" value="Search">
          </form>
        </search>
      </nav>
    </header>
    <!-- Here is our page's main content -->
    <main>
      <!-- It usually contains an article -->
      <article>
        <h2>Article heading</h2>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Donec a diam lectus. Set sit amet ipsum mauris. Maecenas congue ligula as quam viverra nec consectetur ant hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur.</p>

        <h3>subsection</h3>

        <p>Donec ut librero sed accu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor.</p>

        <p>Pelientesque auctor nisi id magna consequat sagittis. Curabitur dapibus, enim sit amet elit pharetra tincidunt feugiat nist imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros.</p>

        <h3>Another subsection</h3>

        <p>Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum soclis natoque penatibus et manis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.</p>

        <p>Vivamus fermentum semper porta. Nunc diam velit, adipscing ut tristique vitae sagittis vel odio. Maecenas convallis ullamcorper ultricied. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, is fringille sem nunc vet mi.</p>
      </article>

      <!-- the aside content can also be nested within the main content -->
      <aside>
        <h2>Related</h2>

        <ul>
          <li><a href="#">Oh I do like to be beside the seaside</a></li>
          <li><a href="#">Oh I do like to be beside the sea</a></li>
          <li><a href="#">Although in the North of England</a></li>
          <li><a href="#">It never stops raining</a></li>
          <li><a href="#">Oh well...</a></li>
        </ul>
      </aside>
    </main>
    <!-- Main footer. Keep it consistent between website sections pages. -->
    <footer>
      <p>Here we put copyrights, licenses, </p>
      <nav aria-labelledby="footer-navigation">
        <h2 id="footer-navigation">Footer navigation</h2>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Our team</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </footer>
  </body>
</html>
```

## TO DO

- Add [Pagefind](https://pagefind.app/): highly configurable client-side search
  library that provides a UI component that supports searching, filtering, and
  metadata out of the box, a script to index pages generated with any static
  site generators, and use as low bandwidth as possible

## Credits

- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility): web accessibility reference in MDN Web Docs
- [Material Design](https://m3.material.io): In particular the [color system](https://m3.material.io/styles/color/the-color-system/key-colors-tones) is very similar to what I intended to use, and having almost everything ready was definitely a big help.
