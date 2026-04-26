# Create sitemap.xml
sitemap = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://prenclex.com/</loc><priority>1.0</priority><changefreq>daily</changefreq></url>
  <url><loc>https://prenclex.com/courses</loc><priority>0.9</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://prenclex.com/courses/nclex-rn</loc><priority>0.9</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://prenclex.com/courses/nclex-pn</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://prenclex.com/courses/ccrn</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://prenclex.com/nursing-tv</loc><priority>0.9</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://prenclex.com/pricing</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://prenclex.com/features</loc><priority>0.7</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://prenclex.com/testimonials</loc><priority>0.7</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://prenclex.com/blog</loc><priority>0.7</priority><changefreq>daily</changefreq></url>
  <url><loc>https://prenclex.com/faq</loc><priority>0.6</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://prenclex.com/contact</loc><priority>0.6</priority><changefreq>monthly</changefreq></url>
</urlset>'''

with open(r'public\sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(sitemap)

# Create robots.txt
robots = '''User-agent: *
Allow: /
Sitemap: https://prenclex.com/sitemap.xml'''

with open(r'public\robots.txt', 'w', encoding='utf-8') as f:
    f.write(robots)

print("SUCCESS: sitemap.xml and robots.txt created.")
