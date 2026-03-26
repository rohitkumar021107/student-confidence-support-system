# AskSpark – SEO & Visibility Optimization

## Current State
- index.html has basic SEO meta tags (title, description, keywords, OG, Twitter card, favicon)
- Page title is "AskSpark | Ask. Learn. Spark."
- LandingPage.tsx has Hero, Stats, Problem/Solution, Features, How It Works, CTA, Team, Footer
- No robots.txt or sitemap.xml
- Canonical tag points to https://askspark.app but the actual deployed URL is a Caffeine preview URL
- No "What is AskSpark" section on homepage
- No FAQ section
- H1 reads "Never Fear to Ask Questions Again" — does not include the brand name "AskSpark"
- No JSON-LD structured data for Google rich results
- Target keywords missing from headings: student doubt platform, anonymous doubt app, ask doubts online

## Requested Changes (Diff)

### Add
- robots.txt in public/ folder — allows all crawlers, points to sitemap
- sitemap.xml in public/ folder — lists all public pages with priorities
- JSON-LD structured data (WebSite + Organization schema) in index.html
- "What is AskSpark" section on LandingPage between Hero and Problem/Solution
- FAQ section on LandingPage (7–8 questions with "AskSpark" keyword, target queries)
- Keyword-rich alt text references in content where images are described

### Modify
- index.html: update title to "AskSpark – Student Confidence Support System", strengthen meta description to include all target keywords, update canonical href to use window.location.origin dynamically via meta tag approach, add JSON-LD WebSite schema with SearchAction, add theme-color meta
- LandingPage.tsx H1: include "AskSpark" brand name in the heading
- LandingPage.tsx: update H2/H3 headings in Features, How It Works, and new sections to include target keywords naturally
- LandingPage.tsx Hero subtitle: include keywords "student doubt platform" and "ask doubts online" naturally
- Footer: add sitemap and SEO-related links

### Remove
- Nothing removed

## Implementation Plan
1. Write `src/frontend/public/robots.txt` — User-agent: *, Disallow: nothing, Sitemap URL
2. Write `src/frontend/public/sitemap.xml` — list /, /submit, /dashboard/student, /help, /chat with lastmod and priority
3. Update `src/frontend/index.html` — title to "AskSpark – Student Confidence Support System", add richer description with all 4 target keywords, add JSON-LD WebSite schema with name/url/description/SearchAction, add theme-color
4. Update `src/frontend/src/pages/LandingPage.tsx`:
   - H1: "AskSpark – Ask Any Question. Build Real Confidence." or similar with brand name
   - Hero subtitle: include "student doubt platform" and "ask doubts online" naturally
   - Add `<section id="what-is-askspark">` between hero and stats with H2 "What is AskSpark?", 2 paragraphs covering platform purpose and keywords
   - Features H2: include "anonymous doubt app" naturally
   - Add FAQ section with `<section id="faq">` before Team, using Accordion component, 8 questions all featuring "AskSpark" or target keywords
   - Ensure all section headings use proper semantic structure (h1 once, h2 for sections, h3 for cards)
