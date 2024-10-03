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

Prio

- [ ] Sort out mobile layout

If there's time

- [ ] Refine gsap draggable, make sure it's smooth
- [ ] Implement skeleton when changing locale
- [ ] Add footer and make sure it works with GSAP animation
- [ ] Limit the drag to 1 language at a time only because the radius isn't uniform

Good to have

- [ ] When going from smallest breakpoint to 480, the weather app seems to become the wide tile
- [ ] Supabase insert is currently open to public, find a way to restrict
- [ ] Output a printable version of the site
- [ ] wheee is defined several times, DRY

- [ ] Increase page view real time (not sure if poss because it's a static site. maybe a web worker might be helpful here?)
