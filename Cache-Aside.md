
The **Cache-Aside Pattern** (also called **Lazy Loading**) is one of the most common ways to use a cache alongside a database.

**Read:**
- Check cache first.
- If found (**hit**), return it.
- If not (**miss**), read from DB, store in cache, return it.

**Write:**
- Update DB.
- Invalidate (delete) the cache entry.
- Next read repopulates the cache with fresh data.