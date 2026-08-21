# LogTop

Drop an nginx access.log. Get top paths, statuses, and IPs as CSV. Files never leave the browser.

Ask this answers: [I discovered DuckDB looking for a way to analyze Nginx access.log's](https://news.ycombinator.com/item?id=49334879)

- No account
- No upload
- Cap: 8 MB, 20,000 lines
- Combined / common log format
- Top 20 paths, status codes, IPs
- Full parse as CSV download

## Local

Open `index.html` in a browser, or:

```bash
python3 -m http.server 4173
```

This is a sample, not a SIEM. Binary or gzip logs will not parse.

## GTM

Reply to people who already said they grep access logs by hand. Copy is in the page footer.
