# averylim.com

[Description of site]

[Screenshot of site]

_As of [date of screenshot]_

## Developing

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

This app is deployed to averylim.com via [Render](todo-add-url), so simply pushing to the main branch will trigger the deployment.

## Credits

- Weather forecast by https://www.weatherapi.com/

## Roadmap

All

- [ ] Render an SEO friendly page for SSR
- [ ] When going from smallest breakpoint to 480, the weather app seems to become the wide tile
- [ ] Find better fonts for everything
- [ ] Pass image through filter of hard light + theme colour, then show colour on hover (see https://github.com/lowtechmag/solar/wiki/Solar-Web-Design#images)
- [ ] Supabase insert is currently open to public, find a way to restrict
- [ ] Make sure everything is recalculated when resized
- [ ] Sort out eyebrow arrow hover sitch

Clock

- [ ] Ensure day -> night/night -> day cards animate correctly
- [ ] implement skeleton when changing locale

Language switcher

- [ ] refine gsap draggable, make sure it's smooth
- [ ] translate date too
- [ ] limit the drag to 1 language at a time only because the radius isn't uniform

Weather

- [ ] draw other weather svgs
- [ ] implement skeleton when changing locale

ProjectShowcase

- [ ] use an animated gif of scrolling down the page

Info

- [ ] Increase page view real time
