# REST API Workshop – Fullstack Kurssi

## API Route List

| Method | URL                | Description                |
|--------|--------------------|----------------------------|
| GET    | /api/getall        | Get all items              |
| GET    | /api/:id           | Get single item by ID      |
| POST   | /api/add           | Add a new item             |
| PUT    | /api/update/:id    | Update item by ID          |
| DELETE | /api/delete/:id    | Delete item by ID          |

### Example POST Body
```json
{
  "title": "Song Name",
  "artist": "Artist Name",
  "year": 2026
}
