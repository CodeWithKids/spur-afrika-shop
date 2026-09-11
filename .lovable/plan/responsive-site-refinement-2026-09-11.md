# Responsive site refinement

## Goal
Make the complete storefront comfortable and reliable across small phones, phones, tablets, laptops, and wide desktops without changing its current visual identity or shop behavior.

## Changes
- Refine the shared header for 320px-wide screens, add the previously requested Home link, preserve the compact mobile menu, and keep cart and currency controls usable without crowding.
- Improve home-page spacing, content flow, buttons, statistics, and product grids across breakpoints.
- Make the shop filters clearly scrollable on phones, keep search and product cards balanced on tablets, and prevent long category names from crowding the controls.
- Tighten product-detail image galleries, variant selectors, quantity controls, actions, and related-product layouts for touch screens and mid-sized tablets.
- Improve cart and checkout rows, totals, forms, and side summaries so labels and prices remain readable at narrow widths.
- Standardize contact, shipping, empty states, and footer spacing, link wrapping, badge alignment, and touch targets.

## Verification
- Check every public page at 320, 390, 768, 1024, and 1280 pixels.
- Confirm there is no unintended horizontal page overflow, clipped text, overlapping controls, or undersized touch targets.
- Exercise the mobile menu, category filters, product options, cart, and checkout layout.
- Review screenshots at phone, tablet, and desktop sizes and confirm the latest build succeeds.

## Technical details
- Keep the existing TanStack routes, Tailwind design tokens, product data, and local cart behavior unchanged.
- Use responsive grid/flex patterns with `min-w-0`, stable control sizing, and breakpoint-specific spacing.
