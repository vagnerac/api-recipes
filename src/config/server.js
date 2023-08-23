import { app, PORT } from '../app.js';

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
